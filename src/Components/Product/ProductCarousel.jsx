import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ProductCarousel({ product, setImageFunc }) {
  const CustomPrevArrow = (props) => (
    <div
      className="className"
      onClick={props.onClick}
      style={{ position: "relative", left: "95px" }}
    >
      <KeyboardArrowUpIcon />
    </div>
  );

  const CustomNextArrow = (props) => (
    <div
      className="className"
      onClick={props.onClick}
      style={{ position: "relative", left: "95px" }}
    >
      <KeyboardArrowDownIcon />
    </div>
  );

  const productCarousel = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // vertical: true,
    // verticalSwiping: true,
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          // vertical: false,
          // prevArrow: false,
          // nextArrow: false,
        },
      },
    ],
  };

  return (
    <div className="bg-black/20">
      {/* <Slider {...productCarousel} className="w-52 m-6 md:m-10 "> */}
      <Slider {...productCarousel} className=" ">
        {product.images.map((img) => (
          <div
            key={crypto.randomUUID()}
            // className="rounded-xl border border-black/40 p-1"
            className=" p-1"
          >
            <img
              // className="rounded-xl w-52 h-28 object-cover"
              className="w-40 rounded-xl"
              src={img}
              alt={product.title}
              onClick={() => setImageFunc(img)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
