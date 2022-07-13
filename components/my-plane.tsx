import { useControls } from "leva";
import {
  Material,
  Vector3,
  Euler,
  Mesh,
  CameraHelper,
  DirectionalLight,
  MathUtils,
  DoubleSide,
} from "three";
import { useState, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { useCursor, Text, Plane } from "@react-three/drei";
import { useSnapshot } from "valtio";

import { state, modes } from "../store/store";

interface MyPlaneProps {
  textProp: string;
}

const MyPlane = ({ w, h }: { w: number; h: number }) => {
  const [{ position }, set] = useControls(() => ({ position: [0, 0, 0] }));
  const snap = useSnapshot(state);
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const name = "myPlane";

  // print values
  useFrame((_, delta) => {
    // if selected
    if (name === snap.current && ref.current) {
      const _ = ref.current.position;
      set({ position: [_.x, _.y, _.z] });
    }
    if (!state.position) {
      set({ position: [0, 0, 0] });
    }
  });

  return (
    <Plane
      args={[w, h]}
      receiveShadow
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        state.current = name;
        if (ref.current) {
          state.position = ref.current.position;
        }
      }}
      onPointerMissed={(e) => {
        if (e.type === "click") {
          state.current = null;
          state.position = null;
        }
      }}
      // Right click cycles through the transform modes
      onContextMenu={(e) => {
        if (snap.current === name) {
          e.stopPropagation();
          state.mode = (snap.mode + 1) % modes.length;
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => setHovered(false)}
      name={name}
      position={[0, 0, 0]}
      rotation={[MathUtils.degToRad(90), 0, 0]}
      dispose={null}
    >
      <shadowMaterial
        attach="material"
        opacity={1}
        color="black"
        side={DoubleSide}
      />
      <planeGeometry args={[h, w]} />
    </Plane>
  );
};
export default MyPlane;
