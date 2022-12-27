import React from "react";
import ConfirmationPage from "./components/form/ConfirmationPage";
import OfficeInfo from "./components/form/OfficeInfo";
import PersonalInfo from "./components/Form/PersonalInfo";
import StepperComponent from "./components/stepper/Stepper";
import "./App.css";

const steps = ["Step 1", "Step 2", "Step 3"];
const stepComponent = [<PersonalInfo />, <OfficeInfo />, <ConfirmationPage />];
const stepsHeader = ["Personal Info", "Office Info", "Confirmation Page"];

function App() {
  return (
    <div className="MainContainer">
      <header>App</header>
      <div className="Content">
        <StepperComponent
          steps={steps}
          stepComponent={stepComponent}
          stepsHeader={stepsHeader}
        />
      </div>
    </div>
  );
}

export default App;
