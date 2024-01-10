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
import ProductCarousel from "../ProductCarousel/ProductCarousel";

export default function Product() {
  const [open, setOpen] = React.useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  let location = useLocation();
  let productId = location.state;

  const auth = useSelector((state) => state.auth.isAuthenticated);

  let dispatch = useDispatch();
  const handleAddtoCart = (product) => {
    auth && dispatch(addCartItem(product));
    setOpen(true);
  };

  const handleAddtoWishlist = (product) => {
    auth && dispatch(addWishlistItem(product));
    setWishlistOpen(true);
  };

  let snackbarMessage = "Product is added to Cart!"
  let snackbarMessage2 = "Product is added to Wishlist!"

  useEffect(() => {
    const fetchedProduct = async () => {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        setError(error)
      }
    };
    fetchedProduct();
  }, [productId]);

  const [image, setImage] = useState(null);

  return (
    <div>
       {error ? (
          <div className="h-screen w-screen flex flex-col justify-center items-center mx-4 md:mx-0 bg-red-600">
          <p className=" text-white text-2xl">Oops, API error: {error.message}.</p>
          <p className=" text-white text-2xl"> Please try after sometime.</p>
       </div>
        ):
       product && (
        <>
          <h1 className="text-xl md:text-3xl mt-20 md:mt-28 ms-10 md:ms-16 text-black font-semibold">
            {product.title}
          </h1>

          <div className="flex flex-col md:flex-row items-center md:items-start mx-4 md:mx-8">
            <div className=" order-2 md:order-1">
              <ProductCarousel product={product} setImageFunc={setImage} />
            </div>

            <div className="m-4 md:mx-10 md:mt-8 w-10/12 md:w-full order-1 md:order-2">
              <img
                src={image ? image : product.thumbnail}
                alt={product.title}
                className="mb-4 rounded-3xl transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-105
                border-b border-black duration-300 hover:shadow-lg hover:shadow-sky-500 cursor-pointer"
              />
              <p>Brand: {product.brand} </p>
              <p>Units Left: {product.stock} </p>
              <p className="text-sky-700 font-semibold md:text-lg">
                Price: Rs. {(product.price * 84).toLocaleString("en-IN")}
              </p>
              <p className="mb-6 mt-1">Description: {product.description}.</p>
              <div>
                <button
                  className="bg-sky-600 hover:bg-sky-500 text-white px-2 py-2 rounded-lg inline-block"
                  onClick={() => handleAddtoCart(product)}
                >
                  Add to Cart <AddShoppingCartIcon />
                </button>

                <button
                  className="bg-sky-600 hover:bg-sky-500 text-white p-2 rounded-lg !ms-4"
                  onClick={() => handleAddtoWishlist(product)}
                >
                  Add to <FavoriteOutlinedIcon />
                </button>
              </div>
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
        </>
      )}
    </div>
  );
}
