import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  addWishlistItem,
} from "../ReduxFeatures/cartSlice/cartSlice";
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

  const [imageIdx, setImageIdx] = useState(0);

  return (
    <div className="mx-5 md:mx-16 xl:mx-24 mt-24 lg:mt-20">
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
            <div className="flex flex-col lg:grid grid-flow-col grid-cols-12 mb-6">
              <div className="col-span-12 md:col-span-7 flex gap-4 md:gap-30 mt-4 lg:mt-14">
                <div>
                  <ProductCarousel
                    product={product}
                    setImageFunc={setImageIdx}
                  />
                </div>
                <div className="flex items-baseline justify-center">
                  <img
                    src={
                      product.images.length > 0
                        ? product.images[imageIdx]
                        : product.thumbnail
                    }
                    alt={product.title}
                    className="w-[100%] md:w-[60%] lg:w-[70%] object-cover rounded-3xl transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-105
                duration-300 cursor-pointer "
                  />
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 p-3 flex flex-col mt-2 lg:mt-6">
                <h1 className="text-xl md:text-2xl xl:text-3xl mb-2 text-black font-semibold">
                  {product.title}
                </h1>
                <div className="text-sm md:text-base">
                  <p>Brand: {product?.brand} </p>
                  <p>
                    Units Left:{" "}
                    {product.stock > 0 ? product.stock : "Out of Stock"}{" "}
                  </p>
                  <div className="flex gap-2">
                    <span>Price: </span>
                    <span className="font-bold">
                      Rs. {(product.price * 84).toLocaleString("en-IN")}{" "}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="line-through mr-1">
                      Rs.{" "}
                      {(
                        product.price * 84 +
                        (product.price * 84 * product.discountPercentage) / 100
                      ).toLocaleString("en-IN")}
                    </span>
                    <span className="font-bold">
                      {" "}
                      ({product.discountPercentage}% off)
                    </span>
                  </div>
                  <p>Miniumum Order Quantity: {product.minimumOrderQuantity}</p>
                  <p>Rating: {product.rating}/5 </p>
                  <p className="mb-4 mt-1">
                    Description: {product.description}.
                  </p>
                  <div className="flex flex-col md:flex-row font-semibold lg:font-bold">
                    <button
                      className="border border-black/40 w-[100%] md:w-[50%] xl:w-[50%] p-1.5 md:p-2 rounded-lg hover:bg-black hover:text-white
               transition duration-300 ease-in-out"
                      onClick={() => handleAddtoCart(product)}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="border border-black/40 hover:bg-black hover:text-white transition
                       duration-300 ease-in-out w-[100%] md:w-[50%] xl:w-[50%] p-1.5 md:p-2
                       rounded-lg mt-2 ml-0 md:mt-0 md:ml-2"
                      onClick={() => handleAddtoWishlist(product)}
                    >
                      Add to Wishlist
                    </button>
                  </div>

                  <h2 className="text-xl font-semibold mt-8">
                    More Product Information:
                  </h2>
                  <div className="flex justify-between gap-3 mt-4">
                    <div className="text-sm md:text-base">
                      <p>
                        Category:{" "}
                        {product.category[0].toUpperCase() +
                          product.category.slice(1)}
                      </p>
                      <p>
                        Dimensions: {product.dimensions.depth} depth,{" "}
                        {product.dimensions.width} width,{" "}
                        {product.dimensions.height} height{" "}
                      </p>
                      <p>Return Policy: {product.returnPolicy} </p>
                      <p>Shipment: {product.shippingInformation} </p>
                      <p>Warranty: {product.warrantyInformation} </p>
                    </div>
                    <img
                      src={product.meta.qrCode}
                      alt="product-qrCode"
                      className="w-24 md:w-36 object-contain"
                    />
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
