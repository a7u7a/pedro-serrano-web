import { useControls } from "leva";


const useObjPosControl = () => {
  return useControls("Selected Obj", () => ({ pos: [0, 0, 0], name: "" }));
};
export default useObjPosControl;