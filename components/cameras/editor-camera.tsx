import { useRef } from "react";
import {
  PerspectiveCamera,
  OrthographicCamera,
} from "@react-three/drei";

import { Object3D } from "three";

import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const EditorCamera = () => {
  const [{ editorCamPos }, set] = useControls("Editor Camera", () => ({
    editorCamPos: {
      label: "position",
      value: [0, 0, 0],
    },
    zoom: {
      label: "zoom",
      value: 1,
    },
  }));
  useFrame((state, delta) => {
    const pos = state.camera.position;
    const zoom = state.camera.zoom;
    set({ editorCamPos: [pos.x, pos.y, pos.z], zoom: zoom });
  });

  const cameraRef = useRef<Object3D>();
  return (
    <OrthographicCamera
      makeDefault
      position={[4.7561085802765,4.960221817148011,-5.270259073073082]}
      zoom={100}
    />
  );
};
export default EditorCamera;
