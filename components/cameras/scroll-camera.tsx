import { useRef, useState, useEffect } from "react";
import {
  OrthographicCamera,
  useScroll,
  ScrollControlsState,
} from "@react-three/drei";
import { Object3D, MathUtils, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import useMediaQuery from "../../lib/media";
import { linearMap } from "../../lib/utils";

const zoomCurve = (scroll: ScrollControlsState) => {
  const t = scroll.range(8 / 10, 2 / 10);
  // avoids zooming in too quickly
  const easeOut = Math.pow(Math.min(Math.cos((Math.PI * (t - 1)) / 2), 1), 2);
  return easeOut;
};

const ScrollCamera = () => {
  // set zoom level based on media query so that 3d model is not cropped on mobile
  const isSm = useMediaQuery("(max-width: 640px)");
  const [zoomLevel, setZoomLevel] = useState([90, 120]);
  useEffect(() => {
    if (isSm) {
      setZoomLevel([50, 300]);
    } else {
      setZoomLevel([100, 500]);
    }
  }, [isSm]);

  const scroll = useScroll();

  // move and zoom camera on scroll
  useFrame((state, delta) => {
    // offsets
    const yOff = 2.5;
    const maxY = 0.5;
    const targetMaxX = 1.0;
    const rotationOffset = 90;
    const offset = scroll.offset;

    // rotate
    const d = scroll.curve(0, 1.09);
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
    const targetY = zoomFactor * -0.9 + yOff;
    const targetZ = zoomFactor * -0.35;
    state.camera.lookAt(targetX, targetY, targetZ);
    state.camera.updateProjectionMatrix();
  });

  const cameraRef = useRef<Object3D>();
  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      position={[-1.83697, 2.5, 30]}
      zoom={zoomLevel[0]}
    />
  );
};
export default ScrollCamera;
