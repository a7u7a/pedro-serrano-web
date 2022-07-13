import { useControls } from "leva";

interface MyAmbientLightProps {
  textProp: string;
}

const MyAmbientLight = () => {
  const { ambient } = useControls({
    ambient: {
      value: 0.24,
      min: 0,
      max: 1,
      step: 0.01,
    },
    
  });

  return <ambientLight intensity={ambient} />;
};
export default MyAmbientLight;
