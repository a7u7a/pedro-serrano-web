import { useState, useRef, forwardRef, useEffect } from "react";
import { SpotLight,useHelper } from "@react-three/drei";

import { PerspectiveCamera,CameraHelper, SpotLightHelper } from "three";

import { MyModelProps } from "../lib/interfaces";

const MySpotlight = ({ name, modelProps }: MyModelProps) => {
  const light = useRef(null);
//   useHelper(light, SpotLightHelper, "red");
  return (
    <SpotLight
      castShadow
      ref={light}
      {...modelProps}
      penumbra={0.2}
      radiusTop={0.4}
      radiusBottom={40}
      distance={20}
      angle={0.45}
      attenuation={20}
      anglePower={5}
      intensity={1}
      opacity={1}
    >
      
    </SpotLight>
  );
};
export default MySpotlight;
