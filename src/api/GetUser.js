import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/Constants";

export const getUserDetails = createAsyncThunk('users/getUserDetails', async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response
    } catch (error) {
        return error.message
    }
})