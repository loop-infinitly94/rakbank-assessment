import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails, postUserDetails, putUserDetails } from "../api/Crud";

export const initialState = {
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
            "currentStep": 0, // currentStep of the user in the stepper
            "isCompleted": false // determines if the application is regitred
        }
    },
    status: 'idle',
    error: null,
    currentStep: null
}

const setStoreData = (userData, data) => {
    return {
        personalDetails: { ...userData.personalDetails, ...data.personalDetails },
        officeDetails: { ...userData.officeDetails, ...data.officeDetails },
        meta: { ...userData.meta, ...data.meta },
        id: data.id
    }
}

export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        personalDetailsModified(state, action) {
            state.userData = setStoreData(state.userData, action.payload)
            return state
        },
        officeDetailsModified(state, action) {
            state.userData = setStoreData(state.userData, action.payload)
            return state
        },
        updateMetaData(state, action) {
            state.userData = setStoreData(state.userData, action.payload)
            return state
        },
        updateStepper(state, action) {
            let currentStep = { "currentStep": action.payload }
            state.currentStep = action.payload;
            state.status = "idle";
            state.userData.meta = { ...state.userData.meta, ...currentStep }
            return state
        },
        resetStore(state, action) {
            state = initialState
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
                state.userData = setStoreData(state.userData, action.payload.data)
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
                state.userData = setStoreData(state.userData, action.payload.data)
            })
            .addCase(putUserDetails.rejected, (state, action) => {
                state.status = "failed"

                state.error = action.error.message
            })

            //getUser

            .addCase(getUserDetails.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.status = "getSuccess"
                console.log(action.payload.data)
                state.currentStep = action.payload.data.meta.currentStep
                state.userData = setStoreData(state.userData, action.payload.data)
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.status = "failed"

                state.error = action.error.message
            })
    }
})



export const { personalDetailsModified, updateStepper, officeDetailsModified, updateMetaData, resetStore, setIsCompleted } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;