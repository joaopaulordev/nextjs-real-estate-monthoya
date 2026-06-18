'use client';

import { Foto } from '@/contexts/imovel/models/foto';
import React, { useState, useEffect } from 'react';

interface ImageGalleryModalProps {
  fotos: Foto[] | undefined
}

export default function ImageGalleryModal({ fotos }: ImageGalleryModalProps) {
  let images: string[];
  if (fotos === undefined){
    images = []
  } else {
    images = fotos?.map(foto => `http://127.0.0.1:8080/${foto.caminho}`);
  }    
  
  // State handles the index of the currently open image (null means modal is closed)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Navigation handlers
  const closeModal = () => setActiveIndex(null);
  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevents clicking the image from closing the modal
    setActiveIndex((prev) => (prev !== null ? prev + 1 : 0) % images.length);
  };
  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev !== null ? prev - 1 + images.length : 0) % images.length);
  };

  // Keyboard navigation for desktop users (Escape to close, arrows to browse)
  useEffect(() => {
    if (activeIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") setActiveIndex((prev) => (prev !== null ? prev + 1 : 0) % images.length);
      if (e.key === "ArrowLeft") setActiveIndex((prev) => (prev !== null ? prev - 1 + images.length : 0) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* <h2 className="text-2xl font-bold mb-6 text-gray-800">Galeria de Fotos</h2> */}
      
      {/* 1. Thumbnail Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="group relative cursor-pointer aspect-square overflow-hidden rounded-xl bg-gray-100 transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            <img 
              src={src} 
              alt={`Gallery preview ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* 2. Full-Screen Modal Overlay */}
      {activeIndex !== null && (
        <div 
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm select-none animate-fade-in"
        >
          {/* Close Button */}
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 cursor-pointer text-white/70 hover:text-white text-4xl p-2 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>

          {/* Left Arrow */}
          <button 
            onClick={prevImage}
            className="absolute left-4 md:left-8 cursor-pointer text-white/50 hover:text-white text-5xl p-4 transition-colors focus:outline-none"
            aria-label="Previous image"
          >
            &#8249;
          </button>

          {/* Full Screen Image Frame */}
          <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center">
            <img 
              src={images[activeIndex]} 
              alt={`Fullscreen view ${activeIndex + 1}`} 
              onClick={(e) => e.stopPropagation()} // Stop overlay click bubble
              className="max-w-full max-h-[80vh] object-contain rounded shadow-2xl transition-all duration-300 transform scale-100"
            />
            {/* Image Counter */}
            <p className="text-white/60 text-sm mt-4 tracking-wider">
              {activeIndex + 1} / {images.length}
            </p>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextImage}
            className="absolute right-4 cursor-pointer md:right-8 text-white/50 hover:text-white text-5xl p-4 transition-colors focus:outline-none"
            aria-label="Next image"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}