import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyButton from "../Button/MyButton";
import {
  bannerDetails,
  bannerSlider,
  categoryImages,
} from "../../utils/constants";
import { Skeleton } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import Banner from "./Banner";

export default function Home() {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  categoryImages;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let response = await axios.get(
          "https://dummyjson.com/products/categories"
        );

        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategory = (product) => {
    navigate(`/${product}`, { state: product });
  };

  const handleProduct = (category, title, id) => {
    let urlEndpoint = title.split(" ").join("-");
    navigate(`/${category}/${urlEndpoint}`, { state: id });
  };

  return (
    <div>
      <Banner data={["laptops", "mens-shoes"]} />
      <h2 className="text-2xl md:text-3xl text-center mt-10 mb-6 text-black font-semibold">
        Explore Categories
      </h2>

      <div className="flex flex-wrap justify-center md:mx-20">
        {isLoading ? (
          Array.from({ length: 19 }).map(() => (
            <Card
              key={nanoid()}
              className="max-w-min !rounded-t-3xl !rounded-b-3xl mb-6 md:mb-8 mx-2 !transition ease-in-out !delay-25 
              hover:-translate-y-1 hover:scale-110 !duration-300 !bg-gray-300 hover:!shadow-lg hover:!shadow-sky-500 
              cursor-pointer"
            >
              <Skeleton variant="rectangular" width={176} height={200} />
              <CardContent className="!pt-2 !pb-1">
                <Skeleton />
              </CardContent>
            </Card>
          ))
        ) : error ? (
          <div className="h-screen w-screen flex flex-col justify-center items-center mx-4 md:mx-0 bg-red-600">
            <p className=" text-white text-2xl">
              Oops, API error: {error?.response?.data?.message}.
            </p>
            <p className=" text-white text-2xl"> Please try after sometime.</p>
          </div>
        ) : (
          categories &&
          categories.map((category) => {
            return (
              <div
                key={crypto.randomUUID()}
                className="text-center rounded-t-3xl rounded-b-3xl mb-6 md:mb-8 mx-2 transition ease-in-out
                    delay-25 hover:-translate-y-1 hover:scale-110 duration-300 
                      cursor-pointer py-2"
                style={{
                  boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
                }}
              >
                <img
                  fetchprority="high"
                  src={categoryImages[category.name]}
                  alt={category.name}
                  onClick={() => handleCategory(category.slug)}
                  className="h-40 w-44"
                />
                <p className="text-black">
                  {category.name[0].toUpperCase() + category.name.slice(1)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
