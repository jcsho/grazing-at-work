import {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
  NextPageContext,
} from "next";
import nookies, { setCookie } from "nookies";
import crypto from "crypto";
import SpotifyWebApi from "spotify-web-api-node";

const scopes = ["user-read-playback-state", "user-read-currently-playing"];

/**
 * Follows OWASP hmac based token authorization (minus timestamp).
 * See {@link https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#hmac-based-token-pattern OWASP Docs}
 * for complete example
 */
export const stateToken = crypto
  .createHmac("sha256", process.env.SPOTIFY_STATE_SECRET)
  .update("authentication")
  .digest("base64");

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export const authorizeUrl = spotifyApi.createAuthorizeURL(scopes, stateToken);

export const setSpotifyCookie = (
  ctx: Pick<NextPageContext, "res"> | { res: NextApiResponse<any> },
  key: string,
  value: string | any,
  expiry: number
) => {
  nookies.set(ctx, key, value, {
    domain: process.env.NODE_ENV === "production" ?? process.env.APP_URL,
    expires: new Date(Date.now() + expiry),
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
};

/**
 * Get the current authorized user's playback state
 * @param api - SpotifyWebApi object with access token and refresh token
 */
export const isPlaying = async (api: SpotifyWebApi): Promise<boolean> => {
  try {
    const { body } = await api.getMyCurrentPlaybackState();
    if (body && body.is_playing) return true;
  } catch (error) {
    console.error(
      "[utils/Spotify.ts:isPlaying:53] Unable to get playback state"
    );
    console.info(api);
    console.info(error);
  }
  return false;
};

export interface Track {
  isPlaying?: boolean;
  albumId?: string;
  albumName?: string;
  artistIds?: string[];
  artistNames?: string[];
  id?: string;
  name?: string;
  image?: string;
  duration?: number;
  progress?: number;
}

/**
 * Get the current authorized user's playing track
 * @param api - SpotifyWebApi object with access token and refresh token
 */
export const getCurrentTrack = async (api: SpotifyWebApi): Promise<Track> => {
  const currentTrack: Track = {};
  try {
    const { body } = await api.getMyCurrentPlayingTrack();
    currentTrack.isPlaying = body?.is_playing;
    currentTrack.albumId = body?.item?.album?.id;
    currentTrack.albumName = body?.item?.album?.name;
    currentTrack.artistIds = body?.item?.artists?.map((artist) => artist.id);
    currentTrack.artistNames = body?.item?.artists?.map(
      (artist) => artist.name
    );
    currentTrack.id = body?.item?.id;
    currentTrack.name = body?.item?.name;
    currentTrack.image = body?.item?.album?.images[0]?.url;
    currentTrack.duration = body?.item?.duration_ms;
    currentTrack.progress = body?.progress_ms;
    Object.keys(currentTrack).forEach((key) =>
      currentTrack[key] === undefined ? delete currentTrack[key] : {}
    );
  } catch (error) {
    console.warn("[utils/Spotify.ts:101] Failed to get current user track");
    console.info(api);
    console.info(error);
  }
  return currentTrack;
};

/**
 * Type safety for extending next request object.
 * See {@link https://nextjs.org/docs/api-routes/api-middlewares NextJS API Docs}
 * for more details
 */
export type NextApiRequestWithSpotifyAuth = NextApiRequest & {
  spotifyApi: SpotifyWebApi;
};

/**
 * Middleware for api routes which require spotify authentication
 * @param handler - NextJS API object
 * @param spotifyApi - helper for connecting to spotify
 */
export const withSpotifyAuth = (
  handler: NextApiHandler,
  spotifyApi: SpotifyWebApi
) => async (req: NextApiRequestWithSpotifyAuth, res: NextApiResponse) => {
  const { spotify_refresh_token } = nookies.get({
    req,
  });

  spotifyApi.setRefreshToken(spotify_refresh_token);

  const { body } = await spotifyApi.refreshAccessToken();

  if (body.access_token) {
    spotifyApi.setAccessToken(body.access_token);
    setSpotifyCookie(
      { res },
      "spotify_access_token",
      body.access_token,
      body.expires_in
    );
    req.spotifyApi = spotifyApi;
  } else {
    res.status(401);
    res.redirect(authorizeUrl);
  }

  return handler(req, res);
};
