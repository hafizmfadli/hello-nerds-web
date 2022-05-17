import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonQty from "./ButtonQty";

const CartItem = ({ item, onIncrementItemQty, onDecrementItemQty, onRemove }) => {
  
  return (
    <Box sx={{ display: { xs: "flex" } }}>
      <img
        src="/assets/no-image.jpeg"
        alt="product-vocer"
        width="120"
        height="120"
      />
      <Box>
        <Typography varian="h6">{item.book.title}</Typography>
        <Typography varian="h6">{item.book.identifier}</Typography>
        <Typography varian="h6">Rp {item.book.price}</Typography>
        <ButtonQty
          cartItem={item}
          onIncrementQty={onIncrementItemQty}
          onDecrementQty={onDecrementItemQty}
        />
        <Button variant="contained" onClick={onRemove}>
          REMOVE
        </Button>
      </Box>
    </Box>
  );
};

export default CartItem;
