import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import FilterForm from "../components/FilterForm";
import PaginationSearchResult from "../components/PaginationSearchResult";
import axios from "axios";
import { API_BASE_URL } from "../helpers";


const SearchResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsMetadata, setSearchResultsMetadata] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchword, setSearchword] = useState("")
  const [author, setAuthor] = useState("")
  const [extension, setExtension] = useState("")
  const [availability, setAvailability] = useState("")
  const [pageSize, setPageSize] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      let searchword = searchParams.get("searchword") || "";
      let page =  searchParams.get("page") || 1;
      let author = searchParams.get("author") || ""
      let extension = searchParams.get("extension") || ""
      let availability = searchParams.get("availability") || ""
      let pageSize = searchParams.get("page_size") || "";
      let isbn = searchParams.get("isbn") || "";

      setCurrentPage(parseInt(page))
      setIsLoading(true)
      await fetchBooks(searchword, author, extension, availability, pageSize, page, isbn);
      setIsLoading(false)
    };
    fetchData();

    // this code should be executed whenever user change page, or change filter value
    // so we added all those state as useEffect dependencies.
    // al those state will be updated using handleFilterChanges() event handler
  }, [currentPage, searchword, author, extension, availability, pageSize]);

  const fetchBooks = async (searchword, author, extension, availability, pageSize, page, isbn) => {
    try {
      const response = await axios.get(API_BASE_URL + "/v1/books", {
        params: {
          searchword,
          author,
          extension,
          availability,
          page_size: pageSize,
          page,
          isbn
        }
      })
      setSearchResults(response.data.books);
      setSearchResultsMetadata(response.data.metadata);
    } catch (error) {
      console.error(error);
    }
  };

  // fired when user change from one page to another page (pagination)
  const handlePageChanges = (selectedPage) => {
    setCurrentPage(selectedPage)
  }

  // Fired when one of the filter changes
  const handleFilterChanges = (searchword, author, extension, availability, pageSize) => {
    setSearchword(searchword)
    setAuthor(author)
    setExtension(extension)
    setAvailability(availability)
    setPageSize(pageSize)
  }

  return (
    <React.Fragment>
      <Navbar onFilterChanges={handleFilterChanges} />
      <SearchResultContainer>
        <FilterForm onFilterChanges={handleFilterChanges}/>
        <PaginationSearchResult
          products={searchResults}
          metadata={searchResultsMetadata}
          onPageChanges={handlePageChanges}
          isLoading={isLoading}
          activePage={currentPage}
        />
      </SearchResultContainer>
    </React.Fragment>
  );
};

export default SearchResult;
