import api from "@/api";
import { Color } from "@/interface/product.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface colorStage {
    data: Color[] | null;
}

export const initialState: colorStage = {
    data: null,
};


const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        addColor: (state, action) => {
            state.data?.push(action.payload);
        },
        updateColor: (state, action) => {
            const index = state.data?.findIndex(
                (color) => color.id === action.payload.id) as number;
            if (index >= 0 && state.data) {
                state.data?.splice(index, 1, action.payload);
            }
        },
        deleteColor: (state, action) => {
            const index = state.data?.findIndex(
                (color) => color.id === action.payload) as number;
            if (index >= 0 && state.data) {
                state.data?.splice(index, 1);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchColors.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export const fetchColors = createAsyncThunk(
    "color/fetchColors",
    async () => {
        const response = await api.colors.getAll();
        return response.data;
    }
);


export const colorReducer = colorSlice.reducer;
export const colorActions = { ...colorSlice.actions, fetchColors };