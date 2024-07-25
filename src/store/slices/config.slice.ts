import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface Config {
    id: number;
    configName: string;
    status: boolean;
}

export interface configStage {
    data: Config[] | null;
}

export const initialState: configStage = {
    data: null,
};


const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        addConfig: (state, action) => {
            state.data?.push(action.payload);
        },
        updateConfig: (state, action) => {
            const index = state.data?.findIndex(
                (config) => config.id === action.payload.id) as number;
            if (index >= 0 && state.data) {
                state.data?.splice(index, 1, action.payload);
            }
        },
        deleteConfig: (state, action) => {
            const index = state.data?.findIndex(
                (config) => config.id === action.payload) as number;
            if (index >= 0 && state.data) {
                state.data?.splice(index, 1);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConfigs.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

const fetchConfigs = createAsyncThunk(
    "config/fetchConfigs",
    async () => {
        const response = await api.configs.getAll();
        console.log("response", response);
        return response.data;
    }
);


export const configReducer = configSlice.reducer;
export const configActions = { ...configSlice.actions, fetchConfigs };