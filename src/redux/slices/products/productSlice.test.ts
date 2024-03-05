import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as productActions from "./productSlice";
import axios from "axios";

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
}

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("fetchProduct action", () => {
  it("creates fulfilled action when product is fetched successfully", async () => {
    const productId = "1234";
    const store = mockStore({});
    const expectedProduct: Product = {
      id: "1234",
      title: "test",
      price: 100,
      description: "this is a test",
      images: ["test.png"],
    };

    mockedAxios.get.mockResolvedValue({ data: expectedProduct });

    await store.dispatch(productActions.fetchProduct(productId));
    const actions = store.getActions();

    expect(actions[0].type).toEqual("product/fetchProduct/pending");
    expect(actions[1].type).toEqual("product/fetchProduct/fulfilled");
    expect(actions[1].type).toEqual(expectedProduct);
    expect(actions[2].type).toEqual("product/fetchProduct/rejected");
  });
});
