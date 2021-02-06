import { useRef } from "react";

const Terrain = () => {
  const mesh = useRef();

  return (
    <mesh
      visible
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={mesh}
    >
      <planeBufferGeometry attach="geometry" args={[10, 10, 10, 10]} />
      <meshStandardMaterial
        attach="material"
        color="green"
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
};

export default Terrain;
