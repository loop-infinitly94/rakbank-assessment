import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./Form.css";
import FormInput from "./FormInput";
import NextStepHandler from "./NextStepHandler";

export default function PersonalInfo() {
  const userDetails = useSelector((state) => state.userDetails);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "data");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8} spacing={2}>
          <div className="formGroup">
            <Typography>Name</Typography>
            <FormInput
              name={"name"}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              // errors={errors}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Email</Typography>
            <FormInput
              name={"email"}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="email"
              // errors={errors}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Mobile Number</Typography>
            <FormInput
              name={"mobile"}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              // errors={errors}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Address Line 1</Typography>
            <FormInput
              name={"addr1"}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              // errors={errors}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Address Line 2</Typography>
            <FormInput
              name={"addr2"}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              // errors={errors}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Address Line 3</Typography>
            <FormInput
              name={"addr3"}
              rules={{
                required: <label>This is required</label>,
                minLength: { value: 3, message: "Minimum 3 digit required" },
              }}
              defaultValue=""
              type="text"
              // errors={errors}
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
