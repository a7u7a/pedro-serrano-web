import { useState, useRef } from "react";
import { useGLTF, useCursor, useScroll } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { Mesh, Group, Scene, Material } from "three";
import { state } from "../store/store";
import { useFrame } from "@react-three/fiber";
import { MyModelProps } from "../lib/interfaces";

const MyModel = ({
  name,
  fileName,
  modelProps,
  spinning,
  animateOpacity,
}: MyModelProps) => {
  const ref = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const snap = useSnapshot(state);
  const { nodes } = useGLTF(fileName!);
  const [hovered, setHovered] = useState(false);
  const scroll = useScroll();
  const [castShadows, setCastShadows] = useState(false);
  useCursor(hovered);

  useFrame((state, delta) => {
    if (spinning) {
      mesh.current!.rotation.y -= 0.005;
    }
    if (animateOpacity) {
      const t = scroll.range(4 / 5, 1 / 5);
      const meshRef = mesh.current!.material as Material;
      meshRef.opacity = t;
      if (t > 0.23) {
        setCastShadows(true);
      } else {
        setCastShadows(false);
      }
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
              castShadow={animateOpacity ? castShadows : true}
              key={i}
              geometry={child.geometry}
            >
              <meshStandardMaterial
                color={"white"}
                transparent={animateOpacity ? true : false}
                opacity={animateOpacity ? 0 : 1}
              />
            </mesh>
          );
        }
      })}
    </group>
  );
};

export default MyModel;
