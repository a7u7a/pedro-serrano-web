import { useRef, useState, useEffect } from "react";
import {
  OrthographicCamera,
  useScroll,
  ScrollControlsState,
} from "@react-three/drei";
import { Object3D, MathUtils, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import useMediaQuery from "../../lib/media";
import { linearMap } from "../../lib/utils";
import { off } from "process";
import { Swiper } from "swiper/react";

interface ScrollCameraProps {
  introBottom: number;
  blogBottom: number;
  totalTop: number;
  totalBottom: number;
  footerHeight: number;
}

const zoomCurve = (scroll: ScrollControlsState) => {
  const t = scroll.range(3 / 7, 4 / 7);
  const easeOut = Math.pow(Math.min(Math.cos((Math.PI * (t - 1)) / 2), 1), 2);
  return easeOut;
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
      setZoomLevel([40, 120]);
    } else {
      setZoomLevel([80, 450]);
    }
  }, [isSm]);

  const scroll = useScroll();
  // const [{ scrollCamPos }, set] = useControls("Scroll Camera", () => ({
  //   scrollCamPos: {
  //     label: "position",
  //     value: [0, 1.21, 0],
  //   },
  // }));

  // move and zoom camera on scroll
  useFrame((state, delta) => {
    // offsets
    const yOff = 2.5;
    const maxY = 0.5;
    const targetMaxX = 1.0;
    const rotationOffset = 90;
    const offset = scroll.offset;

    // rotate
    const d = scroll.curve(0, 1.08);
    const deg = offset * 280;
    const theta = MathUtils.degToRad(deg + rotationOffset);
    const x = Math.cos(theta);
    const y = d * maxY;
    const z = Math.sin(theta);
    const v1 = new Vector3(-x, y, z);
    const v2 = v1.multiplyScalar(30).add(new Vector3(0, yOff, 0));
    state.camera.position.set(v2.x, v2.y, v2.z);

    // zoom
    const zoomFactor = zoomCurve(scroll);
    const zoom = linearMap(zoomFactor, zoomLevel[0], zoomLevel[1]);
    state.camera.zoom = zoom;

    // target
    const targetX = zoomFactor * targetMaxX;
    const targetY = (zoomFactor * -0.8)+yOff
    const targetZ = zoomFactor*-0.35
    state.camera.lookAt(targetX, targetY, targetZ);
    state.camera.updateProjectionMatrix();
  });

  const cameraRef = useRef<Object3D>();
  return <OrthographicCamera ref={cameraRef} makeDefault zoom={100} />;
};
export default ScrollCamera;
