import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import {
  Material,
  Vector3,
  Euler,
  Mesh,
  MathUtils,
  DefaultLoadingManager,
} from "three";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import { DDSLoader } from "three-stdlib";
import { Leva } from "leva";
import useMeasure from "react-use-measure";
import MyModel from "./my-model";
import MyPlane from "./my-plane";
import MyAmbientLight from "./my-ambientLight";
import EditorCamera from "./cameras/debug-camera";
import ScrollCamera from "./cameras/scroll-camera";
import MySpotlight from "./my-spotLight";
import MyBackground from "./my-background";
import Controls from "../lib/controls";
import { PesePost } from "../lib/interfaces";
import IntroHeader from "./my-header";
import Gallery from "./my-gallery";
import MainText from "./my-main-text";
import MyFooter from "./my-footer";
import Credits from "./credits";

DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

interface MainSceneProps {
  builtProj: PesePost[];
  experimentsProj: PesePost[];
}

export default function MainScene({
  builtProj,
  experimentsProj,
}: MainSceneProps) {
  const router = useRouter();

  let debug: boolean;
  if (router.query["debug"] === "true") {
    debug = true;
  } else if (router.query["debug"] === "false") {
    debug = false;
  } else {
    debug = false;
  }

  // Get bounds for each container
  const [mainContainer, mainBounds] = useMeasure();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const pages = mainBounds.height / vh - 0.8;
    setTotalPages(pages);
    console.log("mainBounds", mainBounds);
    console.log("window.innerHeight", window.innerHeight);
    console.log("pages", pages);
  }, [mainBounds]);

  const scene = (
    <>
      {debug && <EditorCamera />}
      {!debug && <ScrollCamera />}

      <MyBackground debug={debug} />

      <MySpotlight
        spinning={false}
        debug={debug}
        name="spotlight1"
        modelProps={{
          position: new Vector3(0, 15, 0),
        }}
      />

      <MyAmbientLight />

      <MyPlane
        width={25}
        height={25}
        name={"shadowPlane1"}
        spinning={false}
        modelProps={{
          position: new Vector3(0, 0, 0),
          rotation: new Euler(
            MathUtils.degToRad(90),
            MathUtils.degToRad(180),
            0
          ),
        }}
      />

      <group>
        <MyModel
          name="silvestre"
          fileName="/geometry/silvestre.glb"
          spinning={true}
          animateOpacity={true}
          debug={debug}
          modelProps={{
            position: new Vector3(0.85, 1.15, -0.15),
            rotation: new Euler(
              MathUtils.degToRad(0),
              MathUtils.degToRad(0),
              MathUtils.degToRad(0)
            ),
            scale: 0.00018,
          }}
        />

        <MyModel
          name="house"
          fileName="/geometry/house.glb"
          spinning={false}
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
          name="chair_1"
          spinning={false}
          fileName="/geometry/chair.glb"
          modelProps={{
            position: new Vector3(0.2708508, 0.97, -0.311324),
            rotation: new Euler(
              MathUtils.degToRad(90),
              MathUtils.degToRad(0),
              MathUtils.degToRad(10)
            ),
            scale: 0.00012,
          }}
        />
        <MyModel
          name="chair_2"
          spinning={false}
          fileName="/geometry/chair.glb"
          modelProps={{
            position: new Vector3(0.7277002, 0.97, 0.6923155),
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
      <Canvas style={{ background: "#000000" }} shadows>
        <gridHelper args={[8, 8]} />
        <Suspense fallback={null}>
          {!debug ? (
            <ScrollControls pages={totalPages} damping={100}>
              {scene}
              <Scroll html>
                <div className="absolute w-screen" ref={mainContainer}>
                  <IntroHeader />
                  <Gallery posts={builtProj} category={"Built work"} />
                  <MainText />
                  <Gallery posts={experimentsProj} category={"Experiments"} />
                  <MyFooter />
                  <Credits />
                </div>
              </Scroll>
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
