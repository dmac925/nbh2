// app/properties/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { FilterControls } from './FilterControls';
import { PropertiesList } from './PropertiesList';

export default async function PropertiesPage() {
  const { data: initialProperties, error } = await supabase
    .from('properties_with_unit_info')
    .select('*')
    .order('development_price_from', { ascending: true })
    .limit(16);

  if (error) {
    console.error('Error fetching initial properties:', error.message);
  }

  return (
    <div className="relative pt-16"> {/* Add padding-top to account for fixed header */}
      <div className="sticky top-16 z-40"> {/* Position sticky below header */}
        <FilterControls />
      </div>
      <div className="container mx-auto px-4">
        <PropertiesList initialData={initialProperties ?? []} />
      </div>
    </div>
  );
}