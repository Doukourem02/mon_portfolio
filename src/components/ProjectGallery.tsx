"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectGallery({ images, title, isOpen, onClose }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);


  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[90vh] bg-gray-900 rounded-xl border border-blue-500/30 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <FiX className="w-6 h-6 text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Image Container */}
              <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={images[currentIndex]}
                      alt={`${title} - Image ${currentIndex + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                      aria-label="Image précédente"
                    >
                      <FiChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                      aria-label="Image suivante"
                    >
                      <FiChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                    <span className="text-sm text-white">
                      {currentIndex + 1} / {images.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="p-4 border-t border-gray-800 overflow-x-auto">
                  <div className="flex gap-2 justify-center">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentIndex === index
                            ? "border-blue-500 scale-110"
                            : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

