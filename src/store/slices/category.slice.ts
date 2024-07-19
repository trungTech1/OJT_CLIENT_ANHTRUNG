import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  status: boolean;
  created_at: string;
}

export interface CategoryState {
  data: Category[] | null;
}

const initialState: CategoryState = {
  data: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fecthCategories.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
 
const fecthCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await api.categories.getAll();
    console.log(response.data);
    return response.data;
  }
);

export const categoryReducer = categorySlice.reducer;
export const categoryActions = { ...categorySlice.actions, fecthCategories };
