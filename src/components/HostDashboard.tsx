import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { HomestayCard } from './HomestayCard';
import { Home, Calendar, MessageSquare, Plus, DollarSign, Users } from 'lucide-react';
import { mockHomestays, mockBookings } from '../data/mockData';
import { Homestay } from '../types';

export function HostDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isAddingHomestay, setIsAddingHomestay] = useState(false);
  const [homestays, setHomestays] = useState(mockHomestays);

  // Filter bookings for this host
  const hostBookings = mockBookings.filter(booking => booking.hostId === '2');
  const totalRevenue = hostBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalHomestays = homestays.length;
  const occupancyRate = 75; // Mock data

  const handleAddHomestay = () => {
    // Mock adding a new homestay
    const newHomestay: Homestay = {
      id: (homestays.length + 1).toString(),
      title: 'New Homestay',
      description: 'A wonderful place to stay',
      location: 'New Location',
      price: 100,
      rating: 0,
      amenities: ['WiFi'],
      images: ['https://images.unsplash.com/photo-1675621926040-b514257d5941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaG9tZXN0YXklMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU4NzA3OTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      hostId: '2',
      hostName: 'Sarah Johnson',
      availability: true,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
    };
    setHomestays([...homestays, newHomestay]);
    setIsAddingHomestay(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Host Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your homestays and bookings
          </p>
        </div>
        <Dialog open={isAddingHomestay} onOpenChange={setIsAddingHomestay}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Homestay
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Homestay</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter homestay title" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div>
                <Label htmlFor="price">Price per night</Label>
                <Input id="price" type="number" placeholder="100" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your homestay" />
              </div>
              <Button onClick={handleAddHomestay}>Add Homestay</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{hostBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              2 new this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">My Homestays</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalHomestays}</div>
            <p className="text-xs text-muted-foreground">
              All active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="homestays">My Homestays</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest booking activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hostBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{booking.homestayTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.touristName} • {booking.checkIn} to {booking.checkOut}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${booking.totalPrice}</p>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your homestay performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Rating</span>
                    <span className="font-medium">4.7 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Rate</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Reviews</span>
                    <span className="font-medium">124</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Listing Views</span>
                    <span className="font-medium">2,341</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="homestays" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homestays.map((homestay) => (
              <HomestayCard
                key={homestay.id}
                homestay={homestay}
                userType="host"
                onEdit={(homestay) => console.log('Edit homestay:', homestay)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>Manage your homestay bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Homestay</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hostBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.touristName}</TableCell>
                      <TableCell>{booking.homestayTitle}</TableCell>
                      <TableCell>
                        {booking.checkIn} to {booking.checkOut}
                      </TableCell>
                      <TableCell>{booking.guests}</TableCell>
                      <TableCell>${booking.totalPrice}</TableCell>
                      <TableCell>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Message</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guest Messages</CardTitle>
              <CardDescription>Communicate with your guests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Michael Chen</h4>
                      <p className="text-sm text-muted-foreground">Cozy Mountain Cabin booking</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm">Hi! I'm arriving a bit late tonight, around 9 PM. Is that okay?</p>
                  <Button size="sm" className="mt-2">Reply</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">John Smith</h4>
                      <p className="text-sm text-muted-foreground">Beachfront Villa inquiry</p>
                    </div>
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                  </div>
                  <p className="text-sm">Great stay! Thank you for the recommendations.</p>
                  <Button size="sm" variant="outline" className="mt-2">Reply</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}