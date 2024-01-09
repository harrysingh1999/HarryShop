import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Radio from "@mui/material/Radio";
import {
  decrementItemQty,
  emptyCart,
  incrementItemQty,
  removeCartItem,
} from "../ReduxFeatures/cartSlice/cartSlice";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import { useNavigate, NavLink } from "react-router-dom";
import Progress from "../Progress/Progress";

export default function OrderSummary() {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();
  const [empty, setEmpty] = useState()
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  let dispatch = useDispatch();

  const handleIncrementItem = (id) => {
    auth && dispatch(incrementItemQty(id));
    auth === false && setOpen(true);
  };

  const handleDecrementItem = (id) => {
    auth && dispatch(decrementItemQty(id));
    auth === false && setOpen(true);
  };

  const handleRemoveCartItem = (id) => {
    auth && dispatch(removeCartItem(id));
  };

  let navigate = useNavigate();

  const handleProduct = (id) => {
    navigate("/Product", { state: id });
  };

  const order = {
    products: cart.cartItems.map((item) => item),
    paymentMethod: "COD",
    date: Date(),
    totalOrderedQty: cart.totalCartQuantity,
  };

  const handleOrder = () => {
    let itemsArray = JSON.parse(localStorage.getItem("confirmedOrders")) || [];
    auth && itemsArray.push(order);
    auth && localStorage.setItem("confirmedOrders", JSON.stringify(itemsArray));
    auth === false && setOpen(true);
    auth && handleProgress();
    auth && emptySummary();
  };

  const handleProgress = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const emptySummary = () => {
    setTimeout(() => {
        auth && dispatch(emptyCart())
        setEmpty(true)
    }, 6000);
  }

  return (
    <>
      <h1 className="text-center text-2xl md:text-4xl my-8 font-semibold">
        Order Summary
      </h1>
      {cart.cartItems.length === 0 && empty ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center md:text-2xl bg-red-500 mt-20 px-4">
          <p className="text-white text-center"> Your Cart is Empty🥲.</p>
          <NavLink to="/">
            <button className="bg-sky-600 hover:bg-sky-700 rounded-xl p-2 text-white mt-4 text-base">
              GO SHOP😊
            </button>
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col items-center lg:flex-row lg:items-start justify-center">
          <Table
            aria-label="simple table"
            className="!w-10/12 lg:!w-1/2 !mt-6 !mx-2"
          >
            <TableHead>
              <TableRow className="!pt-0">
                <TableCell align="left" className="!py-0 md:!py-2">
                  Product
                </TableCell>
                <TableCell align="center" className="!py-0 md:!py-2">
                  Name
                </TableCell>
                <TableCell align="center" className="!py-0 md:!py-2">
                  Quantity
                </TableCell>
                <TableCell align="center" className="!py-0 md:!py-2">
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cartItems.map((item) => (
                <TableRow key={crypto.randomUUID()}>
                  <TableCell className="">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-12 md:w-20 h-12 md:h-20 object-cover"
                      onClick={() => handleProduct(item.id)}
                    />
                  </TableCell>

                  <TableCell align="center" className="!text-xs lg:!text-base !px-1 !font-semibold">
                    {item.title}
                  </TableCell>

                  <TableCell align="center" className="">
                    <div className="flex justify-center">
                      <button
                        className="bg-sky-600 hover:bg-sky-500 text-white px-2 md:px-3 me-1 rounded-lg"
                        onClick={
                          item.qty > 1
                            ? () => handleDecrementItem(item.id)
                            : () => handleRemoveCartItem(item.id)
                        }
                      >
                        -
                      </button>

                      {item.qty}

                      <button
                        className="bg-sky-600 hover:bg-sky-500 text-white px-2 md:px-3 ms-1 rounded-lg "
                        onClick={() => handleIncrementItem(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </TableCell>

                  <TableCell align="center" className="!text-xs lg:!text-base !px-1 !font-semibold">
                    Rs. {(item.price * 83).toLocaleString("en-IN") }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-3 md:ms-10 mb-4">
            <div className="text-sm md:text-base">
              <h1 className="font-semibold text-lg md:text-2xl mb-2 mt-4 lg:pt-0">
                Address:
              </h1>
              <p> A-84, Gali No. 4, Pratap Vihar Part-2,</p>
              <p> Kirari Suleman Nagar,</p>
              <p> Rohini, New-Delhi-110086,</p>
            </div>
            <div>
              <h1 className="font-semibold text-lg md:text-2xl my-2 pt-2 border-t border-black">
                Payment Method:
              </h1>
              <Radio
                checked
                name="radio-buttons"
                inputProps={{ "aria-label": "checked" }}
              />
              Cash on Delivery (COD)
              <p className="mb-2 border-t border-black pt-2 text-sky-700 text-base md:text-lg font-semibold">
                Total Price: {cart.totalCartAmount.toLocaleString("en-IN")}
              </p>
              <p>Free Delivery!</p>
            </div>

            <Progress success={success} loading={loading} handleOrder={handleOrder} />
          </div>
        </div>
      )}
      <CustomSnackbar open={open} setOpen={setOpen} />
    </>
  );
}
