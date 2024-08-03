import React from "react";
import { Close } from "@mui/icons-material";

export default function CustomCard({
  thumbnail,
  title,
  id,
  price,
  qty,
  removeFunc,
  increFunc,
  decreFunc,
}) {
  return (
    <div>
      <div
        className="w-46 rounded-t-3xl rounded-b-3xl mx-2 mb-4 min-w-[240px]
       transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-105 duration-300
       bg-gray-300 hover:shadow-lg hover:shadow-sky-500 cursor-pointer relative 
       flex flex-col items-center justify-center py-2"
      >
        <img
          src={thumbnail}
          alt={title}
          className="h-32 w-46"
          onClick={() => handleProduct(id)}
        />
        <div className="pb-3 pt-2 text-center">
          <h2>{title}</h2>
          <div className="mb-1 ">
            <button
              className="bg-sky-600 hover:bg-sky-500 text-white px-4 me-1 rounded-lg"
              onClick={qty > 1 ? () => decreFunc(id) : () => removeFunc(id)}
            >
              -
            </button>
            {qty}
            <button
              className="bg-sky-600 hover:bg-sky-500 text-white px-4 ms-1 rounded-lg"
              onClick={() => increFunc(id)}
            >
              +
            </button>
          </div>

          <p>Rs. {(price * 84).toLocaleString("en-IN")}</p>

          <p className="inline-block">
            Total: Rs. {(qty * price * 84).toLocaleString("en-IN")}
          </p>

          <button
            className="hover:bg-red-500 rounded-lg inline-block absolute top-2 right-3 ms-2"
            onClick={() => removeFunc(id)}
          >
            <Close />
          </button>
        </div>
      </div>
    </div>
  );
}
