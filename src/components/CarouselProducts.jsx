import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductItem from "./ProductItem";
import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import {carouselProducts} from "../data";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CarouselProducts = ({ title }) => {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: "30px", textAlign: "center" }}>
        <h2>{title}</h2>
        <Carousel responsive={responsive}>
          {carouselProducts.map((item, i) => (
            <ProductItem
              key={item.id}
              productId={item.id}
              imgUrl={item.imgUrl}
              productTitle={item.title}
              author={item.author}
              price={item.price}
            />
          ))}
        </Carousel>
      </Paper>
    </Container>
  );
};

export default CarouselProducts;
