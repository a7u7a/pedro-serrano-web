import { useState, useRef } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { Material, Vector3, Euler, Mesh, Object3D, Group } from "three";
import { state, modes } from "../store/store";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import useObjPosControl from "../lib/obj-position-control";
import { MyModelProps } from "../lib/interfaces";

const MyModel = ({ name, fileName, modelProps }: MyModelProps) => {
  const [{ pos, displayName }, set] = useObjPosControl();
  const ref = useRef<Group>(null);
  const snap = useSnapshot(state);
  const { nodes } = useGLTF(fileName!);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((_, delta) => {
    // if selected
    if (name === snap.current && ref.current) {
      const _ = ref.current.position;
      set({ pos: [_.x, _.y, _.z], displayName: name });
    }
    if (!state.position) {
      set({ pos: [0, 0, 0], displayName: "" });
    }
  });

  return (
    <group
      ref={ref}
      {...modelProps}
      dispose={null}
      name={name}
      // onClick={(e) => {
      //   e.stopPropagation();
      //   state.current = name;
      //   if (ref.current) {
      //     state.position = ref.current.position;
      //   }
      // }}
      // onPointerMissed={(e) => {
      //   if (e.type === "click") {
      //     state.current = null;
      //     state.position = null;
      //   }
      // }}
      // onContextMenu={(e) => {
      //   if (snap.current === name) {
      //     e.stopPropagation();
      //     state.mode = (snap.mode + 1) % modes.length;
      //   }
      // }}
      // onPointerOver={(e) => {
      //   e.stopPropagation();
      //   setHovered(true);
      // }}
      // onPointerOut={(e) => setHovered(false)}
    >
      {nodes.Scene.children.map((child, i) => {
        if (child instanceof Mesh && child.type != "Group") {
          return (
            <mesh
              receiveShadow
              castShadow
              key={i}
              geometry={child.geometry}
              material={child.material}
              material-color={snap.current === name ? "#ff6080" : "white"}
            />
          );
        }
      })}
    </group>
  );
};

export default MyModel;
