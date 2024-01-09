import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <Card 
      style={{ minWidth: 240 }}
      className="w-46 !rounded-t-3xl !rounded-b-3xl mx-2 mb-4
       !transition ease-in-out !delay-25 hover:-translate-y-1 hover:scale-105 !duration-300
       !bg-gray-300 hover:!shadow-lg hover:!shadow-sky-500 !border-b border-black cursor-pointer"
     >
        <CardMedia
          className="h-32 w-46"
          image={thumbnail}
          title={title}
          onClick={() => handleProduct(id)}
        />
        <CardContent className="!pb-3 !pt-2 ">
          <Typography gutterBottom variant="h7" component="div">
            {title}
          </Typography>

          <div className="mb-1 quantityButtons">
            <button
              className="bg-sky-600 hover:bg-sky-500 text-white px-2 me-1 rounded-lg"
              onClick={qty > 1 ? () => decreFunc(id) : () => removeFunc(id)}
            >
              -
            </button>
            {qty}
            <button

              className="bg-sky-600 hover:bg-sky-500 text-white px-2 ms-1 rounded-lg"
              onClick={() => increFunc(id)}
            >
              +
            </button>
          </div>

          <p>Rs. {(price * 84).toLocaleString("en-IN")}</p>

          <p 
          className="inline-block" >
            Total: Rs.
            {(qty * price * 83).toLocaleString("en-IN")}
          </p>
          <button
            className="hover:bg-red-500 rounded-lg inline-block ms-2"
            onClick={() => removeFunc(id)}
          >
            <DeleteIcon />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
