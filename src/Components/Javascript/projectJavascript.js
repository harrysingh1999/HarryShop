import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import iPhoneX from "./Images/iPhoneX.jpg";
import MacbookPro from "./Images/MacbookPro.webp";
import MicrosoftSurface4 from "./Images/MicrosoftSurface4.webp";

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
  smartphones: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
  laptops: "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
  fragrances: "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg",
  skincare: "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg",
  groceries: "https://cdn.dummyjson.com/product-images/21/thumbnail.png",
  "home-decoration": "https://cdn.dummyjson.com/product-images/26/thumbnail.jpg",
  furniture: "https://cdn.dummyjson.com/product-images/32/thumbnail.jpg",
  tops: "https://cdn.dummyjson.com/product-images/36/2.webp",
  "womens-dresses": "https://cdn.dummyjson.com/product-images/42/thumbnail.jpg",
  "womens-shoes": "https://cdn.dummyjson.com/product-images/46/thumbnail.jpg",
  "mens-shirts": "https://cdn.dummyjson.com/product-images/51/thumbnail.jpg",
  "mens-shoes": "https://cdn.dummyjson.com/product-images/56/thumbnail.jpg",
  "mens-watches": "https://cdn.dummyjson.com/product-images/61/thumbnail.jpg",
  "womens-watches": "https://cdn.dummyjson.com/product-images/66/thumbnail.jpg",
  "womens-bags": "https://cdn.dummyjson.com/product-images/71/thumbnail.jpg",
  "womens-jewellery": "https://cdn.dummyjson.com/product-images/76/thumbnail.jpg",
  sunglasses: "https://cdn.dummyjson.com/product-images/82/thumbnail.jpg",
  automotive: "https://cdn.dummyjson.com/product-images/86/thumbnail.jpg",
  lighting: "https://cdn.dummyjson.com/product-images/98/thumbnail.jpg",
};

export const bannerDetails = [
  {
    url: iPhoneX,
    id: 2,
    title: "iPhone X",
    price: 899,
  },
  {
    url: MicrosoftSurface4,
    id: 8,
    title: "Microsoft Surface Laptop 4",
    price: 1499,
  },
  {
    url: MacbookPro,
    id: 6,
    title: "MacBook Pro",
    price: 1749,
  },
];

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

//Login.jsx......
export const registerOptions = {
  email: {
    required: "Email cannot be blank",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 10,
      message: "Password must be at least 10 characters",
    },
  },
};
