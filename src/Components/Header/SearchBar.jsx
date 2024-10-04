import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IoIosSearch } from "react-icons/io";
import { useGetSearchDetailsQuery } from "../../Reduxtoolkit/apiSlice/apiSlice";

function SearchBar({ handleSearchClick }) {
  const [userSearch, setUserSearch] = useState("");
  const [delayedText, setDelayedText] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [showFetchedData, setShowFetchedData] = useState(false);

  const {
    data: fetchedSearchedData,
    error,
    isLoading,
  } = useGetSearchDetailsQuery(delayedText);

  const handleSearch = (e) => {
    setUserSearch(e.target.value);
  };

  const handleClose = () => {
    setUserSearch("");
    setShowFetchedData(false);
    setFetchedData([]);
  };

  useEffect(() => {
    if (!userSearch) return;
    const timer = setTimeout(() => {
      setDelayedText(userSearch);
    }, 300);

    setFetchedData(fetchedSearchedData?.products);
    setShowFetchedData(true);
    const handleShow = (e) => {
      if (e.target.id !== "searchedItems" && e.target.id !== "input") {
        setShowFetchedData(false);
      }
    };
    document.body.addEventListener("click", handleShow);

    return () => {
      clearTimeout(timer);
      document.body.removeEventListener("click", handleShow);
    };
  }, [userSearch, fetchedSearchedData]);

  return (
    <>
      <IoIosSearch />
      <input
        id="input"
        type="text"
        placeholder="Search"
        value={userSearch}
        onFocus={() => setShowFetchedData(true)}
        onChange={(e) => handleSearch(e)}
        className="w-[210px] md:w-[400px] pl-2 py-1 bg-transparent focus:outline-none"
      />
      {userSearch && (
        <span onClick={() => handleClose()}>
          <CloseIcon className="absolute right-4 top-2" />
        </span>
      )}
      {error ? (
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
        showFetchedData &&
        fetchedData?.length !== 1 &&
        fetchedData?.length > 0 && (
          <div
            className={`absolute text-black left-0 top-10 ${
              fetchedData.length >= 16 ? "h-[80vh]" : "h-auto"
            }
              w-full z-10 overflow-y-scroll`}
            id="searchedItems"
          >
            {fetchedData.map((data) => {
              return (
                <p
                  className="border-b border-black/30 bg-gray-200 first-of-type:rounded-t-md 
                  last-of-type:rounded-b-md px-4 py-2 hover:bg-gray-300"
                  key={data.title}
                  onClick={() =>
                    handleSearchClick(
                      data.category,
                      data.title,
                      data.id,
                      setUserSearch,
                      setFetchedData,
                      setShowFetchedData
                    )
                  }
                >
                  {data.title}
                </p>
              );
            })}
          </div>
        )
      )}
      {fetchedData?.length === 0 && userSearch !== "" && (
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

export default React.memo(SearchBar);
