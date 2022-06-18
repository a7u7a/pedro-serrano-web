import * as THREE from "three";
import React, { useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  ReactThreeFiber,
} from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * This file shows how to use orbit controls and also position the camera on setup
 * Another example https://codesandbox.io/s/react-three-fiber-orbit-controls-without-drei-7c11y?file=/src/App.js:151-164
 */

extend({ OrbitControls });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

const CameraControls = () => {
  // from https://codeworkshop.dev/blog/2020-04-03-adding-orbit-controls-to-react-three-fiber/
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame with useFrame
  const controls = useRef<OrbitControls>(null);
  useFrame((state) => controls.current!.update());
  return <orbitControls ref={controls} args={[camera, domElement]} enableZoom={false} />;
};

function Box(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => (ref.current.rotation.y += 0.01));

  return (
    <mesh {...props} ref={ref} scale={1}>
      <boxGeometry args={[0.5, 1, 2]} />
      <meshStandardMaterial color={0xb4af9f} />
    </mesh>
  );
}

const TestBox = () => {
  return (
    <div className="h-80">
      <Canvas>
        <CameraControls />
        <PerspectiveCamera makeDefault position={[2.5, 1.5, 2.5]} zoom={1.5} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, .2, 0]} />
      </Canvas>
    </div>
  );
};

export default TestBox;