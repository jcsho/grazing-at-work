import { NextApiRequest, NextApiResponse } from "next";
import { setSpotifyCookie, spotifyApi } from "../../utils/Spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, error } = req.query;

  if (error) {
    console.error("Spotify authorization failed: " + error);
    res.redirect(407, process.env.APP_URL);
    return Promise.reject("Unable to authenticate with Spotify");
  }

  try {
    const tokens = await spotifyApi.authorizationCodeGrant(code as string);
    setSpotifyCookie(
      res,
      "spotify_access_token",
      tokens.body.access_token,
      tokens.body.expires_in * 1000
    );
    setSpotifyCookie(
      res,
      "spotify_refresh_token",
      tokens.body.refresh_token,
      tokens.body.expires_in * 1000
    );
  } catch (error) {
    console.error("Unable to retrieve access and refresh tokens: " + error);
    res.redirect(407, process.env.APP_URL);
    return Promise.reject("Unable to authenticate with Spotify");
  }
  res.redirect(302, process.env.APP_URL);
};

export default handler;
