import { Vector3, Euler } from "three";

export interface MyModelProps {
  name: string;
  fileName?: string;
  url?: string;
  width?: number;
  height?: number;
  modelProps: { position?: Vector3; rotation?: Euler; scale?: number };
}
