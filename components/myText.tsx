import { Suspense, useState, useRef } from "react";
import { useControls } from "leva";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  ContactShadows,
  useGLTF,
  PerspectiveCamera,
  useCursor,
  useHelper,
  Text,
} from "@react-three/drei";
import { proxy, useSnapshot, subscribe } from "valtio";

import {
  Material,
  Vector3,
  Euler,
  Mesh,
  CameraHelper,
  DirectionalLight,
  MathUtils,
  Object3D,
} from "three";

import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";

import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { DDSLoader } from "three-stdlib";
import MyDirectionalLight from "../components/dirLight";

import { state, modes } from "../store/store";

const MyText = () => {
  // print values
  const [{ position }, set] = useControls(() => ({ position: [0, 0, 0] }));
  const snap = useSnapshot(state);
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const name = "mainText";

  // print values
  useFrame((_, delta) => {
    // if selected
    if (name === snap.current && ref.current) {
      const _ = ref.current.position;
      set({ position: [_.x, _.y, _.z] });
    }
    if (!state.position) {
      set({ position: [0, 0, 0] });
    }
  });

  const textSource = `
    Hi, I’m Pedro.
    I’m a spatial designer
    based in Berlin since 2019.
    
    I work across multiple 
    disciplines to plan, 
    communicate and produce
    contemporary environments.`;

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        state.current = name;
        if (ref.current) {
          state.position = ref.current.position;
        }
      }}
      onPointerMissed={(e) => {
        if (e.type === "click") {
          state.current = null;
          state.position = null;
        }
      }}
      // Right click cycles through the transform modes
      onContextMenu={(e) => {
        if (snap.current === name) {
          e.stopPropagation();
          state.mode = (snap.mode + 1) % modes.length;
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => setHovered(false)}
      name={name}
      position={[0, 0, 0]}
      rotation={[0, MathUtils.degToRad(90), 0]}
      scale={3}
      dispose={null}
    >
      <Text color="black" anchorX="center" anchorY="middle">
        {textSource}
      </Text>
    </mesh>
  );
};

export default MyText;
