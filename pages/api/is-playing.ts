import { NextApiResponse } from "next";
import {
  isPlaying,
  NextApiRequestWithSpotifyAuth,
  spotifyApi,
  withSpotifyAuth,
} from "../../utils/Spotify";

const handler = async (
  req: NextApiRequestWithSpotifyAuth,
  res: NextApiResponse
) => {
  const status = await isPlaying(req.spotifyApi);
  res.status(200).json({ isPlaying: status });
};

export default withSpotifyAuth(handler, spotifyApi);
