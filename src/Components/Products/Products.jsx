import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  addWishlistItem,
} from "../ReduxFeatures/cartSlice/cartSlice";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import ProductCard from "../Card/ProductCard";
import Filters from "./Filters";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [myFiltered, setMyFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState(() => {
    const savedPriceRange = JSON.parse(localStorage.getItem("priceRange"));
    return savedPriceRange || [0, 0];
  });

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

  const auth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productCategory = location.state;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${productCategory}`
        );
        const productsData = response.data.products;
        setProducts(productsData);
        setMyFiltered(productsData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [productCategory]);

    useEffect(() => {
    let filtered = products;
    localStorage.setItem("priceRange", JSON.stringify(priceRange));
    localStorage.setItem("selectedRatings", JSON.stringify(selectedRatings));
    localStorage.setItem("sortOption", sortOption);
    // Apply rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product) =>
        selectedRatings.some((rating) => product.rating >= rating)
      );
    }

    // Apply price range filter
    if (priceRange[0] !== 0 || priceRange[1] !== 0) {
      filtered = filtered.filter(
        (product) =>
          product.price * 84 >= priceRange[0] &&
          product.price * 84 <= priceRange[1]
      );
    }

    // Apply sorting
    if (sortOption === "lowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setMyFiltered(filtered);
  }, [selectedRatings, priceRange, sortOption, products]);

  const handleFilterChange = (e, rating) => {
    const { value } = e.target;
    setSelectedRatings([parseInt(value)]);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const clearFilters = () => {
    setPriceRange([0, 0]);
    setSelectedRatings([]);
    setSortOption("");
    localStorage.removeItem("priceRange");
    localStorage.removeItem("selectedRatings");
    localStorage.removeItem("sortOption");
  };

  const handleProductClick = (title, id) => {
    let urlEndpoint = title.split(" ").join("-");
    navigate(`/${productCategory}/${urlEndpoint}`, { state: id });
  };

  const handleAddtoCart = (product) => {
    auth && dispatch(addCartItem(product));
    setOpen(true);
  };

  const handleAddtoWishlist = (product) => {
    auth && dispatch(addWishlistItem(product));
    setWishlistOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row mx-6 md:mx-14 xl:mx-24 mt-24">
      {/* Filters Section */}
      <Filters
        products={products}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
        clearFilters={clearFilters}
        handlePriceRangeChange={handlePriceRangeChange}
        selectedRatings={selectedRatings}
        sortOption={sortOption}
      />

      {/* Products Section */}
      <div className="w-full md:w-3/4 pl-4">
        <h1 className="text-2xl md:text-3xl mb-4 text-black text-center md:text-left font-semibold">
          {productCategory[0].toUpperCase() + productCategory.slice(1)}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <div className="h-screen w-screen flex flex-col justify-center items-center mx-0 md:mx-0 bg-red-600">
              <p className="text-white md:text-2xl text-center">
                Oops, API error: {error.message}.
              </p>
              <p className="text-white md:text-2xl text-center">
                Please try again later.
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
          snackbarMessage="Item added to cart!"
          snackbarMessage2="Item added to wishlist!"
        />
      </div>
    </div>
  );
}
