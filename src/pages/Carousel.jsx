import React, { useEffect, useState } from "react";

const Carousel = () => {
  const slides = [
    {
      url: "https://picsum.photos/id/1015/1920/1080",
      title: "Slide 1",
    },
    {
      url: "https://picsum.photos/id/1016/1920/1080",
      title: "Slide 2",
    },
    {
      url: "https://picsum.photos/id/1018/1920/1080",
      title: "Slide 3",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
   <div
  className="relative w-screen"
  style={{ height: "calc(100vh - 120px)" }} // match with header height
>

      {/* Slide */}
      <div className="w-full h-full">
        <img
          src={slides[current].url}
          alt={slides[current].title}
          className="w-full h-full object-cover transition-all duration-700"
        />
      </div>

      {/* Prev button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
      >
        ❮
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 rounded-full ${
              current === index ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
