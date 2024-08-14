import { Dropdown } from "primereact/dropdown";
import { Task } from "../types/global";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

import { KLMvalues } from "../types/global";


interface TaskProps {
    task: Task;
    setTask: (task: Task) => void;
}
export const TaskContent: React.FC<TaskProps> = (props:TaskProps) => {
    const task = props.task
    return(<></>)
    /*
    const changeKLMKey = (klmIndex: number, value:string ) => {
        let _task = {...task};
        _task.klm[klmIndex].operator = value;
        props.setTask(_task);
    }
    const changeCount = (klmIndex: number, value: number) => {
        let _task = {...task};
        _task.klm[klmIndex].count = value;
        const klmAction = _task.klm[klmIndex].operator;  // Assuming klm has a label property
        const option = options.find(option => option.label === klmAction);
        
        if (option) {
            _task.klm[klmIndex].count = value;
            _task.klm[klmIndex].time = value * option.value;
        }
        
        props.setTask(_task);
    }
    const changeNumber = (klmIndex: number, value: number ) => {
        let _task = {...task};
        _task.klm[klmIndex].time = value;
        props.setTask(_task);
    }

    return (<div >

    {task.klm.map((klm, index) => (
            <div key={index} className="flex">
                <div className="field grid justify-content-between" style={{margin:"5px", marginRight:"5"}}>
                <Dropdown className="mr-2" size={1} value={klm.operator} options={options} onChange={(e) => changeKLMKey(index, e.value)} optionLabel="label" placeholder="Op" />
                    <label htmlFor="count" className="mx-2 font-bold  mb-2">Count</label>
                    <InputNumber size={1} id="count" value={klm.count} onValueChange={(e: InputNumberValueChangeEvent) => changeCount(index, e.value ?? 0)} mode="decimal" showButtons min={0} />
                    <label htmlFor="time" className="font-bold  mb-2">Time</label>
                    <InputNumber size={1} id="time" value={klm.time} onValueChange={(e: InputNumberValueChangeEvent) => changeNumber(index, e.value ?? 0)} mode="decimal" min={0} />
                </div>

            </div>
        ))
        
      
    }
    </div>
    );
    */
}