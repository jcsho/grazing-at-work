import { NextApiResponse } from "next";
import { setCookie } from "nookies";
import SpotifyWebApi from "spotify-web-api-node";

const scopes = ["user-read-playback-state", "user-read-currently-playing"];

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export const authorizeUrl = spotifyApi.createAuthorizeURL(
  scopes,
  process.env.SPOTIFY_STATE
);

export const setSpotifyCookie = (
  res: NextApiResponse,
  key: string,
  value: string | any,
  expiry: number
) => {
  setCookie({ res }, key, value, {
    domain: process.env.NODE_ENV === "production" ?? process.env.APP_URL,
    expires: new Date(Date.now() + expiry),
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
};
