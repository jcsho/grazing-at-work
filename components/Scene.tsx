import React from "react";
import { Canvas } from "react-three-fiber";

const Scene = () => (
  <Canvas camera={{ position: [0, 0, 10] }}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <mesh>
      <sphereBufferGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  </Canvas>
);

export default Scene;
