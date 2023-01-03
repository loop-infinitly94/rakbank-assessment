import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStepper } from "../../store/UserDetailsSlice";

export default function NextStepHandler({ isLastStep }) {
  const storeData = useSelector((state) => state.userDetails);
  const currentStep = storeData.userData.meta.currentStep;
  const dispatch = useDispatch();

  const onBackPressed = () => {
    dispatch(updateStepper(currentStep - 1));
  };

  return (
    <>
      {isLastStep ? (
        <input
          type="button"
          className="backButton"
          value={"back"}
          onClick={onBackPressed}
        />
      ) : null}
      <input type="submit" value={isLastStep ? "Submit" : "Next"} />
    </>
  );
}
