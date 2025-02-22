// components/BackgroundCarousel.tsx

import React, { useEffect, useState } from "react";

interface BackgroundCarouselProps {
  images: string[];
  duration?: number; // duration in milliseconds, default is 3000ms
  children: React.ReactNode;
  className?: string;
}

const BackgroundCarousel: React.FC<BackgroundCarouselProps> = ({
  images,
  duration = 3000,
  children,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, images.length]);

  return (
    <div className={`relative w-full ${className}  overflow-hidden`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000  ${
            index === activeIndex ? "opacity-70" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
      <div
        // style={{ overflowY: "auto" }}
        className="absolute inset-0 flex items-center justify-center text-white z-10"
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundCarousel;
