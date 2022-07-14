import { useRef, useState } from "react";
import { Image } from "@react-three/drei";
import { Mesh, MathUtils, Group, Euler } from "three";
import { useFrame } from "@react-three/fiber";
import { useCursor, Text, Plane } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state, modes } from "../store/store";
import useObjPosControl from "../lib/obj-position-control";

const MyImages = () => {
  const ref = useRef<Group>(null);
  const snap = useSnapshot(state);
  const [{ position }, set] = useObjPosControl();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const name = "myImages";

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
    <group
      position={[-0.23541110719423575, 0.48493112313014786, -2.918404005430908]}
      rotation={
        new Euler(
          MathUtils.degToRad(0),
          MathUtils.degToRad(180),
          MathUtils.degToRad(0)
        )
      }
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
    >
      <Image
        position={[0, 0, 0]}
        scale={1}
        url="/imgs/_DSC0223.jpg"
      />
    </group>
  );
};
export default MyImages;
