import { Suspense, useState, useRef } from "react";
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
import { proxy, useSnapshot } from "valtio";

import {
  Material,
  Vector3,
  Euler,
  Mesh,
  CameraHelper,
  DirectionalLight,
  MathUtils,
} from "three";

import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";

import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { DDSLoader } from "three-stdlib";
import { state, modes } from "../store/store";

const MyDirectionalLight = () => {
    const dLightRef = useRef(null);
    const shadowCameraRef = useRef(null);
    const name = "directionalLight";
    const snap = useSnapshot(state);
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);
    useHelper(dLightRef, THREE.DirectionalLightHelper);
    useHelper(shadowCameraRef, THREE.CameraHelper);
  
    return (
      <mesh
        onClick={(e) => (e.stopPropagation(), (state.current = name))}
        onPointerMissed={(e) => e.type === "click" && (state.current = null)}
        // Right click cycles through the transform modes
        onContextMenu={(e) =>
          snap.current === name &&
          (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
        }
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => setHovered(false)}
        name={name}
        position={[1, 1, 1]}
        dispose={null}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color={0xb4af9f} />
        <directionalLight
          castShadow
          ref={dLightRef}
          position={[0, 0, 0]}
          args={["#fff", 1]}
        >
          {/* <perspectiveCamera ref={shadowCameraRef} attach="shadow-camera" /> */}
        </directionalLight>
      </mesh>
    );
  };

  export default MyDirectionalLight