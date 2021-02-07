import { Dispatch, SetStateAction, useRef } from "react";
import { Intersection, Vector3 } from "three";

interface TerrainProps {
  setModelPosition: Dispatch<SetStateAction<Vector3>>;
}

const Terrain: React.FC<TerrainProps> = ({ setModelPosition }) => {
  const mesh = useRef();

  const handleOnClick = (intersection: Intersection[]) => {
    if (intersection.length > 0) {
      // rotated mesh has an off axis y-value
      // but x and z values are correct somehow
      // so setting to 0 (ground plane value) is better
      setModelPosition(intersection[0].point.setY(0));
    }
  };

  return (
    <mesh
      visible
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={mesh}
      onClick={(e) => handleOnClick(e.intersections)}
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
