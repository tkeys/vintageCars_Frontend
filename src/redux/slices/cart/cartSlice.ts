import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem, CartState } from "../../../misc/type";
import { Category } from "../../../misc/type";

/* const initialState: CartState = {
  cartItems: [],
  itemsPrice: 0,
}; */

const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "{}")
  : { cartItems: [], itemsPrice: 0, paymentMethod: "PayPal" };

const cartSlice:any = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((item: any) =>
          item._id === existItem._id ? newItem : item
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }
      //Calculating items price
      state.itemsPrice = state.cartItems.reduce(
        (acc: number, item: { price: number; quantity: number }) => {
          return acc + item.price * item.quantity;
        },
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item: { _id: string }) => item._id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const { addToCart, removeFromCart, savePaymentMethod, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
