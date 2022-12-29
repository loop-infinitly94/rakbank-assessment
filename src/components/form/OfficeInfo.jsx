import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
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
    reset,
  } = useForm();

  useEffect(() => {
    console.log(officeDetails);
    if (officeDetails) {
      reset(officeDetails);
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data, "data");
    const { buildingName, city, landLine, addr1, addr2, pbNo } = data;
    let officeDetails = {
      buildingName,
      city,
      landLine,
      addr1,
      addr2,
      pbNo,
    };

    dispatch(officeDetailsModified(officeDetails));

    // console.log({ officeDetails });
    return;
    // dispatch(postUserDetails({ officeDetails }));
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
            <Typography>City/Town</Typography>
            <FormInput
              name={"city"}
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
              control={control}
            />
          </div>
          <div className="formGroup">
            <Typography>Telephone Number</Typography>
            <FormInput
              name={"landLine"}
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
            <Typography>Postbox number</Typography>
            <FormInput
              name={"pbNo"}
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
