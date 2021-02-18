import React, { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@400..900&display=swap"
      />
    </Head>
    {children}
  </>
);

export default Layout;
