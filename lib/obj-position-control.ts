import { useControls } from "leva";

const useObjPosControl = () => {
  return useControls("Current selection", () => ({ displayName: { label: "name", value: "" }, pos: { label: "position", value: [0, 0, 0] } }));
};
export default useObjPosControl;