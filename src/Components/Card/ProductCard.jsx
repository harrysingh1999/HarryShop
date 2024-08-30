import React from "react";
import Ratings from "../Ratings/Ratings";

export default function ProductCard({
  data,
  isHovering,
  setIsHovering,
  hoveredId,
  handleMouseEnter,
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
      className="flex flex-col items-center rounded-xl mb-6 md:mb-8 mx-2 transition ease-in-out
        delay-25 hover:-translate-y-1 hover:scale-110 duration-300 
          cursor-pointer pt-2 pb-3 px-2 w-[230px] md:w-auto"
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
      <div className="text-center text-sm md:text-base">
        <p className="text-black">{data.title}</p>
        <p className="font-bold">
          Rs. {(data.price * 84).toLocaleString("en-IN")}
        </p>
        {handleMouseEnter && (
          <span
            className="mt-1 inline-block"
            onMouseEnter={() => handleMouseEnter(data.id)}
            onMouseOut={() => setIsHovering(false)}
          >
            <Ratings rating={data.rating} />
          </span>
        )}
        {isHovering && hoveredId === data.id && (
          <span className="bg-gray-500 text-center text-white p-1">
            {data.rating}
          </span>
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
          <div>
            <button
              className="hover:bg-gray-100 px-2 py-1 rounded-lg mt-2 inline-block border border-black"
              onClick={() => handleAddtoCart(data, data.id)}
            >
              {btnText1}
            </button>

            <button
              className="hover:bg-gray-100 p-1 rounded-lg ml-4 border border-black"
              onClick={() =>
                handleAddtoWishlist
                  ? handleAddtoWishlist(data)
                  : handleRemoveCartItem(data.id)
              }
            >
              {btnText2}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
