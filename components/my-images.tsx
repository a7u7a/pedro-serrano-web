import { useRef, useState } from "react";
import { Image } from "@react-three/drei";
import { Mesh, MathUtils, Group, Euler, Vector3, Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import { useCursor, Text, Plane } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state, modes } from "../store/store";
import useObjPosControl from "../lib/obj-position-control";
import { MyModelProps } from "../lib/interfaces";

const MyImage = ({ name, url, modelProps }: MyModelProps) => {
  const ref = useRef<any>(null);
  const snap = useSnapshot(state);

  const [{ pos }, set] = useObjPosControl();
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
    <Image
      {...modelProps}
      ref={ref}
      name={name}
      url={url!}
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
    />
  );
};
export default MyImage;
