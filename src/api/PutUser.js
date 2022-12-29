import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/Constants";

export const putUserDetails = createAsyncThunk('users/putUserDetails', async (data, { getState }) => {
    let userData = getState().userDetails.userData
    let putData = {
        personalDetails: { ...userData.personalDetails, ...data.personalDetails },
        officeDetails: { ...userData.officeDetails, ...data.officeDetails },
        meta: { ...userData.meta, ...data.meta }
    }
    try {
        const id = localStorage.getItem("userId")
        const response = await axios.put(`${API_URL}/${id}`, putData);
        return response
    } catch (error) {
        return error.message
    }
})