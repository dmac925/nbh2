import React from 'react';
import { ArrowLeft, Share2, Heart, Phone, Mail, MapPin, ChevronRight, Image as ImageIcon, Video, Grid3X3, Map } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

interface PropertyPageProps {
  property: {
    id: number;
    title: string;
    developer: string;
    address_1: string;
    postcode: string;
    place: string;
    development_price_from?: number;
    development_price_to?: number;
    image_gallery: string[];
    developer_logo_new?: string;
    new_description?: string;
  };
}

const PropertyPage = ({ property }: PropertyPageProps) => {
  const formatPrice = (price?: number) => {
    if (!price) return '';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Extract first image from gallery
  const mainImage = Array.isArray(property.image_gallery) 
    ? property.image_gallery[0]
    : property.image_gallery?.replace('{', '').replace('}', '').split(',')[0];

  const imageCount = Array.isArray(property.image_gallery)
    ? property.image_gallery.length
    : property.image_gallery?.replace('{', '').replace('}', '').split(',').length || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/search-results" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to search results
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="relative rounded-lg overflow-hidden mb-4 aspect-[4/3]">
            <img 
              src={mainImage} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {/* Image Navigation Overlay */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <Button size="sm" variant="secondary" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                {imageCount} Photos
              </Button>
              <Button size="sm" variant="secondary" className="flex items-center gap-2">
                <Grid3X3 className="h-4 w-4" />
                1 Floor plan
              </Button>
              <Button size="sm" variant="secondary" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Map
              </Button>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {property.address_1}
              </div>
            </div>

            {property.development_price_from && (
              <div>
                <h2 className="text-3xl font-bold">
                  {formatPrice(property.development_price_from)}
                </h2>
                {property.development_price_to && (
                  <span className="text-gray-600">
                    to {formatPrice(property.development_price_to)}
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <div className="prose max-w-none">
              {property.new_description && (
                <div dangerouslySetInnerHTML={{ 
                  __html: property.new_description.replace(/\*\*/g, '').replace(/\n/g, '<br/>') 
                }} />
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Developer Info and Actions */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                {property.developer_logo_new && (
                  <img 
                    src={property.developer_logo_new} 
                    alt={property.developer}
                    className="h-12 w-12 object-contain"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{property.developer}</h3>
                  <Link href="#" className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
                    View agent properties
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call agent
                </Button>
                <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email agent
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;