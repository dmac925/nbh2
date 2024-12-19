// app/api/properties/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

interface DbProperty {
  available_units_count: number;
  min_available_unit_price: number;
  [key: string]: any;  // For other properties
}

export async function POST(request: Request) {
    const { 
      developer_slug, minPrice, maxPrice, amenities, 
      sortBy = 'development_price_from', sortOrder = 'asc', 
      page = 1, limit = 16, onlyWithUnits = false,
      latitude, longitude, radiusMiles
    } = await request.json();
  
    const offset = (page - 1) * limit;
    
    // Convert miles to meters
    const radiusMeters = radiusMiles ? radiusMiles * 1609.34 : null;
  
    let data, error, count;
  
    if (latitude && longitude && radiusMeters) {
        // Radius-based query
        const rpcResponse = await supabase.rpc('get_properties_by_radius', {
          query_lat: latitude,
          query_lng: longitude,
          query_radius_meters: radiusMeters,
          query_developer_slug: developer_slug || null,
          query_min_price: minPrice || null,
          query_max_price: maxPrice || null,
          query_amenities: (amenities && amenities.length > 0) ? amenities : null,
          query_only_with_units: onlyWithUnits
        });
      
        let allData = rpcResponse.data || [];
        error = rpcResponse.error;
      
        // Apply pagination after retrieving all data
        count = allData.length;
        const start = offset;
        const end = offset + limit; 
        data = allData.slice(start, end);
      } else {
      // Non-radius-based query
      let query = supabase.from('properties_with_unit_info').select('*', { count: 'exact' });
  
      if (developer_slug) query = query.eq('developer_slug', developer_slug);
      if (minPrice) query = query.gte('development_price_from', minPrice);
      if (maxPrice) query = query.lte('development_price_to', maxPrice);
      if (amenities && amenities.length > 0) {
        query = query.contains('amenities', amenities);
      }
    
      if (onlyWithUnits) {
        query = query.gt('available_units_count', 0);
      }
  
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
      query = query.range(offset, offset + limit - 1);
  
      const { data: qData, error: qError, count: qCount } = await query;
      data = qData;
      error = qError;
      count = qCount;
    }
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    const propertiesWithUnits = data.map((prop: DbProperty) => ({
      ...prop,
      units_summary: prop.available_units_count > 0 ? {
        available_count: prop.available_units_count,
        min_price: prop.min_available_unit_price
      } : null
    }));
  
    return NextResponse.json({
        data: propertiesWithUnits || [],
        count: count || 0,
        page,
        pageSize: limit
    });
}