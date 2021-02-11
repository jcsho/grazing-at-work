import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const SkyBox = () => {
  const { scene } = useLoader(GLTFLoader, "SkyDome.glb");

  return <primitive object={scene} dispose={null} />;
};

export default SkyBox;
