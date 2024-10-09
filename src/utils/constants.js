import { configureStore, createSlice } from "@reduxjs/toolkit";
import beautyImg from "../utils/Images/Beauty.png";
import fragranceImg from "../utils/Images/Fragrance.png";
import furnitureImg from "../utils/Images/furniture.png";
import groceryImg from "../utils/Images/grocery.png";
import homeDecorationImg from "../utils/Images/homeDecoration.png";
import kitchenAccessoriesImg from "../utils/Images/kitchenAccessories.png";
import laptopImg from "../utils/Images/laptop.png";
import menShirtImg from "../utils/Images/menShirt.png";
import menShoeImg from "../utils/Images/menShoe.png";
import menWatchImg from "../utils/Images/menWatch.png";
import mobileAccessoriesImg from "../utils/Images/mobileAccessories.png";
import motorcycleImg from "../utils/Images/motorcycle.png";
import skinCareImg from "../utils/Images/skinCare.png";
import SmartphonesImg from "../utils/Images/smartphone.png";
import sportAccessoriesImg from "../utils/Images/sportAccessories.png";
import SunglassesImg from "../utils/Images/sunglass.png";
import tabletImg from "../utils/Images/tablet.png";
import topImg from "../utils/Images/top.png";
import vehicleImg from "../utils/Images/vehicle.png";
import womenBagImg from "../utils/Images/womenBag.png";
import womenDressImg from "../utils/Images/womenDress.png";
import womenJewelleryImg from "../utils/Images/womenJewellery.png";
import womenShoeImg from "../utils/Images/womenShoe.png";
import womenWatchImg from "../utils/Images/womenWatch.png";

//Home.jsx.................

export const categoryImages = {
  Beauty: beautyImg,
  Fragrances: fragranceImg,
  Furniture: furnitureImg,
  Groceries: groceryImg,
  "Home Decoration": homeDecorationImg,
  "Kitchen Accessories": kitchenAccessoriesImg,
  Laptops: laptopImg,
  "Mobile Accessories": mobileAccessoriesImg,
  Motorcycle: motorcycleImg,
  Smartphones: SmartphonesImg,
  Tablets: tabletImg,
  Tops: topImg,
  Vehicle: vehicleImg,
  "Womens Dresses": womenDressImg,
  "Womens Shoes": womenShoeImg,
  "Womens Bags": womenBagImg,
  "Mens Shirts": menShirtImg,
  "Mens Shoes": menShoeImg,
  "Mens Watches": menWatchImg,
  "Sports Accessories": sportAccessoriesImg,
  "Skin Care": skinCareImg,
  "Womens Watches": womenWatchImg,
  "Womens Jewellery": womenJewelleryImg,
  Sunglasses: SunglassesImg,
};

export const bannerSlider = {
  dots: false,
  infinite: true,
  speed: 3000,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  pauseOnHover: false,
};

// Product and Products.jsx.............

export let snackbarMessage = "Product is added to Cart!";
export let snackbarMessage2 = "Product is added to Wishlist!";

export const ratingArr = [1, 2, 3, 4];

export const sortingArr = [
  { name: "lowToHigh", label: "Low to High" },
  { name: "highToLow", label: "High to Low" },
];



 
