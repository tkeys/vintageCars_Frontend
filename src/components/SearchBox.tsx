import React from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBox = () => {
  const navigate = useNavigate();
  const { searchQuery: urlSearchQuery } = useParams();
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery || "");

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchQuery("");
      navigate(`/search/${searchQuery}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
