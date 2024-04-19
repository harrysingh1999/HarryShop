import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { nanoid } from "@reduxjs/toolkit";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  removeWishlistItem,
  getWishlistQuantity,
  addCartItem,
} from "../ReduxFeatures/cartSlice/cartSlice";
import CustomSnackbar from "../Snackbar/CustomSnackbar";

export default function Wishlist() {
  const [open, setOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { wishlistItems } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  let snackbarMessage = "Product is added to Cart!";
  let snackbarMessage2 = "Item removed Successfully!";
  let dispatch = useDispatch();

  const handleRemoveCartItem = (id) => {
    auth && dispatch(removeWishlistItem(id));
    setWishlistOpen(true);
  };

  let navigate = useNavigate();
  const handleProduct = (id) => {
    navigate("/Product", { state: id });
  };

  const handleAddtoCart = (product, id) => {
    setOpen(true);
    auth && dispatch(addCartItem(product));
    auth && dispatch(removeWishlistItem(id));
  };

  useEffect(() => {
    dispatch(getWishlistQuantity());
  }, [wishlistItems]);

  return (
    <div>
      <h1 className="text-3xl mx-8 md:mx-16 mt-20 md:mt-28 mb-6 text-black font-semibold">
        Wishlist
      </h1>
      {!auth || wishlistItems.length === 0 ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center md:text-2xl bg-red-500 mt-10 px-4">
          <CustomSnackbar
            open={open}
            wishlistOpen={wishlistOpen}
            setOpen={setOpen}
            setWishlistOpen={setWishlistOpen}
            snackbarMessage={snackbarMessage}
            snackbarMessage2={snackbarMessage2}
          />
          <p className="text-white text-center">
            Either, no products added to Wishlist🥲 or you are not Logged In.
          </p>
          <NavLink to="/">
            <button className="bg-sky-600 hover:bg-sky-700 rounded-xl p-2 text-white mt-4 text-base">
              GO SHOP😊
            </button>
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center md:justify-start mx-8 xl:mx-12">
          {wishlistItems.map((item) => (
            <Card
              key={nanoid()}
              style={{ minHeight: "280px", maxHeight: "280px" }}
              className="w-64 md:w-72 md:!mx-3 my-4 !rounded-t-3xl !rounded-b-3xl 
              !transition ease-in-out !delay-25 hover:-translate-y-1 hover:scale-105 !duration-300
              !bg-gray-300 hover:!shadow-lg hover:!shadow-sky-500 cursor-pointer"
            >
              <CardMedia
                sx={{ height: 140 }}
                image={item.thumbnail}
                title={item.title}
                onClick={() => handleProduct(item.id)}
              />
              <CardContent className="!py-1">
                <p className="text-base font-semibold ">{item.title}</p>

                <p className="mt-1 text-base">
                  Rs. {(item.price * 84).toLocaleString("en-IN")}
                </p>
              </CardContent>
              <CardActions className="!mb-1 !pt-1">
                <button
                  className=" hover:bg-gray-100 border border-black px-2 py-1 rounded-lg ms-2 inline-block"
                  onClick={() => handleAddtoCart(item, item.id)}
                >
                  Move to Cart <AddShoppingCartIcon />
                </button>

                <button
                  className=" hover:bg-gray-100 border border-black px-2 py-1 rounded-lg !ms-4"
                  onClick={() => handleRemoveCartItem(item.id)}
                >
                  Remove
                </button>
              </CardActions>
            </Card>
          ))}
          <CustomSnackbar
            open={open}
            wishlistOpen={wishlistOpen}
            setOpen={setOpen}
            setWishlistOpen={setWishlistOpen}
            snackbarMessage={snackbarMessage}
            snackbarMessage2={snackbarMessage2}
          />
        </div>
      )}
    </div>
  );
}
