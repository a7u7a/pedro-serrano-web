import { useControls } from "leva";

interface MyAmbientLightProps {
  textProp: string;
}

const MyAmbientLight = () => {
  const { intensity } = useControls("Ambient Light",{
    intensity: {
      value: 0.05,
      min: 0,
      max: 1,
      step: 0.01,
    },
    
  });

  return <ambientLight intensity={intensity} />;
};


export default MyAmbientLight;