import { proxy, useSnapshot } from "valtio"

export const modes = ["translate", "rotate", "scale"];

interface Store {
    current: string | null;
    mode: number;
}

export const state = proxy<Store>({
    current: null,
    mode: 0,
});

export const testing = () => {
    console.log(state);

}