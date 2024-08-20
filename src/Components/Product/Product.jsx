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

  const [image, setImage] = useState(null);

  return (
    <div>
      {error ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center mx-4 md:mx-0 bg-red-600">
          <p className=" text-white text-2xl">
            Oops, API error: {error.message}.
          </p>
          <p className=" text-white text-2xl"> Please try after sometime.</p>
        </div>
      ) : (
        product && (
          <div className="mx-">
            <h1 className="text-xl md:text-3xl mt-20 md:mt-28 me-2 ms-6 md:ms-16 text-black font-semibold">
              {product.title}
            </h1>

            {/* <div className="flex flex-col md:flex-row items-center justify-center md:items-start mx-4 md:mx-8"> */}
            <div className="grid grid-flow-col grid-cols-12 gap-30">
              <div className="order-1 md:order-2 col-span-6">
                <img
                  src={image ? image : product.thumbnail}
                  alt={product.title}
                  className="w-[70%] md:w-[68%] rounded-3xl transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-105
                duration-300 cursor-pointer"
                />
                {/* <div> */}
                <ProductCarousel product={product} setImageFunc={setImage} />
                {/* </div> */}
              </div>

              <div
                // className="mt-0 mx-2 md:mx-10 md:mt-8 px-4 pb-4 md:px-10 md:pb-10 rounded-lg flex flex-col items-center order-2
                // w-[100%] md:w-[40%]"
                className="col-span-5 order-2 p-4 flex flex-col items-center"
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
                <div className="text-sm md:text-base">
                  <p>Brand: {product.brand} </p>
                  <p>Units Left: {product.stock} </p>
                  <p className="text-sky-700 font-semibold md:text-lg">
                    Price: Rs. {(product.price * 84).toLocaleString("en-IN")}
                  </p>
                  <p className="mb-6 mt-1">
                    Description: {product.description}.
                  </p>
                  <div className="flex flex-col md:flex-row ">
                    <button
                      className="bg-sky-600 hover:bg-sky-500 text-white w-[100%] md:w-[50%] text-sm md:text-lg p-1.5 md:p-2 rounded-lg
                       inline-block"
                      onClick={() => handleAddtoCart(product)}
                    >
                      Add to Cart <AddShoppingCartIcon />
                    </button>

                    <button
                      className="bg-sky-600 hover:bg-sky-500 text-white w-[100%] md:w-[50%] text-sm md:text-lg p-1.5 md:p-2
                       rounded-lg mt-2 ml-0 md:mt-0 md:ml-2"
                      onClick={() => handleAddtoWishlist(product)}
                    >
                      Add to <FavoriteOutlinedIcon />
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
