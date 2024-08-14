import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Analysis, KLM, Scenario } from "../types/global";
import { useEffect, useRef, useState } from "react";


const fakeScenario: Scenario = {
    
        description: "Mise à jour du tableau de bord avec les dernières données de ventes.",
        analysis: [
            {
                userAction: "Accéder à l'application",
                detailledTask: [
                    {
                        description: "Ouvrir le navigateur et accéder à l'URL de l'application",
                        klm: [
                            { operator: "K", time: 0.4 },   // Taper l'URL
                            { operator: "P", time: 1.1 },   // Cliquer sur la barre d'adresse
                            { operator: "K", time: 0.2 },   // Appuyer sur la touche Entrée
                        ],
                        taskTime: 1.7
                    }
                ],
                averageTime: 1.7
            },
            {
                userAction: "Se connecter",
                detailledTask: [
                    {
                        description: "Entrer les identifiants de connexion",
                        klm: [
                            { operator: "K", time: 0.8 },   // Taper le nom d'utilisateur
                            { operator: "K", time: 0.8 },   // Taper le mot de passe
                            { operator: "P", time: 1.1 },   // Cliquer sur le bouton de connexion
                        ],
                        taskTime: 2.7
                    }
                ],
                averageTime: 2.7
            },
            {
                userAction: "Naviguer vers le tableau de bord",
                detailledTask: [
                    {
                        description: "Accéder à la section tableau de bord",
                        klm: [
                            { operator: "P", time: 1.1 },   // Pointer sur le menu
                            { operator: "K", time: 0.2 },   // Cliquer sur le menu
                            { operator: "P", time: 1.1 },   // Pointer sur la section tableau de bord
                            { operator: "K", time: 0.2 },   // Cliquer sur la section
                        ],
                        taskTime: 2.6
                    }
                ],
                averageTime: 2.6
            },
            {
                userAction: "Actualiser les données",
                detailledTask: [
                    {
                        description: "Cliquer sur le bouton de mise à jour",
                        klm: [
                            { operator: "P", time: 1.1 },   // Pointer sur le bouton de mise à jour
                            { operator: "K", time: 0.2 },   // Cliquer sur le bouton
                            { operator: "R", time: 2.0 },   // Attendre la réponse du système
                        ],
                        taskTime: 3.3
                    }
                ],
                averageTime: 3.3
            }
        ],
        time: 10.3
    };
    
    const emptyScenario: Scenario = {
        description: '',
        analysis: [],
        time: 0
      };

      export const useScenario = () => {
        const dt = useRef<DataTable<any>>(null);
        const [scenarios, setScenarios] = useState<Scenario[]>([fakeScenario]);
    
        // Handle adding a new scenario
        const handleNewScenario = () => {
            setScenarios(prev => [...prev, { ...emptyScenario }]);
        };
    
        // Handle scenario description change
        const handleScenarioDescriptionChange = (description: string, index: number) => {
            setScenarios(prev => 
                prev.map((scenario, i) => 
                    i === index ? { ...scenario, description } : scenario
                )
            );
        };
    
        // Handle analysis change for a specific scenario
        const handleAnalysisChange = (analysis: Analysis[], index: number) => {
            setScenarios(prev => 
                prev.map((scenario, i) => 
                    i === index ? { ...scenario, analysis } : scenario
                )
            );
        };
        const addTask = (scenarioIndex: number, analysisIndex: number) => {
            setScenarios(prev => {
                const updatedScenarios = [...prev];
                const scenario = updatedScenarios[scenarioIndex];
                const analysisItem = scenario.analysis[analysisIndex];
                analysisItem.detailledTask = [
                    ...analysisItem.detailledTask,
                    {
                        description: '',
                        klm: [],
                        taskTime: 0
                    }
                ];
                return updatedScenarios;
            });
        }
        // Add a new analysis to a specific scenario
        const addAnalysis = (index: number) => {
            setScenarios(prev => 
                prev.map((scenario, i) => 
                    i === index 
                        ? { 
                            ...scenario, 
                            analysis: [
                                ...scenario.analysis,
                                {
                                    userAction: '',
                                    detailledTask: [],
                                    averageTime: 0
                                }
                            ] 
                        }
                        : scenario
                )
            );
        };
    

     // Add a new KLM action to a specific task
     const addKLMAction = (scenarioIndex: number, analysisIndex: number, taskIndex: number) => {
        setScenarios(prev => {
            const updatedScenarios = [...prev];
            const scenario = updatedScenarios[scenarioIndex];
            const analysisItem = scenario.analysis[analysisIndex];
            const task = analysisItem.detailledTask[taskIndex];

            // Define a new KLM action
            const newKLMAction: KLM = {
                operator: "N", // You can specify the operator here
                time: 0.0 // Initial time, adjust as needed
            };

            // Add the new KLM action to the task's KLM actions
            task.klm = [...task.klm, newKLMAction];
            
            // Recalculate task time (if necessary)
            task.taskTime = task.klm.reduce((total, klm) => total + klm.time, 0);

            // Update the scenario
            return updatedScenarios;
        });
    };
    // Edit a specific KLM action
    const editKLMAction = (scenarioIndex: number, analysisIndex: number, taskIndex: number, klmIndex: number, updatedKLM: KLM) => {
        setScenarios(prev => {
            const updatedScenarios = [...prev];
            const scenario = updatedScenarios[scenarioIndex];
            const analysisItem = scenario.analysis[analysisIndex];
            const task = analysisItem.detailledTask[taskIndex];

            // Update the KLM action
            task.klm[klmIndex] = updatedKLM;

            // Recalculate task time
            task.taskTime = task.klm.reduce((total, klm) => total + klm.time, 0);

            // Update the scenario
            return updatedScenarios;
        });
    };

    // Edit user action
    const editUserAction = (scenarioIndex: number, userActionIndex: number, updatedUserAction: string) => {
        setScenarios(prev => {
            const updatedScenarios = [...prev]; // Create a copy of the scenarios array
            const scenario = updatedScenarios[scenarioIndex]; // Get the specific scenario
            const analysisItem = scenario.analysis[userActionIndex]; // Get the specific analysis item
            
            // Update the userAction for the specific analysis item
            analysisItem.userAction = updatedUserAction;
            
            return updatedScenarios; // Return the updated scenarios array
        });
    };
    

    // Edit scenario description
    const editScenarioDescription = (scenarioIndex: number, newDescription: string) => {
        setScenarios(prev => {
            const updatedScenarios = [...prev];
            updatedScenarios[scenarioIndex].description = newDescription;
            return updatedScenarios;
        });
    };
    const handleTaskDescriptionChange = (scenarioIndex: number, analysisIndex: number, taskIndex: number, newDescription: string) => {
        const updatedScenarios = [...scenarios];
        updatedScenarios[scenarioIndex].analysis[analysisIndex].detailledTask[taskIndex].description = newDescription;
        setScenarios(updatedScenarios);
    };
        useEffect(() => {
            if (dt.current) {
                dt.current.reset();
            }
        }, [scenarios]);
    
        return [scenarios, handleNewScenario, handleScenarioDescriptionChange, handleAnalysisChange, addAnalysis, 
            dt, addKLMAction,editScenarioDescription, editUserAction, editKLMAction, addTask, handleTaskDescriptionChange] as const;
    };