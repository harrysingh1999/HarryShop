// import * as React from "react";
// import { useEffect, useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getTotalQuantity,
//   getWishlistQuantity,
// } from "../ReduxFeatures/cartSlice/cartSlice";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import { userLogOut, userLogin } from "../ReduxFeatures/authSlice/authSlice";
// import MyButton from "../Button/MyButton";
// import SearchBar from "../SearchBar/SearchBar";
// import { Icon } from "@iconify/react";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import Container from "@mui/material/Container";

// export default function Header() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("googleUser")) || {}
//   );

//   const cart = useSelector((state) => state.cart);
//   const auth = useSelector((state) => state.auth.isAuthenticated);

//   const handleLogin = (userData) => {
//     localStorage.setItem("googleUser", JSON.stringify(userData));
//     const googleUser = JSON.parse(localStorage.getItem("googleUser"));
//     setUser(googleUser);
//     dispatch(userLogin());
//   };

//   let dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getTotalQuantity());
//     dispatch(getWishlistQuantity());
//   }, [cart]);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const handleLogout = () => {
//     setUser(localStorage.removeItem("googleUser"));
//     dispatch(userLogOut());
//   };

//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleLogout}>Log Out</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = "primary-search-account-menu-mobile";
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem
//         className="bg-gradient-to-r !rounded-xl !py-1 !px-2 !mx-2
//        hover:from-sky-500 hover:to-blue-500 hover:text-white"
//       >
//         <IconButton
//           size="large"
//           aria-label={`show ${cart.totalwishlistQuantity}`}
//           color="inherit"
//         >
//           <Badge badgeContent={cart.totalwishlistQuantity} color="error">
//             <FavoriteOutlinedIcon />
//           </Badge>
//         </IconButton>
//         <NavLink to="/Wishlist">
//           <p>Wishlist</p>
//         </NavLink>
//       </MenuItem>
//       <MenuItem
//         className="bg-gradient-to-r !rounded-xl !py-1 !px-1 !mx-2
//       hover:from-sky-500 hover:to-blue-500 hover:text-white"
//       >
//         <IconButton
//           size="large"
//           aria-label={`show ${cart.totalCartQuantity}`}
//           color="inherit"
//         >
//           <Badge badgeContent={cart.totalCartQuantity} color="error">
//             <ShoppingCartIcon />
//           </Badge>
//         </IconButton>
//         <NavLink to="/Cart">
//           <p>Shopping Cart</p>
//         </NavLink>
//       </MenuItem>

//       <MenuItem>
//         {auth && user ? (
//           <>
//             <NavLink to="/Orders">
//               <div
//                 className="ms-0 border border-gray-300 rounded-xl ps-1 py-1 bg-gradient-to-r
//                    hover:from-sky-500 hover:to-blue-500 hover:text-white"
//               >
//                 <img
//                   src={user.picture}
//                   alt={user.name}
//                   className="rounded-lg w-8 inline-block"
//                 />
//                 <p className="inline-block text-sm px-1">
//                   {user.given_name}, Orders
//                 </p>
//               </div>
//             </NavLink>
//             <div onClick={handleLogout}>
//               <MyButton value="Log Out" />
//             </div>
//           </>
//         ) : (
//           <div
//             className="ms-2 flex items-center hover:scale-105 bg-gradient-to-r rounded-xl py-1 px-2
//           hover:from-sky-500 hover:to-blue-500 hover:text-white"
//           >
//             <p className="me-1">Sign in with</p>
//             <GoogleLogin
//               type="icon"
//               shape="pill"
//               onSuccess={(response) => {
//                 let userData = jwtDecode(response.credential);
//                 handleLogin(userData);
//               }}
//               onError={() => {
//                 console.log("Login Failed");
//               }}
//             />
//           </div>
//         )}
//       </MenuItem>
//     </Menu>
//   );

//   let navigate = useNavigate();

//   const handleSearchClick = (category, title, id) => {
//     let urlEndpoint = title.split(" ").join("-");
//     navigate(`/${category}/${urlEndpoint}`, { state: id });
//   };

