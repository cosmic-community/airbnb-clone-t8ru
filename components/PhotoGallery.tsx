'use client'

import { useState } from 'react'

interface PhotoGalleryProps {
  images: Array<{ url: string; imgix_url: string }>
  title: string
}

export default function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [showAll, setShowAll] = useState(false)

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  // Full screen overlay
  if (showAll) {
    return (
      <>
        {/* Gallery Overlay */}
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 p-4 border-b border-airbnb-border">
            <button
              onClick={() => setShowAll(false)}
              className="flex items-center gap-2 text-airbnb-text font-semibold hover:bg-gray-100 rounded-lg px-3 py-2 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </button>
          </div>
          <div className="max-w-3xl mx-auto p-4 space-y-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={`${image.imgix_url}?w=1200&auto=format,compress`}
                alt={`${title} - Photo ${index + 1}`}
                className="w-full rounded-lg"
              />
            ))}
          </div>
        </div>
      </>
    )
  }

  // Standard Airbnb 5-image grid
  const mainImage = images[0]
  const sideImages = images.slice(1, 5)

  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[400px]">
        {/* Main large image */}
        {mainImage && (
          <div className="col-span-2 row-span-2 cursor-pointer" onClick={() => setShowAll(true)}>
            <img
              src={`${mainImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
              alt={`${title} - Main photo`}
              className="w-full h-full object-cover hover:brightness-90 transition"
            />
          </div>
        )}

        {/* Side images */}
        {sideImages.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden"
            onClick={() => setShowAll(true)}
          >
            <img
              src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={`${title} - Photo ${index + 2}`}
              className="w-full h-full object-cover hover:brightness-90 transition"
            />
          </div>
        ))}

        {/* Fill empty slots */}
        {Array.from({ length: Math.max(0, 4 - sideImages.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-gray-100" />
        ))}
      </div>

      {/* Show all photos button */}
      {images.length > 1 && (
        <button
          onClick={() => setShowAll(true)}
          className="absolute bottom-4 right-4 flex items-center gap-2 bg-white border border-airbnb-text px-4 py-2 rounded-lg text-sm font-semibold text-airbnb-text hover:bg-gray-50 transition"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Show all photos
        </button>
      )}
    </div>
  )
}