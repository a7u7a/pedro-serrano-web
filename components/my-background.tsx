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

interface test extends THREE.Material {
  color: any;
}

const MyBackground = () => {
  const scroll = useScroll();
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    // console.log("ref.current!.material", ref.current!.material);
    const offset = scroll.offset;
    console.log("scroll", offset);
    if (!Array.isArray(mesh.current!.material)) {
      const mat = mesh.current!.material as test;
      mat.color.setHSL(1, 1, offset / 1);
    }
  });
  return (
    <mesh ref={mesh}>
      <meshStandardMaterial opacity={0.5} side={DoubleSide} />
      <sphereGeometry args={[20]} />
    </mesh>
  );
};

export default MyBackground;
