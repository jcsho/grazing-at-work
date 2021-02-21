import { NextApiRequest, NextApiResponse } from "next";
import { authorizeUrl } from "../../utils/Spotify";

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  res.redirect(302, authorizeUrl);
};

export default handler;
