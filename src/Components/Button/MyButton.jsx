import React from "react";
import { Icon } from '@iconify/react';

export default function MyButton({value, bg}) {
  return (
    <div>
      <button
      style= {  {backgroundColor: bg ? bg : ""  }} 
        className="ms-1.5 ps-3 pe-2 md:ps-6 md:pe-4 py-1 md:py-1.5 border rounded-2xl 
         bg-gradient-to-r hover:from-sky-500 hover:to-blue-500 hover:text-white"
      >
        <p className="inline-block hover:text-white text-sm">{value}</p>
        <Icon icon="teenyicons:arrow-right-outline" width="25" height="15" className="inline-block !pe-0" />
      </button>
    </div>
  );
}
