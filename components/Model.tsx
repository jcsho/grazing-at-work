import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, SkinnedMesh } from "three";

const Model = () => {
  const { nodes, materials, animations } = useGLTF("/glb/ox.glb");
  const { ref, actions, names } = useAnimations(animations);

  useEffect(() => {
    console.log(actions);
    actions[names[3]].reset().fadeIn(0.5).play();
    return () => actions[names[3]].fadeOut(0.5);
  }, [actions, names]);

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
