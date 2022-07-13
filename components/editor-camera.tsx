import { useRef } from "react";
import { PerspectiveCamera, useScroll } from "@react-three/drei";

import { Object3D } from "three";

import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const ScrollCamera = () => {
  const [{ editorCamPos }, set] = useControls("Editor Camera", () => ({
    editorCamPos: {
      label: "position",
      value: [0, 0, 0],
    },
  }));
  useFrame((state, delta) => {
    const pos = state.camera.position;
    set({ editorCamPos: [pos.x, pos.y, pos.z] });
  });

  const cameraRef = useRef<Object3D>();
  return <PerspectiveCamera makeDefault position={[10, 5, -10]} fov={30} />;
};
export default ScrollCamera;
