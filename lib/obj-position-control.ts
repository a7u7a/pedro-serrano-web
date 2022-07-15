import { useControls } from "leva";


const useObjPosControl = () => {
  return useControls("Selected Obj", () => ({ displayName: { label: "name", value: "" }, pos: { label: "position", value: [0, 0, 0] } }));
};
export default useObjPosControl;