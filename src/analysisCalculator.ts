import { KLM, Scenario } from "./types/global";

export const calculateKLM = (klm: KLM[]): number => {
    return klm.reduce((acc, current) => {
        return acc + current.time;
    }, 0);
}

