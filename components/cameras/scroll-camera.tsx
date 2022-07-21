import { useRef } from "react";
import {
  PerspectiveCamera,
  OrthographicCamera,
  useScroll,
} from "@react-three/drei";

import { Object3D, MathUtils } from "three";

import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const linearMap = (val: number, toA: number, toB: number) => {
  const fromA = 0;
  const fromB = 1;
  return ((val - fromA) * (toB - toA)) / (fromB - fromA) + toA;
};

const ScrollCamera = () => {
  const scroll = useScroll();
  const [{ scrollCamPos }, set] = useControls("Scroll Camera", () => ({
    scrollCamPos: {
      label: "position",
      value: [0, 1.21, 0],
    },
  }));

  useFrame((state, delta) => {
    // const offset = scroll.offset;
    // console.log("offset", MathUtils.degToRad((offset*90)));

    const theta = MathUtils.degToRad(scroll.offset * 90);
    const x = Math.cos(theta) * -15;
    const y = theta * 5;
    const z = Math.sin(theta) * -15;

    const zoom = linearMap(scroll.offset, 60, 200);
    state.camera.zoom = zoom;
    state.camera.position.set(x, y, z);
    state.camera.lookAt(0, 2, 0);

    const pos = state.camera.position;
    set({ scrollCamPos: [pos.x, pos.y, pos.z] });
  });

  const cameraRef = useRef<Object3D>();
  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      // position={[10, 5, -10]}
      zoom={100}
    />
  );
};
export default ScrollCamera;
// Math.sin(offset) * -15,
// Math.atan(offset * Math.PI * 2) * 10,
// Math.cos((offset * Math.PI) / 3) * -15
