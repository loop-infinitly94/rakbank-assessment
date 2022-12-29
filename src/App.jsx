import React from "react";
import ConfirmationPage from "./components/form/ConfirmationPage";
import OfficeInfo from "./components/form/OfficeInfo";
import PersonalInfo from "./components/form/PersonalInfo";
import StepperComponent from "./components/stepper/Stepper";
import "./App.css";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const steps = ["Step 1", "Step 2", "Step 3"];
const stepComponent = [<PersonalInfo />, <OfficeInfo />, <ConfirmationPage />];
const stepsHeader = ["Personal Info", "Office Info", "Confirmation Page"];

function App() {
  const isLoading = useSelector((state) => state.userDetails).status;
  return (
    <div className="MainContainer">
      <header>App</header>
      <div className="Content">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading === "loading"}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
