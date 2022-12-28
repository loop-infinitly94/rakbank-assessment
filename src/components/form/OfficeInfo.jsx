import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  officeDetailsModified,
  //   personalDetailsModified,
  postUserDetails,
  updateStepper,
} from "../../store/UserDetailsSlice";
import "./Form.css";
import FormInput from "./FormInput";
import NextStepHandler from "./NextStepHandler";

export default function OfficeInfo() {
  const storeData = useSelector((state) => state.userDetails);
  const officeDetails = storeData.userData.officeDetails;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "data");
    // const { name, email, mobile, addr1, addr2, addr3 } = data;
    // let personalDetails = {
    //   name,
    //   email,
    //   mobile,
    //   addr1,
    //   addr2,
    //   addr3,
    // };

    // console.log({ personalDetails });
    return;
    // dispatch(postUserDetails({ personalDetails }));
  };

  const userDetailsChanged = (ev) => {
    let data = {
      [ev.target.name]: ev.target.value,
    };
    dispatch(officeDetailsModified(data));
  };
  console.log(storeData, "sad");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <div className="formGroup">
            <Typography>Building Name</Typography>
            <FormInput
              name={"buildingName"}
              formValue={officeDetails.buildingName}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              onChangeText={userDetailsChanged}
              errors={errors}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>City/Town</Typography>
            <FormInput
              name={"city"}
              formValue={officeDetails.city}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email is Not Valid",
                },
              }}
              defaultValue=""
              type="text"
              errors={errors}
              onChangeText={userDetailsChanged}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Telephone Number</Typography>
            <FormInput
              name={"landLine"}
              formValue={officeDetails.landLine}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              errors={errors}
              onChangeText={userDetailsChanged}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Address Line 1</Typography>
            <FormInput
              name={"addr1"}
              formValue={officeDetails.addr1}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              errors={errors}
              onChangeText={userDetailsChanged}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Address Line 2</Typography>
            <FormInput
              name={"addr2"}
              formValue={officeDetails.addr2}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              errors={errors}
              onChangeText={userDetailsChanged}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Postbox number</Typography>
            <FormInput
              name={"addr3"}
              formValue={officeDetails.pbNo}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              errors={errors}
              onChangeText={userDetailsChanged}
              control={control}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <NextStepHandler />
        </Grid>
      </Grid>
    </form>
  );
}
