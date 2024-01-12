import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import { Provider } from "react-redux";
import { store } from "./Components/ReduxFeatures/Store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

// import Products from "./Components/Products/Products.jsx";
// import NotfoundPage from "./Components/404/NotFoundPage.jsx";
// import Product from "./Components/Product/Product.jsx";
// import Cart from "./Components/Cart/Cart.jsx";
// import Wishlist from "./Components/Wishlist/Wishlist.jsx";
// import OrderSummary from "./Components/OrderSummary/OrderSummary.jsx";
// import Orders from "./Components/Orders/Orders.jsx";

const Wishlist = lazy(() => import("./Components/Wishlist/Wishlist.jsx"))
const OrderSummary = lazy(() => import("./Components/OrderSummary/OrderSummary.jsx"))
const Cart = lazy(() => import("./Components/Cart/Cart.jsx"))
const Orders = lazy(() => import("./Components/Orders/Orders.jsx"))
const Products = lazy(() => import("./Components/Products/Products.jsx"))
const Product = lazy(() => import("./Components/Product/Product.jsx"))
const NotfoundPage = lazy(() => import("./Components/404/NotFoundPage.jsx"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Wishlist" element={<Wishlist />} />
      <Route path="/OrderSummary" element={<OrderSummary />} />
      <Route path="/Orders" element={<Orders />} />
      <Route path="*" element={<NotfoundPage/>} />      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="788744618786-l3atvlgqkr6s6j8boo2uenjhodn4n9rs.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
