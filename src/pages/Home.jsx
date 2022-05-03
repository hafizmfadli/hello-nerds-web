import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import CarouselProducts from "../components/CarouselProducts";
import styled from "styled-components";

const CarouselProductsContainer = styled.div`
  margin-top: 100px;
`;

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <CarouselProductsContainer>
        <CarouselProducts title="New Arrival"/>
      </CarouselProductsContainer>
    </div>
  );
};

export default Home;
