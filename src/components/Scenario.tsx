import { useEffect, useState } from "react";
import {InputTextarea} from 'primereact/inputtextarea';
import { Scenario } from "../types/global";
import { Analysis } from "../types/global";
import { AnalysisContent } from "./Analysis";
interface scenarioProps {
    scenario:Scenario
    handleScenarioDescriptionChange:(description:string) => void,
    handleAnalysisChange:(analysis:Analysis[]) => void
    addAnalysis:() => void
}
export const ScenarioContent : React.FC<scenarioProps> = (props:scenarioProps) => {
    const [description, setDescription ] = useState<string>(props.scenario.description)

    useEffect(() => {
    
    }, [props])

  
    return (
        <div className="flex flex-column mt-19 gap-5">
            <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} autoResize />
            <AnalysisContent setAnalysis={props.handleAnalysisChange} scenario={props.scenario.description} analysis={props.scenario.analysis} addAnalysis={props.addAnalysis}/>
        </div>
    );
    
}