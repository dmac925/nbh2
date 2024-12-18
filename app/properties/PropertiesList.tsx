'use client';

import { useState, useEffect } from 'react';
import { usePropertyFilters } from '@/store/usePropertyFilters';

interface Property {
  id: number;
  title: string;
  development_price_from: number;
  // ... other fields
}

export function PropertiesList({ initialData }: { initialData: Property[] }) {
  const [properties, setProperties] = useState<Property[]>(initialData);
  const [totalCount, setTotalCount] = useState<number | null>(null); // track total number of results

  const {
    place_slug,
    developer_slug,
    minPrice,
    maxPrice,
    amenities,
    sortBy,
    sortOrder,
    appliedFiltersVersion,
    page,
    pageSize,
    setPage
  } = usePropertyFilters();

  useEffect(() => {
    if (appliedFiltersVersion > 0) {
      fetchProperties();
    }
  }, [appliedFiltersVersion, page]); // run fetch when filters are applied or page changes

  async function fetchProperties() {
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        place_slug,
        developer_slug,
        minPrice,
        maxPrice,
        amenities,
        sortBy,
        sortOrder,
        page,
        limit: pageSize
      })
    });
    const { data, count } = await res.json();
    setProperties(data);
    setTotalCount(count);
  }

  // If you want initialData to be paginated too, you should fetch it server-side 
  // with the same pagination logic or simply re-fetch on mount.
  // For now, assume initialData is just a first-page or blank state.

  const totalPages = totalCount && Math.ceil(totalCount / pageSize);

  return (
    <div>
      <div className="property-list">
        {properties.map((prop) => (
          <div key={prop.id} className="property-card">
            <h2>{prop.title}</h2>
            <p>From: £{prop.development_price_from}</p>
          </div>
        ))}
      </div>

      {totalPages && totalPages > 1 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}