import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { HomestayCard } from './HomestayCard';
import { AttractionCard } from './AttractionCard';
import { SearchFilters } from './SearchFilters';
import { BookingModal } from './BookingModal';
import { Calendar, MapPin, Heart, Star } from 'lucide-react';
import { mockHomestays, mockAttractions, mockBookings } from '../data/mockData';
import { Homestay, Attraction } from '../types';

export function TouristDashboard() {
  const [selectedTab, setSelectedTab] = useState('discover');
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [filteredHomestays, setFilteredHomestays] = useState(mockHomestays);
  const [favoriteAttractions, setFavoriteAttractions] = useState<string[]>([]);

  // Filter bookings for this tourist
  const myBookings = mockBookings.filter(booking => booking.touristId === '3');
  const upcomingBookings = myBookings.filter(booking => 
    booking.status === 'confirmed' && new Date(booking.checkIn) > new Date()
  );

  const handleBook = (homestay: Homestay) => {
    setSelectedHomestay(homestay);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (bookingData: any) => {
    console.log('New booking:', bookingData);
    // Here you would typically send to backend
  };

  const handleFilterChange = (filters: any) => {
    let filtered = mockHomestays;
    
    if (filters.location) {
      filtered = filtered.filter(h => 
        h.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(h => 
        h.price >= filters.priceRange[0] && h.price <= filters.priceRange[1]
      );
    }
    
    if (filters.maxGuests) {
      filtered = filtered.filter(h => h.maxGuests >= filters.maxGuests);
    }
    
    if (filters.minRating) {
      filtered = filtered.filter(h => h.rating >= filters.minRating);
    }
    
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(h => 
        filters.amenities.some((amenity: string) => h.amenities.includes(amenity))
      );
    }
    
    setFilteredHomestays(filtered);
  };

  const toggleFavoriteAttraction = (attractionId: string) => {
    setFavoriteAttractions(prev => 
      prev.includes(attractionId) 
        ? prev.filter(id => id !== attractionId)
        : [...prev, attractionId]
    );
  };

  const getRecommendedAttractions = (location?: string) => {
    if (!location) return mockAttractions.slice(0, 3);
    return mockAttractions.filter(a => 
      a.location.toLowerCase().includes(location.toLowerCase())
    ).slice(0, 3);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Discover Amazing Places</h1>
        <p className="text-muted-foreground">
          Find the perfect homestay and explore local attractions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Upcoming Trips</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{upcomingBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Next trip in 12 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Bookings</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{myBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Since joining
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Saved Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{favoriteAttractions.length}</div>
            <p className="text-xs text-muted-foreground">
              Attractions saved
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">4.8</div>
            <p className="text-xs text-muted-foreground">
              Your stays rating
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="attractions">Attractions</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <SearchFilters onFilterChange={handleFilterChange} />
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHomestays.map((homestay) => (
                  <HomestayCard
                    key={homestay.id}
                    homestay={homestay}
                    userType="tourist"
                    onBook={handleBook}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attractions" className="space-y-6">
          <div>
            <h2>Recommended Attractions</h2>
            <p className="text-muted-foreground mb-4">
              Discover amazing places based on your interests
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAttractions.map((attraction) => (
                <div key={attraction.id} className="relative">
                  <AttractionCard attraction={attraction} />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => toggleFavoriteAttraction(attraction.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favoriteAttractions.includes(attraction.id) 
                          ? 'fill-red-500 text-red-500' 
                          : ''
                      }`} 
                    />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>View and manage your homestay bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{booking.homestayTitle}</h4>
                        <p className="text-sm text-muted-foreground">
                          {booking.checkIn} to {booking.checkOut} • {booking.guests} guests
                        </p>
                      </div>
                      <Badge variant={
                        booking.status === 'confirmed' ? 'default' :
                        booking.status === 'pending' ? 'secondary' :
                        'destructive'
                      }>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">${booking.totalPrice}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Contact Host</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Attractions</CardTitle>
              <CardDescription>Your favorite places to visit</CardDescription>
            </CardHeader>
            <CardContent>
              {favoriteAttractions.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No favorites yet. Start exploring attractions to save your favorites!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockAttractions
                    .filter(attraction => favoriteAttractions.includes(attraction.id))
                    .map((attraction) => (
                      <AttractionCard key={attraction.id} attraction={attraction} />
                    ))
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <BookingModal
        homestay={selectedHomestay}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBook={handleBookingSubmit}
      />
    </div>
  );
}