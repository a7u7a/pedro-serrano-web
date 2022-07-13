import { useControls } from "leva";


const useObjPosControl = () => {
  return useControls("Selected Obj", () => ({ position: [0, 0, 0] }));
};
export default useObjPosControl;