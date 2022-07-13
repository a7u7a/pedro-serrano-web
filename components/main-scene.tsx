import { Suspense, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  ScrollControls,
  PerspectiveCamera,
  useScroll,
} from "@react-three/drei";
import { useSnapshot } from "valtio";
import {
  Material,
  Vector3,
  Euler,
  Mesh,
  MathUtils,
  DefaultLoadingManager,
  Object3D,
} from "three";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import { DDSLoader } from "three-stdlib";
import MyDirectionalLight from "./my-directionallight";
import { state, modes } from "../store/store";
import MyText from "./my-text";
import MyModel from "./my-model";
import MyPlane from "./my-plane";
import MyAmbientLight from "./my-ambientlight";
import { useControls } from "leva";
import MyPerspectiveCamera from "./my-perspectivecamera";

DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

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
  // control for selected obj
  //const [{ position }, set] = useControls(() => ({ position: [0, 0, 0] }));
  return (
    <>
      <Canvas
        style={{ background: "#AFAFAF" }}
        shadows
        camera={{
          position: [10, 5, -10],
          fov: 30,
        }}
      >
        {/* <gridHelper args={[30, 30]} /> */}
        <Suspense fallback={null}>
          <ScrollControls pages={1}>
            <MyPerspectiveCamera />
            <MyText />
            <MyPlane w={10} h={10} />
            <MyAmbientLight />
            <MyDirectionalLight />
            <MyModel
              name="house"
              fileName="/geometry/house.glb"
              modelProps={{
                position: new Vector3(0, 1.3719456112400583, 0),
                rotation: new Euler(
                  MathUtils.degToRad(90),
                  MathUtils.degToRad(0),
                  MathUtils.degToRad(0)
                ),
                scale: 0.001,
              }}
            />
            <MyModel
              name="silla"
              fileName="/geometry/silla.glb"
              modelProps={{
                position: new Vector3(0, -5.516419869616031, 0),
                rotation: new Euler(
                  MathUtils.degToRad(90),
                  MathUtils.degToRad(0),
                  MathUtils.degToRad(0)
                ),
                scale: 0.0005,
              }}
            />
          </ScrollControls>
        </Suspense>
        {/* <Controls /> */}
      </Canvas>
    </>
  );
}
