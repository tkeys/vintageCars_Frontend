import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useFetchProductQuery,
} from "../../redux/slices/products/productSlice";
import { ProductType } from "../../misc/type";

const ProductEditPage = () => {
  const { id: carId } = useParams();
  const [model, setModel] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState(1900);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState("");

  const {
    data: car,
    isLoading,
    refetch,
    error,
  } = useFetchProductQuery(carId as string);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (car) {
      setModel(car.model);
      setPrice(car.price);
      setImage(car.image);
      setBrand(car.brand.brand);
      setYear(car.year);
      setRating(car.rating);
      setDescription(car.description);
    }
  }, [car]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedCar = {
      _id: car._id,
      model,
      price,
      image,
      brand,
      year,
      rating,
      description,
    };
    try {
      await updateProduct(updatedCar).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/productlist");
    } catch (error: any) {
      toast.error(
        error.data?.message || "Something went wrong, please try again"
      );
    }
    console.log(updatedCar);
    /* const result = await updateProduct(updatedCar).unwrap();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated successfully");
      navigate("/admin/productlist");
    } */
  };

  return (
    <>
      <Link to="/admin/productlist">Go back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">There is error updating product</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>
            {/* IMAGE INPUT PLACEHOLDER */}
            <Form.Group controlId="price">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
