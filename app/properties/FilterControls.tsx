'use client';

import { usePropertyFilters } from '@/store/usePropertyFilters';
import { Search, ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function FilterControls() {
  const {
    place_slug, setPlaceSlug,
    developer_slug, setDeveloperSlug,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    amenities, toggleAmenity,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
    applyFilters
  } = usePropertyFilters();

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      // If clicking the same sort field, toggle direction
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, set it with default ascending
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
    applyFilters();
  };

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="space-y-4 p-4 border-b">
        {/* Search and Sort Row */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by location..."
              value={place_slug || ''}
              onChange={(e) => {
                setPlaceSlug(e.target.value || null);
                applyFilters();
              }}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={sortBy === 'development_price_from' ? 'default' : 'outline'}
              onClick={() => handleSortChange('development_price_from')}
              className="gap-2"
            >
              Price
              {sortBy === 'development_price_from' && (
                <ArrowUpDown className={`h-4 w-4 transition-transform ${
                  sortOrder === 'desc' ? 'rotate-180' : ''
                }`} />
              )}
            </Button>

            <Button
              variant={sortBy === 'title' ? 'default' : 'outline'}
              onClick={() => handleSortChange('title')}
              className="gap-2"
            >
              Title
              {sortBy === 'title' && (
                <ArrowUpDown className={`h-4 w-4 transition-transform ${
                  sortOrder === 'desc' ? 'rotate-180' : ''
                }`} />
              )}
            </Button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Developer</Label>
            <Input
              placeholder="e.g. Barratt Homes"
              value={developer_slug || ''}
              onChange={(e) => {
                setDeveloperSlug(e.target.value || null);
                applyFilters();
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Price</Label>
              <Input
                type="number"
                placeholder="£"
                value={minPrice || ''}
                onChange={(e) => {
                  setMinPrice(e.target.value ? Number(e.target.value) : null);
                  applyFilters();
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Price</Label>
              <Input
                type="number"
                placeholder="£"
                value={maxPrice || ''}
                onChange={(e) => {
                  setMaxPrice(e.target.value ? Number(e.target.value) : null);
                  applyFilters();
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="flex flex-wrap gap-4">
              {['Gym', 'Pool', 'Concierge'].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={amenities.includes(amenity)}
                    onCheckedChange={() => {
                      toggleAmenity(amenity);
                      applyFilters();
                    }}
                  />
                  <label 
                    htmlFor={amenity} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}