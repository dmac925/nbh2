import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function PropertyCard({ property }: { property: Property }) {
  const {
    title,
    developer,
    developer_logo_new,
    place,
    development_price_from,
    development_price_to,
    image_gallery,
    units_summary
  } = property;

  // Limit the images displayed to 5
  const allImages = image_gallery?.length ? image_gallery : ['/placeholder.png'];
  const images = allImages.slice(0, 5);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const currentX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const priceText = development_price_from && development_price_to 
    ? `£${development_price_from.toLocaleString()} - £${development_price_to.toLocaleString()}`
    : development_price_from 
      ? `From £${development_price_from.toLocaleString()}`
      : 'Price on Request';

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      setCurrentTranslate(-currentImageIndex * containerWidth);
    }
  }, [currentImageIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    const containerWidth = containerRef.current.clientWidth;
    const nextTranslate = -currentImageIndex * containerWidth + diff;
    setCurrentTranslate(nextTranslate);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const diff = currentX.current - startX.current;
    const minSwipeDistance = 50; 
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff < 0 && currentImageIndex < images.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      } else if (diff > 0 && currentImageIndex > 0) {
        setCurrentImageIndex(prev => prev - 1);
      } else {
        setCurrentTranslate(-currentImageIndex * containerWidth);
      }
    } else {
      setCurrentTranslate(-currentImageIndex * containerWidth);
    }
  };

  const goPrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    } else {
      setCurrentImageIndex(images.length - 1);
    }
  };

  const goNext = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg" ref={containerRef}>
          <div
            className="relative h-full flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${currentTranslate}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((imgSrc, idx) => (
              <div key={idx} className="relative w-full flex-shrink-0 h-full">
                <Image
                  src={imgSrc}
                  alt={`${title || 'Property'} - Image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          
          {developer_logo_new && (
            <div className="absolute bottom-2 right-2 bg-white/90 p-1 rounded">
              <img 
                src={developer_logo_new}
                alt={developer || 'Developer logo'}
                className="h-5 w-auto object-contain"
              />
            </div>
          )}
          
          <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs">
            {currentImageIndex + 1} / {images.length}
          </div>

          {images.length > 1 && !isDragging && (
            <>
              <button 
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg leading-tight mb-1">
          {title || 'Unnamed Property'}
        </h3>
        {place && (
          <div className="flex items-center text-muted-foreground mb-2">
            <Home className="h-4 w-4 mr-1" />
            <span className="text-sm">{place}</span>
          </div>
        )}
        {units_summary && (
          <div className="mt-2 space-y-2">
            <Badge variant="secondary" className="mr-2">
              {units_summary.available_count} {units_summary.available_count === 1 ? 'Unit' : 'Units'} Available
            </Badge>
            {units_summary.min_price && (
              <div className="text-sm text-muted-foreground">
                From £{units_summary.min_price.toLocaleString()}
                {units_summary.bedrooms ? ` • ${units_summary.bedrooms} ${units_summary.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}` : ''}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <span className="text-lg font-bold text-primary">{priceText}</span>
      </CardFooter>
    </Card>
  );
}