import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addCartItem,
} from "../../Reduxtoolkit/cartSlice/cartSlice";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import ProductCarousel from "./ProductCarousel";
import { snackbarMessage, snackbarMessage2 } from "../../utils/constants";
import ProductReview from "./ProductReview";
import CustomButton from "../CustomButton/CustomButton";
import { useGetProductDetailsQuery } from "../../Reduxtoolkit/apiSlice/apiSlice";
import CompressedImage from "../CompressedImage";
import Ratings from "../Ratings/Ratings";
import { addWishlistItem } from "../../Reduxtoolkit/wishlistSlice/wishlistSlice";

export default function Product() {
  const [open, setOpen] = React.useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [imageIdx, setImageIdx] = useState(0);

  let location = useLocation();
  let productId = location.state;

  const {
    data: fetchedProductData,
    error,
    isLoading,
  } = useGetProductDetailsQuery(productId);

  let dispatch = useDispatch();

  const handleAddtoCart = (productdata) => {
    dispatch(addCartItem(productdata));
    setOpen(true);
  };

  const handleAddtoWishlist = (productdata) => {
    dispatch(addWishlistItem(productdata));
    setWishlistOpen(true);
  };

  return (
    <div className="mx-5 md:mx-16 xl:mx-24 mt-24 lg:mt-20">
      {isLoading ? (
        <p className="w-screen h-screen text-center mt-24 lg:mt-24"> Loading...</p>
      ) : error ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center mx-4 md:mx-0 bg-red-600">
          <p className=" text-white text-2xl">
            {" "}
            {error.error || error.message}{" "}
          </p>
          <p className=" text-white text-2xl">
            {" "}
            API error: Please try after sometime.
          </p>
        </div>
      ) : (
        fetchedProductData && (
          <div className="flex flex-col lg:grid grid-flow-col grid-cols-12 mb-6">
            <div className="col-span-12 md:col-span-7 flex gap-4 md:gap-30 mt-4 lg:mt-14">
              <div>
                <ProductCarousel
                  product={fetchedProductData}
                  setImageFunc={setImageIdx}
                />
              </div>
              <div className="flex items-baseline justify-center">
                <CompressedImage
                  imageUrl={
                    fetchedProductData.images?.length > 0
                      ? fetchedProductData.images[imageIdx]
                      : fetchedProductData.thumbnail
                  }
                  thumbnail={fetchedProductData.thumbnail}
                  alt={fetchedProductData.title}
                  loading="lazy"
                  classes="rounded-3xl transition ease-in-out delay-25 hover:-translate-y-1 
                hover:scale-105 duration-300 cursor-pointer"
                />
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 p-3 flex flex-col mt-2 lg:mt-6">
              <h1 className="text-xl md:text-2xl xl:text-3xl mb-2 text-black font-semibold">
                {fetchedProductData.title}
              </h1>
              <div className="text-sm md:text-base">
                {fetchedProductData.brand && (
                  <p>Brand: {fetchedProductData.brand} </p>
                )}
                {fetchedProductData.stock && (
                  <p>
                    Units Left:{" "}
                    {fetchedProductData.stock > 0
                      ? fetchedProductData.stock
                      : "Out of Stock"}{" "}
                  </p>
                )}
                <div className="flex">
                  <span className="line-through mr-1">
                    Rs.{" "}
                    {(
                      fetchedProductData.price * 84 +
                      (fetchedProductData.price *
                        84 *
                        fetchedProductData.discountPercentage) /
                        100
                    ).toLocaleString("en-IN")}
                  </span>
                  <span className="font-bold">
                    {" "}
                    ({fetchedProductData.discountPercentage}% off)
                  </span>
                </div>
                <div className="flex gap-2">
                  <span>Price: </span>
                  <span className="font-bold">
                    Rs.{" "}
                    {(fetchedProductData.price * 84).toLocaleString("en-IN")}{" "}
                  </span>
                </div>

                {fetchedProductData.minimumOrderQuantity > 1 && (
                  <p>
                    Miniumum Order Quantity:{" "}
                    {fetchedProductData.minimumOrderQuantity}
                  </p>
                )}
                <div className="flex items-start">
                  <span>
                    <Ratings rating={fetchedProductData.rating} />
                  </span>
                  <span className="ml-1 font-bold">
                    {fetchedProductData.rating}
                  </span>
                </div>
                {fetchedProductData.description && (
                  <p className="mb-4 mt-1">
                    Description: {fetchedProductData.description}
                  </p>
                )}
                <div className="flex flex-col gap-2 md:flex-row font-semibold lg:font-bold">
                  <CustomButton
                    text="Add to Cart"
                    classes="border border-black/40 w-[100%] p-1.5 md:p-2 text-sm rounded-lg hover:bg-black hover:text-white
            transition duration-300 ease-in-out"
                    handleClick={() => handleAddtoCart(fetchedProductData)}
                  />
                  <CustomButton
                    text="Add to Wishlist"
                    classes="border border-black/40 w-[100%] p-1.5 md:p-2 text-sm rounded-lg hover:bg-black hover:text-white
            transition duration-300 ease-in-out"
                    handleClick={() => handleAddtoWishlist(fetchedProductData)}
                  />
                </div>

                <h2 className="text-xl font-semibold mt-8">
                  More Product Information:
                </h2>
                <div className="flex justify-between gap-3 mt-4">
                  <div className="text-sm md:text-base">
                    <p>
                      Category:{" "}
                      {fetchedProductData.category[0].toUpperCase() +
                        fetchedProductData.category.slice(1)}
                    </p>
                    <p>
                      Dimensions: {fetchedProductData.dimensions?.depth} depth,{" "}
                      {fetchedProductData.dimensions?.width} width,{" "}
                      {fetchedProductData.dimensions?.height} height{" "}
                    </p>
                    <p>Return Policy: {fetchedProductData.returnPolicy} </p>
                    <p>Shipment: {fetchedProductData.shippingInformation} </p>
                    <p>Warranty: {fetchedProductData.warrantyInformation} </p>
                  </div>
                  <img
                    src={fetchedProductData.meta?.qrCode}
                    alt="product-qrCode"
                    className="w-24 md:w-36 object-contain"
                  />
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

      {fetchedProductData && (
        <ProductReview reviews={fetchedProductData.reviews} />
      )}
    </div>
  );
}
