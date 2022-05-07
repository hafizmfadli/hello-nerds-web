import React from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

const ProductItem = ({
  productId,
  imgUrl,
  productTitle,
  price,
  author,
}) => {

  return (
    <Container sx={{
      width: '200px',
      '&:hover': {
        backgroundColor: '#b9b9b9',
        color: 'white'
      },
      textAlign: 'center',
      border: '1px solid #b9b9b9'
    }}>
      <Link
        to={`/p/${productId}/${productTitle}`}
      >
        <img src="/assets/no-image.jpeg" alt="product-vocer" width="120" height="120" />
        <p>{productTitle}</p>
        <p>Author: {author === "" ? "?" : author}</p>
        <p>Rp {price}</p>
      </Link>
    </Container>
  );
};

export default ProductItem;
