import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { bannerSlider } from "../../utils/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Banner({ data, handleProduct }) {
  const [bannerData, setBannerData] = useState([]);
  const [propData, setPropData] = useState(data[0]);

  useEffect(() => {
    const fetchBannerDetails = async () => {
      let response = await axios.get(
        `https://dummyjson.com/products/category/${propData}`
      );

      if (bannerData.length === 0) {
        setPropData(data[1]);
        setBannerData(response.data.products.slice(0, 2));
      } else if (bannerData.length > 0 && bannerData.length < 3) {
        let obj = response.data.products[0];
        setBannerData((prevState) => {
          return [...prevState, obj];
        });
      }
    };
    fetchBannerDetails();
  }, [propData]);

  return (
    <div className="bg-black focus:outline-none">
      <Slider {...bannerSlider}>
        {bannerData &&
          bannerData.map((item) => {
            return (
              <div key={item.title} className="relative">
                <img
                  src={item.images[0] || item.thumbnail}
                  alt={item.title}
                  loading="eager"
                  className="w-screen h-screen object-cover"
                />
                <div
                  id="imageText"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-6 md:p-12"
                >
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4">
                    {item.title}
                  </p>
                  <p className="font-semibold text-lg md:text-xl lg:text-2xl mb-4 md:mb-6">
                    Rs. {(item.price * 84).toLocaleString("en-IN")}
                  </p>
                  <button
                    className="border border-white bg-black hover:bg-white hover:text-black transition duration-300 ease-in-out px-6 py-3 md:px-8 md:py-3 rounded-lg font-bold"
                    onClick={() =>
                      handleProduct(item.title, item.id, item.category)
                    }
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
