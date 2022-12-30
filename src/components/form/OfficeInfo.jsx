import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { putUserDetails } from "../../api/Crud";
import {
  officeDetailsModified,
  updateStepper,
} from "../../store/UserDetailsSlice";
import { deepEquals, getCurrentUser } from "../../utils/Utils";
import "./Form.css";
import FormInput from "./FormInput";
import NextStepHandler from "./NextStepHandler";

const Confirmation_step = 2;

export default function OfficeInfo() {
  const storeData = useSelector((state) => state.userDetails);
  const storedOfficeDetails = storeData.userData.officeDetails;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm();

  useEffect(() => {
    console.log(storedOfficeDetails);
    if (storedOfficeDetails) {
      reset(storedOfficeDetails);
    }
  }, []);

  const onSubmit = (data) => {
    const { buildingName, city, landLine, addr1, addr2, pbNo } = data;
    let officeDetails = {
      buildingName,
      city,
      landLine,
      addr1,
      addr2,
      pbNo,
    };

    let updatedObj = {
      officeDetails,
      meta: {
        currentStep: Confirmation_step,
      },
    };

    const checkIfDataChanged = deepEquals(officeDetails, storedOfficeDetails);

    if (checkIfDataChanged) {
      dispatch(updateStepper(Confirmation_step));
      return;
    }

    dispatch(officeDetailsModified(updatedObj));
    dispatch(putUserDetails(updatedObj));
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
            <Typography>Building Name</Typography>
            <FormInput
              name={"buildingName"}
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
            <Typography>City/Town</Typography>
            <FormInput
              name={"city"}
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
            <Typography>Telephone Number</Typography>
            <FormInput
              name={"landLine"}
              rules={{
                required: <label>This is required</label>,
                pattern: {
                  value: /^\d{10}$/,
                  message: "Telephone number  is Not Valid",
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
            <Typography>Postbox number</Typography>
            <FormInput
              name={"pbNo"}
              rules={{
                required: <label>This is required</label>,
                minLength: {
                  value: 4,
                  message: "Minimum 4 characters required",
                },
              }}
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
