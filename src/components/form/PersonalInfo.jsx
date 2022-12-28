import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  personalDetailsModified,
  postUserDetails,
  updateStepper,
} from "../../store/UserDetailsSlice";
import "./Form.css";
import FormInput from "./FormInput";
import NextStepHandler from "./NextStepHandler";

export default function PersonalInfo() {
  const storeData = useSelector((state) => state.userDetails);
  const personalDetails = storeData.userData.personalDetails;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "data");
    const { name, email, mobile, addr1, addr2, addr3 } = data;
    let personalDetails = {
      name,
      email,
      mobile,
      addr1,
      addr2,
      addr3,
    };

    console.log({ personalDetails });
    return;
    // dispatch(postUserDetails({ personalDetails }));
  };

  const userDetailsChanged = (ev) => {
    let data = {
      [ev.target.name]: ev.target.value,
    };
    dispatch(personalDetailsModified(data));
  };

  //   console.log(errors, "aaaa");
  console.log(personalDetails, "sad");
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
              formValue={personalDetails.name}
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
            <Typography>Email</Typography>
            <FormInput
              name={"email"}
              formValue={personalDetails.email}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email is Not Valid",
                },
              }}
              defaultValue=""
              type="email"
              errors={errors}
              onChangeText={userDetailsChanged}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Mobile Number</Typography>
            <FormInput
              name={"mobile"}
              formValue={personalDetails.mobile}
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
              formValue={personalDetails.addr1}
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
              formValue={personalDetails.addr2}
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
            <Typography>Address Line 3</Typography>
            <FormInput
              name={"addr3"}
              formValue={personalDetails.addr3}
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
