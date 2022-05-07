import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { stubFalse } from "lodash";

const AddToCart = ({ max }) => {
  const [quantity, setQuantity] = useState(1);
  const [isMax, setIsMax] = useState(stubFalse);

  // fire when user add quantity that will be place in the cart
  const handleAddQuantity = () => {
    setQuantity((prevState) => {
      if (prevState === max) {
        setIsMax(true);
        return prevState;
      }
      return prevState + 1;
    });
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
              prevState > 0 ? prevState - 1 : prevState
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
      <Box sx={{color: "red", marginTop: "10px"}}>{isMax && <p>Available stock is {max}</p>}</Box>
      <Box sx={{ margin: "20px" }}>
        <Button variant="contained">ADD TO CART</Button>
      </Box>
    </Box>
  );
};

export default AddToCart;
