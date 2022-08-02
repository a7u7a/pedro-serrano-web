import { useRef, useState, useEffect } from "react";
import { OrthographicCamera, useScroll } from "@react-three/drei";
import { Object3D, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import useMediaQuery from "../../lib/media";
import { off } from "process";

interface ScrollCameraProps {
  introBottom: number;
  blogBottom: number;
  totalTop: number;
  totalBottom: number;
  footerHeight: number;
}

const linearMap = (val: number, toA: number, toB: number) => {
  const fromA = 0;
  const fromB = 1;
  return ((val - fromA) * (toB - toA)) / (fromB - fromA) + toA;
};

const ScrollCamera = ({
  introBottom,
  blogBottom,
  totalTop,
  totalBottom,
  footerHeight,
}: ScrollCameraProps) => {
  // set zoom level based on media query so that 3d model is not cropped on mobile
  const isSm = useMediaQuery("(max-width: 768px)");
  const [zoomLevel, setZoomLevel] = useState([90, 120]);
  useEffect(() => {
    if (isSm) {
      setZoomLevel([40, 70]);
    } else {
      setZoomLevel([90, 120]);
    }
  }, [isSm]);

  const scroll = useScroll();
  const [{ scrollCamPos }, set] = useControls("Scroll Camera", () => ({
    scrollCamPos: {
      label: "position",
      value: [0, 1.21, 0],
    },
  }));

  // move and zoom camera on scroll
  useFrame((state, delta) => {
    // offsets
    const yOff = 1.5;
    const xOff = 0;

    const offset = scroll.offset;
    // begins increasing at 0 offset and reaches 1 when top of viewport clears intro section
    const t = scroll.range(0, introBottom / totalTop);
    // begins increasing when bottom of viewport reaches footer section and reaches 1 at end of scroll
    const p = scroll.range(
      1 - footerHeight / blogBottom,
      footerHeight / totalBottom
    );
    console.log("offset", offset, "t", t, "p", p);

    const theta = MathUtils.degToRad(t * 130);
    const x = Math.cos(theta) * 15;
    const y = theta * 4 + yOff;
    const z = Math.sin(theta) * -15 + xOff;

    const zoom = linearMap(t, zoomLevel[0], zoomLevel[1]);
    state.camera.zoom = zoom;
    state.camera.position.set(x, y, z);
    state.camera.lookAt(0, t + yOff, xOff);

    const pos = state.camera.position;
    set({ scrollCamPos: [pos.x, pos.y, pos.z] });
  });

  const cameraRef = useRef<Object3D>();
  return <OrthographicCamera ref={cameraRef} makeDefault zoom={100} />;
};
export default ScrollCamera;
