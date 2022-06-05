import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { validateISBN } from "../helpers";

const FormGroup = styled.div`
  > label {
    display: block;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-top: "30px";
  background-color: black;
  color: white;
`;

const FilterForm = ({ onFilterChanges }) => {
  const {
    register,
    handleSubmit,
    setValue
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // make sure searchbox value is sync with query param
    // bisa pake redux untuk sync anatar query param, navbar searchbox, dan keyword di advance filter
    setValue("keyword", ((searchParams.get("searchword") ? searchParams.get("searchword"): "") + 
    " " + (searchParams.get("isbn") ? searchParams.get("isbn") : "" ) ).trim() || "" )
  }, [searchParams]);

  const onSubmit = (data) => {
    let author = data.author;
    let availability = data.availability;
    let extension = data.extension;
    let pageSize = data.pageSize;
    
    let tempArr = data.keyword.split(' ');
    let isbn = tempArr.filter(substring => validateISBN(substring)).reduce((prev, curr) => prev + " " + curr, "").trim()
    let searchword = tempArr.filter(substring => !validateISBN(substring)).reduce((prev, curr) => prev + " " + curr, "").trim()


    // when  form submitted, this component only need to navigate with correspond query param
    navigate(`/product/search?searchword=${searchword}&author=${author}&availability=${availability}&extension=${extension}&page_size=${pageSize}&isbn=${isbn}`);

    // update all filter state so SearchResult page can be triggered to make API call
    onFilterChanges(searchword, author, extension, availability, pageSize)
  };

  return (
    <Box
      sx={{
        width: {
          xs: "400px",
        },
        marginTop: {
          xs: "20px",
        },
      }}
    >
      <Paper
        sx={{
          padding: "80px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Filter Your Search</h3>
          <hr></hr>
          <FormGroup>
            <label>Keyword:</label>
            <input {...register("keyword")} placeholder="keyword" />
          </FormGroup>
          <br></br>

          <FormGroup>
            <label>Author:</label>
            <input {...register("author")} placeholder="author" />
          </FormGroup>
          <br></br>

          <FormGroup>
            <label>Extension</label>
            <select {...register("extension")} defaultValue="all">
              <option value="all">
                all extension
              </option>
              <option value="pdf">pdf</option>
              <option value="epub">epub</option>
              <option value="djvu">djvu</option>
            </select>
          </FormGroup>
          <br></br>

          <FormGroup>
            <label>Available</label>
            <select {...register("availability")} defaultValue="1">
              <option value="0">
                all
              </option>
              <option value="1">in stock</option>
              <option value="2">currently unavailable</option>
            </select>
          </FormGroup>
          <br></br>

          <FormGroup>
            <label>Show</label>
            <select {...register("pageSize")} defaultValue="24">
              <option value="24">24</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="90">90</option>
              <option value="120">120</option>
            </select>
          </FormGroup>
          <br></br>

          <Input type="submit" />
        </form>
      </Paper>
    </Box>
  );
};

export default FilterForm;
