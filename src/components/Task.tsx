import { Task } from "../types/global";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
interface TaskProps {
    task: Task;
    setTask: (task: Task) => void;
}
export const TaskContent: React.FC<TaskProps> = (props:TaskProps) => {
    const task = props.task
    const changeKLMKey = (klmIndex: number, value:string ) => {
        let _task = {...task};
        _task.klm[klmIndex].operator = value;
        props.setTask(_task);
    }
    const changeCount = (klmIndex: number, value: number) => {
        let _task = {...task};
        _task.klm[klmIndex].count = value;
        props.setTask(_task);
    }
    const changeNumber = (klmIndex: number, value: number ) => {
        let _task = {...task};
        _task.klm[klmIndex].time = value;
        props.setTask(_task);
    }

    return (<div className="flex flex-column gap-4">

    {task.klm.map((klm, index) => (
            <div key={index} className=" flex flex-row  my-5">
                <div className="field grid gap-3">
                    <label htmlFor="operator" className="mr-2 font-bold block mb-2">Operator</label>
                    <InputText className="p-inputtext-sm " size={2} id="operator" value={klm.operator} onChange={(e) => changeKLMKey(index, e.target.value)} />
                    <label htmlFor="count" className="mx-2 font-bold block mb-2">Count</label>
                    <InputNumber size={2} className="w-auto" id="count" value={klm.count} onValueChange={(e: InputNumberValueChangeEvent) => changeCount(index, e.value ?? 0)} mode="decimal" showButtons min={0} />
                    <label htmlFor="time" className="font-bold block mb-2">Time</label>
                    <InputNumber  size={2} className="w-1" id="time" value={klm.time} onValueChange={(e: InputNumberValueChangeEvent) => changeNumber(index, e.value ?? 0)} mode="decimal" min={0} />
                </div>
  
            </div>
        ))
        
      
    }
    </div>
    );
}