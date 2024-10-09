import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";

const CompressedImage = ({
  imageUrl,
  thumbnail,
  alt,
  onClickFunc,
  loading,
  classes,
}) => {
  const [compressedImage, setCompressedImage] = useState(null);

  // Compress image using the existing image URL without refetching it
  const compressImageFromUrl = async (url) => {
    try {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "Anonymous"; // Ensure the image is accessible for manipulation
      img.onload = async () => {
        // Create a canvas to draw the image and convert it to Blob
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(async (blob) => {
          const options = {
            maxSizeMB: 0.5, // Adjust size as needed
            maxWidthOrHeight: 1280,
            useWebWorker: true,
          };

          // Compress the image Blob
          const compressedBlob = await imageCompression(blob, options);
          const compressedImageUrl = URL.createObjectURL(compressedBlob);
          setCompressedImage(compressedImageUrl);
        }, "image/webp"); // You can also use 'image/webp' for further optimization
      };
    } catch (error) {
      console.error("Error compressing the image:", error);
    }
  };

  useEffect(() => {
    imageUrl && compressImageFromUrl(imageUrl);
  }, [imageUrl]);

  return (
    <img
      src={compressedImage || thumbnail} // Use compressed image if available
      alt={alt} // Provide default alt text
      onClick={onClickFunc}
      loading={loading} // Lazy load the image
      className={classes}
      onError={(e) => {
        e.target.src = imageUrl; // Fallback to original image if error occurs
      }}
    />
  );
};

export default React.memo(CompressedImage);
