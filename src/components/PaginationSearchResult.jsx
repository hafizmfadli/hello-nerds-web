import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ProductItem from "./ProductItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate, useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";


const PaginationSearchResult = ({
  products,
  metadata,
  onPageChanges,
  isLoading,
  activePage,
}) => {
  const [productList, setProductList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Using props as initial state is anti-pattern
  // So, to workaround this we can use useEffect
  // and make the props as dependency
  useEffect(() => {
    setProductList(products);
  }, [products]);

  // fire when pagination page changes
  const handlePageChanges = async (event, page) => {
    // we need to make sure that whenever user change from one page
    // to another the query param should be preserved

    // store all query param
    const queryParams = new Map()
    queryParams.set("searchword", searchParams.get("searchword") || "")
    queryParams.set("author", searchParams.get("author") || "")
    queryParams.set("extension", searchParams.get("extension") || "")
    queryParams.set("availability", searchParams.get("availability") || "")
    queryParams.set("page_size", searchParams.get("page_size") || "")

    // construct same url as previous one
    let url = "/product/search" 
    let i = 0
    for (const [key, value] of queryParams) {
      if (value !== "") {
        if (i === 0) {
          url = url.concat(`?${key}=${value}`)
        }else {
          url = url.concat(`&${key}=${value}`)
        }
      }
      i += 1
    }

    // page query param only need to display on URL whenever
    // page value is greater than 1
    if ( page > 1) {
      navigate(`${url}&page=${page}`);
    } else {
      navigate(url)
    }
    onPageChanges(page);
  };

  let content;
  let isEmptyResult = true;


  if (isLoading) {
    // Display circular progress if api call haven't finished yet
    content = <CircularProgress />;
  } else {
    if (productList) {
      if (productList.length) {
        content = productList.map((product) => (
          <ProductItem
            key={product.id}
            productId={product.id}
            productTitle={product.title}
            price={product.price}
            author={product.author}
            imgUrl={product.imgUrl}
          />
        ));
        isEmptyResult = false
      }
    }
    if (!content) {
      content = <h2>No results found</h2>;
    }
  }

  return (
    <Box
      sx={{
        width: {
          xs: "400px",
          sm: "1000px",
        },
        margin: {
          xs: "20px 0",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Paper
        sx={{
          display: {
            xs: "flex",
          },
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          width: {
            md: "1000px",
          },
          padding: "30px 0",
        }}
      >
        {content}
      </Paper>
      {/* Only display pagination button if search result not empty */}
      {!isEmptyResult && (
          <Stack spacing={2}>
            <Pagination
              count={metadata?.last_page}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChanges}
              page={activePage}
            />
          </Stack>
        )}
    </Box>
  );
};

export default PaginationSearchResult;
