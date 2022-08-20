import { useState, useRef } from "react";
import { useCursor, useHelper } from "@react-three/drei";
import { Mesh, DirectionalLight, DirectionalLightHelper } from "three";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { state, modes } from "../store/store";
import { MyModelProps } from "../lib/interfaces";

const MyPoint = ({ name, modelProps }: MyModelProps) => {
  const ref = useRef<Mesh>(null);
  const snap = useSnapshot(state);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <mesh
      ref={ref}
      name={name}
      {...modelProps}
      dispose={null}
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
      onContextMenu={(e) =>
        snap.current === name &&
        (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
      }
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
    >
      <sphereGeometry args={[0.1]} />
    </mesh>
  );
};

export default MyPoint;
