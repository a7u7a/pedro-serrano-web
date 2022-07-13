import { Suspense, useRef } from "react";
import {
    OrbitControls,
    TransformControls,
    ScrollControls,
    PerspectiveCamera,
    useScroll
  } from "@react-three/drei";

  import {
    Material,
    Vector3,
    Euler,
    Mesh,
    MathUtils,
    DefaultLoadingManager,
    Object3D,
  } from "three";

  import { Canvas, useThree, useFrame } from "@react-three/fiber";
  import { useControls } from "leva";

interface MyPerspectiveCameraProps {
  textProp: string;
}

const MyPerspectiveCamera = () => {
    const scroll = useScroll()
    const { cameraPos } = useControls("Camera", {
      cameraPos: {
        label: "position",
        value: [0, 0, 0],
        // onChange: (v) => {
        //   if (cameraRef.current) {
        //     cameraRef.current.position.set(v[0],v[1],v[2]);
        //   }
        // },
        // transient: false,
      },
    });

    useFrame((state, delta) => {
        const offset = 1 - scroll.offset
        state.camera.position.set(Math.sin(offset) * -10, Math.atan(offset * Math.PI * 2) * 5, Math.cos((offset * Math.PI) / 3) * -10)
        state.camera.lookAt(0, 0, 0)
      })

    const cameraRef = useRef<Object3D>();
  return <PerspectiveCamera
  ref={cameraRef}
  makeDefault
  position={[10, 5, -10]}
  fov={30}
/>;
};
export default MyPerspectiveCamera;
