import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import {  Scenario } from './types/global';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { useScenario } from './scenario/useScenario';
import { InputTextarea } from 'primereact/inputtextarea';
import { TaskContent } from './components/Task';
import 'primeflex/primeflex.css';

function App() {
    const [scenarios, handleNewScenario, addAnalysis, dt,  addKLMAction,editScenarioDescription,
       editUserAction, updateKLM, addTask, handleTaskDescriptionChange, deleteScenario,deleteAnalysis,deleteTask, deleteKLMAction ] = useScenario();

    useEffect(() => {}, [scenarios]);


    const detailledTaskTemplate = (data: Scenario, options:ColumnBodyOptions) => {
      return (
        <div key={options.rowIndex} className="flex flex-column  align-items-center justify-content-center">
              {data?.analysis?.map((analysisItem, analysisIndex) => (
                  <div key={analysisIndex} className="flex flex-column  align-items-center justify-content-center mb-2">
                    <p>({analysisIndex + 1})</p>
                      {analysisItem.detailledTask.map((task, taskIndex) => (
                          <div key={taskIndex} className="ml-4">
                                       <p>&nbsp;&nbsp;({String.fromCharCode(97 + taskIndex)})</p>
                            <div  className="field grid gap-2">
                            <Button  className="my-1 align-items-center" icon="pi pi-minus" onClick={() => deleteTask(options.rowIndex, analysisIndex, taskIndex)} />
                            <InputTextarea
                              autoResize
                                value={task.description}
                                onChange={(e) => handleTaskDescriptionChange(options.rowIndex, analysisIndex, taskIndex, e.target.value)}
                                rows={2} 
                                cols={30}
                            />
                                </div>
                 
                          </div>
                      ))}
                      <Button  className="mt-3 align-items-center" icon="pi pi-plus" onClick={() => addTask(options.rowIndex, analysisIndex)} />

                  </div>
              ))}
          </div>
      );
  };
  
  // Template for detailed KLM actions
  const detailledKLMTemplate = (data: Scenario, options:ColumnBodyOptions) => {
    
      return (
        <div key={options.rowIndex} className="flex flex-column  align-items-center justify-content-center">
              {data?.analysis?.map((analysisItem, analysisIndex) => (
                  <div key={analysisIndex} className="mb-2">
                               <p>({analysisIndex + 1})</p>

                      {analysisItem.detailledTask.map((task, taskIndex) => (
                          <div key={taskIndex} className="ml-4">
           <p>&nbsp;&nbsp;({String.fromCharCode(97 + taskIndex)})</p>
                              <ul className="flex flex-column  align-items-center justify-content-center ml-4">
                                  {task.klm.map((klmAction, klmIndex) => (
                                    <div className="field grid gap-3">
                            <Button  className=" my-1 align-items-center" icon="pi pi-minus" onClick={() => deleteKLMAction(options.rowIndex, analysisIndex, taskIndex, klmIndex)} />
                            <TaskContent  key={klmIndex} klm={klmAction}         setKLM={(updatedKLM) =>
                                        updateKLM(options.rowIndex, analysisIndex, taskIndex, klmIndex, updatedKLM)
                                    } />
                                    </div>
                                    
                                  ))}
                                  <Button className="mt-3 align-items-center" icon="pi pi-plus" onClick={() => addKLMAction(options.rowIndex, analysisIndex, taskIndex)} />
                              </ul>
                          </div>
                      ))}
                  </div>
              ))}
          </div>
      );
  };
  const detailledActionTemplate = (data: Scenario, options:ColumnBodyOptions) => {
      return (
          <div key={options.rowIndex} className="flex flex-column  align-items-center justify-content-center">
              {data?.analysis?.map((analysisItem, analysisIndex) => (
                  <div key={analysisIndex} className="mb-2 ">
                            <p>({analysisIndex + 1})</p>
                            <div className="field grid gap-2">
                            <Button  className=" my-1 align-items-center" icon="pi pi-minus" onClick={() => deleteAnalysis(options.rowIndex, analysisIndex)} />

                            <InputTextarea
                             autoResize
                                value={analysisItem.userAction}
                                onChange={(e) => editUserAction(options.rowIndex, analysisIndex, e.target.value)}
                                rows={2} 
                                cols={30}
                            />
                            </div>

                  </div>
              ))}
                <Button className='mt-3 align-items-center' icon="pi pi-plus" onClick={() => addAnalysis(options.rowIndex)} />

          </div>
      );
    }

    const scenarioDescriptionTemplate = (data: Scenario, options:ColumnBodyOptions) => {
        return (
            <div key={options.rowIndex} className='field grid gap-2'>
            <Button  className="my-1 align-items-center" icon="pi pi-minus" onClick={() => deleteScenario(options.rowIndex)} />
        <InputTextarea
                autoResize
                value={data.description}
                onChange={(e) => editScenarioDescription(options.rowIndex, e.target.value)}
            />
            </div>
    
        );
    }

 
   

    // Save Excel file
    const saveAsExcelFile = (buffer: string, fileName: string) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });

                module.default.saveAs(data, fileName  + EXCEL_EXTENSION);
            }
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            // Define column headers in French
            const headers = {
                description: 'Description',
                userAction: 'Action Utilisateur',
                detailledTask: 'Tâches Raffinées',
                klmActions: 'Actions KLM Correspondantes',
                averageTime: 'Temps Estimé'
            };
    
            // Prepare the data with line breaks, grouped by scenarios and tasks
            const formattedData: any[] = [];
    
            // Track row indices for merging and styling
            let rowIndex = 1;
    
            // Loop through each scenario
            scenarios.forEach((scenario) => {
    
                formattedData.push({
                    description: scenario.description,
                    userAction: "",
                    detailledTask: "",
                    klmActions: "",
                    averageTime: ""
                });
                rowIndex++;
    
                scenario.analysis.forEach((analysis) => {
    
                    formattedData.push({
                        description: "",
                        userAction: analysis.userAction,
                        detailledTask: "",
                        klmActions: "",
                        averageTime: ""
                    });
                    rowIndex++;
    
                    analysis.detailledTask.forEach((task) => {
    
                        formattedData.push({
                            description: "",
                            userAction: "",
                            detailledTask: task.description,
                            klmActions: "",
                            averageTime: ""
                        });
                        rowIndex++;
    
                        task.klm.forEach((klmAction) => {
                            formattedData.push({
                                description: "",
                                userAction: "",
                                detailledTask: "",
                                klmActions: klmAction.operator,
                                averageTime: klmAction.time?.toFixed(2) || ""
                            });
                            rowIndex++;
                        });
                    });
                });
    
                // After each scenario, add the total time at the bottom right
                formattedData.push({
                    description: "",
                    userAction: "",
                    detailledTask: "",
                    klmActions: "Temps Total du Scénario",
                    averageTime: scenario.time.toFixed(2) + 's' // Total time for the scenario
                });
                rowIndex++;
            });
    
            // Create the worksheet from the formatted data
            const worksheet = xlsx.utils.json_to_sheet(formattedData, { header: Object.keys(headers) });
            worksheet['!merges'] = [];
    
            // Center all the text in the worksheet
            Object.keys(worksheet).forEach(key => {
                if (key[0] !== '!') { // Ignore special properties like '!ref'
                    worksheet[key].s = {
                        alignment: { horizontal: 'center', vertical: 'center', wrapText: true }
                    };
                }
            });
    
            // Loop through each scenario again to add merge regions
            rowIndex = 1;
            scenarios.forEach((scenario) => {
                const startScenarioRowIndex = rowIndex;
                rowIndex++; // For scenario description
    
                scenario.analysis.forEach((analysis) => {
                    const startAnalysisRowIndex = rowIndex;
                    rowIndex++; // For analysis user action
    
                    analysis.detailledTask.forEach((task) => {
                        const startTaskRowIndex = rowIndex;
                        rowIndex++; // For task description
    
                        task.klm.forEach(() => {
                            rowIndex++; // For each KLM action
                        });
    
                        // Merge cells for "empty" rows within a task
                        if (rowIndex - startTaskRowIndex > 1) {
                            if (worksheet['!merges']) 
                            worksheet['!merges'].push({
                                s: { r: startTaskRowIndex, c: 2 }, // Start cell (row, column)
                                e: { r: rowIndex - 1, c: 2 } // End cell (row, column)
                            });
                        }
                    });
    
                    // Merge cells for "empty" rows within an analysis
                    if (rowIndex - startAnalysisRowIndex > 1) {
                        if (worksheet['!merges']) 
                        worksheet['!merges'].push({
                            s: { r: startAnalysisRowIndex, c: 1 }, // Start cell (row, column)
                            e: { r: rowIndex - 1, c: 1 } // End cell (row, column)
                        });
                    }
                });
    
                // Merge cells for "empty" rows within a scenario
                if (rowIndex - startScenarioRowIndex > 1) {
                    if (worksheet['!merges']) 
                    worksheet['!merges'].push({
                        s: { r: startScenarioRowIndex, c: 0 }, // Start cell (row, column)
                        e: { r: rowIndex - 1, c: 0 } // End cell (row, column)
                    });
                }
            });
    
            // Create the workbook and write the data to an Excel file
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    
            // Save the file
            saveAsExcelFile(excelBuffer, 'scenarios_export.xlsx');
        });
    };
    const exportCSV = () => {
        // Prepare the data as a flat array of strings, grouped by scenarios and tasks
        const csvRows = [];
        const headers = ["Description", "Action Utilisateur", "Tâches Raffinées", "Actions KLM Correspondantes", "Temps Estimé"];
    
        // Add headers to the CSV
        csvRows.push(headers.join(','));
    
        // Loop through each scenario
        scenarios.forEach((scenario) => {
            csvRows.push([scenario.description, "", "", "", ""].join(','));
    
            scenario.analysis.forEach((analysis) => {
                csvRows.push(["", analysis.userAction, "", "", ""].join(','));
    
                analysis.detailledTask.forEach((task) => {
                    csvRows.push(["", "", task.description, "", ""].join(','));
    
                    task.klm.forEach((klmAction) => {
                        csvRows.push(["", "", "", klmAction.operator, klmAction.time?.toFixed(2) || ""].join(','));
                    });
                });
            });
    
            // After all tasks for a scenario, add the total scenario time
            csvRows.push(["", "", "", "Temps Total du Scénario", scenario.time.toFixed(2) + 's'].join(','));
        });
    
        // Convert the array of strings into a single CSV string
        const csvString = csvRows.join('\n');
    
        // Create a blob from the CSV string and trigger a download
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        import('file-saver').then((module) => {
            if (module && module.default) {
                module.default.saveAs(blob, 'scenarios_export.csv');
            }
        })
        
    };
    return (
        <div className="flex w-full h-screen flex-column align-items-center justify-content-between m-3 gap-5 ">
            <div className="flex flex-column">
                <div className="flex justify-content-between gap-3 my-4">
                    <Button className=" ml-5 mx-3 "label="Ajouter un nouveau scénario" icon="pi pi-plus" onClick={handleNewScenario} />
                   <div>
                   <Button
                        className="mr-3 align-items-centers  "
                        type="button"
                        icon="pi pi-file"
                        rounded
                        onClick={exportExcel}
                        data-pr-tooltip="XLS"
                    />
                    <Button type="button" severity="warning" icon="pi pi-file" rounded onClick={exportCSV} data-pr-tooltip="CSV" />
                   </div>

                </div>

                <div className="card">
                    <DataTable
                        ref={dt}
                        value={scenarios}
                        removableSort
                        paginator
                        rows={1}
                        stripedRows
                        showGridlines
                        className='w-auto'
                        tableStyle={{ minWidth: '60rem' }}
                        filterDisplay="row"
                        emptyMessage={<p>Pas de tâches pour ce scénario</p>}
                    >
                        <Column
                            key="Description"
                            field="description"
                            header="Description"
                            className='w-1'
                            body={scenarioDescriptionTemplate}
                        ></Column>
                        <Column
                            key="Action utilisateur"
                            field="userAction"
                            body={detailledActionTemplate}

                            header="Action utilisateur"
                        ></Column>
                        <Column
                            key="Tâches raffinées"
                            field="detailledTask"
                            body={detailledTaskTemplate}
                            header="Tâches raffinées"
                        ></Column>
                        <Column
                            key="Action KLM correspondantes"
                            field="detailledTask"
                            body={detailledKLMTemplate}
                            header="Action KLM correspondantes"
                        ></Column>
                        <Column className="w-1" key="Temps estimé" field="time" header="Temps estimé (s)" 
                         ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default App;
