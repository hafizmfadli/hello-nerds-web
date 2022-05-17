import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CartService from "../services/cart";
import { bookAdded } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import authService from "../services/auth.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddToCart = ({ book }) => {
  const [quantity, setQuantity] = useState(1);
  const [isMax, setIsMax] = useState(false);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  // fire when user add quantity that will be place in the cart
  const handleAddQuantity = () => {
    setQuantity((prevState) => {
      if (prevState === book.stock) {
        setIsMax(true);
        return prevState;
      }
      return prevState + 1;
    });
  };

  const handleAddToCart = () => {
    console.log(book);

    // check is user logged in or not
    if (authService.isLoggedIn()) {
      // user already have logged in
      // perform async add to cart
    } else {
      // guest user
      if (CartService.Add(book, quantity)) {
        // Add to cart success
        dispatch(bookAdded({ book, quantity }));
        MySwal.fire({
          icon: "success",
          title: "Nice choice...",
          text: "This book is successfully added to your cart",
        });
      } else {
        // User add quantity exceed available stock
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "You can't add more quantity because your purchase quantity for this book has been reach or exceed available stock",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#e6e4e4",
        padding: "20px",
        borderRadius: "10px",
        minHeight: { md: "50%" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ color: "#3399ff" }}>
          <SendIcon />
        </Box>
        <Box>
          <h5>Free Shipping</h5>
          <p>* Terms and Conditions</p>
          <p>
            Delivered in <b>3 - 7 business days</b>{" "}
          </p>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Button
          variant="outlined"
          onClick={() =>
            setQuantity((prevState) =>
              prevState > 1 ? prevState - 1 : prevState
            )
          }
        >
          -
        </Button>
        {quantity}
        <Button variant="outlined" onClick={handleAddQuantity}>
          +
        </Button>
      </Box>
      {/* Error message will be displayed when user try to add quantity greater than available stock */}
      <Box sx={{ color: "red", marginTop: "10px" }}>
        {isMax && <p>Available stock is {book.stock}</p>}
      </Box>
      <Box sx={{ margin: "20px" }}>
        <Button variant="contained" onClick={handleAddToCart}>
          ADD TO CART
        </Button>
      </Box>
    </Box>
  );
};

export default AddToCart;
