import React from "react";
import { Container } from "@mui/material";
import styled from "styled-components";
import { textAlign } from "@mui/system";

const ProductLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

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
      <ProductLink
        href={`/product/${productId}`}
        onClick={() => alert(`${productTitle} clicked`)}
      >
        <img src="/assets/no-image.jpeg" alt="product-vocer" width="120" height="120" />
        <p>{productTitle}</p>
        <p>Author: {author === "" ? "?" : author}</p>
        <p>Rp {price}</p>
      </ProductLink>
    </Container>
  );
};

export default ProductItem;
