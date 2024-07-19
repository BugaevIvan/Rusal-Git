import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";

const initialState: IUser = {
    userId: "",
    userName: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state: IUser, action: PayloadAction<IUser>) {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
        },
        setUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        setUserId(state, action: PayloadAction<string>) {
            state.userId = action.payload;
        },
    },
});

export const { setUser, setUserName, setUserId } = userSlice.actions;
