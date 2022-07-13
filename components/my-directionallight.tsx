import { useState, useRef } from "react";
import { useCursor, useHelper } from "@react-three/drei";
import { Mesh, DirectionalLight, DirectionalLightHelper } from "three";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { state, modes } from "../store/store";
import useObjPosControl from "../lib/obj-position-control";

const MyDirectionalLight = () => {
  const name = "directionalLight";
  const s = 5;
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
        min: -s,
        max: s,
        step: 0.1,
        onChange: (v) => {
          ref.current!.shadow.camera.updateProjectionMatrix();
        },
        transient: false,
      },
      shadowHeight: {
        label: "height",
        value: 4.0,
        min: -s,
        max: s,
        step: 0.1,
        onChange: (v) => {
          ref.current!.shadow.camera.updateProjectionMatrix();
        },
        transient: false,
      },
    }
  );

  // print values
  const [{ position }, set] = useObjPosControl();
  const containerRef = useRef<Mesh>(null);
  const snap = useSnapshot(state);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  useHelper(ref, DirectionalLightHelper, 1);

  // print values
  useFrame((_, delta) => {
    // if selected
    if (name === snap.current && containerRef.current) {
      const _ = containerRef.current.position;
      set({ position: [_.x, _.y, _.z] });
    }
    if (!state.position) {
      set({ position: [0, 0, 0] });
    }
  });

  return (
    <mesh
      ref={containerRef}
      name={name}
      position={[-3.2908660193824417, 11.720124693629694, -5.625147550960824]}
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
      <meshStandardMaterial color={0xb4af9f} />
      <directionalLight
        ref={ref}
        castShadow
        intensity={dirIntensity}
        position={[0, 0, 0]}
        shadow-mapSize={[2048, 2048]}
      >
        <orthographicCamera
          attach="shadow-camera"
          far={1000}
          left={-shadowWidth}
          right={shadowWidth}
          top={shadowHeight}
          bottom={-shadowHeight}
        />
      </directionalLight>
    </mesh>
  );
};

export default MyDirectionalLight;
