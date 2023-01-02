import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./AxiosInstance";

export const getUserDetails = createAsyncThunk('users/getUserDetails', async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response
    } catch (error) {
        return error.message
    }
})

export const postUserDetails = createAsyncThunk('users/postUserDetails', async (data) => {
    try {
        const response = await axiosInstance.post('', data);
        return response
    } catch (error) {
        return error.message
    }
})

export const putUserDetails = createAsyncThunk('users/putUserDetails', async (data, { getState, dispatch }) => {
    let userData = getState().userDetails.userData
    let putData = {
        personalDetails: { ...userData.personalDetails, ...data.personalDetails },
        officeDetails: { ...userData.officeDetails, ...data.officeDetails },
        meta: { ...userData.meta, ...data.meta }
    }
    try {
        const id = localStorage.getItem("userId")
        const response = await axiosInstance.put(`/${id}`, putData);
        return response
    } catch (error) {
        return error.message
    }
})