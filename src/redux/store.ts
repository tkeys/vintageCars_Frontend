import { configureStore } from "@reduxjs/toolkit";
//import productReducer from "./slices/products/productSlice";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cart/cartSlice";
import authSliceReducer from "./slices/auth/authSlice";

//import userReducer from "./slices/user/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;
export default store;
