import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import Layout from "../components/Layout";
import Lights from "../components/Lights";
import Model, { ModelState } from "../components/Model";
import Terrain from "../components/Terrain";

const Index = () => {
  const [modelPosition, setModelPosition] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );
  const [modelState, setModelState] = useState<ModelState>(ModelState.Idle);

  return (
    <Layout title="Hashnode Vercel Hackathon Submission - Justin">
      <Canvas colorManagement camera={{ position: [5, 5, 5] }}>
        <Lights />
        <Suspense fallback={null}>
          <Model
            modelPosition={modelPosition}
            modelState={modelState}
            setModelState={setModelState}
          />
        </Suspense>
        <Terrain setModelPosition={setModelPosition} />
      </Canvas>
    </Layout>
  );
};

export default Index;
