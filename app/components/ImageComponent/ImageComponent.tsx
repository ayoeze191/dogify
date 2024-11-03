"use client"
import React from 'react';
import { useEffect, useState, useRef } from "react";
import Shimmer from "../ui/Shimmer";
import extractBreeds from "@/app/utils/helper/getBreedFromLink";
interface MyComponentProps {
 src:string
}
const ImageComponent:React.FC<MyComponentProps> = ({ src }) => {
  const [showImage, setShowImage] = useState(false); //  image is in viewport
  const [loaded, setLoaded] = useState(false); //  image has fully loaded
  const imageRef = useRef(null); // for observer
  const [showChart, setShowCat] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShowImage(true), 100) // Set showImage to true when in view
          observer.unobserve(entry.target); // Stop observing once the image is in view
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    // Cleanup
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div
      className="rounded-[13px] cursor-pointer hover:scale-95 transition-all image h-[300px] overflow-hidden"
      onMouseEnter={() => setShowCat(true)}
      onMouseLeave={() => setShowCat(false)}
      ref={imageRef}
    >
      {/* Show shimmer while the image is loading */}
      {!loaded && <Shimmer />}

      {/* Show image when it's in view */}
      {showImage && (
        <div
          className="h-full w-full rounded-[13px] object-center bg-center relative flex items-center justify-center"
          style={{
            opacity: loaded ? 1 : 0, // Show image after it's fully loaded
            transition: "opacity 1.5s",
          }}
        >
          <img
            width={100}
            height={100}
            alt=""
            src={src}
            className="h-full w-full rounded-[13px] object-center bg-center"
            onLoad={() => setLoaded(true)} // Set loaded to true when the image is fully loaded
          />
          <div
            className="absolute bottom-2 text-black bg-white rounded-lg p-2 text-sm"
            style={{
              transform: showChart ? "translateY(0)" : "translateY(300px)",
              transition: "all 0.7s",
            }}
          >
            {extractBreeds(src)?.toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;