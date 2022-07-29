import { Suspense, useEffect, useRef, useState, useCallback } from "react";
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
import MyAmbientLight from "./my-ambientlight";
import EditorCamera from "./cameras/editor-camera";
import ScrollCamera from "./cameras/scroll-camera";
import MyBackground from "./my-background";
import IntroHeader from "./intro-header";
import Controls from "../lib/controls";
import { PesePost } from "../lib/interfaces";
import Blog from "./my-blog";
import MySpotlight from "./my-spotlight";
import MyFooter from "./my-footer";

DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

interface MainSceneProps {
  allPosts: PesePost[];
}

export default function MainScene({ allPosts }: MainSceneProps) {
  /**
   * Refs are forwarded to components so we can measure them and pass
   * the height to scrollcamera or other components so it can
   * calculate scroll ranges.
   */

  const [blogContainer, bounds] = useMeasure();

  useEffect(() => {
    console.log("bounds", bounds);
  }, [bounds]);

  const debug = false;
  const [windowHeight, setWindowHeight] = useState(800); // triggers update of pages
  const [totalPages, setTotalPages] = useState(1);
  const [introPages, setintroPages] = useState(1);
  const [blogPages, setblogPages] = useState(1);
  const [footerPages, setfooterPages] = useState(1);

  // determine the number of pages for scrollControls
  const mainContainer = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        const pages = node.offsetHeight / windowHeight;
        setTotalPages(pages);
        console.log(
          "totalPages",
          totalPages,
          "node.offsetHeight",
          node.offsetHeight,
          "windowHeight",
          windowHeight
        );
      }
    },
    [windowHeight, totalPages]
  );

  // measure the number of pages that IntroHeader takes up
  const introContainer = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        const pages = node.offsetHeight / windowHeight;
        setintroPages(pages);
        console.log(
          "introPages",
          introPages,
          "node.offsetHeight",
          node.offsetHeight,
          "windowHeight",
          windowHeight
        );
      }
    },
    [windowHeight, introPages]
  );

  // measure the number of pages that IntroHeader takes up
  // const blogContainer = useCallback(
  //   (node: HTMLDivElement) => {
  //     if (node !== null) {
  //       const pages = node.offsetHeight / windowHeight;
  //       setblogPages(pages);
  //       console.log(
  //         "blogPages",
  //         blogPages,
  //         "node.offsetHeight",
  //         node.offsetHeight,
  //         "windowHeight",
  //         windowHeight
  //       );
  //     }
  //   },
  //   [windowHeight, blogPages]
  // );

  // useEffect(() => {
  //   console.log(
  //     "introPages",
  //     introPages,
  //     "blogPages",
  //     blogPages,
  //     "footerPages",
  //     footerPages,
  //     "totalPages",
  //     totalPages
  //   );
  //   setfooterPages(totalPages - (introPages + blogPages));
  // }, [windowHeight, introPages, blogPages, footerPages, totalPages]);

  // get window height
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, [windowHeight]);

  // handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowHeight]);

  const scene = (
    <>
      <MyBackground debug={debug} />

      <MySpotlight
        introPages={introPages}
        debug={debug}
        name="spotlight1"
        modelProps={{
          position: new Vector3(0, 18, 0),
        }}
      />

      <MyAmbientLight />

      {debug && <EditorCamera />}
      {!debug && (
        <ScrollCamera
          totalPages={totalPages}
          blogPages={blogPages}
          introPages={introPages}
          footerPages={footerPages}
        />
      )}
      <MyPlane
        width={25}
        height={25}
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
          name="chair_1"
          fileName="/geometry/chair.glb"
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
          name="chair_2"
          fileName="/geometry/chair.glb"
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
        style={{ background: "#E0E0E0" }}
        shadows
      >
        {/* <gridHelper args={[30, 30]} /> */}
        <Suspense fallback={null}>
          {!debug ? (
            <ScrollControls pages={totalPages} damping={100}>
              {scene}
              <Scroll html>
                <div className="absolute w-screen" ref={mainContainer}>
                  <IntroHeader ref={introContainer} />
                  <Blog allPosts={allPosts} ref={blogContainer} />
                  <MyFooter />
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
