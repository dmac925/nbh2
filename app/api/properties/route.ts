import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  const { 
    place_slug, developer_slug, minPrice, maxPrice, amenities, sortBy, sortOrder, page, limit 
  } = await request.json();

  const pageSize = limit || 20; 
  const currentPage = page || 1;
  const offset = (currentPage - 1) * pageSize;

  let query = supabase.from('properties').select('*', { count: 'exact' });

  if (place_slug) query = query.eq('place_slug', place_slug);
  if (developer_slug) query = query.eq('developer_slug', developer_slug);
  if (minPrice) query = query.gte('development_price_from', minPrice);
  if (maxPrice) query = query.lte('development_price_to', maxPrice);
  if (amenities && amenities.length > 0) {
    query = query.contains('amenities', amenities);
  }
  
  if (sortBy) {
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
  }

  query = query.range(offset, offset + pageSize - 1);

  const { data, error, count } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, count, page: currentPage, pageSize });
}