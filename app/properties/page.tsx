// app/properties/page.tsx (Server Component)
import { supabase } from '@/lib/supabaseClient';
import { FilterControls } from './FilterControls';
import { PropertiesList } from './PropertiesList';

export default async function PropertiesPage() {
  // Initial fetch with aggregated data:
  const { data: initialProperties, error } = await supabase
    .from('properties_with_unit_info')
    .select('*')
    .order('development_price_from', { ascending: true })
    .limit(16);

  if (error) {
    console.error('Error fetching initial properties:', error.message);
  }

  return (
    <div>
      <h1>Properties</h1>
      {/* FilterControls is a Client Component for user input */}
      <FilterControls />
      {/* Pass initial data to a Client Component to handle updates */}
      <PropertiesList initialData={initialProperties ?? []} />
    </div>
  );
}