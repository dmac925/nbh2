import { create } from 'zustand';

interface PropertyFilters {
  place_slug: string | null;
  developer_slug: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  amenities: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
  

  // A version or a boolean to indicate when user applies filters
  appliedFiltersVersion: number; 

  onlyWithUnits: boolean;

  latitude: number | null;
  longitude: number | null;
  radiusMiles: number | null;
  

  setPlaceSlug: (val: string | null) => void;
  setDeveloperSlug: (val: string | null) => void;
  setMinPrice: (val: number | null) => void;
  setMaxPrice: (val: number | null) => void;
  setAmenities: (vals: string[]) => void;
  setOnlyWithUnits: (value: boolean) => void;
  toggleAmenity: (val: string) => void;
  setSortBy: (val: string) => void;
  setSortOrder: (val: 'asc' | 'desc') => void;
  applyFilters: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setLatitude: (val: number | null) => void;
  setLongitude: (val: number | null) => void;
  setRadiusMiles: (val: number | null) => void;
}

export const usePropertyFilters = create<PropertyFilters>((set) => ({
  place_slug: null,
  developer_slug: null,
  minPrice: null,
  maxPrice: null,
  amenities: [],
  onlyWithUnits: false,
  sortBy: 'development_price_from',
  sortOrder: 'asc',
  appliedFiltersVersion: 0,
  page: 1,
  pageSize: 16,
  latitude: null,
  longitude: null,
  radiusMiles: null,

  setPlaceSlug: (val) => set({ place_slug: val }),
  setDeveloperSlug: (val) => set({ developer_slug: val }),
  setMinPrice: (val) => set({ minPrice: val }),
  setMaxPrice: (val) => set({ maxPrice: val }),
  setAmenities: (vals) => set({ amenities: vals }),
  setLatitude: (val) => set({ latitude: val }),
  setLongitude: (val) => set({ longitude: val }),
  setRadiusMiles: (val) => set({ radiusMiles: val }),
  toggleAmenity: (val) => set((state) => {
    const current = new Set(state.amenities);
    if (current.has(val)) {
      current.delete(val);
    } else {
      current.add(val);
    }
    return { amenities: Array.from(current) };
  }),
  setOnlyWithUnits: (value) => set({ onlyWithUnits: value }),
  setSortBy: (val) => set({ sortBy: val }),
  setSortOrder: (val) => set({ sortOrder: val }),
  applyFilters: () => set((state) => ({ appliedFiltersVersion: state.appliedFiltersVersion + 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size })
}));