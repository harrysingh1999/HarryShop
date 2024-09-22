import React from "react";
import Ratings from "../Ratings/Ratings";
import CustomButton from "../CustomButton/CustomButton";

export default function ProductCard({
  data,
  handleProduct,
  handleAddtoCart,
  handleRemoveCartItem,
  handleAddtoWishlist,
  btnText1,
  btnText2,
  removeFunc,
  increFunc,
  decreFunc,
}) {
  return (
    <div
      className="flex flex-col items-center rounded-xl mb-6 md:mb-8 mx-2
          cursor-pointer pt-2 pb-3 px-3 w-[230px] md:w-[250px] lg:w-[270px]"
      style={{
        boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
      }}
    >
      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-44 h-auto"
        onClick={() => handleProduct(data.title, data.id, data.category)}
      />
      <div className="text-center text-sm md:text-base w-full">
        <p className="text-black">{data.title}</p>
        <p className="font-bold">
          Rs. {(data.price * 84).toLocaleString("en-IN")}
        </p>

        {btnText2 === "Add to Wishlist" && (
          <div className="flex items-center justify-center">
            <span>
              <Ratings rating={data.rating} />
            </span>
            <span>{data.rating}</span>
          </div>
        )}

        {removeFunc && (
          <p className="inline-block font-bold">
            Total: Rs. {(data.qty * data.price * 84).toLocaleString("en-IN")}
          </p>
        )}
        {removeFunc ? (
          <div className="mt-1 flex justify-center gap-2">
            <button
              className="border border-black/40  px-4  rounded-lg"
              onClick={
                data.qty > 1
                  ? () => decreFunc(data.id)
                  : () => removeFunc(data.id)
              }
            >
              -
            </button>
            {data.qty}
            <button
              className="border border-black/40 px-4 rounded-lg"
              onClick={() => increFunc(data.id)}
            >
              +
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 md:flex-row font-semibold lg:font-bold mt-2">
            <CustomButton
              text={btnText1}
              handleClick={() => handleAddtoCart(data, data.id)}
            />
            <CustomButton
              text={btnText2}
              handleClick={() =>
                handleAddtoWishlist
                  ? handleAddtoWishlist(data)
                  : handleRemoveCartItem(data.id)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
