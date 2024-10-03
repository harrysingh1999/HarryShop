import { CiStar } from "react-icons/ci";

export default function ProductReview({ reviews }) {
  return (
    <div>
      <h1 className="text-xl md:text-2xl xl:text-3xl mb-4 text-center font-semibold">
        Reviews
      </h1>
      <div className="flex flex-col gap-6 items-center lg:flex-row lg:justify-around ">
        {reviews.map((review) => {
          return (
            <div
              key={crypto.randomUUID()}
              className="p-3 rounded-lg w-60 flex flex-col items-center"
              style={{
                boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
              }}
            >
              <div className="flex items-center">
                <p className="font-semibold ">{review.rating}</p>
                <CiStar className="" />
              </div>

              <p className="font-semibold">{review.comment}</p>
              <p className="text-sm">-{review.reviewerName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
