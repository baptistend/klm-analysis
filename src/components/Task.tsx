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


    const handleOperatorChange = (e: any) => {
        const updatedKLM = { ...klm, operator: e.value }; // Create a new KLM object with the updated `count`
        console.log(updatedKLM)
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
    
    const handleRChange = (value: number) => {
        const updatedKLM = { ...klm, r: value }; // Create a new KLM object with the updated `r`
        setKLM(updatedKLM); // Set the updated KLM object
    }
    const handleLChange = (value: number) => {
        const updatedKLM = { ...klm, l: value }; // Create a new KLM object with the updated `l`
        setKLM(updatedKLM);
    };

    useEffect(() => {
    }, [klm])

    return (
        <div className="flex align-items-center gap-2">
            <Dropdown
            size={1}
                value={klm.operator}
                options={KLMvalues.map(k => ({ label: k.label, value: k.label }))}
                onChange={handleOperatorChange}
            />

            {klm.operator === "D" ? (
                <>
                    <InputNumber size={1} value={klm.n} onChange={(e) => handleNChange(e.value as number)} placeholder="n" />
                    <InputNumber size={1} value={klm.l} onChange={(e) => handleLChange(e.value as number)} placeholder="l" />
                </>
            ) : <>
            {klm.operator === "R" ?                     
                 <InputNumber size={1} value={klm.r} onChange={(e) => handleRChange(e.value as number)} maxFractionDigits={2} placeholder="r" />
                 :
           
                <InputNumber size={1} mode="decimal" showButtons value={klm.count} onChange={(e) => handleCountChange(e.value as number)} />}
            </>
            
            }
            
        </div>
    );
};
