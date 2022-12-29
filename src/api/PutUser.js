import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/Constants";

export const putUserDetails = createAsyncThunk('users/putUserDetails', async (data) => {
    try {
        const id = localStorage.getItem("userId")
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response
    } catch (error) {
        return error.message
    }
})