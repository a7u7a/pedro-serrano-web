import { Vector3, Euler } from "three";

export interface MyModelProps {
  name: string;
  fileName?: string;
  url?: string;
  width?: number;
  height?: number;
  modelProps?: { position?: Vector3; rotation?: Euler; scale?: number };
}

export interface PesePost {
  date: string;
  title: string;
  body: string;
  image: string;
  category: string;
  id: string;
  imgWidth: number;
  imgHeight: number;
  alt: string
}
