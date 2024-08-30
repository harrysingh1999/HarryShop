import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  addWishlistItem,
} from "../ReduxFeatures/cartSlice/cartSlice";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import ProductCarousel from "./ProductCarousel";
import { snackbarMessage, snackbarMessage2 } from "../../utils/constants";
import ProductReview from "./ProductReview";
import { FaRegHeart } from "react-icons/fa";

export default function Product() {
  const [open, setOpen] = React.useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const auth = useSelector((state) => state.auth.isAuthenticated);

  let location = useLocation();
  let productId = location.state;

  let dispatch = useDispatch();
  const handleAddtoCart = (product) => {
    auth && dispatch(addCartItem(product));
    setOpen(true);
  };

  const handleAddtoWishlist = (product) => {
    auth && dispatch(addWishlistItem(product));
    setWishlistOpen(true);
  };

  useEffect(() => {
    const fetchedProduct = async () => {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        console.log(response.data);

        setProduct(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchedProduct();
  }, [productId]);

  const [imageIdx, setImageIdx] = useState(0);

  return (
    <div className="mx-4 md:mx-24 mt-20 lg:mt-8">
      {error ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center mx-4 md:mx-0 bg-red-600">
          <p className=" text-white text-2xl">
            Oops, API error: {error.message}.
          </p>
          <p className=" text-white text-2xl"> Please try after sometime.</p>
        </div>
      ) : (
        product && (
          <div>
            {/* <div className="flex flex-col md:flex-row items-center justify-center md:items-start mx-4 md:mx-8"> */}
            <div className="flex flex-col lg:grid grid-flow-col grid-cols-12 mb-6">
              <div className="col-span-12 md:col-span-8 flex items-center gap-4 md:gap-30">
                <div>
                  <ProductCarousel product={product} setImageFunc={setImageIdx} />
                </div>
                <div className="flex justify-center">
                  <img
                    src={product.images.length > 0 ? product.images[imageIdx] : product.thumbnail}
                    alt={product.title}
                    className="w-[100%] md:w-[60%] lg:w-[70%] object-cover rounded-3xl transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-105
                duration-300 cursor-pointer "
                  />
                </div>
              </div>

              <div
                // className="mt-0 mx-2 md:mx-10 md:mt-8 px-4 pb-4 md:px-10 md:pb-10 rounded-lg flex flex-col items-center order-2
                // w-[100%] md:w-[40%]"
                className="col-span-12 md:col-span-6 p-3 flex flex-col lg:mt-16"
                // style={{
                //   boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
                // }}
              >
                {/* <img
                  src={image ? image : product.thumbnail}
                  alt={product.title}
                  //   className="w-[70%] md:w-[62%] rounded-3xl transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-105
                  // duration-300 hover:shadow-lg hover:shadow-sky-500 cursor-pointer"
                  className="rounded-3xl transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-105
                duration-300 cursor-pointer"
                /> */}
                <h1 className="text-xl md:text-3xl mb-2 text-black font-semibold">
                  {product.title}
                </h1>
                <div className="text-sm md:text-base">
                  <p>Brand: {product.brand} </p>
                  <p>Units Left: {product.stock} </p>
                  <p className="font-bold md:text-lg">
                    Price: Rs. {(product.price * 84).toLocaleString("en-IN")}
                  </p>
                  <p className="mb-6 mt-1">
                    Description: {product.description}.
                  </p>
                  <div className="flex flex-col md:flex-row ">
                    <button
                      className="border border-black/40 w-[100%] md:w-[50%] text-sm md:text-lg p-1.5 md:p-2 rounded-lg
                       inline-block"
                      onClick={() => handleAddtoCart(product)}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="border border-black/40 w-[100%] md:w-[50%] text-sm md:text-lg p-1.5 md:p-2
                       rounded-lg mt-2 ml-0 md:mt-0 md:ml-2"
                      onClick={() => handleAddtoWishlist(product)}
                    >
                      Add to <FaRegHeart/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      <CustomSnackbar
        open={open}
        wishlistOpen={wishlistOpen}
        setOpen={setOpen}
        setWishlistOpen={setWishlistOpen}
        snackbarMessage={snackbarMessage}
        snackbarMessage2={snackbarMessage2}
      />

      {product && <ProductReview reviews={product.reviews} />}
    </div>
  );
}
