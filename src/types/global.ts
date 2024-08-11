export interface KLM {
    operator:string,
    count:number,
    time:number
}

export interface Task {
    description:string,
    klm:KLM[]
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
}