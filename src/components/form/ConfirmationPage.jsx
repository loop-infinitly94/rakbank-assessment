import { Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function ConfirmationPage() {
  const storeData = useSelector((state) => state.userDetails);
  const personalDetails = storeData.userData.personalDetails;
  const officeDetails = storeData.userData.officeDetails;

  return (
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
        </Grid>
        <Grid item xs={4}>
          <div className="formGroup">
            <Typography>Building Name</Typography>
            <Typography>{officeDetails.buildingName}</Typography>
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}
