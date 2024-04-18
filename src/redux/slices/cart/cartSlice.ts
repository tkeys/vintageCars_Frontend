import { createSlice } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../../../misc/type";
import { Category } from "../../../misc/type";

/* const initialState: CartState = {
  cartItems: [],
  itemsPrice: 0,
}; */

const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "{}")
  : { cartItems: [], itemsPrice: 0, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item: any) => item.id === newItem.id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((item: any) =>
          item.id === existItem.id ? newItem : item
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
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item: { id: string }) => item.id !== action.payload
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
