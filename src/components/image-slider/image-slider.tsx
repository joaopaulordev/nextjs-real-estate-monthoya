'use client';

import { useState } from "react";

const IMAGES = [
  "http://127.0.0.1:8080/uploads/1-6954a0c2-e5d3-4358-8528-d7c8262fb637.jpeg",
  "http://127.0.0.1:8080/uploads/1-d497ebec-a096-4775-8fce-2ec0f5ce18c7.jpeg",
  "http://127.0.0.1:8080/uploads/1-22f8314c-b596-4021-b574-682e97053011.jpeg",
  "http://127.0.0.1:8080/uploads/1-5a6be29f-de68-43d3-8709-5d4e4aafad55.jpeg",
  "http://127.0.0.1:8080/uploads/1-6fcd3947-4486-42d1-b163-8788bd97f5d5.jpeg",
  "http://127.0.0.1:8080/uploads/1-71f2f119-5791-4650-9918-153786abe02d.jpeg",
  "http://127.0.0.1:8080/uploads/1-811b6ade-910d-4e80-82a1-3ce90452e237.jpeg",
  "http://127.0.0.1:8080/uploads/1-d3defa65-50e4-471c-a4d0-fa00a1ff4edd.jpeg",
  "http://127.0.0.1:8080/uploads/1-f0979b97-f3b1-49d1-934e-81ae23c0b992.jpeg"
];

export const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? IMAGES.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === IMAGES.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="h-192 w-full relative group">
      {/* Imagem do Slider */}
      <div
        style={{ backgroundImage: `url(${IMAGES[currentIndex]})` }}
        className="w-full h-full duration-500 bg-contain bg-center bg-no-repeat bg-gray-900"
      ></div>

      {/* Seta Esquerda */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors"
      >
        ❮
      </button>

      {/* Seta Direita */}
      <button
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors"
      >
        ❯
      </button>

      {/* Indicadores / Pontos Inferiores */}
      <div className="flex justify-center py-2 gap-2">
        {IMAGES.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer transition-all ${
              currentIndex === slideIndex ? "text-blue-500 scale-125" : "text-gray-400"
            }`}
          >
            •
          </button>
        ))}
      </div>
    </div>
  );
};