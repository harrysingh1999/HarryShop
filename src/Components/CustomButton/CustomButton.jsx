import React from "react";

export default function CustomButton({ text, handleClick }) {
  return (
    <button
      className="border border-black/40 w-[100%] p-1.5 md:p-2 rounded-lg hover:bg-black hover:text-white
            transition duration-300 ease-in-out"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
