import { useState, useRef } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useSnapshot } from "valtio";
import {
  Material,
  Vector3,
  Euler,
  Mesh,
  Object3D,
  Group,
  MeshBasicMaterial,
} from "three";
import { state, modes } from "../store/store";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

import { MyModelProps } from "../lib/interfaces";

const MyModel = ({ name, fileName, modelProps, spinning }: MyModelProps) => {

  const ref = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const snap = useSnapshot(state);
  const { nodes } = useGLTF(fileName!);
  console.log("nodes", nodes);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((state, delta) => {
    if (spinning) {
      mesh.current!.rotation.y += 0.005;
    }
  });

  return (
    <group ref={ref} {...modelProps} dispose={null} name={name}>
      {nodes.Scene.children.map((child, i) => {
        if (child instanceof Mesh && child.type != "Group") {
          return (
            <mesh
              ref={mesh}
              receiveShadow
              castShadow
              key={i}
              geometry={child.geometry}
            >
              <meshStandardMaterial color={"white"} />
            </mesh>
          );
        }
      })}
    </group>
  );
};

export default MyModel;
