import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { putUserDetails } from "../../api/Crud";
import { metaDataValidation } from "../../utils/Utils";
import NextStepHandler from "./NextStepHandler";
import Profile from "./ProfileInfo";

export default function ConfirmationPage() {
  const storeData = useSelector((state) => state.userDetails);
  const personalDetails = storeData.userData.personalDetails;
  const officeDetails = storeData.userData.officeDetails;
  const metaData = storeData.userData.meta;
  const [validationError, setValidationError] = useState(false);

  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const checkIfMetaDataAdded = metaDataValidation(metaData);

  /**
   * @description sets the validation message if either avatar or signature is missing
   *
   */
  const onSubmit = (data) => {
    if (!checkIfMetaDataAdded) {
      setValidationError(true);
      return;
    }
    setValidationError(false);

    let tempMetaData = Object.assign({}, metaData);
    tempMetaData.isCompleted = true;
    let updatedObj = {
      meta: tempMetaData,
    };

    dispatch(putUserDetails(updatedObj));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ flexDirection: "column", gap: "20px" }}
    >
      <div className="confirmationPageContainer">
        {validationError ? (
          <span className="validationMessage">
            Avatar / Signature is misssing
          </span>
        ) : null}
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <div className="formGroup">
              <Typography>{personalDetails.name}</Typography>
            </div>
            <div className="formGroup">
              <Typography>{personalDetails.email}</Typography>
            </div>
            <div className="formGroup">
              <Typography>{personalDetails.mobile}</Typography>
            </div>
            <div className="formGroup">
              <Typography>{personalDetails.addr1}</Typography>
            </div>
            <div className="formGroup">
              <Typography>{personalDetails.addr2}</Typography>
            </div>
            <div className="formGroup">
              <Typography>{personalDetails.addr3}</Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="formGroup">
              <Typography>{officeDetails.buildingName}</Typography>
            </div>
            <div className="formGroup">
              <Typography>{officeDetails.city}</Typography>
            </div>
            <div className="formGroup">
              <Typography>{officeDetails.landLine}</Typography>
            </div>
            <div className="formGroup">
              <Typography>{officeDetails.addr1}</Typography>
            </div>
            <div className="formGroup">
              <Typography>{officeDetails.addr2}</Typography>
            </div>
            <div className="formGroup">
              <Typography>{officeDetails.pbNo}</Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Profile />
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <NextStepHandler isLastStep={true} />
      </div>
    </form>
  );
}
