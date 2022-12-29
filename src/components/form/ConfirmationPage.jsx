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
  );
}
