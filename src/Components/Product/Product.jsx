import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  addWishlistItem,
} from "../../Reduxtoolkit/cartSlice/cartSlice";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import ProductCarousel from "./ProductCarousel";
import { snackbarMessage, snackbarMessage2 } from "../../utils/constants";
import ProductReview from "./ProductReview";
import CustomButton from "../CustomButton/CustomButton";
import { useGetProductDetailsQuery } from "../../Reduxtoolkit/apiSlice/apiSlice";
import CompressedImage from "../CompressedImage";

export default function Product() {
  const [open, setOpen] = React.useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
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

  const { data: fetchedProductData, error } =
    useGetProductDetailsQuery(productId);

  useEffect(() => {
    fetchedProductData && setProduct(fetchedProductData);
  }, [fetchedProductData]);

  const [imageIdx, setImageIdx] = useState(0);

  return (
    <div className="mx-5 md:mx-16 xl:mx-24 mt-24 lg:mt-20">
      {error ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center mx-4 md:mx-0 bg-red-600">
          <p className=" text-white text-2xl">
            {" "}
            {error.error ? error.error : error.message}{" "}
          </p>
          <p className=" text-white text-2xl">
            {" "}
            API error: Please try after sometime.
          </p>
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
                  {/* <img
                      src={
                        product.images.length > 0
                          ? product.images[imageIdx]
                          : product.thumbnail
                      }
                      loading="lazy"
                      alt={product.title}
                      className="rounded-3xl transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-105
                duration-300 cursor-pointer "
                    /> */}

                  <CompressedImage
                    imageUrl={
                      product.images.length > 0
                        ? product.images[imageIdx]
                        : product.thumbnail
                    }
                    thumbnail={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    classes="rounded-3xl transition ease-in-out delay-25 hover:-translate-y-1 
                hover:scale-105 duration-300 cursor-pointer"
                  />
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 p-3 flex flex-col mt-2 lg:mt-6">
                <h1 className="text-xl md:text-2xl xl:text-3xl mb-2 text-black font-semibold">
                  {product.title}
                </h1>
                <div className="text-sm md:text-base">
                  {product.brand && <p>Brand: {product.brand} </p>}
                  {product.stock && (
                    <p>
                      Units Left:{" "}
                      {product.stock > 0 ? product.stock : "Out of Stock"}{" "}
                    </p>
                  )}
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
                  <div className="flex gap-2">
                    <span>Price: </span>
                    <span className="font-bold">
                      Rs. {(product.price * 84).toLocaleString("en-IN")}{" "}
                    </span>
                  </div>

                  {product.minimumOrderQuantity > 1 && (
                    <p>
                      Miniumum Order Quantity: {product.minimumOrderQuantity}
                    </p>
                  )}
                  <p>Rating: {product.rating}/5 </p>
                  {product.description && (
                    <p className="mb-4 mt-1">
                      Description: {product.description}.
                    </p>
                  )}
                  <div className="flex flex-col gap-2 md:flex-row font-semibold lg:font-bold">
                    <CustomButton
                      text="Add to Cart"
                      classes="border border-black/40 w-[100%] p-1.5 md:p-2 text-sm rounded-lg hover:bg-black hover:text-white
            transition duration-300 ease-in-out"
                      handleClick={() => handleAddtoCart(product)}
                    />
                    <CustomButton
                      text="Add to Wishlist"
                      classes="border border-black/40 w-[100%] p-1.5 md:p-2 text-sm rounded-lg hover:bg-black hover:text-white
            transition duration-300 ease-in-out"
                      handleClick={() => handleAddtoWishlist(product)}
                    />
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
