import dynamic from "next/dynamic";
import { Loader } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import Layout from "../components/Layout";
import Lights from "../components/Lights";
import { ModelState } from "../components/Model";
import Footer from "../components/Footer";

const Model = dynamic(() => import("../components/Model"), { ssr: false });
const SkyBox = dynamic(() => import("../components/SkyBox"), { ssr: false });
const Terrain = dynamic(() => import("../components/Terrain"), { ssr: false });

const Index = () => {
  const [modelPosition, setModelPosition] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );
  const [modelState, setModelState] = useState<ModelState>(ModelState.Idle);

  return (
    <Layout title="Grazing At Work">
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
      <Footer />
    </Layout>
  );
};

export default Index;
