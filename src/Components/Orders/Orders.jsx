import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

export default function Orders() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const { totalCartAmount } = useSelector((state) => state.cart);
  const confirmedOrders = JSON.parse(localStorage.getItem("confirmedOrders"));
  const googleUser = JSON.parse(localStorage.getItem('googleUser'))

  let navigate = useNavigate();
  const handleProduct = (id) => {
    navigate("/Product", { state: id });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold md:font-bold md:ms-24 mt-20 md:mt-28 text-center md:text-start">My Orders</h1>
      {confirmedOrders && auth ? (
        confirmedOrders.map((order) => (
          <div key={nanoid()}>
            <div>
              <div className="mx-3.5 md:mx-auto mt-8 bg-white max-w-7xl px-2 md:px-8 rounded-xl">
                <div className="border-t border-gray-200 py-3 md:py-4 px-2 sm:px-6">
                  <h1 className="text-base md:text-2xl my-2 md:mb-0 md:mt-1 font-bold md:font-semibold
                   tracking-tight text-gray-900">
                    Thanks for your Order {googleUser.name}!
                  </h1>
                  <p className="mb-8 text-sm md:text-base font-semibold"> Ordered On: {order.date.slice(0, 25)}</p>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {order.products.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-500">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                              onClick={() => handleProduct(item.id)}
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-sm md:text-base font-medium text-gray-900">
                                <h3>
                                  {item.title}
                                </h3>
                                <p className="ms-2 md:ms-4">
                                  Rs. {(item.price * 84).toLocaleString("en-IN")}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty: {item.qty}
                                </label>
                              </div>

                              <div className="flex"></div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 pb-5 md:py-6 px-4 sm:px-6">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>Rs. {totalCartAmount.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Items in Cart</p>
                    <p> {order.totalOrderedQty} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Order # {nanoid()}
                  </p>
                  <p> Payment Mode: {order.paymentMethod} </p>

                  <div className="text-sm md:text-base">
                    <h1 className="font-semibold text-lg md:text-2xl mb-2 mt-4 lg:pt-0">
                      Address:
                    </h1>
                    <p>
                      A-84, Gali No. 4, Pratap Vihar Part-2, Kirari Suleman
                      Nagar, Rohini, New-Delhi-110086
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-screen w-screen flex flex-col items-center justify-center md:text-2xl bg-red-500 mt-10 px-4">
          <p className="text-white text-center"> Either you are not Logged In or you haven't purchased any products yet.</p>
          <NavLink to="/">
            <button className="bg-sky-600 hover:bg-sky-700 rounded-xl p-2 text-white mt-4 text-base">
              GO SHOP😊
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
