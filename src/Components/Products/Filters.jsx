import React, { useEffect, useState } from "react";
import { ratingArr, sortingArr } from "../../utils/constants";

export default function Filters({
  products,
  handleFilterChange,
  handleSortChange,
  clearFilters,
  handlePriceRangeChange,
  selectedRatings,
  sortOption,
}) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => product.price * 84);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [products]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handlePriceRangeInputChange = (e) => {
    const value = e.target.value;
    const [newMin, newMax] = priceRange;
    setPriceRange([newMin, value]);
    handlePriceRangeChange([newMin, value]);
  };

  return (
    <div className="">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>

        {/* Price Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Price Range</h3>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={handlePriceRangeInputChange}
            className="w-full"
          />
          <p>
            Rs.{priceRange[0]} - Rs.{priceRange[1]}
          </p>
        </div>

        {/* Sort Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Sort By</h3>
          {sortingArr.map((sort) => (
            <label key={sort.name} className="block mb-2">
              <input
                type="radio"
                value={sort.name}
                name="sort"
                checked={sortOption === sort.name} // Check based on state
                onChange={handleSortChange}
                className="mr-2"
              />
              Price: {sort.label}
            </label>
          ))}
        </div>

        {/* Ratings Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Ratings</h3>
          {ratingArr.map((rating) => (
            <label key={rating} className="block mb-2">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRatings.includes(rating)} // Check based on state
                onChange={(e) => handleFilterChange(e, rating)}
                className="mr-2"
              />
              {rating} Star and above
            </label>
          ))}
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="bg-red-500 text-white py-2 px-4 rounded w-full"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
