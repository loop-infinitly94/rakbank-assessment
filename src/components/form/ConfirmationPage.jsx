import { Grid, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { putUserDetails } from "../../api/PutUser";
import {
  deepEquals,
  getCurrentUser,
  metaDataValidation,
} from "../../utils/Utils";
import NextStepHandler from "./NextStepHandler";
import Profile from "./ProfileInfo";

export default function ConfirmationPage() {
  const storeData = useSelector((state) => state.userDetails);
  const personalDetails = storeData.userData.personalDetails;
  const officeDetails = storeData.userData.officeDetails;
  const metaData = storeData.userData.meta;
  const userId = getCurrentUser();

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(metaData, "metaData");

    const checkIfMetaDataAdded = metaDataValidation(metaData);

    if (!checkIfMetaDataAdded) {
      return;
    }
    let updatedObj = {
      meta: metaData,
    };

    dispatch(putUserDetails(updatedObj));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ flexDirection: "column", gap: "20px" }}
    >
      <div className="confirmationPageContainer">
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
