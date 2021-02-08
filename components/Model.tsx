import { useAnimations, useGLTF } from "@react-three/drei";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Mesh, SkinnedMesh, Vector3 } from "three";
import { getRandomValueFromObject } from "../utils/Helpers";

export enum ModelState {
  Idle,
  Moving,
  Emoting,
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

export const Mood = {
  Happy: Actions.Spin,
  Calm: Actions.Munch,
  Sad: Actions.Clicked,
  Scared: Actions.Death,
};

const IDLE_TIME = 3; // seconds

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
  const { nodes, materials, animations } = useGLTF("/ox.glb");
  const { ref, actions } = useAnimations(animations);

  const [action, setAction] = useState<Actions>(Actions.Idle);
  const [timer, setTimer] = useState<number>(0);

  /* Change Animations */
  useEffect(() => {
    actions[action].reset().fadeIn(0.1).play();
    return () => actions[action].fadeOut(0.1);
  }, [actions, action]);

  /* Change State */
  useEffect(() => {
    switch (modelState) {
      case ModelState.Idle:
        setAction(Actions.Idle);
        break;
      case ModelState.Moving:
        setAction(Actions.Run);
        break;
      case ModelState.Emoting:
        let randomMood = getRandomValueFromObject(Mood);
        setAction(randomMood);
        break;
    }
  }, [modelState]);

  useFrame(({ clock }) => {
    ref.current.lookAt(modelPosition);
    if (ref.current.position.distanceTo(modelPosition) > 1) {
      ref.current.position.lerp(modelPosition, 0.05);
      setModelState(ModelState.Moving);
    } else if (modelState === ModelState.Moving) {
      setModelState(ModelState.Idle);
    }

    setTimer(timer + clock.getDelta() * 100);
    if (modelState === ModelState.Idle && Math.floor(timer) % IDLE_TIME === 0) {
      setModelState(ModelState.Emoting);
      setTimer(0);
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
