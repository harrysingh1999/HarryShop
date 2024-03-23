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
import { Icon } from "@iconify/react";
import CustomCard from "../customCard/CustomCard";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import CartTable from "../CartTable/CartTable";

export default function Cart() {
  const { cartItems, totalCartAmount, totalCartQuantity } = useSelector(
    (state) => state.cart
  );
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth.isAuthenticated);
 
  let dispatch = useDispatch();

  const handleRemoveCartItem = (id) => {
    auth && dispatch(removeCartItem(id));
    setOpen(true);
  };

  const handleDecrementItem = (id) => {
    auth && dispatch(decrementItemQty(id));
  };

  const handleIncrementItem = (id) => {
    auth && dispatch(incrementItemQty(id));
  };

  const handleClearCart = () => {
    auth && dispatch(emptyCart());
  };

  useEffect(() => {
    dispatch(getTotal());
    dispatch(getTotalQuantity());
  }, [cartItems]);

  let navigate = useNavigate();
  const handleProduct = (id) => {
    navigate("/Product", { state: id });
  };

  const handleProceed = () => {
    auth && navigate("/OrderSummary");
  };

  let snackbarMessage = "Item removed Successfully!"

  return (
    <div>
      <h1 className="text-3xl mx-14 mt-20 md:mt-28 mb-6 text-black font-normal md:font-semibold">
        Shopping Cart
      </h1>

      {!auth || cartItems.length === 0 ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center md:text-2xl
         bg-red-500 mt-0 md:mt-10 px-4">
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
                  <CustomCard
                    {...product}
                    removeFunc={handleRemoveCartItem}
                    decreFunc={handleDecrementItem}
                    increFunc={handleIncrementItem}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-4 md:ms-4 pt-4 ps-4 pe-2 border border-black lg:w-[480px] xl:w-[500px]">
            <p className="text-2xl mb-4"> Cart Calculation </p>
            <p className="text-sky-700 text-lg font-semibold border-t  border-b border-black py-3">
              Subtotal: Rs. {totalCartAmount.toLocaleString("en-IN")}
            </p>
            <p className="mb-4 py-3 border-b border-black text-sky-700 font-semibold text-lg">
              Total Quantity: {totalCartQuantity}
            </p>
            <p className="mb-6 pb-4 border-b border-black">FREE Shipping </p>

            <button
              className="bg-sky-600 hover:bg-sky-500 text-white px-2 py-2 rounded-lg mb-2 inline-block"
              onClick={() => handleProceed()}
            >
              Proceed to
              <Icon
                icon="material-symbols:shopping-cart-checkout"
                className="inline-block"
                width="30"
              />
            </button>

            <button
              className="bg-sky-600 hover:bg-sky-500 text-white px-2 py-2 rounded-lg ms-2"
              onClick={handleClearCart}
            >
              Clear
              <Icon
                className="!inline-block ms-1"
                icon="carbon:shopping-cart-clear"
                width="28"
              />
            </button>
            <button
              className="bg-sky-600 hover:bg-sky-500 text-white px-2 py-2 rounded-lg
             mt-2 ms-0 md:ms-2 mb-5 me-4"
            >
              <NavLink to="/">
                Continue
                <Icon
                  icon="mdi:shopping-outline"
                  width="28"
                  className="inline-block"
                />
              </NavLink>
            </button>
          </div>
        </div>
      )}
      <CustomSnackbar open={open} setOpen={setOpen} snackbarMessage={snackbarMessage} />
    </div>
  );
}
