export const KLMvalues = [
    { 
        label: "K", 
        value: 0.28, 
        description: "Appui sur une touche ou un bouton" // Keystroke or button press
    },
    { 
        label: "P", 
        value: 1.1, 
        description: "Pointage vers une cible avec une souris" // Pointing to a target with a mouse
    },
    { 
        label: "H", 
        value: 0.4, 
        description: "Déplacement des mains du clavier à la souris ou inversement" // Homing hands from keyboard to mouse or vice versa
    },
    { 
        label: "M", 
        value: 1.35, 
        description: "Préparation mentale" // Mental preparation
    },
    { 
        label: "R", 
        value: 0.0, 
        description: "Temps de réponse du système (variable)" // System response time (variable)
    },
    { 
        label: "D", 
        n: 0.9, 
        l: 0.16, 
        description: "Glissement (basé sur le temps de glissement typique)" // Dragging (based on typical dragging time)
    },
    {
        label: "Tap",
        value: 0.08,

        description: "Tap pour smartphone" // Dragging (based on typical dragging time)
    },
    {
        label: "Swipe",
        value: 0.07,

        description: "Swipe pour smartphone" // Dragging (based on typical dragging time)
    }
];



export interface KLM {
    operator:string,
    count?:number,
    time?:number,
    r?:number,
    n?:number,
    l?:number
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