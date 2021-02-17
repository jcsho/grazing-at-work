import { useGLTF } from "@react-three/drei";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Intersection, Mesh, MeshStandardMaterial, Vector3 } from "three";

interface TerrainProps {
  setModelPosition: Dispatch<SetStateAction<Vector3>>;
}

const Terrain: React.FC<TerrainProps> = ({ setModelPosition }) => {
  const { nodes, materials } = useGLTF(
    process.env.NEXT_PUBLIC_GAW_MODEL_TERRAIN
  );

  const handleOnClick = (intersection: Intersection[]) => {
    if (intersection.length > 0) {
      setModelPosition(intersection[0].point);
    }
  };

  return (
    <>
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          onClick={(e) => handleOnClick(e.intersections)}
          position={[0, 4, 0]}
          geometry={(nodes["terrain-valley"] as Mesh).geometry}
          material={materials["36 GREEN"]}
        ></mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0, -0.7, 0]}
          scale={[2.97, 1.37, 1]}
          geometry={(nodes["hexagon-water_1"] as Mesh).geometry}
          material={materials["48 TRANSPARENT BLUE"]}
        />
      </group>
    </>
  );
};

export default Terrain;
