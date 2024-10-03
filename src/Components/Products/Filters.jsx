import { ratingArr, sortingArr } from "../../utils/constants";

export default function Filters({
  handleFilterChange,
  handleSortChange,
  clearFilters,
  selectedRatings,
  sortOption,
}) {
  return (
    <div className="">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Sort By</h3>
          {sortingArr.map((sort) => (
            <label key={sort.name} className="block mb-2">
              <input
                type="radio"
                value={sort.name}
                name="sort"
                checked={sortOption === sort.name}
                onChange={handleSortChange}
                className="mr-2"
              />
              Price: {sort.label}
            </label>
          ))}
        </div>

        {/* Ratings Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Ratings</h3>
          {ratingArr.map((rating) => (
            <label key={rating} className="block mb-2">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRatings.includes(rating)}
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
