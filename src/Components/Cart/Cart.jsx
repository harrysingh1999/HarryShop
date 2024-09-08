import { useDispatch, useSelector } from "react-redux";
import {
  decrementItemQty,
  incrementItemQty,
  removeCartItem,
  getTotal,
  getTotalQuantity,
  emptyCart,
} from "../ReduxFeatures/cartSlice/cartSlice";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import CartTable from "./CartTable";
import ProductCard from "../Card/ProductCard";
import CustomButton from "../CustomButton/CustomButton";

export default function Cart() {
  const { cartItems, totalCartAmount, totalCartQuantity } = useSelector(
    (state) => state.cart
  );
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth.isAuthenticated);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, []);

  const handleRemoveCartItem = (id) => {
    auth && dispatch(removeCartItem(id));
    auth && dispatch(getTotal());
    auth && dispatch(getTotalQuantity());
    setOpen(true);
  };

  const handleDecrementItem = (id) => {
    auth && dispatch(decrementItemQty(id));
    auth && dispatch(getTotal());
    auth && dispatch(getTotalQuantity());
  };

  const handleIncrementItem = (id) => {
    auth && dispatch(incrementItemQty(id));
    auth && dispatch(getTotal());
    auth && dispatch(getTotalQuantity());
  };

  let navigate = useNavigate();

  const handleProduct = (title, id, productCategory) => {
    let urlEndpoint = title.split(" ").join("-");
    navigate(`/${productCategory}/${urlEndpoint}`, { state: id });
  };

  const handleClearCart = () => {
    auth && dispatch(emptyCart());
  };

  const handleProceed = () => {
    auth && navigate("/OrderSummary");
  };

  let snackbarMessage = "Item removed Successfully!";

  return (
    <div>
      <h1 className="text-2xl md:text-3xl mx-14 mt-20 md:mt-28 mb-4 text-center md:text-left font-semibold">
        Shopping Cart
      </h1>

      {!auth || cartItems.length === 0 ? (
        <div
          className="h-screen w-screen flex flex-col items-center justify-center md:text-2xl
         bg-red-500 mt-0 md:mt-10 px-4"
        >
          <p className="text-white text-center">
            Either Your Cart is Empty🥲 or you are not logged In.
          </p>
          <NavLink to="/">
            <button className="bg-sky-600 hover:bg-sky-700 rounded-xl p-2 text-white mt-4 text-base">
              GO SHOP😊
            </button>
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col items-center md:items-center lg:items-start lg:flex-row mx-6 md:mx-12">
          <CartTable
            handleProduct={handleProduct}
            handleDecrementItem={handleDecrementItem}
            handleRemoveCartItem={handleRemoveCartItem}
            handleIncrementItem={handleIncrementItem}
            cartItems={cartItems}
          />

          <div className="flex justify-center flex-wrap md:hidden ">
            {cartItems.map((product) => {
              return (
                <div key={crypto.randomUUID()}>
                  <ProductCard
                    data={product}
                    handleProduct={handleProduct}
                    removeFunc={handleRemoveCartItem}
                    decreFunc={handleDecrementItem}
                    increFunc={handleIncrementItem}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="rounded-lg md:ms-4 py-6 pl-4 pr-2 lg:w-[480px] xl:w-[500px]"
            style={{
              boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
            }}
          >
            <p className="text-2xl mb-4"> Cart Calculation </p>
            <p className="text-lg font-semibold border-t  border-b border-black py-3">
              Subtotal: Rs. {totalCartAmount.toLocaleString("en-IN")}
            </p>
            <p className="mb-4 py-3 border-b border-black font-semibold text-lg">
              Total Quantity: {totalCartQuantity}
            </p>
            <p className="mb-6 pb-4 border-b border-black">FREE Shipping </p>

            <div className="flex flex-col gap-2 font-bold">
              <CustomButton
                text="Proceed to Checkout"
                handleClick={handleProceed}
              />
              <CustomButton text="Clear Cart" handleClick={handleClearCart} />
              <NavLink to="/">
                <CustomButton text="Continue Shopping" />
              </NavLink>
            </div>
          </div>
        </div>
      )}
      <CustomSnackbar
        open={open}
        setOpen={setOpen}
        snackbarMessage={snackbarMessage}
      />
    </div>
  );
}
