import dynamic from "next/dynamic";
import { Loader } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import Layout from "../components/Layout";
import Lights from "../components/Lights";
import { ModelState } from "../components/Model";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import nookies from "nookies";
import Spotify from "../components/Spotify";
import { setSpotifyCookie, spotifyApi } from "../utils/Spotify";

const Model = dynamic(() => import("../components/Model"), { ssr: false });
const SkyBox = dynamic(() => import("../components/SkyBox"), { ssr: false });
const Terrain = dynamic(() => import("../components/Terrain"), { ssr: false });

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { spotify_refresh_token } = nookies.get(context);
  let isLoggedIn = false;

  if (spotify_refresh_token) {
    spotifyApi.setRefreshToken(spotify_refresh_token);
    const { body } = await spotifyApi.refreshAccessToken();
    if (body.access_token) {
      setSpotifyCookie(
        context,
        "spotify_access_token",
        body.access_token,
        body.expires_in
      );
      isLoggedIn = true;
    }
  }

  return {
    props: {
      isLoggedIn,
    },
  };
};

const Index = ({
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [modelPosition, setModelPosition] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );
  const [modelState, setModelState] = useState<ModelState>(ModelState.Idle);

  return (
    <Layout title="Grazing At Work">
      <Spotify isLoggedIn={isLoggedIn} />
      <Canvas concurrent colorManagement camera={{ position: [26, 18, 20] }}>
        <Lights />
        <Suspense fallback={null}>
          <SkyBox />
        </Suspense>
        <Suspense fallback={null}>
          <Model
            modelPosition={modelPosition}
            modelState={modelState}
            setModelState={setModelState}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Terrain setModelPosition={setModelPosition} />
        </Suspense>
      </Canvas>
      <Loader />
    </Layout>
  );
};

export default Index;
