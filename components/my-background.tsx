import { useRef } from "react";
import { useScroll } from "@react-three/drei";
import { DoubleSide } from "three";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

interface WithColor extends THREE.Material {
  // terrible hack
  color: any;
}

interface MyBackgroundProps {
  debug: boolean;
}

const MyBackground = ({ debug }: MyBackgroundProps) => {
  const scroll = useScroll();
  const mesh = useRef<Mesh>(null);

  useFrame(() => {
    if (!debug) {
      const offset = scroll.offset;
      const t = scroll.range(1 / 8, 3 / 6);
      if (!Array.isArray(mesh.current!.material)) {
        const mat = mesh.current!.material as WithColor;
        mat.color.setHSL(0, 0, t / 1);
      }
    } else {
      if (!Array.isArray(mesh.current!.material)) {
        const mat = mesh.current!.material as WithColor;
        mat.color.setHSL(0, 0, 0);
      }
    }
  });
  return (
    <mesh ref={mesh}>
      <meshBasicMaterial opacity={0.5} side={DoubleSide} />
      <sphereGeometry args={[20]} />
    </mesh>
  );
};

export default MyBackground;
