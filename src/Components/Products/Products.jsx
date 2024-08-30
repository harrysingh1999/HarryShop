import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  addWishlistItem,
} from "../ReduxFeatures/cartSlice/cartSlice";
import Card from "@mui/material/Card";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import { Skeleton } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { snackbarMessage, snackbarMessage2 } from "../../utils/constants";
import ProductCard from "../Card/ProductCard";

export default function Products() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredId, setHoveredID] = useState(null);
  const [open, setOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategories] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let location = useLocation();
  let productCategory = location.state;

  useEffect(() => {
    const fetchedCategory = async () => {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products/category/${productCategory}`
        );

        setCategories(response.data.products);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchedCategory();
  }, [productCategory]);

  const handleProduct = (title, id) => {
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

  const handleMouseEnter = (myId) => {
    setIsHovering(true);
    setHoveredID(myId);
  };

  return (
    <div className="mx-6 md:mx-24">
      <h1 className="text-2xl md:text-3xl mb-4 text-black text-center md:text-left mt-24 font-semibold">
        {productCategory[0].toUpperCase() + productCategory.slice(1)}
      </h1>
      <div className="flex flex-wrap justify-center md:justify-start">
        {isloading ? (
          Array.from({ length: 5 }).map(() => (
            <div
              key={nanoid()}
              className="mx-4 max-w-min w-64 md:w-72 pb-2 rounded-t-3xl rounded-b-3xl !transition ease-in-out delay-25 min-h-[400px] max-h-[400px]
                 hover:-translate-y-1 hover:scale-105 duration-300 bg-gray-300 hover:shadow-lg hover:shadow-sky-500 cursor-pointer"
            >
              <Card
                className="max-w-min w-64 md:w-72 pb-2 rounded-t-3xl rounded-b-3xl !transition ease-in-out delay-25 min-h-[400px] max-h-[400px]
                 hover:-translate-y-1 hover:scale-105 duration-300 bg-gray-300 hover:shadow-lg hover:shadow-sky-500 cursor-pointer"
              >
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={360}
                  height={430}
                />
              </Card>
            </div>
          ))
        ) : error ? (
          <div className="h-screen w-screen flex flex-col justify-center items-center mx-0 md:mx-0 bg-red-600">
            <p className=" text-white md:text-2xl text-center">
              Oops, API error: {error.message}.
            </p>
            <p className=" text-white md:text-2xl text-center">
              Please try after sometime.
            </p>
          </div>
        ) : (
          category &&
          category.map((product) => {
            return (
              <ProductCard
                key={product.title}
                data={product}
                isHovering={isHovering}
                handleMouseEnter={handleMouseEnter}
                setIsHovering={setIsHovering}
                hoveredId={hoveredId}
                handleProduct={handleProduct}
                handleAddtoCart={handleAddtoCart}
                handleAddtoWishlist={handleAddtoWishlist}
                btnText1="Add to Cart"
                btnText2="Add to Wishlist"
              />
            );
          })
        )}

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
