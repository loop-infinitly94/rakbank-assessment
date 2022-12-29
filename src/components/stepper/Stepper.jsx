import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import "./Stepper.css";
import { useDispatch, useSelector } from "react-redux";
import { updateStepper } from "../../store/UserDetailsSlice";

export default function StepperComponent({
  steps,
  stepComponent,
  stepsHeader,
}) {
  const dispatch = useDispatch();
  let activeStep = useSelector((state) => state.userDetails).userData.meta
    .currentStep;
  const selectedStep = useSelector((state) => state.userDetails).currentStep;
  if (selectedStep <= activeStep) {
    activeStep = selectedStep;
  }

  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    dispatch(updateStepper(newActiveStep));
  };

  const handleBack = () => {
    dispatch(updateStepper((prevActiveStep) => prevActiveStep - 1));
  };

  const handleStep = (step) => () => {
    console.log(activeStep, "test");
    if (step >= activeStep) {
      return;
    }
    dispatch(updateStepper(step));
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    dispatch(updateStepper(0));
    setCompleted({});
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        flex: "1",
      }}
    >
      <div className="stepsHeader">{stepsHeader[activeStep]}</div>
      <Stepper className="" nonLinear activeStep={activeStep} disabled={true}>
        {steps.map((label, index) => (
          <Step
            key={label}
            completed={completed[index]}
            style={{ flexDirection: "column" }}
          >
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className="stepeprComponent">
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="currentComponent">{stepComponent[activeStep]}</div>
            {/* <div className="actionComponent">Action Part</div> */}
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box> */}
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
