import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Home } from "lucide-react";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";

export function PropertyCard({ property }: { property: Property }) {
    const {
      title,
      developer,
      place,
      development_price_from,
      development_price_to,
      image_gallery,
      units_summary
    } = property;
  
    const priceText = development_price_from && development_price_to 
      ? `£${development_price_from.toLocaleString()} - £${development_price_to.toLocaleString()}`
      : development_price_from 
        ? `From £${development_price_from.toLocaleString()}`
        : 'Price on Request';
  
    const primaryImage = image_gallery?.[0] ?? '/placeholder.png';
  
    return (
      <Card className="group transition-all duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
            <img 
              src={primaryImage} 
              alt={title || 'Property'} 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            {developer && (
              <div className="absolute left-3 top-3">
                <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                  {developer}
                </span>
              </div>
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