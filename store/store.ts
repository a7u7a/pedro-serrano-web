import { proxy, useSnapshot } from "valtio"
import {
    Material,
    Vector3,
    Euler,
    Mesh,
    CameraHelper,
    DirectionalLight,
    MathUtils,
    DirectionalLightHelper,
  } from "three";

export const modes = ["translate", "rotate", "scale"];

interface Store {
    current: string | null;
    mode: number;
    position: Vector3 | null
}

export const state = proxy<Store>({
    current: null,
    mode: 0,
    position: new Vector3(0, 0, 0)
});