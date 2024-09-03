import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function ProductCarousel({ product, setImageFunc }) {
  const CustomPrevArrow = (props) => (
    <div className="absolute left-6 lg:left-12 -top-5" onClick={props.onClick}>
      <FaChevronUp />
    </div>
  );

  const CustomNextArrow = (props) => (
    <div className="absolute left-6 lg:left-12 -bottom-4" onClick={props.onClick}>
      <FaChevronDown />
    </div>
  );

  const productCarousel = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow:
      product.images.length > 1
        ? product.images.length - 1
        : product.images.length,
    slidesToScroll: 1,
    arrows: true,
    vertical: true,
    verticalSwiping: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="w-16 lg:w-28 ">
      <Slider
        {...productCarousel}
        className="relative focus:outline-none cursor-pointer"
      >
        {product.images.map((img, index) => (
          <div key={crypto.randomUUID()} className="">
            <img
              className="w-16 h-16 lg:w-28 lg:h-28 object-cover rounded-xl border border-black/30"
              src={img}
              alt={product.title}
              onClick={() => setImageFunc(index)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
