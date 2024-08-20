import React from "react";
import { CiStar } from "react-icons/ci";

export default function ProductReview({ reviews }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Reviews</h1>
      <div className="flex justify-around">
        {reviews.map((review) => {
          return (
            <div
              key={review.reviewerName}
              className="p-3"
              style={{
                boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
              }}
            >
              <div className="flex items-center border border-black/50">
                <p className="font-semibold">{review.rating}</p>
                <CiStar className="bg-yellow-500" />
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
