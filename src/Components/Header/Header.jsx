import { GoogleLogin } from "@react-oauth/google";
import { FaBars } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useScroll from "../../utils/customHooks/useScroll";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalQuantity,
  getWishlistQuantity,
} from "../ReduxFeatures/cartSlice/cartSlice";
import { userLogOut, userLogin } from "../ReduxFeatures/authSlice/authSlice";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const [menu, setMenu] = useState("hidden");
  const [scrolled, setScrolled] = useState(null);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("googleUser")) || {}
  );

  console.log("rendered");

  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = (userData) => {
    console.log(userData);
    localStorage.setItem("googleUser", JSON.stringify(userData));
    const googleUser = JSON.parse(localStorage.getItem("googleUser"));
    setUser(googleUser);
    dispatch(userLogin());
  };

  useEffect(() => {
    dispatch(getTotalQuantity());
    dispatch(getWishlistQuantity());
  }, [cart]);

  const handleSearchClick = (category, title, id) => {
    let urlEndpoint = title.split(" ").join("-");
    navigate(`/${category}/${urlEndpoint}`, { state: id });
  };

  const handleLogout = () => {
    setUser(localStorage.removeItem("googleUser"));
    dispatch(userLogOut());
  };

  useScroll(setScrolled);

  return (
    <>
      <nav
        className={`${
          scrolled
            ? "bg-white text-black shadow-lg"
            : "bg-transparent text-white"
        } fixed w-full top-0 left-0 z-10 flex items-center justify-evenly md:justify-around py-4 lg:py-1`}
      >
        <FaBars
          className="text-2xl ml-2 md:ms-0 mr-2 lg:hidden cursor-pointer"
          onClick={() => setMenu("block")}
        />

        <div className="flex justify-around items-center md:w-[600px] cursor-pointer">
          <NavLink to="/" className="hidden md:flex items-center">
            <RiShoppingBag4Line className="text-2xl" />
            <span>HarryShop</span>
          </NavLink>

          <div
            className={`flex items-center px-2 py-1 rounded-lg border relative ${
              scrolled ? "border-black/40" : "border-white"
            } `}
          >
            <SearchBar handleSearchClick={handleSearchClick} />
          </div>
        </div>

        <div className={`${menu} lg:block`}>
          <div
            id="menu"
            className="transition-all ease-linear fixed h-[100%] top-0 left-0
            lg:py-4 w-[80%] lg:static text-black bg-white lg:bg-transparent"
          >
            <div className="my-2 lg:hidden flex ms-2">
              <div className="p-1" onClick={() => setMenu("hidden")}>
                <RxCross2 className="text-2xl cursor-pointer" />
              </div>
            </div>

            <div
              className={`flex flex-col justify-around h-[40%] lg:flex-row lg:justify-around ${
                auth && user ? "lg:w-[390px]" : "lg:w-[300px]"
              } cursor-pointer ${
                scrolled || menu === "block" ? "text-black" : "text-white"
              } ${menu === "block" && "mx-6 mt-4"} `}
            >
              <NavLink
                to="/"
                className="flex items-center lg:hidden border-b border-black/30 pb-2 lg:border-none lg:pb-0"
              >
                <RiShoppingBag4Line className="text-2xl" />
                <span>HarryShop</span>
              </NavLink>

              <NavLink to="/Wishlist">
                <div className="flex relative flex-row items-center gap-4 border-b border-black/30 pb-2 lg:border-none lg:pb-0 lg:gap-0 lg:flex-col lg:justify-center lg:items-center">
                  {cart.totalwishlistQuantity > 0 && (
                    <sup className="absolute top-0 right-0 text-red-600 font-bold text-[15px]">
                      {cart.totalwishlistQuantity}
                    </sup>
                  )}
                  <FaRegHeart className="text-xl" />
                  <span className="text-sm">Wishlist</span>
                </div>
              </NavLink>

              <NavLink to="/Cart">
                <div className="flex relative flex-row items-center gap-4 border-b border-black/30 pb-2 lg:border-none lg:pb-0 lg:gap-0 lg:flex-col lg:justify-center lg:items-center">
                  {cart.totalCartQuantity > 0 && (
                    <sup className="absolute top-0 -right-2 text-red-600 font-bold text-[15px]">
                      {cart.totalCartQuantity}
                    </sup>
                  )}
                  <PiShoppingCartSimpleBold className="text-xl" />
                  <span className="text-sm">Cart</span>
                </div>
              </NavLink>
              {auth && user ? (
                <>
                  <NavLink to="/Orders">
                    <button
                      className={`flex items-center px-2 py-1 rounded-lg border relative ${
                        scrolled ? "border-black/40" : "border-white"
                      } `}
                    >
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="rounded-lg w-8 inline-block"
                      />
                      <p className="inline-block text-sm px-1">
                        {user.given_name}, Orders
                      </p>
                    </button>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center px-3 py-0 rounded-lg border relative ${
                      scrolled ? "border-black/40" : "border-white"
                    } `}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div
                  className={`flex items-center px-2 py-0 gap-1 rounded-lg border relative ${
                    scrolled ? "border-black/40" : "border-white"
                  } `}
                >
                  <span>Sign in with </span>
                  <button className="hover:scale-110 flex items-center">
                    <GoogleLogin
                      type="icon"
                      size="medium"
                      shape="circle"
                      onSuccess={(response) => {
                        let userData = jwtDecode(response.credential);
                        handleLogin(userData);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
