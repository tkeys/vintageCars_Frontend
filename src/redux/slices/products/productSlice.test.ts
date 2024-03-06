import productReducer from "./productSlice";

import { fetchProducts, fetchProduct } from "./productSlice";

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
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Product 1",
    price: 10,
    description: "Product 1 description",
    category: {
      id: "1",
      name: "Category 1",
      image: "https://picsum.photos/200",
    },
    images: ["https://picsum.photos/200", "https://picsum.photos/200"],
  },
  {
    id: "2",
    title: "Product 2",
    price: 20,
    description: "Product 2 description",
    category: {
      id: "2",
      name: "Category 2",
      image: "https://picsum.photos/200",
    },
    images: ["https://picsum.photos/200", "https://picsum.photos/200"],
  },
];
describe("Product reducer", () => {
  it("should return the initial state", () => {
    expect(productReducer(undefined, { type: "" })).toEqual(initialState);
  });
});
it("should return a list of products", () => {
  const state = productReducer(
    initialState,
    fetchProducts.fulfilled(mockProducts, "fulfilled ")
  );

  expect(state).toEqual({
    products: mockProducts,
    status: "idle",
  });
});
it("should return a single product", () => {
  const state = productReducer(
    initialState,
    fetchProduct.fulfilled(mockProducts[0], "fulfilled", "1")
  );

  expect(state).toEqual({
    products: mockProducts,
    status: "idle",
    product: mockProducts[0],
  });
});

it("should load truthy when fetch is pending", () => {
  const state = productReducer(initialState, fetchProducts.pending("pending"));

  expect(state).toEqual({ products: [], status: "loading" });
});

/* describe("fetchProduct action", () => {
  it("creates fulfilled action when fetching product has been done", () => {
    const productId = "123";
    const store = mockProducts;
    const expectedProduct = {
      id: "123",
      title: "Test Product",
      description: "This is a test description",
      price: 100,
      category: "test category",
      imageUrl: "test.png",
    };

    fetchProduct.fulfilled(productId));

    

    expect(store[0].type).toEqual("product/fetchProduct/pending");
    expect(actions[1].type).toEqual("product/fetchProduct/fulfilled");
    expect(actions[1].payload).toEqual(expectedProduct);
  });

  it("creates rejected action when fetching product fails", async () => {
    const productId = "nonexistent";
    const store = mockStore({ type: "any" });
    mockedAxios.get.mockRejectedValueOnce(new Error("Product not found"));

    await store.dispatch<any>(productActions.fetchProduct(productId));

    const actions = store.getActions();

    expect(actions[0].type).toEqual("product/fetchProductById/pending");
    expect(actions[1].type).toEqual("product/fetchProductById/rejected");
    expect(actions[1].error.message).toEqual("Product not found");
  });
});

/ */
