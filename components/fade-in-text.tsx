import { useEffect, useRef } from "react";
import { useCursor, useHelper, useScroll } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";

interface FadeInTextProps {
  textProp: string;
}

const FadeInText = () => {
  const scroll = useScroll();

  useFrame((state) => {
    const offset = scroll.offset;
  });
  return (
    <div>
      <h1>offset</h1>
    </div>
  );
};
export default FadeInText;
