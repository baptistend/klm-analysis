import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Analysis, KLM, KLMvalues, Scenario } from "../types/global";
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
                            { operator: "K", count:2, time: 0.4 },   // Taper l'URL
                            { operator: "P", count:1, time: 1.1 },   // Cliquer sur la barre d'adresse
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
                            { operator: "K", count:2, time: 0.8 },   // Taper le nom d'utilisateur
                            { operator: "P", count:1, time: 1.1 },   // Cliquer sur le bouton de connexion
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
                            { operator: "P", count:2, time: 1.1 },   // Pointer sur le menu
                            { operator: "K", count:2, time: 0.2 },   // Cliquer sur le menu
                   // Cliquer sur la section
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
                            { operator: "P", count:1, time: 1.1 },   // Pointer sur le bouton de mise à jour
                            { operator: "K", count:1, time: 0.2 },   // Cliquer sur le bouton
                            { operator: "R", count:1, time: 2.0 },   // Attendre la réponse du système
                        ],
                        taskTime: 3.3
                    }
                ],
                averageTime: 3.3
            }
        ],
        time: 10.3
    };
    


      export const useScenario = () => {
        const emptyScenario: Scenario = {
            description: '',
            analysis: [],
            time: 0
          };
        const dt = useRef<DataTable<any>>(null);
        const [scenarios, setScenarios] = useState<Scenario[]>([fakeScenario]);
    
        // Handle adding a new scenario
        const handleNewScenario = () => {

            setScenarios(prev => {
                const updatedScenarios = [...prev];
                updatedScenarios.push({ ...emptyScenario });
            console.log("scenarios :", updatedScenarios)

                return updatedScenarios;
            })
                
            //go to last page 
        };

        const deleteScenario = (index: number) => {
            setScenarios(prev => {
                const updatedScenarios = [...prev];
                updatedScenarios.splice(index, 1);
                return updatedScenarios;
            });
            recalculateEverything()
        }

    
        // Handle scenario description change
        const editScenarioDescription = ( index: number, description: string) => {
            console.log("scenarios :", scenarios)
            
            setScenarios(prev =>
                prev.map((scenario, i) => 
                    i === index ? { ...scenario, description:description } : scenario
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
            recalculateEverything()
        }

        const deleteTask = (scenarioIndex: number, analysisIndex: number, taskIndex: number) => {
            setScenarios(prev => {
                const updatedScenarios = [...prev];
                updatedScenarios[scenarioIndex].analysis[analysisIndex].detailledTask.splice(taskIndex, 1);
                return updatedScenarios;
            });
            recalculateEverything()
        }
        // Add a new analysis to a specific scenario
        const addAnalysis = (index: number) => {
            setScenarios(prev => {
                const updatedScenarios = [...prev];
                console.log("add : ", updatedScenarios)
                const prevAnalysis = updatedScenarios[index].analysis;
                prevAnalysis.push({
                    userAction: '',
                    detailledTask: [],
                    averageTime: 0
                });
                updatedScenarios[index].analysis = prevAnalysis;
                return updatedScenarios;
      
            }


               
            );
        };
        const deleteAnalysis = (scenarioIndex: number, analysisIndex: number) => {
            setScenarios(prev => {
                const updatedScenarios = [...prev];
                updatedScenarios[scenarioIndex].analysis.splice(analysisIndex, 1);
                return updatedScenarios;
            });
            recalculateEverything()
        }
    

        const addKLMAction = (
            scenarioIndex: number,
            analysisIndex: number,
            taskIndex: number
          ) => {
            setScenarios((prev) => {
              const updatedScenarios = [...prev];
          
              // Access the specific scenario, analysis, and task
              const scenario = updatedScenarios[scenarioIndex];
              const analysisItem = scenario.analysis[analysisIndex];
              const task = analysisItem.detailledTask[taskIndex];
          
              // Define a new KLM action with default values
              const newKLMAction: KLM = {
                operator: "K", // Default operator, can be changed later
                time: 0.2,
                count:1,     // Default time, adjust as needed
              };
          
              // Add the new KLM action to the task's KLM actions
              task.klm = [...task.klm, newKLMAction];
          
              // Recalculate task time by summing up all KLM actions' times
              task.taskTime = task.klm.reduce((total, klm) => total + (klm.time || 0), 0);
          
              // Return the updated scenarios array to update the state
              return updatedScenarios;
            });
            recalculateEverything()

          };
          const deleteKLMAction = ( scenarioIndex: number, analysisIndex: number, taskIndex: number, klmIndex: number) => {
            setScenarios((prev) => {
              const updatedScenarios = [...prev];
          
              // Access the specific scenario, analysis, and task
              const scenario = updatedScenarios[scenarioIndex];
              const analysisItem = scenario.analysis[analysisIndex];
              const task = analysisItem.detailledTask[taskIndex];
          
              // Remove the KLM action at the specified index
              task.klm.splice(klmIndex, 1);
          
              // Recalculate task time by summing up all KLM actions' times
              task.taskTime = task.klm.reduce((total, klm) => total + (klm.time || 0), 0);
          
              // Return the updated scenarios array to update the state
              return updatedScenarios;
            });
            recalculateEverything()

          }
    const updateKLM = (
        scenarioIndex: number,
        analysisIndex: number,
        taskIndex: number,
        klmIndex: number,
        updatedKLM: KLM
      ) => {
        setScenarios((prevScenarios) => {
          // Create a deep copy of the previous scenarios
          const updatedScenarios = [...prevScenarios];
          
          // Access the specific scenario
          const selectedScenario = updatedScenarios[scenarioIndex];
          
          // Access the specific analysis item within the scenario
          const selectedAnalysis = selectedScenario.analysis[analysisIndex];
          
          // Access the specific task within the analysis item
          const selectedTask = selectedAnalysis.detailledTask[taskIndex];
          
          // Update the specific KLM action within the task
          selectedTask.klm[klmIndex] = updatedKLM;
      
          // Return the updated scenarios array to update the state
          return updatedScenarios;
        });
        recalculateEverything()

      };
      

    // Edit user action
    const editUserAction = (scenarioIndex: number, userActionIndex: number, updatedUserAction: string) => {
        setScenarios(prev => {
            const updatedScenarios = [...prev];
            updatedScenarios[scenarioIndex].analysis[userActionIndex].userAction = updatedUserAction;
            return updatedScenarios;
        }); 
    };
    


    const handleTaskDescriptionChange = (scenarioIndex: number, analysisIndex: number, taskIndex: number, newDescription: string) => {
        const updatedScenarios = [...scenarios];    
        updatedScenarios[scenarioIndex].analysis[analysisIndex].detailledTask[taskIndex].description = newDescription;
        setScenarios(updatedScenarios);
    };
    const recalculateEverything = () => {
        calculateKLMTime();
        calculateTaskTime();
        calculateAnalysisTime();
        calculateScenarioTime();
    }
    // calculate each klm time with KLMValues
    const calculateKLMTime = () => {
        setScenarios(prevScenarios => {
            return prevScenarios.map(scenario => ({
                ...scenario,
                analysis: scenario.analysis.map(analysisItem => ({
                    ...analysisItem,
                    detailledTask: analysisItem.detailledTask.map(task => ({
                        ...task,
                        klm: task.klm.map(klm => {
                            const klmValue = KLMvalues.find(val => val.label === klm.operator);
                            if (!klmValue) return klm; // If no matching KLM value, return unchanged
    
                            let calculatedTime = 0;
    
                            if (klm.operator === "D") {
                                // For "D" operator, calculate time based on `n` and `l` values
                                calculatedTime = (klm.n || 1) * (klmValue.n || 0.9) + (klm.l || 1) * (klmValue.l || 0.16);
                            } else {
                                // For other operators, use the predefined value
                                calculatedTime = (klm.count || 0) * (klmValue.value || 0);

                            }
                            
                            return {
                                ...klm,
                                time: calculatedTime
                            };
                        })
                    }))
                }))
            }));
        });
    };
    
//calculate task time
const calculateTaskTime = () => {
    setScenarios(prevScenarios => {
        return prevScenarios.map(scenario => ({
            ...scenario,
            analysis: scenario.analysis.map(analysisItem => ({
                ...analysisItem,
                detailledTask: analysisItem.detailledTask.map(task => ({
                    ...task,
                    taskTime: task.klm.reduce((total, klm) => total + (klm.time || 0), 0)
                }))
            }))
        }));
    });
};


const calculateAnalysisTime = () => {
    setScenarios(prevScenarios => {
        return prevScenarios.map(scenario => ({
            ...scenario,
            analysis: scenario.analysis.map(analysisItem => ({
                ...analysisItem,
                averageTime: analysisItem.detailledTask.reduce((total, task) => total + (task.taskTime || 0), 0)
            }))
        }));
    });
};


const calculateScenarioTime = () => {
    setScenarios(prevScenarios => {
        return prevScenarios.map(scenario => {
            // Calculate total time
            const totalTime = scenario.analysis.reduce((total, analysisItem) => 
                total + (analysisItem.averageTime || 0), 0);
            
            // Return the updated scenario with formatted time
            return {
                ...scenario,
                time: Math.round(totalTime * 100) / 100 // Format total time to 2 decimal places
            };
        });
    });
};

                    useEffect(() => {
            if (dt.current) {
                dt.current.reset();
            }
            recalculateEverything()

        }, []);
        return [scenarios, handleNewScenario, addAnalysis, 
            dt, addKLMAction,editScenarioDescription, editUserAction, updateKLM,
             addTask, handleTaskDescriptionChange, deleteScenario,deleteAnalysis,deleteTask, deleteKLMAction  ] as const;
    };