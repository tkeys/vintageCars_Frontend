import { createSlice } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../../../misc/type";
import { Category } from "../../../misc/type";
/* 
const initialState: CartState = {
  cartItems: [],
  itemsPrice: 0,
}; */
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") ?? "{}")
  : { cartItems: [], itemsPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item: any) => item.productId === newItem.productId
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((item: any) =>
          item.productId === existItem.productId ? newItem : item
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
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item: { productId: string }) => item.productId !== action.payload
      );

      //localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
