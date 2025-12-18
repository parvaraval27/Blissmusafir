import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setDidError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const { src, alt, style, className, ...rest } = props
  
  // Only fix Google Drive URLs, leave other URLs (like Unsplash) as is
  const fixedSrc = src
  
  // Debug logging for Google Drive URLs
  if (src && src.includes('drive.google.com')) {
    console.log('ImageWithFallback - Original Google Drive URL:', src)
    console.log('ImageWithFallback - Fixed Google Drive URL:', fixedSrc)
  }

  // Render error placeholder — apply sizing to wrapper so avatars/thumbnails/hero images get correct size
  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  return (
    // Apply provided className/style to the wrapper so sizing classes control the container
    <div className={`relative ${className ?? ''}`} style={style}>
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse`} />
      )}
      <img 
        src={fixedSrc} 
        alt={alt} 
        // Make the image fill the wrapper and use object-cover to always cover the area
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 w-full h-full object-cover`} 
        style={{ display: 'block', objectFit: 'cover' }} 
        {...rest} 
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}
