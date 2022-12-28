import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = "https://63a94860100b7737b98ddf51.mockapi.io/api/userDetails"
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

export const postUserDetails = createAsyncThunk('users/postUserDetails', async (data) => {
    try {
        const response = await axios.post(POST_URL, data);
        return response
    } catch (error) {
        return error.message
    }
})

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        personalDetailsModified(state, action) {
            state.userData.personalDetails = { ...state.userData.personalDetails, ...action.payload }
            // console.log(state, "ste")
            return state
        },
        officeDetailsModified(state, action) {
            state.userData.officeDetails = { ...state.userData.officeDetails, ...action.payload }
            // console.log(state, "ste")
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

                state.userData = action.payload
            })
            .addCase(postUserDetails.rejected, (state, action) => {
                state.status = "failed"

                state.error = action.error.message
            })
    }
})



export const { personalDetailsModified, updateStepper, officeDetailsModified } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;