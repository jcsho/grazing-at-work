import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh } from "three";

const Model = () => {
  const { nodes, materials, animations } = useGLTF("/glb/ox.glb");
  const { ref, actions, names } = useAnimations(animations);

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
    return () => actions[names[0]].fadeOut(0.5);
  }, [actions, names]);

  return (
    <>
      <group ref={ref} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          material={materials["Mat_Ox"]}
          geometry={(nodes.Ox as Mesh).geometry}
        />
      </group>
    </>
  );
};

export default Model;
