import { Button } from "@mui/material";
import React from "react";

export default function NextStepHandler({ isLastStep }) {
  console.log(isLastStep);
  return (
    <>
      {isLastStep ? <input type="submit" value={"back"} /> : null}
      <input type="submit" value={isLastStep ? "Submit" : "Next"} />
    </>
  );
}
