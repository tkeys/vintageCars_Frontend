import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "failure";
}

const initialState: ProductState = {
  products: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products`
      );
      console.log(`Fetching product for page successful`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("fetching products failed", error);
      return rejectWithValue("failed to fetch producsts");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        console.log("fetching products started");
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "idle";
          state.products = action.payload;
          console.log("fetching products successful");
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failure";
        console.log("fetching products failed");
      });
  },
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectProductStatus = (state: RootState) => state.product.status;

export default productSlice.reducer;
