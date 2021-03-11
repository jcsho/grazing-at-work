import { NextApiResponse } from "next";
import {
  getCurrentTrack,
  NextApiRequestWithSpotifyAuth,
  spotifyApi,
  withSpotifyAuth,
} from "../../utils/Spotify";

const handler = async (
  req: NextApiRequestWithSpotifyAuth,
  res: NextApiResponse
) => {
  const currentTrack = await getCurrentTrack(req.spotifyApi);
  res.status(200).json(currentTrack);
};

export default withSpotifyAuth(handler, spotifyApi);
