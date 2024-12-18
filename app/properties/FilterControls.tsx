'use client';

import { usePropertyFilters } from '@/store/usePropertyFilters';

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

  return (
    <form className="filters" onSubmit={(e) => { e.preventDefault(); applyFilters(); }}>
      <input 
        type="text"
        value={place_slug || ''}
        placeholder="Place" 
        onChange={(e) => setPlaceSlug(e.target.value || null)} 
      />

      <input 
        type="text"
        value={developer_slug || ''}
        placeholder="Developer"
        onChange={(e) => setDeveloperSlug(e.target.value || null)} 
      />

      <input 
        type="number"
        value={minPrice || ''}
        placeholder="Min Price"
        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
      />

      <input 
        type="number"
        value={maxPrice || ''}
        placeholder="Max Price"
        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
      />

      {['Gym', 'Pool', 'Concierge'].map(amenity => (
        <label key={amenity}>
          <input 
            type="checkbox" 
            checked={amenities.includes(amenity)}
            onChange={() => toggleAmenity(amenity)} 
          />
          {amenity}
        </label>
      ))}

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="development_price_from">Price</option>
        <option value="title">Title</option>
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button type="submit">Apply Filters</button>
    </form>
  );
}