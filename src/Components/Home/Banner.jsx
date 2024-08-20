import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { bannerSlider } from "../../utils/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyButton from "../Button/MyButton";

export default function Banner({ data }) {
  const [bannerData, setBannerData] = useState([]);
  const [propData, setPropData] = useState(data[0]);

  useEffect(() => {
    const fetchBannerDetails = async () => {
      //   try {
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

      //   } catch (error) {
      //     setError(error);
      //     setIsLoading(false);
      //   }
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
                  className="w-screen h-screen object-cover"
                />
                <div className="absolute top-56 ms-6 md:ms-16 hover:shadow-lg hover:shadow-sky-500 p-2 rounded-xl text-white">
                  <p className="text-xl md:text-4xl ps-2 font-semibold">
                    {item.title}
                  </p>
                  <p className="md:mt-2 mb-5 font-semibold text-sm md:text-lg text-sky-600 ps-2">
                    Rs. {(item.price * 84).toLocaleString("en-IN")}
                  </p>
                  <div
                  // onClick={() =>
                  //   handleProduct(product.category, product.title, product.id)
                  // }
                  >
                    <MyButton value="Shop Now" bg="#6CB4EE" />
                  </div>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
