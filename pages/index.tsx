import { useState } from "react";
import { Canvas, Vector3 } from "react-three-fiber";
import Layout from "../components/Layout";
import Lights from "../components/Lights";
import Model from "../components/Model";
import Terrain from "../components/Terrain";

const Index = () => {
  return (
    <Layout title="Hashnode Vercel Hackathon Submission - Justin">
      <Canvas colorManagement camera={{ position: [5, 5, 5] }}>
        <Lights />
        <Model />
        <Terrain />
      </Canvas>
    </Layout>
  );
};

export default Index;
