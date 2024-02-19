import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface ProductState {
  products: Product[];
  product?: Product;
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
      const response = await axios.get(`https://fakestoreapi.com/products`);
      console.log(`Fetching product for page successful`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("fetching products failed", error);
      return rejectWithValue("failed to fetch products");
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "product/fetchproduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      console.log(`Fetching product for page successful`);
      return response.data;
    } catch (error: any) {
      console.log("fetching product failed", error.message, error.response);
      return rejectWithValue(error.response.data.message);
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

    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        console.log("fetching product started");
      })

      .addCase(
        fetchProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.status = "idle";
          state.product = action.payload;
          console.log("fetching product successful");
        }
      )

      .addCase(fetchProduct.rejected, (state) => {
        state.status = "failure";
        console.log("fetching product failed");
      });
  },
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectProductsStatus = (state: RootState) => state.product.status;
export const selectProduct = (state: RootState) => state.product.product;

export default productSlice.reducer;
