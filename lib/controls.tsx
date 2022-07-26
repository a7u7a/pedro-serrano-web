import { useSnapshot } from "valtio";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  ScrollControls,
  SpotLight,
} from "@react-three/drei";
import { state, modes } from "../store/store";

const Controls = () => {
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
};

export default Controls;
