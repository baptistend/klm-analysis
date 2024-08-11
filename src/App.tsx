import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import {Analysis, Scenario} from './types/global';
import { ScenarioContent } from './components/Scenario';
const emptyScenario: Scenario = {
  description: '',
  analysis: []
}

const fakeScenario: Scenario = {
  description: "User testing a new email client application to send an email with an attachment.",
  analysis: [
      {
          userAction: "Open the email client",
          detailledTask: [
              {
                  description: "Locate and click on the email client icon on the desktop",
                  klm: [
                      { operator: "K", count: 1, time: 0.2 }, // Keypress to wake up the screen
                      { operator: "P", count: 1, time: 1.1 }, // Pointing to the icon
                      { operator: "C", count: 1, time: 0.1 }, // Clicking the icon
                  ],
                  taskTime: 1.4
              }
          ],
          averageTime: 1.4
      },
      {
          userAction: "Compose a new email",
          detailledTask: [
              {
                  description: "Click on 'New Email' button",
                  klm: [
                      { operator: "P", count: 1, time: 1.2 }, // Pointing to 'New Email' button
                      { operator: "C", count: 1, time: 0.1 }, // Clicking the button
                  ],
                  taskTime: 1.3
              },
              {
                  description: "Enter the recipient's email address",
                  klm: [
                      { operator: "K", count: 15, time: 3.0 }, // Typing the email address
                  ],
                  taskTime: 3.0
              },
              {
                  description: "Type the subject of the email",
                  klm: [
                      { operator: "K", count: 10, time: 2.0 }, // Typing the subject
                  ],
                  taskTime: 2.0
              },
              {
                  description: "Attach a file",
                  klm: [
                      { operator: "P", count: 1, time: 1.5 }, // Pointing to 'Attach' button
                      { operator: "C", count: 1, time: 0.1 }, // Clicking the button
                      { operator: "P", count: 1, time: 2.0 }, // Pointing to the file in the dialog
                      { operator: "C", count: 1, time: 0.1 }, // Clicking the file to select it
                      { operator: "K", count: 1, time: 0.5 }, // Pressing 'Enter' to attach
                  ],
                  taskTime: 4.2
              },
              {
                  description: "Send the email",
                  klm: [
                      { operator: "P", count: 1, time: 1.3 }, // Pointing to 'Send' button
                      { operator: "C", count: 1, time: 0.1 }, // Clicking 'Send'
                  ],
                  taskTime: 1.4
              }
          ],
          averageTime: 11.9
      }
  ]
};

function App()   {
  const [building, setBuilding] = useState<boolean>(false);
  const [scenario, setScenario ] = useState<Scenario | undefined>()
  const handleNewScenario = () => {
    setScenario(fakeScenario);
    setBuilding(true);
  }
  const handleScenarioDescriptionChange = (description: string) => {
    if (scenario) {
      setScenario({
        ...scenario,
        description
      });
    }
  }
  const handleAnalysisChange = (analysis: Analysis[]) => {
    setScenario({
      ...scenario!,
      analysis: analysis
    });
  }

  const addAnalysis = () => {
    if (scenario) {
      setScenario({
        ...scenario,
        analysis: [
          ...scenario.analysis,
          {
            userAction: '',
            detailledTask: [],
            averageTime: 0
          }
        ]
      });
    }
  }

  const handleSaveScenario = () => {
    console.log('Saving scenario');
  }
  useEffect(() => {
    if (building) {
      console.log('Building a new scenario');
    }
  }, [building]);

  if (!building) {
    return (
      <div className='flex align-items-center justify-content-between'>
        <Button className="bg-primary" label="Créer un nouveau scénario" onClick={handleNewScenario} />
      </div>
    );
  }
  else{
    return (
      <div className='flex w-full h-screen flex-column align-items-center justify-content-between gap-5 my-5'>
      <div className='flex flex-row gap-4 justify-content-center mt-5'>
          <Button className="bg-primary" label="Annuler le scénario" onClick={() => setBuilding(false)} />
          <Button className="bg-primary" label="Enregistrer le scénario" onClick={handleSaveScenario} />
      </div>

          <ScenarioContent scenario={scenario!} 
          handleScenarioDescriptionChange={handleScenarioDescriptionChange}
          handleAnalysisChange={handleAnalysisChange} 
          addAnalysis={addAnalysis}
          />
        </div>  );
  }

}

export default App;
