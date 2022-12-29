import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postUserDetails } from "../../api/PostUser";
import {
  personalDetailsModified,
  updateStepper,
} from "../../store/UserDetailsSlice";
import { deepEquals } from "../../utils/Utils";
import "./Form.css";
import FormInput from "./FormInput";
import NextStepHandler from "./NextStepHandler";

export default function PersonalInfo() {
  const storeData = useSelector((state) => state.userDetails);
  const storedPersonalDetails = storeData.userData.personalDetails;
  const currentStep = storeData.currentStep;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm();

  useEffect(() => {
    if (storedPersonalDetails) {
      reset(storedPersonalDetails);
    }
  }, []);

  const onSubmit = (data) => {
    const { name, email, mobile, addr1, addr2, addr3 } = data;
    let personalDetails = {
      name,
      email,
      mobile,
      addr1,
      addr2,
      addr3,
    };
    let updatedObj = {
      personalDetails,
      meta: {
        currentStep: 1,
      },
    };

    const checkIfDataChanged = deepEquals(
      personalDetails,
      storedPersonalDetails
    );

    alert(checkIfDataChanged);
    if (checkIfDataChanged) {
      updateStepper(currentStep + 1);
      return;
    }

    dispatch(personalDetailsModified(updatedObj));
    dispatch(postUserDetails(updatedObj));
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
        <Grid item xs={8}>
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
              errors={errors}
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Email</Typography>
            <FormInput
              name={"email"}
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
              errors={errors}
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
              errors={errors}
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
              errors={errors}
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
              errors={errors}
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
