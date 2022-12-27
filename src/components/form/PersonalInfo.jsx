import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateStepper, userDetailsModified } from "../../store/UserDetailsSlice";
import "./Form.css";
import FormInput from "./FormInput";
import NextStepHandler from "./NextStepHandler";

export default function PersonalInfo() {
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "data");
    
    dispatch(updateStepper(userDetails.currentStep + 1));
  };

  const userDetailsChanged = (ev) => {
    let data = {
      [ev.target.name]: ev.target.value,
    };
    dispatch(userDetailsModified(data));
  };

  console.log(userDetails, "sad");
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
            <Typography>Name</Typography>
            <FormInput
              name={"name"}
              value={userDetails.name}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              onChange={userDetailsChanged}
              // errors={errors}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Email</Typography>
            <FormInput
              name={"email"}
              value={userDetails.email}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="email"
              // errors={errors}
              onChange={userDetailsChanged}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Mobile Number</Typography>
            <FormInput
              name={"mobile"}
              value={userDetails.mobile}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              // errors={errors}
              onChange={userDetailsChanged}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Address Line 1</Typography>
            <FormInput
              name={"addr1"}
              value={userDetails.addr1}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              // errors={errors}
              onChange={userDetailsChanged}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Address Line 2</Typography>
            <FormInput
              name={"addr2"}
              value={userDetails.addr2}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              // errors={errors}
              onChange={userDetailsChanged}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Address Line 3</Typography>
            <FormInput
              name={"addr3"}
              value={userDetails.addr3}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              // errors={errors}
              onChange={userDetailsChanged}
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
