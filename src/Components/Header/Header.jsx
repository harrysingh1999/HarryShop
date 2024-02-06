import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalQuantity,
  getWishlistQuantity,
} from "../ReduxFeatures/cartSlice/cartSlice";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { userLogOut, userLogin } from "../ReduxFeatures/authSlice/authSlice";
import MyButton from "../Button/MyButton";
import SearchBar from "../SearchBar/SearchBar";
import { Icon } from "@iconify/react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Container from '@mui/material/Container';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("googleUser")) || {}
  );

  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = (userData) => {
    localStorage.setItem("googleUser", JSON.stringify(userData));
    const googleUser = JSON.parse(localStorage.getItem("googleUser"));
    setUser(googleUser);
    dispatch(userLogin());
  };

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalQuantity());
    dispatch(getWishlistQuantity());
  }, [cart]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setUser(localStorage.removeItem("googleUser"));
    dispatch(userLogOut());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
       className="bg-gradient-to-r !rounded-xl !py-1 !px-2 !mx-2
       hover:from-sky-500 hover:to-blue-500 hover:text-white">
        <IconButton
          size="large"
          aria-label={`show ${cart.totalwishlistQuantity}`}
          color="inherit"
        >
          <Badge badgeContent={cart.totalwishlistQuantity} color="error">
            <FavoriteOutlinedIcon />
          </Badge>
        </IconButton>
        <NavLink to="/Wishlist">
          <p>Wishlist</p>
        </NavLink>
      </MenuItem>
      <MenuItem
      className="bg-gradient-to-r !rounded-xl !py-1 !px-1 !mx-2
      hover:from-sky-500 hover:to-blue-500 hover:text-white">
        <IconButton
          size="large"
          aria-label={`show ${cart.totalCartQuantity}`}
          color="inherit"
        >
          <Badge badgeContent={cart.totalCartQuantity} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <NavLink to="/Cart">
          <p >Shopping Cart</p>
        </NavLink>
      </MenuItem>

      <MenuItem>
        {auth && user ? (
          <>
            <NavLink to="/Orders">
              <div
                className="ms-0 border border-gray-300 rounded-xl ps-1 py-1 bg-gradient-to-r
                   hover:from-sky-500 hover:to-blue-500 hover:text-white"
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
            <div onClick={handleLogout}>
              <MyButton value="Log Out" />
            </div>
          </>
        ) : (
          <div
            className="ms-2 flex items-center hover:scale-105 bg-gradient-to-r rounded-xl py-1 px-2
          hover:from-sky-500 hover:to-blue-500 hover:text-white"
          >
            <p className="me-1">Sign in with</p>
            <GoogleLogin
              type="icon"
              shape="pill"
              onSuccess={(response) => {
                let userData = jwtDecode(response.credential);
                handleLogin(userData);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        )}
      </MenuItem>
    </Menu>
  );

  let navigate = useNavigate();

  const handleSearchClick = (id) => {
    navigate("/Product", { state: id });
  };

  return (
  <AppBar position="fixed">
     <Box sx={{ flexGrow: 1 }}>
        <Toolbar className="">
          <div className="text-base md:block hidden ms-6 xl:ms-12">
            <NavLink to="/">
              <p className="rounded-xl p-1 bg-gradient-to-r hover:from-sky-500 hover:to-blue-500">
                <Icon
                  icon="icon-park:shopping"
                  className="!inline-block"
                  width="40"
                />
                HarryShop
              </p>
            </NavLink>
          </div>
          <p className="block md:hidden me-5">
            <NavLink to="/">
              <Icon icon="icon-park:shopping" width="40" />
            </NavLink>
          </p>

          <SearchBar SearchClickFunc={handleSearchClick} />

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                alignItems: "center",
                marginRight: 50,
              },
            }}
          >
            <IconButton
              size="large"
              aria-label={`show ${cart.totalwishlistQuantity} wishlist items `}
              color="inherit"
            >
              <Badge badgeContent={cart.totalwishlistQuantity} color="error">
                <NavLink to="/Wishlist">
                  <FavoriteOutlinedIcon />
                </NavLink>
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label={`show ${cart.totalCartQuantity} Cart items`}
              color="inherit"
            >
              <Badge badgeContent={cart.totalCartQuantity} color="error">
                <NavLink to="/Cart">
                  <ShoppingCartIcon />
                </NavLink>
              </Badge>
            </IconButton>

            {auth && user ? (
              <>
                <NavLink to="/Orders">
                  <div
                    className="mx-2 border border-gray-300 rounded-2xl px-2 py-1 bg-gradient-to-r
                   hover:from-sky-500 hover:to-blue-500"
                  >
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="rounded-lg w-8 inline-block me-2"
                    />
                    <p className="inline-block">{user.given_name}, Orders</p>
                  </div>
                </NavLink>

                <div onClick={handleLogout}>
                  <MyButton value="Log Out" />
                </div>
              </>
            ) : (
              <div
                className="flex items-center hover:scale-105 bg-gradient-to-r rounded-xl py-1 px-2
               hover:from-sky-500 hover:to-blue-500 border ms-2"
              >
                <p className="me-1">Sign in with</p>
                <GoogleLogin
                  type="icon"
                  shape="pill"
                  theme="filled_blue"
                  onSuccess={(response) => {
                    let userData = jwtDecode(response.credential);
                    handleLogin(userData);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
      </AppBar>
  );
}
