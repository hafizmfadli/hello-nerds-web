import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselProductItem from "./CarouselProductItem";
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
            <CarouselProductItem
              productId={item.id}
              imgUrl={item.imgUrl}
              productTitle={item.title}
              author={item.author}
              price={item.price}
            />
          ))}
          {/* <CarouselProductItem
            productId={1}
            imgUrl="https://static.periplus.com/nPjyff5ADpJIFw3k1SUY3rk6LAHWjBIIBJOxcucKiAdbZiUA6HeufCI9VBSEevJAw--"
            productTitle="Javascript, PHP"
            price={50000}
            author={"Hafiz, Fadli"}
          />
          <CarouselProductItem
            productId={2}
            imgUrl="https://static.periplus.com/nPjyff5ADpJIFw3k1SUY3rk6LAHWjBIIBJOxcucKiAdbZiUA6HeufCI9VBSEevJAw--"
            productTitle="Javascript, PHP"
            price={50000}
            author={"Hafiz, Fadli"}
          />
          <CarouselProductItem
            productId={3}
            imgUrl="https://static.periplus.com/nPjyff5ADpJIFw3k1SUY3rk6LAHWjBIIBJOxcucKiAdbZiUA6HeufCI9VBSEevJAw--"
            productTitle="Javascript, PHP"
            price={50000}
            author={"Hafiz, Fadli"}
          />
          <CarouselProductItem
            productId={4}
            imgUrl="https://static.periplus.com/nPjyff5ADpJIFw3k1SUY3rk6LAHWjBIIBJOxcucKiAdbZiUA6HeufCI9VBSEevJAw--"
            productTitle="Javascript, PHP"
            price={50000}
            author={"Hafiz, Fadli"}
          /> */}
        </Carousel>
      </Paper>
    </Container>
  );
};

export default CarouselProducts;
