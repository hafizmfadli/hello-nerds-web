import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const ButtonQty = ({ cartItem, onIncrementQty, onDecrementQty }) => {
  // fire when user add quantity that will be place in the cart
  const handleIncrementQuantity = () => {
    if (cartItem.book.stock > cartItem.quantity) {
      onIncrementQty();
    }
  };

  // fire when user add quantity that will be place in the cart
  const handleDecrementQty = () => {
    if (cartItem.quantity > 1) {
      onDecrementQty();
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={handleDecrementQty}>
            -
          </Button>
        </Grid>
        <Grid item>
          <Box sx={{ marginTop: "5px" }}>{cartItem.quantity}</Box>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleIncrementQuantity}>
            +
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ color: "red", marginTop: "10px" }}>
        {cartItem.book.stock === cartItem.quantity && (
          <p>Available stock is {cartItem.book.stock}</p>
        )}
      </Box>
    </Box>
  );
};

export default ButtonQty;
