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
            maxSizeMB: 0.5, 
            maxWidthOrHeight: 1280,
            useWebWorker: true,
          };

          const compressedBlob = await imageCompression(blob, options);
          const compressedImageUrl = URL.createObjectURL(compressedBlob);
          setCompressedImage(compressedImageUrl);
        }, "image/webp"); 
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
      src={compressedImage || thumbnail}
      alt={alt}
      onClick={onClickFunc}
      loading={loading}
      className={classes}
    />
  );
};

export default React.memo(CompressedImage);
