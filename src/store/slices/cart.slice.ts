import api from "@/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import api from "@/api";

export interface cartItem {
  id?: number;
  productDetailId: number;
  userId?: number;
  quantity: number;
}

export interface cartStage {
  data: cartItem[] | null;
}

export const initialState: cartStage = {
  data: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.data?.push(action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.data?.findIndex(
        (item) => item.productDetailId === id
      );
      if (itemIndex !== undefined && itemIndex >= 0 && state.data) {
        state.data[itemIndex] = {
          ...state.data[itemIndex],
          quantity: quantity,
        };
        api.cart.updateCart(state.data[itemIndex], state.data[itemIndex].id as number);
      }
    },
    deleteCart: (state, action) => {
      const id = action.payload;
      const itemIndex = state.data?.findIndex(
        (item) => item.productDetailId === id
      );
      if (itemIndex !== undefined && itemIndex >= 0 && state.data) {
        state.data.splice(itemIndex, 1);
        api.cart.deleteCart(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      } else {
        state.data = null;
      }
    });
  },
});

export const fetchCarts = createAsyncThunk("cart/fetchCarts", async () => {
  const response = await api.cart.getAll();
  console.log("sdfsdfsd", response.data);
  return response.data;
});

export const cartActions = { ...cartSlice.actions, fetchCarts };
export const cartReducer = cartSlice.reducer;
