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
  return <PerspectiveCamera makeDefault position={[36.18777195174221,10.781571136958314,-30.76004038628325]} fov={10} />;
};
export default ScrollCamera;
