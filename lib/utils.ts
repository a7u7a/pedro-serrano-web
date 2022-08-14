export const linearMap = (val: number, toA: number, toB: number) => {
    const fromA = 0;
    const fromB = 1;
    return ((val - fromA) * (toB - toA)) / (fromB - fromA) + toA;
};