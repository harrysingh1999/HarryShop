import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import iPhoneX from "./Images/iPhoneX.jpg";
import MacbookPro from "./Images/MacbookPro.webp";
import MicrosoftSurface4 from "./Images/MicrosoftSurface4.webp";
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


export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

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

// export const bannerDetails = [
//   {
//     url: iPhoneX,
//     id: 2,
//     title: "iPhone X",
//     price: 899,
//     category: "smartphones",
//   },
//   {
//     url: MicrosoftSurface4,
//     id: 8,
//     title: "Microsoft Surface Laptop 4",
//     price: 1499,
//     category: "laptops",
//   },
//   {
//     url: MacbookPro,
//     id: 6,
//     title: "MacBook Pro",
//     price: 1749,
//     category: "laptops",
//   },
// ];

export const bannerSlider = {
  dots: false,
  infinite: true,
  speed: 2500,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
};

// Product and Products.jsx.............

export let snackbarMessage = "Product is added to Cart!";
export let snackbarMessage2 = "Product is added to Wishlist!";


