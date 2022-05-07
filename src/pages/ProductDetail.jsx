import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar";
import axios from "axios";
import { API_BASE_URL } from "../helpers";
import AddToCart from "../components/AddToCart";
import Typography from "@mui/material/Typography";

const ProductDetail = () => {
  let params = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // fetch particular book based on URL param id
  useEffect(() => {
    const fetchData = async () => {
      let bookId = params.bookId;
      setIsLoading(true);
      await fetchBookDetail(bookId);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const fetchBookDetail = async (bookId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/v1/books/detail/${bookId}`
      );
      setBook(response.data.book);
    } catch (error) {
      console.error(error);
    }
  };

  let content;
  if (isLoading || !book) {
    // display circular progress until fetch book finished
    content = (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    content = (
      <Box
        sx={{
          textAlign: "center",
          display: {
            md: "flex",
          },
        }}
      >
        {/* Product detail container */}
        <Box sx={{ width: { md: "75%" }, display: { md: "flex" } }}>
          {/* Book Cover */}
          <Box sx={{display: {xs: "flex"}, flexDirection: "column"}}>
            <img src="/assets/no-image.jpeg" alt="product-cover" />
            <Typography variant="caption" sx={{marginTop: "10px"}}>
              The cover image may be different.
            </Typography>
          </Box>

          {/* Book Info */}
          <Box
            sx={{
              marginTop: { xs: "80px", md: "0px" },
              padding: { md: "0 20px" },
              textAlign: { xs: "left" },
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {book.title}
            </Typography>

            <Box sx={{ width: "95%" }}>
              <hr></hr>
            </Box>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", color: "#9292929e" }}
            >
              {book.extension} {book.extension && "(Extension)"}
            </Typography>

            <Typography variant="subtitle2">
              {book.author} {book.author && "(Author)"}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", color: "#9292929e" }}
            >
              ISBN : {book.identifier || "?"}
            </Typography>

            <Typography variant="subtitle2">
              Publisher : {book.publisher || "?"}
            </Typography>

            <Typography variant="subtitle2">Stock : {book.quantity}</Typography>

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#cf06069e" }}
            >
              Rp {book.price}
            </Typography>
          </Box>
        </Box>
        {/* Add to cart */}
        <AddToCart max={book.quantity} />
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <Paper sx={{ margin: "20px", padding: "20px" }}>{content}</Paper>
    </React.Fragment>
  );
};

export default ProductDetail;
