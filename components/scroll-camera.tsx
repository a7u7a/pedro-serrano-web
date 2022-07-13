import { useRef } from "react";
import { PerspectiveCamera, useScroll } from "@react-three/drei";

import { Object3D } from "three";

import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const ScrollCamera = () => {
  const scroll = useScroll();
  const [{ scrollCamPos }, set] = useControls("Scroll Camera", () => ({
    scrollCamPos: {
      label: "position",
      value: [0, 0, 0],
    },
  }));

  useFrame((state, delta) => {
    const offset = 1 - scroll.offset;
    state.camera.position.set(
      Math.sin(offset) * -10,
      Math.atan(offset * Math.PI * 2) * 5,
      Math.cos((offset * Math.PI) / 3) * -10
    );
    state.camera.lookAt(0, 0, 0);
    const pos = state.camera.position;
    set({ scrollCamPos: [pos.x, pos.y, pos.z] });
  });

  const cameraRef = useRef<Object3D>();
  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[10, 5, -10]}
      fov={30}
    />
  );
};
export default ScrollCamera;
