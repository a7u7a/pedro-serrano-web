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
import { proxy, useSnapshot, subscribe } from "valtio";

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
import MyDirectionalLight from "./dirLight";

import { state, modes } from "../store/store";
import MyText from "./myText";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

/**
 * Trying to load all nodes as meshes into a group
 */

const MyModel: React.FC<{
  name: string;
  props: { position: Vector3; rotation: Euler; scale: number };
}> = ({ name, props }) => {
  // Ties this component to the state model
  const snap = useSnapshot(state);

  // Fetching the GLTF, nodes is a collection of all the meshes
  // It's cached/memoized, it only gets loaded and parsed once
  const { nodes } = useGLTF("/geometry/bf_store.glb");
  console.log("nodes", nodes.Scene);
  // Feed hover state into useCursor, which sets document.body.style.cursor to pointer|auto
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return (
    <group
      {...props}
      dispose={null}
      name={name}
      onClick={(e) => {
        e.stopPropagation();
        state.current = name;
      }}
      onPointerMissed={(e) => {
        if (e.type === "click") {
          state.current = null;
        }
      }}
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
    >
      {nodes.Scene.children.map((child, i) => (
        <mesh
          receiveShadow
          castShadow
          key={i}
          geometry={child.geometry}
          material={child.material}
          material-color={snap.current === name ? "#ff6080" : "white"}
        />
      ))}
    </group>
  );
};

export default MyModel;
