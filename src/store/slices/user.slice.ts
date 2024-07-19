import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
}


interface UserState {
    data: User[] | null;
}

const initialState: UserState = {
    data: null,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});


const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async () => {
        const response = await api.user.getAll();
        return response.data;
    }
);

export const userReducer = userSlice.reducer;
export const userActions = { ...userSlice.actions, fetchUsers };