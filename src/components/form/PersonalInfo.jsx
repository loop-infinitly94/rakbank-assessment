import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postUserDetails, putUserDetails } from "../../api/Crud";
import {
  personalDetailsModified,
  updateStepper,
} from "../../store/UserDetailsSlice";
import { deepEquals, getCurrentUser } from "../../utils/Utils";
import FormInput from "./FormInput";
import NextStepHandler from "./NextStepHandler";
import "./Form.css";

const Office_Info = 1;

export default function PersonalInfo() {
  const storeData = useSelector((state) => state.userDetails);
  const storedPersonalDetails = storeData.userData.personalDetails;
  const isLoading = storeData.status;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (storedPersonalDetails) {
      reset(storedPersonalDetails);
    }
  }, [isLoading, storedPersonalDetails, reset]);

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
        currentStep: Office_Info,
      },
    };

    const checkIfDataChanged = deepEquals(
      personalDetails,
      storedPersonalDetails
    );
    const userId = getCurrentUser();

    // make server call only if there is a change in data else just update the stepper
    if (checkIfDataChanged) {
      dispatch(updateStepper(Office_Info));
      return;
    } else if (userId) {
      dispatch(putUserDetails(updatedObj));
    } else {
      dispatch(postUserDetails(updatedObj));
    }
    dispatch(personalDetailsModified(updatedObj));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={8}>
          <div className="formGroup">
            <Typography>Name</Typography>
            <FormInput
              name={"name"}
              rules={{
                required: <label>This is required</label>,
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters required",
                },
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
                pattern: {
                  value: /^\d{10}$/,
                  message: "Mobile number  is Not Valid",
                },
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
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters required",
                },
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
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters required",
                },
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
              defaultValue=""
              type="text"
              errors={errors}
              control={control}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NextStepHandler />
        </Grid>
      </Grid>
    </form>
  );
}
