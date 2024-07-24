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
  reducers: {
    addCategory: (state, action) => {
      state.data?.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.data?.findIndex(
        (category) => category.id === action.payload.id) as number;
      if (index >= 0  && state.data) {
        state.data?.splice(index, 1, action.payload);
      }
    },
    deleteCategory: (state, action) => {
      const index = state.data?.findIndex(
        (category) => category.id === action.payload) as number;
      if (index >= 0 && state.data) {
        state.data?.splice(index, 1);
      }
    }
  },
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
    return response.data;
  }
);

export const categoryReducer = categorySlice.reducer;
export const categoryActions = { ...categorySlice.actions, fecthCategories };
