import { useState, useRef, useEffect } from "react";
import { useControls } from "leva";
import { useCursor, useHelper } from "@react-three/drei";

import {
  Material,
  Vector3,
  Euler,
  Mesh,
  CameraHelper,
  DirectionalLight,
  MathUtils,
  DirectionalLightHelper,
} from "three";
import { useSnapshot } from "valtio";
import { state, modes } from "../store/store";

const MyDirectionalLight = () => {
  const s = 200;
  const { shadowWidth } = useControls({
    shadowWidth: {
      value: 0.1,
      min: -s,
      max: s,
      step: 0.1,
    },
  });
  const { shadowHeight } = useControls({
    shadowHeight: {
      value: 0.1,
      min: -s,
      max: s,
      step: 0.1,
    },
  });

  const { bias } = useControls({
    bias: {
      value: 0,
      min: -0.01,
      max: 0.01,
      step: 0.00001,
    },
  });

  const ref = useRef<DirectionalLight>(null);
  const name = "directionalLight";
  const snap = useSnapshot(state);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  useHelper(ref, DirectionalLightHelper, 1);
  useEffect(
    () => void ref.current!.shadow.camera.updateProjectionMatrix(),
    [shadowWidth, shadowHeight]
  );

  useEffect(
    () => {ref.current!.shadow.bias=bias},
    [bias]
  );

  return (
    <mesh
      onClick={(e) => (e.stopPropagation(), (state.current = name))}
      onPointerMissed={(e) => e.type === "click" && (state.current = null)}
      // Right click cycles through the transform modes
      onContextMenu={(e) =>
        snap.current === name &&
        (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
      }
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
      name={name}
      position={[5, 5, 5]}
      dispose={null}
    >
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={0xb4af9f} />
      <directionalLight
        ref={ref}
        castShadow
        intensity={1}
        position={[0, 0, 0]}
        shadow-mapSize={[2048, 2048]}
      >
        <orthographicCamera
          attach="shadow-camera"
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
