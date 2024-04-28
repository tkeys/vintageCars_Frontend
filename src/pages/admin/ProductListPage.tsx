import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useFetchProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../redux/slices/products/productSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const body = {
  brand: "Sample Brand",
  model: "Mercedes X Sample",
  conditions: ["65f80bce70ee734ea399ae07"],
  description: "German Luxury car known for its excellence and style.",
  year: 2020,
  price: 970000,
};

const ProductListPage = () => {
  const { searchQuery } = useParams<{ searchQuery: string }>();
  const {
    data: cars,
    isLoading,
    error,
    refetch,
  } = useFetchProductsQuery(searchQuery || "");
  console.log("List of cars", cars);

  const [createProduct, { isLoading: creating }] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure to create this product?")) {
      try {
        await createProduct(body);
        refetch();
      } catch (error) {
        toast.error("Product creation failed. Please try again later.");
      }
    }
  };
  const [deleteProduct, { isLoading: loadingdelete }] =
    useDeleteProductMutation();

  const deleteCarHandler = async (_id: string) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        await deleteProduct(_id);
        refetch();
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Product deletion failed. Please try again later.");
        console.log("car deleted", _id);
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="btn-sm m-3"
            variant="dark"
            onClick={createProductHandler}
          >
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {creating && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error getting list</Message>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>MODEL</th>
              <th>YEAR</th>
              <th>DESCRIPTION</th>
              <th>PRICE</th>
              <th>RATING</th>
            </tr>
          </thead>
          <tbody>
            {cars &&
              cars?.cars &&
              cars.cars?.map((car) => (
                <tr key={car._id}>
                  <td>{car._id}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.description}</td>
                  <td>{car.price}</td>
                  <td>{car.rating}</td>
                  <td>
                    <LinkContainer to={`/admin/car/${car._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm mx-2"
                      onClick={() => deleteCarHandler(car._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListPage;
