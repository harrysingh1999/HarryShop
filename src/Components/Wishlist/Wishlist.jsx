import { useDispatch, useSelector } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  removeWishlistItem,
  getWishlistQuantity,
  addCartItem,
} from "../../Reduxtoolkit/cartSlice/cartSlice";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import ProductCard from "../Card/ProductCard";

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

  const handleProduct = (title, id, productCategory) => {
    let urlEndpoint = title.split(" ").join("-");
    navigate(`/${productCategory}/${urlEndpoint}`, { state: id });
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
    <div className="mx-6 md:mx-24">
      <h1 className="text-2xl md:text-3xl mb-4 text-black text-center md:text-left mt-24 font-semibold">
        Wishlist
      </h1>
      {!auth || wishlistItems.length === 0 ? (
        <div className="h-screen flex flex-col items-center justify-center md:text-2xl bg-red-500 mt-10 px-4">
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
        <div className="flex flex-wrap justify-center md:justify-start">
          {wishlistItems.map((wishlist) => (
            <ProductCard
              key={wishlist.title}
              data={wishlist}
              handleProduct={handleProduct}
              handleAddtoCart={handleAddtoCart}
              handleRemoveCartItem={handleRemoveCartItem}
              btnText1="Move to Cart"
              btnText2="Remove"
            />
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
