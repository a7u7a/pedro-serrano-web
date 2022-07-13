import { useState, useRef } from "react";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useCursor, Text } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { Mesh, MathUtils } from "three";
import { state, modes } from "../store/store";

const MyText = () => {
  // print values
  const [{ position }, set] = useControls(() => ({ position: [0, 0, 0] }));
  const snap = useSnapshot(state);
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const name = "myText";

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
      position={[-0.42575943651065984, 2.8166087001878317, -1.1355812934777942]}
      rotation={[0, MathUtils.degToRad(90), 0]}
      scale={3}
      dispose={null}
    >
      <Text color="white" anchorX="center" anchorY="middle">
        {textSource}
      </Text>
    </mesh>
  );
};

export default MyText;
