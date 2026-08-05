import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AnimatedProductImageProps {
  images: string[];
  alt: string;
  className?: string;
  interval?: number;
  animationInterval?: number;
}

export function AnimatedProductImage({
  images,
  alt,
  className,
  interval = 2000,
  animationInterval,
}: AnimatedProductImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const actualInterval = animationInterval || interval;

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, actualInterval);

    return () => clearInterval(timer);
  }, [images.length, actualInterval, isPaused]);

  return (
    <div
      className="relative w-full h-full group overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((image, index) => (
        <ImageWithFallback
          key={index}
          src={image}
          alt={alt}
          className={`${className} absolute inset-0 group-hover:scale-110 transition-all duration-[1200ms] ease-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ position: index === 0 ? "relative" : "absolute" }}
        />
      ))}
    </div>
  );
}