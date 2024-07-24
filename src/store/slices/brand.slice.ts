import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface Brand {
    id: number;
    brandName: string;
    status: boolean;
    created_at: string;
    description : string;
}
export interface brandStage {
    data: Brand[] | null;

}

export const initialState: brandStage = {
    data: null,
};


const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        addBrand: (state, action) => {
            state.data?.push(action.payload);
        },
        updateBrand: (state, action) => {
            const index = state.data?.findIndex(
                (brand) => brand.id === action.payload.id) as number;
            if (index >= 0 && state.data) {
                state.data?.splice(index, 1, action.payload);
            }
        },
        deleteBrand: (state, action) => {
            const index = state.data?.findIndex(
                (brand) => brand.id === action.payload) as number;
            if (index >= 0 && state.data) {
                state.data?.splice(index, 1);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBrands.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});


export const fetchBrands = createAsyncThunk(
    "brand/fetchBrands",
    async () => {
        const response = await api.brands.getAll();
        return response.data;
    }
);

export const brandReducer = brandSlice.reducer;
export const brandActions = { ...brandSlice.actions, fetchBrands };