import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../Javascript/projectJavascript";
import { Html } from "@mui/icons-material";

export default function SearchBar({ SearchClickFunc }) {
  const [userSearch, setUserSearch] = useState("");
  const [fetchedSearchData, setfetchedSearchData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleSearch = setTimeout(async () => {
      try {
        let response =
          userSearch &&
          (await axios.get(
            `https://dummyjson.com/products/search?q=${userSearch}`
          ));
        userSearch && setfetchedSearchData(response.data.products);
      } catch (error) {
        setError(error);
      }
    }, 300);

    return () => clearTimeout(handleSearch);
  }, [userSearch]);

  return (
    <Search
      className="!rounded-3xl flex flex-col xl:!w-96 !border border-gray-600"
      onChange={(e) => setUserSearch(e.target.value)}
      value={userSearch}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />

      {error && userSearch ? (
        <div className="absolute top-10 z-10 py-5 h-max w-full flex flex-col justify-center items-center 
        mx-4 md:mx-0 bg-red-600 rounded-xl">
          <p className=" text-white text-base">
            Oops, API error: {error.message}.
          </p>
          <p className=" text-white text-base"> Please try after sometime.</p>
        </div>
      ) : (
        fetchedSearchData &&
        userSearch && (
          <div className="absolute top-10 w-full z-10">
            {fetchedSearchData.map((data) => {
              return (
                // data.title.includes(userSearch) &&
                // (data.description.includes(userSearch) && (
                <p
                  className="border border-black first-of-type:rounded-t-3xl last-of-type:rounded-b-3xl px-4 py-1
                   bg-sky-700 bg-gradient-to-r hover:from-blue-600 hover:to-sky-500"
                  key={crypto.randomUUID()}
                >
                  <a onClick={() => SearchClickFunc(data.id)}> {data.title} </a>
                </p>
                // ))
              );
            })}
          </div>
        )
      )}
      {fetchedSearchData &&
        fetchedSearchData.length === 0 &&
        userSearch !== "" && (
          <p
            className="absolute top-9 bg-sky-700 border border-black rounded-xl w-full z-10 px-4 py-1 
            bg-gradient-to-r hover:from-blue-600 hover:to-sky-500"
          >
            No item found
          </p>
        )}
      {userSearch && (
        <span onClick={() => setUserSearch("")}>
          <CloseIcon className="absolute right-4 top-2" />
        </span>
      )}
    </Search>
  );
}
