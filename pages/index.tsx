import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Layout from "../components/Layout";
import Lights from "../components/Lights";
import Model from "../components/Model";
import Terrain from "../components/Terrain";

const Index = () => {
  return (
    <Layout title="Hashnode Vercel Hackathon Submission - Justin">
      <Canvas colorManagement camera={{ position: [5, 5, 5] }}>
        <Lights />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <Terrain />
      </Canvas>
    </Layout>
  );
};

export default Index;
