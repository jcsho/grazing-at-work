import { Loader } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import Layout from "../components/Layout";
import Lights from "../components/Lights";
import Model, { ModelState } from "../components/Model";
import SkyBox from "../components/SkyBox";
import Terrain from "../components/Terrain";

const Index = () => {
  const [modelPosition, setModelPosition] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );
  const [modelState, setModelState] = useState<ModelState>(ModelState.Idle);

  return (
    <Layout title="Grazing At Work">
      <Canvas colorManagement camera={{ position: [5, 5, 5] }}>
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
