import { useState, useRef } from "react";
import { useCursor, useHelper, useScroll } from "@react-three/drei";
import {
  Mesh,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  Material,
} from "three";

import * as THREE from "three";

import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { state, modes } from "../store/store";
import useObjPosControl from "../lib/obj-position-control";
import { MyModelProps } from "../lib/interfaces";
import { off } from "process";

interface WithColor extends THREE.Material {
  // terrible hack
  color: any;
}

interface MyBackgroundProps {
  debug:boolean
}

const MyBackground = ({debug}:MyBackgroundProps) => {
  const scroll = useScroll();
  const mesh = useRef<THREE.Mesh>(null);
  // update background color with scroll
  useFrame((state) => {
    if (!debug) {
      const offset = scroll.offset;
      if (!Array.isArray(mesh.current!.material)) {
        const mat = mesh.current!.material as WithColor;
        mat.color.setHSL(0, 0, offset / 1);
      }
    }
  });
  return (
    <mesh ref={mesh}>
      <meshBasicMaterial opacity={0.5} side={DoubleSide} />
      <sphereGeometry args={[20]} />
    </mesh>
  );
};

export default MyBackground;
