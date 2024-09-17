import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar({ handleSearchClick }) {
  const [userSearch, setUserSearch] = useState("");
  const [fetchedSearchData, setfetchedSearchData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userSearch) return;
    const handleSearch = setTimeout(async () => {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products/search?q=${userSearch}`
        );
        setfetchedSearchData(response.data.products);
      } catch (error) {
        setError(error);
      }
    }, 300);

    return () => clearTimeout(handleSearch);
  }, [userSearch]);

  return (
    <>
      <IoIosSearch />
      <input
        type="text"
        placeholder="Search"
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
        className="w-[210px] md:w-[400px] pl-2 py-0.5 bg-transparent focus:outline-none"
      />
      {userSearch && (
        <span onClick={() => setUserSearch("")}>
          <CloseIcon className="absolute right-4 top-2" />
        </span>
      )}
      {error && userSearch ? (
        <div
          className="absolute top-10 z-10 py-5 h-max w-full flex flex-col justify-center items-center 
        mx-4 md:mx-0 bg-red-600 rounded-xl"
        >
          <p className=" text-white text-base">
            Oops, API error: {error.message}.
          </p>
          <p className=" text-white text-base"> Please try after sometime.</p>
        </div>
      ) : (
        fetchedSearchData &&
        fetchedSearchData.length !== 0 && (
          <div
            className={`absolute text-black left-0 top-9 ${
              fetchedSearchData.length >= 16 ? "h-[82vh]" : "h-auto"
            }
              w-full z-10 overflow-y-scroll`}
          >
            {fetchedSearchData.map((data) => {
              return (
                <p
                  className="border-b border-black/30 bg-gray-200 first-of-type:rounded-t-md 
                  last-of-type:rounded-b-md px-4 py-1 hover:bg-gray-300"
                  key={data.title}
                  onClick={() =>
                    handleSearchClick(
                      data.category,
                      data.title,
                      data.id,
                      setUserSearch,
                      setfetchedSearchData
                    )
                  }
                >
                  {data.title}{" "}
                </p>
              );
            })}
          </div>
        )
      )}
      {fetchedSearchData &&
        fetchedSearchData.length === 0 &&
        userSearch !== "" && (
          <p
            className="absolute left-0 top-9 text-black w-full bg-gray-200 first-of-type:rounded-t-md 
                  last-of-type:rounded-b-md px-4 py-1 hover:bg-gray-300"
          >
            No item found
          </p>
        )}
    </>
  );
}
