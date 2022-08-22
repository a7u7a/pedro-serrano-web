import { useRef } from "react";
import { useScroll } from "@react-three/drei";
import { DoubleSide, Material } from "three";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { linearMap } from "../lib/utils";
import { useControls } from "leva";

interface WithColor extends Material {
  // terrible hack
  color: any;
}

interface MyBackgroundProps {
  debug: boolean;
}

const MyBackground = ({ debug }: MyBackgroundProps) => {
  const { targetColor } = useControls("Background", {
    targetColor: {
      label: "Lightness",
      value: 0.03,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  const scroll = useScroll();
  const mesh = useRef<Mesh>(null);

  useFrame(() => {
    if (!debug) {
      const offset = scroll.offset;
      const t = scroll.range(1 / 8, 3 / 6);
      const lum = linearMap(t, 0, targetColor);
      if (!Array.isArray(mesh.current!.material)) {
        const mat = mesh.current!.material as WithColor;
        mat.color.setHSL(0, 0, 0.02);
        // mat.color.setHSL(0, 0, lum);
      }
    } else {
      if (!Array.isArray(mesh.current!.material)) {
        const mat = mesh.current!.material as WithColor;
        mat.color.setHSL(0, 0, targetColor);
      }
    }
  });
  return (
    <mesh ref={mesh}>
      <meshBasicMaterial opacity={1} side={DoubleSide} />
      <sphereGeometry args={[100]} />
    </mesh>
  );
};

export default MyBackground;
