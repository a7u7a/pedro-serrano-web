import { useState, useRef } from "react";
import { Mesh, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useCursor, Plane } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state, modes } from "../store/store";
import useObjPosControl from "../lib/obj-position-control";
import { MyModelProps } from "../lib/interfaces";

const MyPlane = ({ width, height, name, modelProps }: MyModelProps) => {
  const [{ pos }, set] = useObjPosControl();
  const snap = useSnapshot(state);
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // print values
  useFrame((_, delta) => {
    // if selected
    if (name === snap.current && ref.current) {
      const _ = ref.current.position;
      set({ pos: [_.x, _.y, _.z] });
    }
    if (!state.position) {
      set({ pos: [0, 0, 0] });
    }
  });

  return (
    <Plane
      {...modelProps}
      name={name}
      args={[width, height]}
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
      dispose={null}
    >
      <shadowMaterial
        attach="material"
        opacity={0.5}
        color="black"
        // side={DoubleSide}
      />
      {/* <planeGeometry args={[h, w]} /> */}
    </Plane>
  );
};
export default MyPlane;
