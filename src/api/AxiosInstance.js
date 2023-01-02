import axios from "axios"

export const API_URL = "https://63a94860100b7737b98ddf51.mockapi.io/api/userDetails"

const axiosInstance = axios.create({
    baseURL: API_URL
})

export default axiosInstance