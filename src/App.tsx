import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import {  Scenario } from './types/global';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';

import { useScenario } from './scenario/useScenario';
import { InputTextarea } from 'primereact/inputtextarea';
import { TaskContent } from './components/Task';

function App() {
    const [scenarios, handleNewScenario, handleScenarioDescriptionChange, 
      handleAnalysisChange, addAnalysis, dt,  addKLMAction,editScenarioDescription,
       editUserAction, updateKLM, addTask, handleTaskDescriptionChange] = useScenario();

    useEffect(() => {}, [scenarios]);

    const handleSaveScenario = () => {
        console.log('Saving scenario');
    };
    const detailledTaskTemplate = (data: Scenario) => {
      return (
          <div>
              {data?.analysis?.map((analysisItem, analysisIndex) => (
                  <div key={analysisIndex} className="mb-2">
                    <p>({analysisIndex + 1})</p>
                      {analysisItem.detailledTask.map((task, taskIndex) => (
                          <div key={taskIndex} className="ml-4">
                                       <p>&nbsp;&nbsp;({String.fromCharCode(97 + taskIndex)})</p>

                              <InputTextarea
                                value={task.description}
                                onChange={(e) => handleTaskDescriptionChange(0, analysisIndex, taskIndex, e.target.value)}
                                rows={2} 
                                cols={30}
                            />
                          </div>
                      ))}
                      <Button  icon="pi pi-plus" onClick={() => addTask(0, analysisIndex)} />

                  </div>
              ))}
          </div>
      );
  };
  
  // Template for detailed KLM actions
  const detailledKLMTemplate = (data: Scenario) => {
    
      return (
          <div>
              {data?.analysis?.map((analysisItem, analysisIndex) => (
                  <div key={analysisIndex} className="mb-2">
                               <p>({analysisIndex + 1})</p>

                      {analysisItem.detailledTask.map((task, taskIndex) => (
                          <div key={taskIndex} className="ml-4">
           <p>&nbsp;&nbsp;({String.fromCharCode(97 + taskIndex)})</p>
                              <ul className="ml-4">
                                  {task.klm.map((klmAction, klmIndex) => (
                                      <TaskContent key={klmIndex} klm={klmAction}         setKLM={(updatedKLM) =>
                                        updateKLM(0, analysisIndex, taskIndex, klmIndex, updatedKLM)
                                    } />
                                  ))}
                                  <Button  icon="pi pi-plus" onClick={() => addKLMAction(0, analysisIndex, taskIndex)} />
                              </ul>
                          </div>
                      ))}
                  </div>
              ))}
          </div>
      );
  };
  const detailledActionTemplate = (data: Scenario) => {
      return (
          <div>
              {data?.analysis?.map((analysisItem, analysisIndex) => (
                  <div key={analysisIndex} className="mb-2">
                            <p>({analysisIndex + 1})</p>
                            <InputTextarea
                                value={analysisItem.userAction}
                                onChange={(e) => editUserAction(0, analysisIndex, e.target.value)}
                                rows={2} 
                                cols={30}
                            />

                  </div>
              ))}
                                    <Button  icon="pi pi-plus" onClick={() => addAnalysis(0)} />

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

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
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
              klmActions: 'Action KLM Correspondantes',
              averageTime: 'Temps Estimé'
          };
  
          // Prepare the data with line breaks
          const formattedData = scenarios.map(scenario => ({
              description: scenario.description,
              userAction: scenario.analysis.map(a => a.userAction).join('\n'),
              detailledTask: scenario.analysis.flatMap(a => a.detailledTask.map(t => t.description)).join('\n'),
              klmActions: scenario.analysis.flatMap(a => a.detailledTask.flatMap(t => t.klm.map(klm => `${klm.operator}: ${klm.time?.toFixed(2)}s`))).join('\n'),
              averageTime: scenario.analysis.reduce((total, a) => total + a.averageTime, 0).toFixed(2) + 's'
          }));
  
          // Create the worksheet with formatted data
          const worksheet = xlsx.utils.json_to_sheet(formattedData, { header: Object.keys(headers) });
          Object.keys(worksheet).forEach(key => {
            if (key !== '!ref' && key !== '!cols') { // Skip special properties
                worksheet[key].s = {
                    alignment: { wrapText: true } // Enable text wrapping
                    
                };
            }
        });
          // Add column headers to the first row
          const headerRow = Object.values(headers);
          headerRow.forEach((header, index) => {
              const cellAddress = xlsx.utils.encode_cell({ r: 0, c: index });
              worksheet[cellAddress] = { v: header, t: 's' }; // Set header value
              worksheet[cellAddress].s = { font: { bold: true }, fill: { fgColor: { rgb: 'FFFF00' } } }; // Style header
          });
  
          // Create the workbook
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  
          // Save the file
          saveAsExcelFile(excelBuffer, 'scenarios_export');
      });
  };

    return (
        <div className="flex w-full h-screen flex-column align-items-center justify-content-between gap-5 my-5">
            <div className="flex flex-column">
                <div className="flex justify-content-end mb-4">
                    <Button label="Ajouter un nouveau scénario" icon="pi pi-plus" onClick={handleNewScenario} />
                    <Button
                        className="ml-auto mb-3"
                        type="button"
                        icon="pi pi-file"
                        rounded
                        onClick={exportExcel}
                        data-pr-tooltip="XLS"
                    />
                </div>

                <div className="card">
                    <DataTable
                        ref={dt}
                        value={scenarios}
                        removableSort
                        paginator
                        rows={10}
                        stripedRows
                        showGridlines
                        tableStyle={{ minWidth: '60rem' }}
                        filterDisplay="row"
                        emptyMessage={<p>Pas de tâches pour ce scénario</p>}
                    >
                        <Column
                            key="Description"
                            field="description"
                            header="Description"
                            sortable
                            editor={(props) => (
                                <InputText
                                    value={props.rowData.description}
                                    onChange={(e) => handleScenarioDescriptionChange(e.target.value, props.rowIndex)}
                                />
                            )}
                        ></Column>
                        <Column
                            key="Action utilisateur"
                            field="userAction"
                            sortable
                            body={detailledActionTemplate}

                            header="Action utilisateur"
                        ></Column>
                        <Column
                            key="Tâches raffinées"
                            field="detailledTask"
                            body={detailledTaskTemplate}
                            sortable
                            header="Tâches raffinées"
                        ></Column>
                        <Column
                            key="Action KLM correspondantes"
                            field="detailledTask"
                            body={detailledKLMTemplate}
                            sortable
                            header="Action KLM correspondantes"
                        ></Column>
                        <Column key="Temps estimé" field="time" header="Temps estimé (s)" sortable ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default App;
