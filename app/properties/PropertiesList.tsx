// app/properties/PropertiesList.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePropertyFilters } from '@/store/usePropertyFilters';
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';

export function PropertiesList({ initialData }: { initialData: Property[] }) {
  const [properties, setProperties] = useState<Property[]>(initialData);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    latitude,
    longitude,
    radiusMiles,
    developer_slug,
    minPrice,
    maxPrice,
    amenities,
    sortBy,
    sortOrder,
    appliedFiltersVersion,
    page,
    pageSize,
    onlyWithUnits,
    setPage
  } = usePropertyFilters();

  useEffect(() => {
    if (appliedFiltersVersion > 0) {
      fetchProperties();
    }
  }, [appliedFiltersVersion, page]);

  async function fetchProperties() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude,
          longitude,
          radiusMiles,
          developer_slug,
          minPrice,
          maxPrice,
          amenities,
          sortBy,
          sortOrder,
          page,
          limit: pageSize,
          onlyWithUnits 
        })
      });
  
      const { data, count } = await res.json();
      setProperties(data);
      setTotalCount(count);
    } finally {
      setIsLoading(false);
    }
  }
  
    const totalPages = totalCount ? Math.ceil(totalCount / pageSize) : 1;
  
    return (
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: pageSize }).map((_, idx) => (
              <Card key={idx} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 w-3/4 bg-muted rounded mb-2" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                </CardContent>
              </Card>
            ))
          ) : (
            properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))
          )}
        </div>
  
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              disabled={page <= 1 || isLoading}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={true}
            >
              Page {page} of {totalPages}
            </Button>
            <Button
              variant="outline"
              disabled={page >= totalPages || isLoading}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    );
  }