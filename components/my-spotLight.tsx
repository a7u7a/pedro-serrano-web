import { useState, useRef, useLayoutEffect } from "react";

import { SpotLight, useHelper, useScroll } from "@react-three/drei";
import {
  SpotLightHelper,
  Object3D,
  SpotLight as SpotLightImpl,
  Vector2,
  OrthographicCamera,
  MathUtils,
} from "three";

import { useControls } from "leva";

import { MyModelProps } from "../lib/interfaces";
import { useFrame } from "@react-three/fiber";
import { test } from "gray-matter";

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
  const shadowCameraRef = useRef<OrthographicCamera>(null);
  const targetRef = useRef<Object3D>();

  // useHelper(lightRef, DirectionalLightHelper, 1);
  const scroll = useScroll();
  const { bias, angle, lightPos, targetPos, lightY, targetY, toggle } =
    useControls("SpotLight", {
      toggle: {
        label: "Helper",
        value: true,
      },
      bias: {
        label: "Shadow bias",
        value: -0.00007000000000000029,
        min: -0.001,
        max: 0.001,
        step: 0.00001,
        onChange: (v) => {
          lightRef.current!.shadow.bias = v;
        },
        transient: false,
      },
      angle: {
        label: "Angle",
        value: 11.4,
        min: 0,
        max: 60,
        step: 0.001,
      },
      lightPos: { label: "Light Pos", value: { x: 0, y: 0 }, step: 0.1 },
      lightY: {
        value: 19,
        min: -30,
        max: 60,
        step: 0.1,
      },
      targetPos: { label: "Target Pos", value: { x: 0, y: 0 }, step: 0.1 },
      targetY: {
        value: 0,
        min: -30,
        max: 30,
        step: 0.1,
      },
    });

  useHelper(toggle && debug && lightRef, SpotLightHelper, "red");

  useLayoutEffect(() => {
    lightRef.current!.angle = MathUtils.degToRad(angle);
    lightRef.current!.shadow.camera.updateProjectionMatrix();
  }, [angle]);

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
      lightRef.current!.position.set(-lightPos.x, lightY, -lightPos.y);
      targetRef.current!.position.set(-targetPos.x, targetY, -targetPos.y);
      lightRef.current!.updateMatrixWorld();
    }
  });

  return (
    <>
      <SpotLight
        castShadow
        shadow-mapSize={[2048, 2048]}
        ref={lightRef}
        {...modelProps}
        target={target}
        penumbra={0.3}
        distance={25}
        angle={MathUtils.degToRad(angle)}
        shadow-focus={1.6} // key to solve shadow-clipping bug
        anglePower={3}
        intensity={5}
        attenuation={0}
        radiusTop={5}
        radiusBottom={20}
        opacity={0.5}
      />
      <primitive ref={targetRef} object={target} position={[0, 0, -5]} />
    </>
  );
};
export default MySpotlight;
