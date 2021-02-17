import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const SkyBox = () => {
  const { scene } = useLoader(
    GLTFLoader,
    process.env.NEXT_PUBLIC_GAW_MODEL_SKYBOX
  );

  return <primitive object={scene} dispose={null} />;
};

export default SkyBox;
