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
import MyModel from "./myModel";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

const Model: React.FC<{
  name: string;
  props: { position: Vector3; rotation: Euler; scale: number };
}> = ({ name, props }) => {
  // Ties this component to the state model
  const snap = useSnapshot(state);

  // Fetching the GLTF, nodes is a collection of all the meshes
  // It's cached/memoized, it only gets loaded and parsed once
  const { nodes } = useGLTF("/compressed.glb");

  // Feed hover state into useCursor, which sets document.body.style.cursor to pointer|auto
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return (
    <mesh
      receiveShadow
      castShadow
      // Click sets the mesh as the new target
      onClick={(e) => {
        e.stopPropagation();
        state.current = name;
      }}
      // If a click happened but this mesh wasn't hit we null out the target,
      // This works because missed pointers fire before the actual hits
      onPointerMissed={(e) => {
        if (e.type === "click") {
          state.current = null;
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
      geometry={nodes[name].geometry}
      material={nodes[name].material}
      material-color={snap.current === name ? "#ff6080" : "white"}
      {...props}
      dispose={null}
    />
  );
};

// const ImportedObj = () => {
//   //   const materials = useLoader(MTLLoader, "Poimandres.mtl");
//   const obj = useLoader(OBJLoader, "/geometry/bf_store.obj", (loader) => {
//     // materials.preload();
//     // loader.setMaterials(materials);
//   });

//   console.log(obj);
//   return <primitive object={obj} scale={0.001} />;
// };

function Controls() {
  // Get notified on changes to state
  const snap = useSnapshot(state);
  const scene = useThree((state) => state.scene);
  return (
    <>
      {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
      {snap.current && (
        <TransformControls
          object={scene.getObjectByName(snap.current)}
          mode={modes[snap.mode]}
        />
      )}
      {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
      <OrbitControls makeDefault enableDamping={false} />
    </>
  );
}

export default function MainScene() {
  return (
    <Canvas camera={{ position: [40, 10, 40], fov: 50 }} dpr={[1, 2]}>
      <gridHelper args={[30, 30]} />

      <MyText />
      <Suspense fallback={null}>
        <MyDirectionalLight />
        <MyModel
          name="bf_store"
          props={{
            position: new Vector3(5, 0, 5),
            rotation: new Euler(3, -1, 3),
            scale: 0.001,
          }}
        />
        <group position={[0, 10, 0]}>
          <Model
            name="Zeppelin"
            props={{
              position: new Vector3(0, 0, 0),
              rotation: new Euler(3, -1, 3),
              scale: 0.001,
            }}
          />
        </group>
      </Suspense>
      <Controls />
    </Canvas>
  );
}
