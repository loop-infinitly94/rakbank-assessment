import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../api/GetUser";
import { postUserDetails } from "../api/PostUser";
import { putUserDetails } from "../api/PutUser";

const initialState = {
    userData: {
        "id": null,
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

const setData = (data) => {
    return {
        personalDetails: data.personalDetails,
        officeDetails: data.officeDetails,
        meta: data.meta,
        id: data.id
    }
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
        updateMetaData(state, action) {
            state.userData.meta = { ...state.userData.meta, ...action.payload }
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
                localStorage.setItem("userId", action.payload.data.id)
                state.userData = setData(action.payload.data)
            })
            .addCase(postUserDetails.rejected, (state, action) => {
                state.status = "failed"

                state.error = action.error.message
            })


            .addCase(putUserDetails.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(putUserDetails.fulfilled, (state, action) => {
                state.status = "success"
                state.userData = setData(action.payload.data)
            })
            .addCase(putUserDetails.rejected, (state, action) => {
                state.status = "failed"

                state.error = action.error.message
            })

            .addCase(getUserDetails.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {

                state.status = "success"
                state.userData = setData(action.payload.data)
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.status = "failed"

                state.error = action.error.message
            })
    }
})



export const { personalDetailsModified, updateStepper, officeDetailsModified, updateMetaData } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;