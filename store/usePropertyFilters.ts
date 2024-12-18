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

  setPlaceSlug: (val: string | null) => void;
  setDeveloperSlug: (val: string | null) => void;
  setMinPrice: (val: number | null) => void;
  setMaxPrice: (val: number | null) => void;
  setAmenities: (vals: string[]) => void;
  toggleAmenity: (val: string) => void;
  setSortBy: (val: string) => void;
  setSortOrder: (val: 'asc' | 'desc') => void;
  applyFilters: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export const usePropertyFilters = create<PropertyFilters>((set) => ({
  place_slug: null,
  developer_slug: null,
  minPrice: null,
  maxPrice: null,
  amenities: [],
  sortBy: 'development_price_from',
  sortOrder: 'asc',
  appliedFiltersVersion: 0,
  page: 1,
  pageSize: 20,

  setPlaceSlug: (val) => set({ place_slug: val }),
  setDeveloperSlug: (val) => set({ developer_slug: val }),
  setMinPrice: (val) => set({ minPrice: val }),
  setMaxPrice: (val) => set({ maxPrice: val }),
  setAmenities: (vals) => set({ amenities: vals }),
  toggleAmenity: (val) => set((state) => {
    const current = new Set(state.amenities);
    if (current.has(val)) {
      current.delete(val);
    } else {
      current.add(val);
    }
    return { amenities: Array.from(current) };
  }),
  setSortBy: (val) => set({ sortBy: val }),
  setSortOrder: (val) => set({ sortOrder: val }),

  // Increment the version to signal filters have been "applied"
  applyFilters: () => set((state) => ({ appliedFiltersVersion: state.appliedFiltersVersion + 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size })
}));