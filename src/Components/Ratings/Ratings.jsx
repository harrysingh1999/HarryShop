import * as React from "react";
import Rating from "@mui/material/Rating";

export default function Ratings({ rating }) {
  return (
    <div>
      <Rating name="read-only" value={rating} precision={0.1} readOnly />
    </div>
  );
}
