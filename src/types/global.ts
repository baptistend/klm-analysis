export const KLMvalues = [
    { label: "K", value: 0.2 },   // Keystroke or button press
    { label: "P", value: 1.1 },   // Pointing to a target with a mouse
    { label: "H", value: 0.4 },   // Homing hands from keyboard to mouse or vice versa
    { label: "M", value: 1.2 },   // Mental preparation
    { label: "R", value: 0.0 },   // System response time (variable)
    { label: "D", n: 0.9, l:0.16 }    // Dragging (based on typical dragging time)
];


export interface KLM {
    operator:string,
    time:number
}

export interface Task {
    description:string,
    klm:KLM[],
    taskTime:number

}
export interface Analysis {
    userAction:string,
    detailledTask:Task[],
    averageTime:number

}

export interface Scenario {
    description:string,
    analysis:Analysis[]
    time:number
}