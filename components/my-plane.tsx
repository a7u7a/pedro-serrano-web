import { useState, useRef } from "react";
import { Mesh, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useCursor, Plane } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state, modes } from "../store/store";
import { MyModelProps } from "../lib/interfaces";

const MyPlane = ({ width, height, name, modelProps }: MyModelProps) => {
  const snap = useSnapshot(state);
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <Plane
      {...modelProps}
      name={name}
      args={[width, height]}
      receiveShadow
      ref={ref}
      dispose={null}
    >
      {/* <meshStandardMaterial color={"white"} /> */}
      <shadowMaterial
        attach="material"
        opacity={1}
        color="black"
      />
    </Plane>
  );
};
export default MyPlane;
