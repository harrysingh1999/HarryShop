import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyButton from "../Button/MyButton";
import {
  categoryImages,
  bannerDetails,
  bannerSlider,
} from "../Javascript/projectJavascript";
import { Skeleton } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";

export default function Home() {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchedCategories = async () => {
      try {
        let response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false)
      }
    };
    fetchedCategories();
  }, []);

  let navigate = useNavigate();

  const handleCategory = (product) => {
    navigate("/Products", { state: product });
  };

  const handleProduct = (id) => {
    navigate("/Product", { state: id });
  };

  return (
    <div>
      <Slider {...bannerSlider}>
        {bannerDetails.map((product) => (
          <div key={crypto.randomUUID()}>
            <div className="mt-10 md:mt-16">
              <img
                src={product.url}
                alt={product.title}
                style={{ height: "70vh" }}
                className="relative w-screen object-cover"
              />
            </div>
            <div className="absolute top-40 md:top-56 ms-6 md:ms-16 hover:shadow-lg hover:shadow-sky-500 p-2 rounded-xl">
              <p className="text-xl md:text-4xl ps-2 text-white font-semibold">
                {product.title}
              </p>
              <p className="md:mt-2 mb-5 font-semibold text-sm md:text-lg text-sky-600 ps-2">
                Rs. {(product.price * 84).toLocaleString("en-IN")}
              </p>
              <div onClick={() => handleProduct(product.id)}>
                <MyButton value="Shop Now" bg="#6CB4EE" />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <h2 className="text-2xl md:text-3xl text-center mt-10 mb-6 text-black font-semibold">
        Explore Categories
      </h2>

      <div className="flex flex-wrap justify-center md:mx-20">
        {isLoading ? (
          Array.from({ length: 19 }).map(() => (
            <Card
              key={nanoid()}
              className="max-w-min !rounded-t-3xl !rounded-b-3xl mb-6 md:mb-8 mx-2 !transition ease-in-out !delay-25 
              hover:-translate-y-1 hover:scale-110 !duration-300 !bg-gray-300 hover:!shadow-lg hover:!shadow-sky-500 !border-b border-black cursor-pointer"
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
              Oops, API error: {error.response.data.message}.
            </p>
            <p className=" text-white text-2xl"> Please try after sometime.</p>
          </div>
        ) : (
          categories &&
          categories.map((category) => {
            return (
              category !== "motorcycle" && (
                <Card
                  key={crypto.randomUUID()}
                  className="max-w-min !rounded-t-3xl !rounded-b-3xl mb-6 md:mb-8 mx-2 !transition ease-in-out
                   !delay-25 hover:-translate-y-1 hover:scale-110 !duration-300 !bg-gray-300 hover:!shadow-lg hover:!shadow-sky-500 !border-b border-black cursor-pointer"
                >
                  <CardMedia
                    className="h-40 w-44"
                    image={categoryImages[category]}
                    title={category.title}
                    onClick={() => handleCategory(category)}
                  />
                  <CardContent className="!pt-2 !pb-1">
                    <Typography
                      gutterBottom
                      component="div"
                      className="text-black"
                    >
                      {category !== "motorcycle" &&
                        category[0].toUpperCase() + category.slice(1)}
                    </Typography>
                  </CardContent>
                </Card>
              )
            );
          })
        )}
      </div>
    </div>
  );
}
