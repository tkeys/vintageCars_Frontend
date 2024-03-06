import productReducer, {
  initialState,
  fetchProducts,
  fetchProduct,
  filterProductsByCategory,
  sortProductsByPrice,
  createNewProductAsync,
} from "./productSlice";
import { Product, ProductCreate } from "./productSlice";

describe("productReducer", () => {
  it("should handle fetchProducts.pending", () => {
    const nextState = productReducer(
      initialState,
      fetchProducts.pending("pending")
    );
    expect(nextState.status).toBe("loading");
  });

  it("should handle fetchProducts.fulfilled", () => {
    const products: Product[] = [
      {
        id: "1",
        title: "Product 1",
        price: 10,
        description: "",
        category: { id: "1", name: "Category 1", image: "" },
        images: [],
      },
      {
        id: "2",
        title: "Product 2",
        price: 20,
        description: "",
        category: { id: "2", name: "Category 2", image: "" },
        images: [],
      },
    ];
    const nextState = productReducer(
      initialState,
      fetchProducts.fulfilled(products, "fulfilled")
    );
    expect(nextState.status).toBe("idle");
    expect(nextState.products).toEqual(products);
  });

  it("should handle fetchProducts.rejected", () => {
    const nextState = productReducer(
      initialState,
      fetchProducts.rejected(null, "failure")
    );
    expect(nextState.status).toBe("failure");
  });

  it("should handle fetchProduct.pending", () => {
    const nextState = productReducer(
      initialState,
      fetchProduct.pending("pending", "1")
    );
    expect(nextState.status).toBe("loading");
  });

  it("should handle fetchProduct.fulfilled", () => {
    const product: Product = {
      id: "1",
      title: "Product 1",
      price: 10,
      description: "",
      category: { id: "1", name: "Category 1", image: "" },
      images: [],
    };
    const nextState = productReducer(
      initialState,
      fetchProduct.fulfilled(product, "fulfilled", "1")
    );
    expect(nextState.status).toBe("idle");
    expect(nextState.product).toEqual(product);
  });

  it("should handle fetchProduct.rejected", () => {
    const nextState = productReducer(
      initialState,
      fetchProduct.rejected(null, "failure", "1")
    );
    expect(nextState.status).toBe("failure");
  });

  /* it("should handle filterProductsByCategory.fulfilled", () => {
    const filteredProducts: Product[] = [
      {
        id: "1",
        title: "Product 1",
        price: 10,
        description: "",
        category: { id: "1", name: "Category 1", image: "" },
        images: [],
      },
    ];
    const nextState = productReducer(
      initialState,
      filterProductsByCategory.fulfilled(filteredProducts)
    );
    expect(nextState.products).toEqual(filteredProducts);
  });
 */
  it("should handle filterProductsByCategory.rejected", () => {
    const nextState = productReducer(
      initialState,
      filterProductsByCategory.rejected(null, "Category 1", "")
    );
    expect(nextState.status).toBe("failure");
  });

  it("should handle sortProductsByPrice.fulfilled", () => {
    const sortedProducts: Product[] = [
      {
        id: "1",
        title: "Product 1",
        price: 10,
        description: "",
        category: { id: "1", name: "Category 1", image: "" },
        images: [],
      },
      {
        id: "2",
        title: "Product 2",
        price: 20,
        description: "",
        category: { id: "2", name: "Category 2", image: "" },
        images: [],
      },
    ];
    const nextState = productReducer(
      initialState,
      sortProductsByPrice.fulfilled(sortedProducts, "asc", "asc")
    );
    expect(nextState.products).toEqual(sortedProducts);
  });

  /* it("should handle createNewProductAsync.fulfilled", () => {
    const newProduct: ProductCreate = {
      title: "New Product",
      price: 30,
      description: "",
      categoryId: 1,
      images: [],
    };
    const createdProduct: Product = {
      id: "3",
      ...newProduct,
      category: { id: "1", name: "Category 1", image: "" },
    };
    const nextState = productReducer(
      initialState,
      createNewProductAsync.fulfilled(createdProduct, "fulfilled")
    );
    expect(nextState.products).toContain(createdProduct);
  }); */
});

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

it("should load truthy when fetch is pending", () => {
  const state = productReducer(initialState, fetchProducts.pending("pending"));

  expect(state).toEqual({ products: [], status: "loading" });
});
