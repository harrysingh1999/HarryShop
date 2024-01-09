import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ProductCarousel({product, setImageFunc}) {

    const CustomPrevArrow = (props) => (
        <div
          className="className"
          onClick={props.onClick}
          style={{ position: "relative", left: "60px" }}
        >
          <KeyboardArrowUpIcon />
        </div>
      );
    
      const CustomNextArrow = (props) => (
        <div
          className="className"
          onClick={props.onClick}
          style={{ position: "relative", left: "60px" }}
        >
          <KeyboardArrowDownIcon />
        </div>
      );
    
      const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
              vertical: false,
              prevArrow: false,
              nextArrow: false,
            },
          },
        ],
      };
  return (
    <div>
         <Slider {...settings}
              className="w-36 m-6 md:m-10"
            >
              {product.images.map((img) => (
                <div
                  key={crypto.randomUUID()}
                  className="rounded-xl border-2 border-blue-600"
                >
                  <img
                    className="rounded-xl w-36 h-20 object-cover"
                    src={img}
                    alt={product.title}
                    onClick={() => setImageFunc(img)}
                  />
                </div>
              ))}
        </Slider>
    </div>
  )
}
