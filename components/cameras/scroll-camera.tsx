import { useRef, useState, useEffect } from "react";
import { OrthographicCamera, useScroll } from "@react-three/drei";
import { Object3D, MathUtils, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import useMediaQuery from "../../lib/media";
import { linearMap } from "../../lib/utils";

interface ScrollCameraProps {
  introBottom: number;
  blogBottom: number;
  totalTop: number;
  totalBottom: number;
  footerHeight: number;
}

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
  // const [{ scrollCamPos }, set] = useControls("Scroll Camera", () => ({
  //   scrollCamPos: {
  //     label: "position",
  //     value: [0, 1.21, 0],
  //   },
  // }));

  // move and zoom camera on scroll
  useFrame((state, delta) => {
    // offsets
    const yOff = 1.5;
    const xOff = 0;

    const offset = scroll.offset;
    // begins increasing at 0 offset and reaches 1 when top of viewport clears intro section
    // const t = scroll.range(0, introBottom / totalTop);
    // // begins increasing when bottom of viewport reaches footer section and reaches 1 at end of scroll
    // const p = scroll.range(
    //   1 - footerHeight / blogBottom,
    //   footerHeight / totalBottom
    // );
    // console.log("offset", offset, "t", t, "p", p);

    // const theta = MathUtils.degToRad(offset * 130);
    // const x = Math.cos(theta) * 15;
    // const y = theta * 4 + yOff;
    // const z = Math.sin(theta) * -15 + xOff;

    const deg = offset * 280;
    const theta = MathUtils.degToRad(deg+90);
    const x = Math.cos(theta);
    const y = 0;
    const z = Math.sin(theta);

    const v1 = new Vector3(-x, y, z);
    const v2 = v1.multiplyScalar(30);

    // console.log("deg", deg);
    // console.log("theta", theta, x, y, z);

    // const zoom = linearMap(offset, zoomLevel[0], zoomLevel[1]);
    // state.camera.zoom = zoom;
    state.camera.position.set(v2.x, v2.y, v2.z);
    state.camera.lookAt(0, 0, 0);

    // update leva
    const pos = state.camera.position;
    console.log("pos", pos);
    // set({ scrollCamPos: [pos.x, pos.y, pos.z] });
  });

  const cameraRef = useRef<Object3D>();
  return <OrthographicCamera ref={cameraRef} makeDefault zoom={100} />;
};
export default ScrollCamera;
