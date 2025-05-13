import React, { useEffect, useState } from "react";
import "./ImageCarousel.css";

// Usa rutas relativas a public/img/
const images = [
  "/img/science-1182713_640.jpg",
  "/img/pupil-8767681_1280.jpg",
  "/img/Foto-2-scaled.jpg",
  "/img/apple-1853259_1280.jpg"
];

function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`slide-${idx}`}
          className={`carousel-image${idx === current ? " visible" : ""}`}
        />
      ))}
    </div>
  );
}

export default ImageCarousel;
