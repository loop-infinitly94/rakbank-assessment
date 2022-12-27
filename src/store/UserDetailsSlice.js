import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "Shyam Kumar",
    email: "shyamkumar2794@gmail.com",
    mobile: "+971582204261",
    addr1: "Al Barsha 1",
    addr2: "Barsha",
    addr3: "Barsha",
    currentStep: 0
}

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {}
})

export default userDetailsSlice.reducer