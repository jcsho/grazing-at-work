import React from "react";

const Lights = () => {
  return (
    <>
      <spotLight position={[60, 30, 60]} intensity={1} distance={250} />
      <spotLight position={[60, 30, -60]} intensity={0.5} distance={250} />
      <directionalLight position={[-200, 90, 75]} intensity={0.2} />
      <directionalLight position={[0, -50, 0]} intensity={0.5} />
    </>
  );
};

export default Lights;
