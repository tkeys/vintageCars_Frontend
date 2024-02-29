import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/products/productSlice";
import cartReducer from "./slices/cart/cartSlice";
import authReducer from "./slices/auth/authSlice";

export const store = configureStore({
  reducer: { product: productReducer, cart: cartReducer, user: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
