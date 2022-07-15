import { useRef } from "react";
import {
  PerspectiveCamera,
  OrthographicCamera,
  useScroll,
} from "@react-three/drei";

import { Object3D } from "three";

import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const ScrollCamera = () => {
  const scroll = useScroll();
  const [{ scrollCamPos }, set] = useControls("Scroll Camera", () => ({
    scrollCamPos: {
      label: "position",
      value: [0, 1.21, 0],
    },
  }));

  useFrame((state, delta) => {
    const offset = 1 - scroll.offset;
    state.camera.position.set(
      Math.sin(offset) * -15,
      Math.atan(offset * Math.PI * 2) * 10,
      Math.cos((offset * Math.PI) / 3) * -15
    );
    state.camera.lookAt(0, 0, 0);
    const pos = state.camera.position;
    set({ scrollCamPos: [pos.x, pos.y, pos.z] });
  });

  const cameraRef = useRef<Object3D>();
  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      position={[10, 5, -10]}
      zoom={100}
    />
  );
};
export default ScrollCamera;
// Math.sin(offset) * -15,
// Math.atan(offset * Math.PI * 2) * 10,
// Math.cos((offset * Math.PI) / 3) * -15
