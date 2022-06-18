import { Suspense, useState, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  ContactShadows,
  useGLTF,
  PerspectiveCamera,
  useCursor,
  useHelper,
} from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";

import { Material, Vector3, Euler, Mesh, CameraHelper } from "three";

import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

interface Store {
  current: string | null;
  mode: number;
}

const state = proxy<Store>({
  current: null,
  mode: 0,
});

// Reactive state model, using Valtio ...
const modes = ["translate", "rotate", "scale"];

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
      // Click sets the mesh as the new target
      onClick={(e) => (e.stopPropagation(), (state.current = name))}
      // If a click happened but this mesh wasn't hit we null out the target,
      // This works because missed pointers fire before the actual hits
      onPointerMissed={(e) => e.type === "click" && (state.current = null)}
      // Right click cycles through the transform modes
      onContextMenu={(e) =>
        snap.current === name &&
        (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
      }
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
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

export default function TransformScene() {
  return (
    <Canvas camera={{ position: [0, -10, 80], fov: 50 }} dpr={[1, 2]}>
      <gridHelper args={[30, 30]} />
      <pointLight position={[100, 100, 100]} intensity={0.8} />

      <Suspense fallback={null}>
        <directionalLight />
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
