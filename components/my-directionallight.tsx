import { useState, useRef, forwardRef, useEffect } from "react";
import { useCursor, useHelper, useScroll } from "@react-three/drei";
import {
  Mesh,
  DirectionalLight,
  DirectionalLightHelper,
  Vector3,
  CameraHelper,
  OrthographicCamera,
} from "three";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { state, modes } from "../store/store";
import useObjPosControl from "../lib/obj-position-control";
import { MyModelProps } from "../lib/interfaces";

interface MyDirectionalLightProps extends MyModelProps {
  targetName: string;
}

const MyDirectionalLight = ({
  name,
  modelProps,
  targetName,
}: MyDirectionalLightProps) => {
  const dim = 5;
  const scroll = useScroll();
  const ref = useRef<DirectionalLight>(null);
  const { shadowWidth, shadowHeight, bias, dirIntensity } = useControls(
    "Main Light",
    {
      dirIntensity: {
        label: "intensity",
        value: 0.42,
        min: 0,
        max: 1,
        step: 0.01,
      },
      bias: {
        label: "shadow bias",
        value: -0.00008,
        min: -0.01,
        max: 0.01,
        step: 0.00001,
        onChange: (v) => {
          ref.current!.shadow.bias = v;
        },
        transient: false,
      },
      shadowWidth: {
        label: "width",
        value: 2.6,
        min: -dim,
        max: dim,
        step: 0.1,
        onChange: (v) => {
          ref.current!.shadow.camera.updateProjectionMatrix();
        },
        transient: false,
      },
      shadowHeight: {
        label: "height",
        value: 4.0,
        min: -dim,
        max: dim,
        step: 0.1,
        onChange: (v) => {
          ref.current!.shadow.camera.updateProjectionMatrix();
        },
        transient: false,
      },
    }
  );

  const [{ pos, displayName }, set] = useObjPosControl();
  const containerRef = useRef<Mesh>(null);
  const orthoRef = useRef<OrthographicCamera>(null);
  const snap = useSnapshot(state);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);
  // useHelper(ref, DirectionalLightHelper, 1);
  useHelper(orthoRef, CameraHelper);

  

  useFrame((_, delta) => {
    if (targetName === snap.current && snap.position) {
      const __ = snap.position;
      ref.current!.target.position.set(__.x, __.y, __.z);
      ref.current!.target.updateMatrixWorld();
    }
    // if selected
    if (name === snap.current && containerRef.current) {
      const _ = containerRef.current.position;
      set({ pos: [_.x, _.y, _.z], displayName: name });
    }
    if (!state.position) {
      set({ pos: [0, 0, 0], displayName: "" });
    }
  });

  // doesnt work to animate the light target
  // useFrame((_, delta) => {
  //   const offset = 1 - scroll.offset;
  //   console.log("offset",  Math.sin(offset) * -15,
  //   Math.atan(offset * Math.PI * 2) * 10,
  //   Math.cos((offset * Math.PI) / 3) * -15);
  //   ref.current!.target.position.set(
  //     Math.sin(offset) * -15,
  //     Math.atan(offset * Math.PI * 2) * 10,
  //     Math.cos((offset * Math.PI) / 3) * -15
  //   );
  //   ref.current!.target.updateMatrixWorld();
  // });

  return (
    <group>
      <mesh
        ref={containerRef}
        name={name}
        {...modelProps}
        dispose={null}
        onClick={(e) => {
          e.stopPropagation();
          state.current = name;
          if (containerRef.current) {
            state.position = containerRef.current.position;
          }
        }}
        onPointerMissed={(e) => {
          if (e.type === "click") {
            state.current = null;
            state.position = null;
          }
        }}
        // Right click cycles through the transform modes
        onContextMenu={(e) =>
          snap.current === name &&
          (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
        }
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => setHovered(false)}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <directionalLight
          ref={ref}
          castShadow
          intensity={dirIntensity}
          position={[0, 0, 0]}
          shadow-mapSize={[2048, 2048]}
        >
          <orthographicCamera
            ref={orthoRef}
            attach="shadow-camera"
            far={1000}
            left={-shadowWidth}
            right={shadowWidth}
            top={shadowHeight}
            bottom={-shadowHeight}
          />
        </directionalLight>
      </mesh>
    </group>
  );
};

export default MyDirectionalLight;
