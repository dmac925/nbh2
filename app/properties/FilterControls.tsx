'use client';

import { usePropertyFilters } from '@/store/usePropertyFilters';
import { Search, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function FilterControls() {
  const {
    place_slug, setPlaceSlug,
    developer_slug, setDeveloperSlug,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    amenities, toggleAmenity,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
    applyFilters,
    onlyWithUnits, setOnlyWithUnits
  } = usePropertyFilters();

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
    applyFilters();
  };

  return (
    <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 p-4 border-b">
        {/* Search */}
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

        {/* Sort Buttons */}
        <Button
          variant={sortBy === 'development_price_from' ? 'default' : 'outline'}
          onClick={() => handleSortChange('development_price_from')}
          className="gap-2 whitespace-nowrap"
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

        {/* Filters Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
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

              <div className="grid grid-cols-2 gap-2">
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
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="available-units"
                    checked={onlyWithUnits}
                    onCheckedChange={(checked) => {
                      setOnlyWithUnits(checked as boolean);
                      applyFilters();
                    }}
                  />
                  <Label htmlFor="available-units">Show only properties with available units</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 gap-2">
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
                      <Label htmlFor={amenity}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default FilterControls;