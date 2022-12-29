import { configureStore } from "@reduxjs/toolkit";
import UserDetailsSlice from "./UserDetailsSlice";

export const store = configureStore({
    reducer: {
        userDetails: UserDetailsSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})