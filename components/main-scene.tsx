import { Suspense, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import { useSnapshot } from "valtio";
import {
  Material,
  Vector3,
  Euler,
  Mesh,
  MathUtils,
  DefaultLoadingManager,
  DoubleSide,
} from "three";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import { DDSLoader } from "three-stdlib";
import MyDirectionalLight from "./my-directionallight";
import { state, modes } from "../store/store";
import MyText from "./my-text";
import MyModel from "./my-model";
import MyPlane from "./my-plane";
import MyAmbientLight from "./my-ambientlight";
import EditorCamera from "./cameras/editor-camera";
import ScrollCamera from "./cameras/scroll-camera";
import MyImage from "./my-image";
import { Leva } from "leva";
import MyPoint from "./my-point";
import MyBackground from "./my-background";

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
  const debug = false;
  const scene = (
    <>
      <group>
        <MyBackground />
        {/* <MyImage
          name="DSC0223.jpg"
          url="/imgs/_DSC0223.jpg"
          modelProps={{
            position: new Vector3(
              4.027861649520682,
              -0.8377942634987993,
              -0.09114219493733566
            ),
            rotation: new Euler(
              MathUtils.degToRad(0),
              MathUtils.degToRad(180),
              MathUtils.degToRad(0)
            ),
            scale: 2,
          }}
        /> */}
      </group>

      {debug && <EditorCamera />}
      {!debug && <ScrollCamera />}
      {/* <MyText
        name="mytext1"
        textSource={`
        Hi, I’m Pedro.
        I’m a spatial designer
        based in Berlin since 2019.
        
        I work across multiple 
        disciplines to plan, 
        communicate and produce
        contemporary environments.`}
        modelProps={{
          position: new Vector3(
            3.9704027720466804,
            1.4695501073759614,
            -0.08079588190820397
          ),
          rotation: new Euler(
            MathUtils.degToRad(0),
            MathUtils.degToRad(180),
            MathUtils.degToRad(0)
          ),
          scale: 2,
        }}
      /> */}
      <MyPlane
        width={10}
        height={10}
        name={"shadowPlane1"}
        modelProps={{
          position: new Vector3(0, 0, 0),
          rotation: new Euler(
            MathUtils.degToRad(90),
            MathUtils.degToRad(180),
            0
          ),
        }}
      />
      <MyAmbientLight />
      <MyDirectionalLight
        targetName="camTarget1"
        name="light1"
        modelProps={{
          position: new Vector3(-3.29, 11.72, -5.625),
        }}
      />
      {/* <MyPoint
        name="camTarget1"
        modelProps={{
          position: new Vector3(0, 1.21, 0),
        }}
      /> */}
      <group>
        <MyModel
          name="house"
          fileName="/geometry/house.glb"
          modelProps={{
            position: new Vector3(0, 1.371, 0),
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
            position: new Vector3(
              0.2708508373488536,
              0.9636909542297383,
              -0.3113245387096917
            ),
            rotation: new Euler(
              MathUtils.degToRad(90),
              MathUtils.degToRad(0),
              MathUtils.degToRad(10)
            ),
            scale: 0.00012,
          }}
        />
        <MyModel
          name="silla2"
          fileName="/geometry/silla.glb"
          modelProps={{
            position: new Vector3(
              0.7277002141278832,
              0.9636909542297383,
              0.6923155809925486
            ),
            rotation: new Euler(
              MathUtils.degToRad(90),
              MathUtils.degToRad(0),
              MathUtils.degToRad(-40)
            ),
            scale: 0.00012,
          }}
        />
      </group>
    </>
  );
  return (
    <>
      <Canvas
        gl={{ antialias: true }}
        style={{ background: "#000000" }}
        shadows
      >
        {/* <gridHelper args={[30, 30]} /> */}
        <Suspense fallback={null}>
          {!debug ? (
            <ScrollControls pages={1} damping={100}>
              {scene}
            </ScrollControls>
          ) : (
            scene
          )}
        </Suspense>
        {debug && <Controls />}
      </Canvas>
      <Leva hidden={debug ? false : true} />
    </>
  );
}
