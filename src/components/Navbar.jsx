import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useRef, useEffect, useMemo } from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import axios from "axios";
import { debounce } from "lodash";
import { API_BASE_URL } from "../helpers";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { selectCart, sumCartQuantity } from '../slices/cartSlice'
import cartService from '../services/cart'


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60ch",
    },
  },
}));

const Navbar = ({ onFilterChanges }) => {
  const [isSearchBtnClicked, setIsSearchBtnClicked] = useState(false);
  const [searchResults, setSearchResult] = useState([]);
  const searchInputRef = useRef();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const cartQty = useSelector(sumCartQuantity)

  useEffect(() => {
    // set focus to search box when user clicked
    // magnifier button
    if (isSearchBtnClicked) {
      searchInputRef.current.focus();
    }
  }, [isSearchBtnClicked]);

  useEffect(() => {
    // make sure searchbox value is sync with query param
    // bisa pake redux untuk sync anatar query param, navbar searchbox, dan keyword di advance filter
    searchInputRef.current.value = searchParams.get("searchword") || "";
  }, []);

  // fire when magnifier button (only show when screen size < md) clicked
  const handleShowSearchInput = () => {
    setIsSearchBtnClicked(true);
  };

  // fired when searcbox lost focus
  const handleSearchBlurred = (e) => {
    // delay execution a little time
    // just in case blurred is caused by
    // user select one of the provided
    // search suggestion. So if that the case we want
    // handleSelectSearchSuggestion() is executed first
    setTimeout(() => {
      // hide searchbox and display magnifier button
      // (only taking effect when screen <= md)
      setIsSearchBtnClicked(false);

      // hide all suggestion
      setSearchResult([]);
    }, 200);
  };

  const fetchBook = async (query) => {
    if (!query) return setSearchResult([]);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/v1/books/suggest?typesearch=${query}`
      );
      setSearchResult(response.data.suggestions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    fetchBook(e.target.value);
  };

  // debounce version from handleInputChange
  // fired when user typing
  // reference : https://dmitripavlutin.com/react-throttle-debounce/
  const debouncedHandleInputChange = useMemo(
    () => debounce(handleInputChange, 400),
    []
  );

  // fired when user selected one of the provided suggestion
  const handleSelectSearchSuggestion = async (selectedTitle) => {
    // set search box value to correspond suggestion's title
    searchInputRef.current.value = selectedTitle;

    // hide all suggestion
    setSearchResult([]);

    // navigate to search result page
    navigate(`/product/search?searchword=${selectedTitle}`);

    // update all filter state so SearchResult page can be triggered to make API call
    onFilterChanges(selectedTitle, "", "", "", "");
  };

  // fired when user press enter
  const handleEnterInput = (e) => {
    if (e.key === "Enter") {
      // hide all suggestion
      setSearchResult([]);

      // navigate to search result page
      let searchword = e.target.value;
      navigate(`/product/search?searchword=${searchword}`);
      
      // update all filter state so SearchResult page can be triggered to make API call
      onFilterChanges(searchword, "", "", "", "");
    }
  };

  // fired when cart button is clicked
  const handleCartClicked = (e) => {
    navigate(`/checkout/cart`);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: isSearchBtnClicked ? "none" : "block" } }}
        >
          HELLO NERDS
        </Typography>
        {/* Search Box */}
        <Search
          sx={{
            display: { xs: isSearchBtnClicked ? "block" : "none", md: "block" },
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="search..."
            inputProps={{ "aria-label": "search" }}
            onBlur={handleSearchBlurred}
            inputRef={searchInputRef}
            onChange={debouncedHandleInputChange}
            onKeyDown={handleEnterInput}
          />

          {/* Suggestion panel */}
          {searchResults && searchResults.length > 0 && (
            <Paper
              sx={{
                display: searchResults ? "block" : "none",
                position: "absolute",
                width: "100%",
              }}
            >
              <MenuList>
                {searchResults.map((suggestion, i) => (
                  <MenuItem key={i}>
                    <Container
                      sx={{ display: { xs: "flex" } }}
                      onClick={() =>
                        handleSelectSearchSuggestion(suggestion.title)
                      }
                    >
                      <img
                        src="https://static.periplus.com/nPjyff5ADpJIFw3k1SUY3rk6LAHWjBIIBJOxcucKiAdbZiUA6HeufCI9VBSEevJAw--"
                        width={80}
                        height={80}
                        alt="book cover"
                      />
                      <Container
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Typography noWrap>{suggestion.title}</Typography>
                        <Typography noWrap variant="caption">
                          Author: {suggestion.author}
                        </Typography>
                      </Container>
                    </Container>
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          )}
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        {/* account and shopping cart button */}
        <Box sx={{ display: { xs: isSearchBtnClicked ? "none" : "flex" } }}>
          <IconButton
            size="large"
            color="inherit"
            sx={{ display: { sx: "flex", md: "none" } }}
            onClick={handleShowSearchInput}
          >
            <SearchIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={handleCartClicked}>
            <Badge badgeContent={cartQty} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
