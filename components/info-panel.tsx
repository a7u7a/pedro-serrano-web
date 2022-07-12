import { useSnapshot } from "valtio";
import { useState, useRef, useEffect } from "react";
import { state, modes } from "../store/store";
import { Material, Vector3, Euler, Mesh, Object3D } from "three";

interface InfoPanelProps {
  textProp: string;
}

const roundString = (num: number) => {
  return (Math.round(num * 1000) / 1000).toString();
};

const InfoPanel = () => {
  const snap = useSnapshot(state);
  const [pos, setData] = useState("");
  useEffect(() => {
    if (snap.position) {
      setData(
        `[${roundString(snap.position!.x)}, 
        ${roundString(snap.position!.y)},
        ${roundString(snap.position!.z)}]`
      );
    }
  }, [snap]);

  console.log("pos", pos);
  return (
    <div>
      <p>Info Panel</p>
      <p>{snap.current}</p>
      <p>{pos}</p>
    </div>
  );
};
export default InfoPanel;
