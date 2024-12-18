// app/api/properties/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  const { 
    place_slug, developer_slug, minPrice, maxPrice, amenities, 
    sortBy = 'development_price_from', sortOrder = 'asc', 
    page = 1, limit = 20, onlyWithUnits = false
  } = await request.json();

  const offset = (page - 1) * limit;

  let query = supabase.from('properties_with_unit_info').select('*', { count: 'exact' });

  // Filters
  if (place_slug) query = query.eq('place_slug', place_slug);
  if (developer_slug) query = query.eq('developer_slug', developer_slug);
  if (minPrice) query = query.gte('development_price_from', minPrice);
  if (maxPrice) query = query.lte('development_price_to', maxPrice);
  if (amenities && amenities.length > 0) {
    query = query.contains('amenities', amenities);
  }

  // Only show properties that have available units if requested
  if (onlyWithUnits) {
    query = query.gt('available_units_count', 0);
  }

  // Sorting
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // The data already has aggregated info:
  //   available_units_count
  //   min_available_unit_price
  // No need for extra queries.

  // Format the response as needed (for example, create a `units_summary` field)
  const propertiesWithUnits = data.map(prop => ({
    ...prop,
    units_summary: prop.available_units_count > 0 ? {
      available_count: prop.available_units_count,
      min_price: prop.min_available_unit_price
    } : null
  }));

  return NextResponse.json({
    data: propertiesWithUnits,
    count,
    page,
    pageSize: limit
  });
}