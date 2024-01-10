import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Ratings from "../Ratings/Ratings";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  addWishlistItem,
} from "../ReduxFeatures/cartSlice/cartSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import { Skeleton } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";

export default function Products() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredId, setHoveredID] = useState(null);
  const [open, setOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategories] = useState(null);
  const [isloading, setIsLoading] = useState(true);

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

  let navigate = useNavigate();

  const handleProduct = (id) => {
    navigate("/Product", { state: id });
  };

  let dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.isAuthenticated);

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

  let snackbarMessage = "Product is added to Cart!";
  let snackbarMessage2 = "Product is added to Wishlist!";

  return (
    <div>
      <h1 className="text-3xl mx-10 md:mx-16 mt-20 md:mt-28 mb-2 text-black font-semibold ">
        {productCategory[0].toUpperCase() + productCategory.slice(1)}
      </h1>
      <div className="flex flex-wrap justify-center xl:justify-start md:ms-10 mx-2">

        {isloading ? (
          Array.from({ length: 5 }).map(() => (
            <div key={nanoid()} className="mx-4">
              <Card
                style={{ minHeight: "400px", maxHeight: "400px" }}
                className="max-w-min w-64 md:w-72 pb-2 rounded-t-3xl rounded-b-3xl transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-105 duration-300 bg-gray-300 hover:shadow-lg hover:shadow-sky-500 border-b border-black cursor-pointer"
              >
                <Skeleton
                  variant="rectangular" animation="wave" width={360} height={430}
                />
              </Card>
            </div>
          ))
        ) : error ? (
          <div className="h-screen w-screen flex flex-col justify-center items-center mx-0 md:mx-0 bg-red-600">
            <p className=" text-white md:text-2xl text-center">
              Oops, API error: {error.message}.
            </p>
            <p className=" text-white md:text-2xl text-center"> Please try after sometime.</p>
          </div>
        ) : (
          category &&
          category.map((product) => {
            return (
              <div key={crypto.randomUUID()}>
                <Card
                  style={{ minHeight: "430px", maxHeight: "430px" }}
                  className="max-w-min w-64 md:w-72 !mx-4 xl:!ms-6 xl:!me-3 my-4 !rounded-t-3xl !rounded-b-3xl 
                 pb-2 !transition !ease-in-out !delay-25 hover:-translate-y-1 hover:scale-105 !duration-300 
                 !bg-gray-300 hover:!shadow-lg hover:!shadow-sky-500 !border-b border-black cursor-pointer"
                >
                  <CardMedia
                    className=" h-60 w-72"
                    image={product.thumbnail}
                    title={product.title}
                    onClick={() => handleProduct(product.id)}
                  />
                  <CardContent className="!pb-1 !pt-2 ">
                    <p className="text-base font-semibold">{product.title}</p>
                    <p className=" mt-1 text-base">
                      Rs. {(product.price * 84).toLocaleString("en-IN")}
                    </p>

                    <span
                      className=" my-2 inline-block"
                      onMouseEnter={() => handleMouseEnter(product.id)}
                      onMouseOut={() => setIsHovering(false)}
                    >
                      <Ratings rating={product.rating} />
                    </span>
                    {isHovering && hoveredId === product.id && (
                      <span className="bg-yellow-500 text-center">
                        {product.rating}
                      </span>
                    )}
                  </CardContent>
                  <CardActions className="!pt-0">
                    <button
                      className="hover:bg-gray-100 px-2 py-1 rounded-lg ms-2 inline-block border border-black"
                      onClick={() => handleAddtoCart(product)}
                    >
                      Add to Cart <AddShoppingCartIcon />
                    </button>

                    <button
                      className="hover:bg-gray-100 p-1 rounded-lg !ms-4 border border-black"
                      onClick={() => handleAddtoWishlist(product)}
                    >
                      Add to <FavoriteOutlinedIcon />
                    </button>
                  </CardActions>
                </Card>
              </div>
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
