import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Search, MapPin, DollarSign, Users, Star } from 'lucide-react';

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [guests, setGuests] = useState('');
  const [minRating, setMinRating] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);

  const amenityOptions = [
    'WiFi', 'Kitchen', 'Pool', 'Parking', 'Beach Access', 
    'Mountain View', 'Ocean View', 'Fireplace', 'BBQ', 'Gym Access'
  ];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities([...amenities, amenity]);
    } else {
      setAmenities(amenities.filter(a => a !== amenity));
    }
  };

  const handleSearch = () => {
    const filters = {
      location,
      priceRange,
      maxGuests: guests ? parseInt(guests) : null,
      minRating: minRating ? parseFloat(minRating) : null,
      amenities,
    };
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setLocation('');
    setPriceRange([0, 500]);
    setGuests('');
    setMinRating('');
    setAmenities([]);
    onFilterChange({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search & Filter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="Enter city, state, or region"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label>Price Range (per night)</Label>
          <div className="mt-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="guests">Max Guests</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="guests"
                type="number"
                placeholder="Any"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="rating">Min Rating</Label>
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4.5">4.5+ stars</SelectItem>
                <SelectItem value="4.0">4.0+ stars</SelectItem>
                <SelectItem value="3.5">3.5+ stars</SelectItem>
                <SelectItem value="3.0">3.0+ stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Amenities</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {amenityOptions.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label htmlFor={amenity} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex-1">
            Search
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}