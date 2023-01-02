import { configureStore } from "@reduxjs/toolkit";
import UserDetailsSlice from "./UserDetailsSlice";

export const Store = configureStore({
    reducer: {
        userDetails: UserDetailsSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})