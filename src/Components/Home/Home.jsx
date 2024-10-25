import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { categoryImages } from "../../utils/constants";
import { Skeleton } from "@mui/material";
import Banner from "./Banner";
import { useGetAllCategoriesQuery } from "../../Reduxtoolkit/apiSlice/apiSlice";

export default function Home() {
  const [categories, setCategories] = useState(null);
  let navigate = useNavigate();
  categoryImages;

  const {
    data: fetchedCategories,
    isLoading,
    error,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    setCategories(fetchedCategories);
  }, [fetchedCategories]);

  const handleCategory = (product) => {
    navigate(`/${product}`, { state: product });
  };

  const handleProduct = (title, id, productCategory) => {
    let urlEndpoint = title.split(" ").join("-");
    navigate(`/${productCategory}/${urlEndpoint}`, { state: id });
  };

  return (
    <div>
      <Banner heroImageData={["laptops", "mens-shoes"]} handleProduct={handleProduct} />
      <h2 className="text-2xl md:text-3xl text-center mt-10 mb-6 text-black font-semibold">
        Explore Categories
      </h2>

      <div className="flex flex-wrap justify-center md:mx-20">
        {isLoading ? (
          Array.from({ length: 19 }).map(() => (
            <Card
              key={crypto.randomUUID()}
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
              {" "}
              {error.error ? error.error : error.message}{" "}
            </p>
            <p className=" text-white text-2xl">
              {" "}
              API error: Please try after sometime.
            </p> 
          </div>
        ) : (
          categories &&
          categories.map((category) => {
            return (
              <div
                key={category.name}
                className="text-center rounded-t-3xl rounded-b-3xl mb-6 md:mb-8 mx-2 transition ease-in-out
                    delay-25 hover:-translate-y-1 hover:scale-110 duration-300 
                      cursor-pointer py-2"
                style={{
                  boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
                }}
                onClick={() => handleCategory(category.slug)}
              >
                <img
                  src={categoryImages[category.name]}
                  alt={category.name}
                  className="h-40 w-44"
                  loading="lazy"
                />
                <p className="text-black">{category.name}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
