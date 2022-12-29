import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/Constants";

export const postUserDetails = createAsyncThunk('users/postUserDetails', async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response
    } catch (error) {
        return error.message
    }
})