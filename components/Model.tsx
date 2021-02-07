import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Mesh, SkinnedMesh, Vector3 } from "three";

interface ModelProps {
  modelPosition: Vector3;
}

const Model: React.FC<ModelProps> = ({ modelPosition }) => {
  const { nodes, materials, animations } = useGLTF("/glb/ox.glb");
  const { ref, actions, names } = useAnimations(animations);

  const [index, setIndex] = useState<number>(3);

  /* Change Animations */
  useEffect(() => {
    actions[names[index]].reset().fadeIn(0.1).play();
    return () => actions[names[index]].fadeOut(0.1);
  }, [actions, names, index]);

  useFrame(() => {
    ref.current.lookAt(modelPosition);
    if (ref.current.position.distanceTo(modelPosition) > 1) {
      ref.current.position.lerp(modelPosition, 0.05);
      setIndex(7);
    } else {
      setIndex(3);
    }
  });

  return (
    <>
      <group ref={ref} dispose={null}>
        <primitive object={nodes.root} />
        <skinnedMesh
          castShadow
          receiveShadow
          material={materials["Mat_Ox.001"]}
          skeleton={(nodes.Ox as SkinnedMesh).skeleton}
          geometry={(nodes.Ox as Mesh).geometry}
        />
      </group>
    </>
  );
};

export default Model;
