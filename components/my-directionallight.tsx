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
import { off } from "process";

interface MyDirectionalLightProps extends MyModelProps {
  targetName: string;
  debug: boolean;
}

const MyDirectionalLight = ({
  name,
  modelProps,
  targetName,
  debug,
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
        value: 5,
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
        value: 5,
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
  // useHelper(orthoRef, CameraHelper);

  // update light target with scroll
  useFrame((_, delta) => {
    if (!debug) {
      const offset = scroll.offset;
      // ref.current!.target.position.set(0, 0, 0);
      // ref.current!.target.updateMatrixWorld();

      ref.current!.position.set(offset * -5, 20, offset * -10);
      ref.current!.updateMatrixWorld();
    } else {
      ref.current!.position.set(-5, 20, -10);
      ref.current!.updateMatrixWorld();
    }
  });

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
        {/* <boxGeometry args={[0.1, 0.1, 0.1]} /> */}
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
