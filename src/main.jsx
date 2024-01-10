import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Products from "./Components/Products/Products.jsx";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Product from "./Components/Product/Product.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import { Provider } from "react-redux";
import { store } from "./Components/ReduxFeatures/Store/store.js";
import OrderSummary from "./Components/OrderSummary/OrderSummary.jsx";
import Orders from "./Components/Orders/Orders.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NotfoundPage from "./Components/404/NotFoundPage.jsx";

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
