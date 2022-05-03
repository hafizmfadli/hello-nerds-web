import React from "react";
import { Container } from "@mui/material";
import styled from "styled-components";

const ProductLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const CarouselProductItem = ({
  productId,
  imgUrl,
  productTitle,
  price,
  author,
}) => {
  return (
    <Container sx={{
      '&:hover': {
        backgroundColor: '#b9b9b9',
        color: 'white'
      }
    }}>
      <ProductLink
        href={`/product/${productId}`}
        onClick={() => alert(`${productTitle} clicked`)}
      >
        <img src={imgUrl} alt="product-vocer" width="120" height="120" />
        <p>{productTitle}</p>
        <p>Author: {author}</p>
        <p>Rp {price}</p>
      </ProductLink>
    </Container>
  );
};

export default CarouselProductItem;
