import { useState, useRef } from "react";

import { SpotLight, useHelper, useScroll } from "@react-three/drei";
import {
  SpotLightHelper,
  Object3D,
  SpotLight as SpotLightImpl,
  Vector2,
} from "three";

import { useControls } from "leva";

import { MyModelProps } from "../lib/interfaces";
import { useFrame } from "@react-three/fiber";

interface MySpotlightProps extends MyModelProps {
  debug: boolean;
  introPages: number;
}

const MySpotlight = ({
  introPages,
  name,
  modelProps,
  debug,
}: MySpotlightProps) => {
  const [target] = useState(() => new Object3D());
  const lightRef = useRef<SpotLightImpl>(null);
  const targetRef = useRef<Object3D>();
  //   useHelper(lightRef, SpotLightHelper, "red");
  const scroll = useScroll();
  const dim = 5;
  const { bias } = useControls("Spot Light", {
    bias: {
      label: "shadow bias",
      value: -0.00007000000000000029,
      min: -0.001,
      max: 0.001,
      step: 0.00001,
      onChange: (v) => {
        lightRef.current!.shadow.bias = v;
      },
      transient: false,
    },
  });

  useFrame(() => {
    lightRef.current!.shadow.mapSize = new Vector2(1024 * 4, 1024 * 4);
    if (!debug) {
      const t = scroll.range(0, 1 / introPages);
      // move light source
      lightRef.current!.position.set(t * -8, 18, t * -10);
      lightRef.current!.updateMatrixWorld();
      // move light target
      targetRef.current!.position.set(0, 0, t * 10 - 5.6);
    } else {
      lightRef.current!.position.set(-8, 18, -10);
      lightRef.current!.updateMatrixWorld();
      targetRef.current!.position.set(0, 0, 10 - 5.6);
    }
  });
  return (
    <>
      <SpotLight
        castShadow
        ref={lightRef}
        {...modelProps}
        target={target}
        penumbra={0.1}
        radiusTop={0.4}
        radiusBottom={40}
        distance={25}
        angle={0.2}
        attenuation={5}
        anglePower={5}
        intensity={5}
        opacity={1}
      />
      <primitive ref={targetRef} object={target} position={[0, 0, -5]} />
    </>
  );
};
export default MySpotlight;
