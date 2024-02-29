import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  title: string;
  description: string;
  image?: string;
  category?: Category;
}
interface Category {
  id: string;
  name: string;
  image: string;
}
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },

    incrementQuantity: (state, action: PayloadAction<CartItem>) => {
      const foundProduct = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (foundProduct) {
        foundProduct.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<CartItem>) => {
      const foundProduct = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (foundProduct) {
        foundProduct.quantity--;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
