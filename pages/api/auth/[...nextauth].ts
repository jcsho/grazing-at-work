import { NextApiHandler } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";

// adapted from https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/pages/api/auth/%5B...nextauth%5D.ts
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

const options: InitOptions = {
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default authHandler;
