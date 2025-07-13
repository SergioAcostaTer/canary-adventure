"use client";
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ShareAndSaveButtons } from "../shared/ShareAndSaveButtons";

interface ImageGridProps {
  images: string[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  ],
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Parse URL hash to get initial state
  const parseUrlHash = () => {
    const hash = window.location.hash;
    if (hash.startsWith("#image-grid")) {
      return { modalOpen: true, showAll: true, index: 0 };
    } else if (hash.startsWith("#image-detail=")) {
      const index = parseInt(hash.split("=")[1], 10);
      return {
        modalOpen: true,
        showAll: false,
        index: !isNaN(index)
          ? Math.max(0, Math.min(index, images.length - 1))
          : 0,
      };
    }
    return { modalOpen: false, showAll: false, index: 0 };
  };

  // Initialize state from URL on mount
  useEffect(() => {
    const state = parseUrlHash();
    setModalIsOpen(state.modalOpen);
    setShowAllPhotos(state.showAll);
    setCurrentImageIndex(state.index);
  }, [images.length]);

  // Handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const state = parseUrlHash();
      setModalIsOpen(state.modalOpen);
      setShowAllPhotos(state.showAll);
      setCurrentImageIndex(state.index);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [images.length]);

  const updateUrl = (
    isModalOpen: boolean,
    isShowingAll: boolean,
    imageIndex: number
  ) => {
    const currenHash = window.location.hash;
    const newHash = isModalOpen
      ? isShowingAll
        ? "#image-grid"
        : `#image-detail=${imageIndex}`
      : "";

    const newUrl = window.location.pathname + window.location.search + newHash;

    if (currenHash.includes("image-detail")) {
      window.history.replaceState(
        {
          modalOpen: isModalOpen,
          showAll: isShowingAll,
          index: imageIndex,
        },
        "",
        newUrl
      );
    } else {
      window.history.pushState(
        {
          modalOpen: isModalOpen,
          showAll: isShowingAll,
          index: imageIndex,
        },
        "",
        newUrl
      );
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
    setShowAllPhotos(true);
    updateUrl(true, true, currentImageIndex);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setShowAllPhotos(false);
    const newUrl = window.location.pathname + window.location.search;
    window.history.pushState(
      { modalOpen: false, showAll: false, index: 0 },
      "",
      newUrl
    );
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    updateUrl(modalIsOpen, showAllPhotos, newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    updateUrl(modalIsOpen, showAllPhotos, newIndex);
  };

  const toggleAllPhotos = () => {
    const newShowAll = !showAllPhotos;
    setShowAllPhotos(newShowAll);
    updateUrl(modalIsOpen, newShowAll, currentImageIndex);
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalIsOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalIsOpen) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "g" || e.key === "G") toggleAllPhotos(); // 'g' for grid toggle
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalIsOpen, currentImageIndex, showAllPhotos]);

  const renderGrid = () => {
    if (images.length === 1) {
      return (
        <div className="h-80 sm:h-96 rounded-lg overflow-hidden">
          <div className="relative group cursor-pointer overflow-hidden h-full">
            <img
              src={images[0]}
              alt="Property image 1"
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              onClick={openModal}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 h-80 sm:h-96 rounded-lg overflow-hidden">
        {/* Main large image - takes up left half on desktop, top-left on mobile */}
        <div
          className="relative group cursor-pointer overflow-hidden col-span-1 sm:col-span-2 sm:row-span-2"
          onClick={openModal}
        >
          <img
            src={images[0]}
            alt="Property image 1"
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>

        {/* Other images */}
        {images[1] && (
          <div
            className="relative group cursor-pointer overflow-hidden"
            onClick={openModal}
          >
            <img
              src={images[1]}
              alt="Property image 2"
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          </div>
        )}

        {images[2] && (
          <div
            className="relative group cursor-pointer overflow-hidden"
            onClick={openModal}
          >
            <img
              src={images[2]}
              alt="Property image 3"
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          </div>
        )}

        {images[3] && (
          <div
            className="relative group cursor-pointer overflow-hidden"
            onClick={openModal}
          >
            <img
              src={images[3]}
              alt="Property image 4"
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />

            {/* Show more photos overlay */}
            {images.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-200 sm:hidden">
                <span className="text-white font-medium text-sm sm:text-lg">
                  +{images.length - 4} photos
                </span>
              </div>
            )}

            {/* Base hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          </div>
        )}

        {/* Fifth image only shows on desktop */}
        {images[4] && (
          <div
            className="relative group cursor-pointer overflow-hidden hidden sm:block"
            onClick={openModal}
          >
            <img
              src={images[4]}
              alt="Property image 5"
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />

            {/* Show more photos overlay */}
            {images.length > 5 && (
              <div
                className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-200"
                onClick={openModal}
              >
                <span className="text-white font-medium text-lg">
                  +{images.length - 5} photos
                </span>
              </div>
            )}

            {/* Base hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="relative mx-auto">
        {renderGrid()}

        {/* Show all photos button */}
        {images.length > 4 && (
          <button
            onClick={openModal}
            className="absolute bottom-4 right-6 bg-white/95 backdrop-blur-sm hover:bg-white border border-gray-200/50 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            <Grid3X3 size={16} className="text-gray-700" />
            <span className="text-sm font-medium text-gray-900">
              Show all {images.length} photos
            </span>
          </button>
        )}
      </div>

      {modalIsOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/95 z-50 cursor-pointer" />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex flex-col">
            {/* Header */}

            {showAllPhotos ? (
              /* Grid View */
              <>
                <div className="p-4 sm:p-6 border-gray-100 grid grid-cols-[1fr_auto_1fr] items-center bg-white">
                  <button
                    onClick={() => closeModal()}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={20} className="text-gray-700" />
                  </button>

                  <div className="text-sm font-medium text-gray-700">
                    {currentImageIndex + 1} of {images.length}
                  </div>

                  <ShareAndSaveButtons />
                </div>
                <div
                  className="flex-1 bg-white overflow-auto cursor-pointer"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      closeModal();
                    }
                  }}
                >
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
                      {images.map((url, i) => (
                        <div
                          key={i}
                          className={`relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100 border-2 transition-all duration-200 ${
                            i === currentImageIndex
                              ? "border-black shadow-lg scale-[0.98]"
                              : "border-transparent hover:border-gray-300 hover:shadow-md"
                          }`}
                          onClick={() => {
                            setCurrentImageIndex(i);
                            setShowAllPhotos(false);
                            updateUrl(modalIsOpen, false, i);
                          }}
                        >
                          <img
                            src={url}
                            alt={`Property image ${i + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Image number overlay */}
                          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                            {i + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Single Image View */
              <>
                <div className="p-4 sm:p-6 border-gray-100 grid grid-cols-[1fr_auto_1fr] items-center">
                  <button
                    onClick={() => setShowAllPhotos(true)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={20} className="text-gray-200" />
                  </button>

                  <div className="text-sm font-medium text-gray-200">
                    {currentImageIndex + 1} of {images.length}
                  </div>

                  <ShareAndSaveButtons className="text-gray-200" />
                </div>
                <div className="flex-1 flex items-center justify-center relative cursor-pointer">
                  {/* Navigation buttons */}
                  {images.length > 1 && (
                    <>
                      {currentImageIndex > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className="absolute left-4 sm:left-6 z-10 p-3 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 cursor-pointer"
                        >
                          <ChevronLeft size={20} className="text-gray-700" />
                        </button>
                      )}
                      {currentImageIndex < images.length - 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className="absolute right-4 sm:right-6 z-10 p-3 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 cursor-pointer"
                        >
                          <ChevronRight size={20} className="text-gray-700" />
                        </button>
                      )}
                    </>
                  )}

                  {/* Main image container */}
                  <div
                    className="max-w-full max-h-full px-16 sm:px-20 py-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={images[currentImageIndex]}
                      alt={`Property image ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    />
                  </div>

                  {/* Image indicators */}
                  {images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(i);
                          }}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            i === currentImageIndex
                              ? "bg-white shadow-lg"
                              : "bg-white/50 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ImageGrid;
