import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { MapPin, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationData {
  address: string;
  longitude: number;
  latitude: number;
  radius?: string;
}

interface LocationInputProps {
  value: string;
  onChange: (value: LocationData) => void;
  placeholder?: string;
}

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number];
}

const METERS_PER_MILE = 1609.34;

const RADIUS_OPTIONS = [
  { value: "0.25", label: "This area only" },
  { value: "0.5", label: "+ 0.5 miles" },
  { value: "1", label: "+ 1 mile" },
  { value: "3", label: "+ 3 miles" },
  { value: "5", label: "+ 5 miles" },
  { value: "10", label: "+ 10 miles" },
  { value: "15", label: "+ 15 miles" },
];

function LocationInput({ value, onChange, placeholder }: LocationInputProps) {
    const [address, setAddress] = useState('');
    const [radiusMiles, setRadiusMiles] = useState('0.25');
    const [coordinates, setCoordinates] = useState<{ longitude: number; latitude: number } | null>(null);
    const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setAddress(newValue);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      searchLocation(newValue);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: MapboxFeature) => {
    const [longitude, latitude] = suggestion.center;
    setCoordinates({ longitude, latitude });

    const locationData: LocationData = {
      address: suggestion.place_name,
      longitude,
      latitude,
      radius: Math.round(Number(radiusMiles) * METERS_PER_MILE).toString()
    };

    setAddress(suggestion.place_name);
    onChange(locationData);
    setShowSuggestions(false);
  };

  const searchLocation = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}&` +
        'country=gb&' +
        'types=address,place,postcode'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location suggestions');
      }

      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setError('Error fetching location suggestions');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const locationData = JSON.parse(value);
      setAddress(locationData.address || '');
      if (locationData.radius) {
        const miles = (Number(locationData.radius) / METERS_PER_MILE).toString();
        setRadiusMiles(miles);
      } else {
        setRadiusMiles('1'); // Default to 0.25 miles
      }
      if (locationData.longitude && locationData.latitude) {
        setCoordinates({ longitude: locationData.longitude, latitude: locationData.latitude });
      } else {
        setCoordinates(null);
      }
    } catch {
      setAddress(value || '');
      setRadiusMiles('0.25');
      setCoordinates(null);
    }
  }, [value]);

  const handleRadiusChange = (newRadius: string) => {
    setRadiusMiles(newRadius);
    if (coordinates && address) {
      onChange({
        address,
        longitude: coordinates.longitude,
        latitude: coordinates.latitude,
        radius: Math.round(Number(newRadius) * METERS_PER_MILE).toString()
      });
    }
  };

  const handleClear = () => {
    setAddress('');
    setRadiusMiles('0.25');
    setCoordinates(null);
    onChange({ address: '', longitude: 0, latitude: 0, radius: '' });
    setSuggestions([]);
    setError(null);
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          value={address}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder || "Search for a UK address..."}
          className="w-full pr-10"
        />
        {address && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        )}

        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
            {isLoading && <div className="px-4 py-2 text-gray-500">Loading...</div>}
            {error && <div className="px-4 py-2 text-red-500">{error}</div>}
            {!isLoading && !error && suggestions.length === 0 && address && (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
            {!isLoading && !error && suggestions.length > 0 && 
              suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <span>{suggestion.place_name}</span>
                </button>
              ))
            }
          </div>
        )}
      </div>

      {/* Radius Select dropdown with fixed width */}
      <Select value={radiusMiles} onValueChange={handleRadiusChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select radius" />
        </SelectTrigger>
        <SelectContent>
          {RADIUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export {
  LocationInput
};