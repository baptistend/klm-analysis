import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import { KLMvalues } from "../types/global";
import { KLM } from "../types/global";

interface TaskProps {
    klm: KLM;
    setKLM: (klm: KLM) => void;
}

export const TaskContent: React.FC<TaskProps> = ({ klm, setKLM }) => {
    const [operator, setOperator] = useState<string>(klm.operator);


    const handleOperatorChange = (e: any) => {
        const updatedKLM = { ...klm, operator: e.label }; // Create a new KLM object with the updated `count`

        setKLM(updatedKLM);
    };

    const handleCountChange = (value: number) => {
        const updatedKLM = { ...klm, count: value }; // Create a new KLM object with the updated `count`
        setKLM(updatedKLM); // Set the updated KLM object
    };
    
    const handleNChange = (value: number) => {
        const updatedKLM = { ...klm, n: value }; // Create a new KLM object with the updated `n`
        setKLM(updatedKLM); // Set the updated KLM object
    };
    

    const handleLChange = (value: number) => {
        const updatedKLM = { ...klm, l: value }; // Create a new KLM object with the updated `l`
        setKLM(updatedKLM);
    };

    useEffect(() => {
    }, [operator])

    return (
        <div className="flex align-items-center gap-2">
            <Dropdown
            size={1}
                value={operator}
                options={KLMvalues.map(k => ({ label: k.label, value: k.label }))}
                onChange={handleOperatorChange}
            />

            {operator === "D" ? (
                <>
                    <InputNumber size={1} value={klm.n} onChange={(e) => handleNChange(e.value as number)} placeholder="n" />
                    <InputNumber size={1} value={klm.l} onChange={(e) => handleLChange(e.value as number)} placeholder="l" />
                </>
            ) : (
                <InputNumber size={1} mode="decimal" showButtons value={klm.count} onChange={(e) => handleCountChange(e.value as number)} />
            )}
        </div>
    );
};
