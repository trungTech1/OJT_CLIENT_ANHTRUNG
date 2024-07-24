import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export interface UserState {
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

const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await api.users.userVerify(localStorage.getItem("token"));
  // console.log("da vaoooo", response);
  return response.data;
});

export const userReducer = userSlice.reducer;
export const userActions = { ...userSlice.actions, fetchUsers };
