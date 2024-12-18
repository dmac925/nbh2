import React, { useState, useRef } from 'react';
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
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    
    const images = image_gallery?.length ? image_gallery : ['/placeholder.png'];
    
    const priceText = development_price_from && development_price_to 
      ? `£${development_price_from.toLocaleString()} - £${development_price_to.toLocaleString()}`
      : development_price_from 
        ? `From £${development_price_from.toLocaleString()}`
        : 'Price on Request';

    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const difference = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 50;

      if (Math.abs(difference) > minSwipeDistance) {
        if (difference > 0) {
          setCurrentImageIndex(prev => 
            prev === images.length - 1 ? 0 : prev + 1
          );
        } else {
          setCurrentImageIndex(prev => 
            prev === 0 ? images.length - 1 : prev - 1
          );
        }
      }
    };

    return (
      <Card className="group transition-all duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
            <div 
              className="relative w-full h-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="absolute flex transition-transform duration-300 ease-in-out w-full h-full"
                style={{ 
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                  width: `${images.length * 100}%`
                }}
              >
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative w-full h-full flex-shrink-0"
                  >
                    <Image 
                      src={image}
                      alt={`${title || 'Property'} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                ))}
              </div>
              
              {/* Developer Logo */}
              {developer_logo_new && (
                <div className="absolute bottom-2 right-2 bg-white/90 p-1 rounded">
                  <img 
                    src={developer_logo_new}
                    alt={developer || 'Developer logo'}
                    className="h-5 w-auto object-contain"
                  />
                </div>
              )}
              
              {/* Image Counter */}
              <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
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