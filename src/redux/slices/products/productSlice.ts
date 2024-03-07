import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../store";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}
export interface ProductCreate {
  title: string;
  price: number;
  description: string;
  categoryId: number;
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

export const initialState: ProductState = {
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

export const filterProductsByCategory = createAsyncThunk(
  "product / filterProductsByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${category}`
      );
      console.log(`Fetching product for categories successful`);
      console.log("adekunle adejumo", response.data);
      return response.data;
    } catch (error: any) {
      console.log("fetching product failed", error.message, error.response);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sortProductsByPrice = createAsyncThunk(
  "product / sortProductsByPrice",
  async (order: "asc" | "desc", { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    let sortedProducts = [...state.product.products];
    sortedProducts.sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
    console.log(`Sorted products by price in ${order}order. `);
    return sortedProducts;
  }
);

// To create new product
export const createNewProductAsync = createAsyncThunk(
  "createNewProductAsync",
  async (newProduct: ProductCreate, { rejectWithValue }) => {
    try {
      const result = await axios.post<Product>(
        `https://api.escuelajs.co/api/v1/products/`,
        newProduct
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
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
    builder
      .addCase(
        filterProductsByCategory.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          console.log("filtered products by category successful");
        }
      )
      .addCase(filterProductsByCategory.rejected, (state) => {
        state.status = "failure";
        console.log("filtered products by category failed");
      });
    builder.addCase(
      sortProductsByPrice.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        console.log("sorted products by price successful");
      }
    );
    builder.addCase(createNewProductAsync.fulfilled, (state, action) => {
      state.products.push(action.payload);
      console.log("created new product successful");
    });
  },
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectProductsStatus = (state: RootState) => state.product.status;
export const selectProduct = (state: RootState) => state.product.product;

export default productSlice.reducer;
