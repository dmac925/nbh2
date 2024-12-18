// app/properties/page.tsx (Server Component)
import { supabase } from '@/lib/supabaseClient';
import { FilterControls } from './FilterControls';
import { PropertiesList } from './PropertiesList';

export default async function PropertiesPage() {
  // Initial, no filter fetch:
  const { data: initialProperties } = await supabase
    .from('properties')
    .select('*')
    .order('development_price_from', { ascending: true })
    .limit(50);

  return (
    <div>
      <h1>Properties</h1>
      {/* FilterControls is a Client Component for user input */}
      <FilterControls />
      {/* Pass initial data to a Client Component to handle updates */}
      <PropertiesList initialData={initialProperties} />
    </div>
  );
}