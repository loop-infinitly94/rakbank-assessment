import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    mobile: "",
    addr1: "",
    addr2: "",
    addr3: "",
    currentStep: 0
}

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        userDetailsModified(state, action) {
            state = { ...state, ...action.payload }
            return state
        },
        updateStepper(state, action) {
            state.currentStep = action.payload
            return state
        }
    }
})

export const { userDetailsModified, updateStepper } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;