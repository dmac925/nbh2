export interface UnitsSummary {
    available_count: number;
    min_price: number;
    bedrooms?: number;
  }
  
export interface Property {
    id: string;
    title: string;
    developer: string;
    developer_logo_new?: string;
    place: string;
    development_price_from: number;
    development_price_to: number;
    image_gallery: string[];
    units_summary?: UnitsSummary; 
  }