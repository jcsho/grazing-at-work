import { NextApiResponse } from "next";
import { setCookie } from "nookies";
import crypto from "crypto";
import SpotifyWebApi from "spotify-web-api-node";

const scopes = ["user-read-playback-state", "user-read-currently-playing"];

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
