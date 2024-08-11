import { Analysis, KLM } from "../types/global";
import { InputText } from 'primereact/inputtext';
import { Column , ColumnEditorOptions } from 'primereact/column';
import {DataTable, DataTableRowEditCompleteEvent} from 'primereact/datatable';
        import { Task } from "../types/global";
        import React, { useEffect, useRef, ChangeEvent} from 'react';
        import { Button } from "primereact/button";
import { TaskContent } from "./Task";
interface analysisProps {
    analysis:Analysis[],
    scenario:string,
    setAnalysis:(analysis:Analysis[]) => void,
    addAnalysis:() => void
}

export const AnalysisContent : React.FC<analysisProps> = (props:analysisProps) => {
    const analysis = props.analysis;
    const dt = useRef<DataTable<any>>(null);
    useEffect(() => {
    
    
    }, [props])
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">{props.scenario}</span>
        </div>
    );

    const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
        let _analysis = [...analysis];
        let { newData, index } = e;
        _analysis[index] = newData as Analysis;
        props.setAnalysis(_analysis);
    };

    const detailledTaskBodyTemplate = (data: Analysis) => {

        return (
            <div>
                {data?.detailledTask?.map((task, index) => (
                    <div key={index} className="flex flex-column">
                        <label className="font-bold block mb-2">{task.description}</label>
                        <TaskContent task={task} setTask={(task: Task) => {
                            let _analysis = [...analysis];
                            _analysis[analysis.indexOf(data)].detailledTask[index] = task;
                            props.setAnalysis(_analysis);
                        }
                        } />
                                            </div>
                ))}
            </div>
        );
    }
    const userActionEditor = (options: ColumnEditorOptions) => {
        return(
            <InputText
                value={options.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)}
            />
        );
    };
    const saveAsExcelFile = (buffer:string, fileName:string) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };


    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(analysis);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'aac');
        });
    };


    return (

        <div className="flex flex-column ">
            <div className="flex justify-content-end mb-4">
                <Button label="Ajouter une action utilisateur" icon="pi pi-plus" onClick={props.addAnalysis}/>
                <Button className="ml-auto mb-3" type="button" icon="pi pi-file" rounded onClick={exportExcel} data-pr-tooltip="XLS"/>
            </div>

            <div className="card">
            <DataTable  ref={dt} value={analysis} onRowEditComplete={onRowEditComplete} editMode="row" removableSort
                           paginator header={header} rows={10} stripedRows showGridlines tableStyle={{minWidth: '60rem'}}
                           filterDisplay="row" emptyMessage={<p>Pas de tâches pour ce scénario</p>}>

                <Column key="Action utilisateur" field="userAction" sortable header="Action utilisateur" editor={userActionEditor}></Column>
                <Column key="Tâches raffinées" field="detailledTask" body={detailledTaskBodyTemplate} sortable header="Tâches raffinées"  ></Column>
                <Column key="Temps estimé" field="averageTime" header="Temps estimé" sortable ></Column>
                <Column rowEditor={true} header="Action" headerStyle={{ width: '10%', minWidth: '8rem' }}></Column>
            </DataTable>

        </div>
        </div>
    );
}