import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Controls = () => {
  // Get notified on changes to state
  const scene = useThree((state) => state.scene);
  return (
    <>
      <OrbitControls makeDefault enableDamping={false} />
    </>
  );
};

export default Controls;