//   return (
//     <AppBar position="fixed">
//       <Box sx={{ flexGrow: 1 }}>
//         <Toolbar className="">
//           <div className="text-base md:block hidden ms-6 xl:ms-12">
//             <NavLink to="/">
//               <p className="rounded-xl p-1 bg-gradient-to-r hover:from-sky-500 hover:to-blue-500">
//                 <Icon
//                   icon="icon-park:shopping"
//                   className="!inline-block"
//                   width="40"
//                 />
//                 HarryShop
//               </p>
//             </NavLink>
//           </div>
//           <p className="block md:hidden me-5">
//             <NavLink to="/">
//               <Icon icon="icon-park:shopping" width="40" />
//             </NavLink>
//           </p>

//           <SearchBar SearchClickFunc={handleSearchClick} />

//           <Box sx={{ flexGrow: 1 }} />
//           <Box
//             sx={{
//               display: {
//                 xs: "none",
//                 md: "flex",
//                 alignItems: "center",
//                 marginRight: 50,
//               },
//             }}
//           >
//             <IconButton
//               size="large"
//               aria-label={`show ${cart.totalwishlistQuantity} wishlist items `}
//               color="inherit"
//             >
//               <Badge badgeContent={cart.totalwishlistQuantity} color="error">
//                 <NavLink to="/Wishlist">
//                   <FavoriteOutlinedIcon />
//                 </NavLink>
//               </Badge>
//             </IconButton>

//             <IconButton
//               size="large"
//               aria-label={`show ${cart.totalCartQuantity} Cart items`}
//               color="inherit"
//             >
//               <Badge badgeContent={cart.totalCartQuantity} color="error">
//                 <NavLink to="/Cart">
//                   <ShoppingCartIcon />
//                 </NavLink>
//               </Badge>
//             </IconButton>

//             {auth && user ? (
//               <>
//                 <NavLink to="/Orders">
//                   <div
//                     className="mx-2 border border-gray-300 rounded-2xl px-2 py-1 bg-gradient-to-r
//                    hover:from-sky-500 hover:to-blue-500"
//                   >
//                     <img
//                       src={user.picture}
//                       alt={user.name}
//                       className="rounded-lg w-8 inline-block me-2"
//                     />
//                     <p className="inline-block">{user.given_name}, Orders</p>
//                   </div>
//                 </NavLink>

//                 <div onClick={handleLogout}>
//                   <MyButton value="Log Out" />
//                 </div>
//               </>
//             ) : (
//               <div
//                 className="flex items-center hover:scale-105 bg-gradient-to-r rounded-xl py-1 px-2
//                hover:from-sky-500 hover:to-blue-500 border ms-2"
//               >
//                 <p className="me-1">Sign in with</p>
//                 <GoogleLogin
//                   type="icon"
//                   shape="pill"
//                   theme="filled_blue"
//                   onSuccess={(response) => {
//                     let userData = jwtDecode(response.credential);
//                     handleLogin(userData);
//                   }}
//                   onError={() => {
//                     console.log("Login Failed");
//                   }}
//                 />
//               </div>
//             )}
//           </Box>
//           <Box sx={{ display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//         {renderMobileMenu}
//         {renderMenu}
//       </Box>
//     </AppBar>
//   );
// }

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
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

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => handleLogin(codeResponse),
  });

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
                    <div
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
                    </div>
                  </NavLink>
                  <div
                    onClick={handleLogout}
                    className={`flex items-center px-2 py-0 rounded-lg border relative ${
                      scrolled ? "border-black/40" : "border-white"
                    } `}
                  >
                    <button className="">Logout</button>
                  </div>
                </>
              ) : (
                <div
                  className={`flex items-center px-2 py-0 gap-1 rounded-lg border relative ${
                    scrolled ? "border-black/40" : "border-white"
                  } `}
                >
                  <span>Sign in with </span>
                  <div className="hover:scale-110 flex items-center">
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
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
