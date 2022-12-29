import { Grid, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import NextStepHandler from "./NextStepHandler";

export default function ConfirmationPage() {
  const storeData = useSelector((state) => state.userDetails);
  const personalDetails = storeData.userData.personalDetails;
  const officeDetails = storeData.userData.officeDetails;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm();

  const onSubmit = () => {};

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
              <Typography>Name</Typography>
              <Typography>{personalDetails.name}</Typography>
            </div>
            <div className="formGroup">
              <Typography>Email</Typography>
              <Typography>{personalDetails.email}</Typography>
            </div>
            <div className="formGroup">
              <Typography>Mobile number</Typography>
              <Typography>{personalDetails.mobile}</Typography>
            </div>
            <div className="formGroup">
              <Typography>Address line 1</Typography>
              <Typography>{personalDetails.addr1}</Typography>
            </div>
            <div className="formGroup">
              <Typography>Address line 2</Typography>
              <Typography>{personalDetails.addr2}</Typography>
            </div>
            <div className="formGroup">
              <Typography>Address line 3</Typography>
              <Typography>{personalDetails.addr3}</Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="formGroup">
              <Typography>Building Name</Typography>
              <Typography>{officeDetails.buildingName}</Typography>
            </div>
            <div className="formGroup">
              <Typography>City / Town</Typography>
              <Typography>{officeDetails.city}</Typography>
            </div>
            <div className="formGroup">
              <Typography>Telephone Number</Typography>
              <Typography>{officeDetails.landLine}</Typography>
            </div>
            <div className="formGroup">
              <Typography>Address line 1</Typography>
              <Typography>{personalDetails.addr1}</Typography>
            </div>
            <div className="formGroup">
              <Typography>Address line 2</Typography>
              <Typography>{personalDetails.addr2}</Typography>
            </div>
            <div className="formGroup">
              <Typography>Postbox No</Typography>
              <Typography>{personalDetails.pbNo}</Typography>
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
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
