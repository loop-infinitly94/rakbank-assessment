import { createSlice } from "@reduxjs/toolkit";
import { postUserDetails } from "../api/PostUser";

const initialState = {
    userData: {
        "personalDetails": {
            "name": "",
            "email": "",
            "mobile": "",
            "addr1": "",
            "addr2": "",
            "addr3": ""
        },
        "officeDetails": {
            "buildingName": "",
            "city": "",
            "landLine": "",
            "addr1": "",
            "addr2": "",
            "pbNo": ""
        },
        "meta": {
            "avatar": "",
            "signature": "",
            "currentStep": 0
        }
    },
    status: 'idle',
    error: null,
    currentStep: 0
}

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        personalDetailsModified(state, action) {
            state.userData = { ...state.userData, ...action.payload }
            return state
        },
        officeDetailsModified(state, action) {
            state.userData.officeDetails = { ...state.userData.officeDetails, ...action.payload }
            return state
        },
        updateStepper(state, action) {
            state.currentStep = action.payload
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postUserDetails.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(postUserDetails.fulfilled, (state, action) => {
                state.status = "success"
                state.userData = action.payload.data
            })
            .addCase(postUserDetails.rejected, (state, action) => {
                state.status = "failed"

                state.error = action.error.message
            })
    }
})



export const { personalDetailsModified, updateStepper, officeDetailsModified } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;