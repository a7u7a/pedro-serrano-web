import { useState, useRef } from "react";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useCursor, Text } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { Mesh, MathUtils } from "three";
import { state, modes } from "../store/store";
import useObjPosControl from "../lib/obj-position-control";
import { MyModelProps } from "../lib/interfaces";

const MyText = ({ name ,modelProps}: MyModelProps) => {
  // print values
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

  const textSource = `
    Hi, I’m Pedro.
    I’m a spatial designer
    based in Berlin since 2019.
    
    I work across multiple 
    disciplines to plan, 
    communicate and produce
    contemporary environments.`;

  return (
    <mesh
      name={name}
      {...modelProps}
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
      <Text color="white" anchorX="center" anchorY="middle">
        {textSource}
      </Text>
    </mesh>
  );
};

export default MyText;
