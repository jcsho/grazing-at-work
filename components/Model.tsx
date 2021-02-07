import { useAnimations, useGLTF } from "@react-three/drei";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Mesh, SkinnedMesh, Vector3 } from "three";

export enum ModelState {
  Idle,
  Moving,
}

// Animations from GLB file
// To see the full list, log
// the `actions` value from useAnimations()
enum Actions {
  Bounce = "Bounce",
  Clicked = "Clicked",
  Death = "Death",
  Idle = "Idle",
  Jump = "Jump",
  Munch = "Munch",
  Roll = "Roll",
  Run = "Run",
  Spin = "Spin",
  Walk = "Walk",
}

interface ModelProps {
  modelPosition: Vector3;
  modelState: ModelState;
  setModelState: Dispatch<SetStateAction<ModelState>>;
}

const Model: React.FC<ModelProps> = ({
  modelPosition,
  modelState,
  setModelState,
}) => {
  const { nodes, materials, animations } = useGLTF("/glb/ox.glb");
  const { ref, actions } = useAnimations(animations);

  const [action, setAction] = useState<Actions>(Actions.Idle);

  /* Change Animations */
  useEffect(() => {
    actions[action].reset().fadeIn(0.1).play();
    return () => actions[action].fadeOut(0.1);
  }, [actions, action]);

  /* Change State */
  useEffect(() => {
    console.log(ModelState[modelState]);
    switch (modelState) {
      case ModelState.Idle:
        setAction(Actions.Idle);
        break;
      case ModelState.Moving:
        setAction(Actions.Run);
        break;
    }
  }, [modelState]);

  useFrame(() => {
    ref.current.lookAt(modelPosition);
    if (ref.current.position.distanceTo(modelPosition) > 1) {
      ref.current.position.lerp(modelPosition, 0.05);
      setModelState(ModelState.Moving);
    } else if (modelState === ModelState.Moving) {
      setModelState(ModelState.Idle);
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
