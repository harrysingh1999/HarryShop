import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addCartItem,
  addWishlistItem,
} from "../../Reduxtoolkit/cartSlice/cartSlice";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import ProductCard from "../Card/ProductCard";
import Filters from "./Filters";
import { useGetCategoryProductsQuery } from "../../Reduxtoolkit/apiSlice/apiSlice";
import { snackbarMessage, snackbarMessage2 } from "../../utils/constants";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [myFiltered, setMyFiltered] = useState([]);

  const [selectedRatings, setSelectedRatings] = useState(() => {
    const savedRatings = JSON.parse(localStorage.getItem("selectedRatings"));
    return savedRatings || [];
  });

  const [sortOption, setSortOption] = useState(() => {
    const savedSortOption = localStorage.getItem("sortOption");
    return savedSortOption || "";
  });

  const [open, setOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productCategory = location.state;
  const {
    data: fetchedCategoryProducts,
    error,
    isLoading,
  } = useGetCategoryProductsQuery(productCategory);

  useEffect(() => {
    fetchedCategoryProducts && setProducts(fetchedCategoryProducts.products);
    fetchedCategoryProducts && setMyFiltered(fetchedCategoryProducts.products);
  }, [fetchedCategoryProducts]);

  useEffect(() => {
    let filtered = [...products];
    // Save filter states to local storage
    localStorage.setItem("selectedRatings", JSON.stringify(selectedRatings));
    localStorage.setItem("sortOption", sortOption);

    // Filter by selected ratings
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product) =>
        selectedRatings.some((rating) => product.rating >= rating)
      );
    }
    // Apply sorting logic
    if (sortOption === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setMyFiltered(filtered);
  }, [selectedRatings, sortOption, products]);

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setSelectedRatings([parseInt(value)]);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const clearFilters = () => {
    setSelectedRatings([]);
    setSortOption("");
    localStorage.removeItem("selectedRatings");
    localStorage.removeItem("sortOption");
  };

  const handleProductClick = (title, id) => {
    let urlEndpoint = title.split(" ").join("-");
    navigate(`/${productCategory}/${urlEndpoint}`, { state: id });
  };

  const handleAddtoCart = (product) => {
    dispatch(addCartItem(product));
    setOpen(true);
  };

  const handleAddtoWishlist = (product) => {
    dispatch(addWishlistItem(product));
    setWishlistOpen(true);
  };

  return (
    <div className="flex flex-col md:grid grid-flow-col grid-cols-12 gap-6 mx-6 mt-28">
      {/* Filters Section */}
      <div className="md:col-span-3 xl:col-span-3">
        <Filters
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
          clearFilters={clearFilters}
          selectedRatings={selectedRatings}
          sortOption={sortOption}
        />
      </div>
      {/* Products Section */}
      <div className="md:col-span-9 xl:col-span-9 pl-2">
        <h1 className="text-2xl md:text-3xl mb-4 text-black text-center md:text-left font-semibold capitalize">
          {productCategory}
        </h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 justify-items-center md:justify-items-start">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <div className="h-screen w-screen flex flex-col justify-center items-center bg-red-600">
              <p className="text-white md:text-2xl text-center">
                {error.error ? error.error : error.message}
              </p>
              <p className="text-white md:text-2xl text-center">
                API error: Please try again later.
              </p>
            </div>
          ) : myFiltered.length > 0 ? (
            myFiltered.map((product) => (
              <ProductCard
                key={product.id}
                data={product}
                handleProduct={handleProductClick}
                handleAddtoCart={handleAddtoCart}
                handleAddtoWishlist={handleAddtoWishlist}
                btnText1="Add to Cart"
                btnText2="Add to Wishlist"
              />
            ))
          ) : (
            <div className="w-full flex justify-center items-center">
              <p>No products found.</p>
            </div>
          )}
        </div>

        <CustomSnackbar
          open={open}
          wishlistOpen={wishlistOpen}
          setOpen={setOpen}
          setWishlistOpen={setWishlistOpen}
          snackbarMessage={snackbarMessage}
          snackbarMessage2={snackbarMessage2}
        />
      </div>
    </div>
  );
}
