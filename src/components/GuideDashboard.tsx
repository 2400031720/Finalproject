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
import { AttractionCard } from './AttractionCard';
import { MapPin, Users, Star, Plus, Calendar, MessageSquare, DollarSign } from 'lucide-react';
import { mockAttractions, mockTours } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function GuideDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isAddingTour, setIsAddingTour] = useState(false);
  const [isAddingAttraction, setIsAddingAttraction] = useState(false);

  // Mock data for guide-specific metrics
  const myTours = mockTours;
  const myAttractions = mockAttractions.filter(a => a.guideId === '4');
  const totalEarnings = 2450;
  const totalBookings = 23;
  const averageRating = 4.7;

  const handleAddTour = () => {
    console.log('Adding new tour');
    setIsAddingTour(false);
  };

  const handleAddAttraction = () => {
    console.log('Adding new attraction recommendation');
    setIsAddingAttraction(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Guide Dashboard</h1>
          <p className="text-muted-foreground">
            Share your local expertise and manage your tours
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddingTour} onOpenChange={setIsAddingTour}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Tour
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Tour</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tourTitle">Tour Title</Label>
                  <Input id="tourTitle" placeholder="Enter tour title" />
                </div>
                <div>
                  <Label htmlFor="tourLocation">Location</Label>
                  <Input id="tourLocation" placeholder="Enter location" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g., 3 hours" />
                  </div>
                  <div>
                    <Label htmlFor="tourPrice">Price</Label>
                    <Input id="tourPrice" type="number" placeholder="50" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="tourDescription">Description</Label>
                  <Textarea id="tourDescription" placeholder="Describe your tour" />
                </div>
                <Button onClick={handleAddTour}>Create Tour</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddingAttraction} onOpenChange={setIsAddingAttraction}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Attraction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Recommend New Attraction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="attractionName">Attraction Name</Label>
                  <Input id="attractionName" placeholder="Enter attraction name" />
                </div>
                <div>
                  <Label htmlFor="attractionLocation">Location</Label>
                  <Input id="attractionLocation" placeholder="Enter location" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="e.g., Nature, Culture, Recreation" />
                </div>
                <div>
                  <Label htmlFor="attractionDescription">Description</Label>
                  <Textarea id="attractionDescription" placeholder="Describe the attraction" />
                </div>
                <Button onClick={handleAddAttraction}>Add Recommendation</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalEarnings}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Tour Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              5 this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Tours</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{myTours.length}</div>
            <p className="text-xs text-muted-foreground">
              All active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{averageRating}</div>
            <p className="text-xs text-muted-foreground">
              From 47 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tours">My Tours</TabsTrigger>
          <TabsTrigger value="attractions">Attractions</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Tour Bookings</CardTitle>
                <CardDescription>Latest booking activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Mountain Photography Tour</p>
                      <p className="text-sm text-muted-foreground">
                        Sarah J. • Oct 15, 2024
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$75</p>
                      <Badge variant="default">Confirmed</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Local Culture Walking Tour</p>
                      <p className="text-sm text-muted-foreground">
                        Mike C. • Oct 18, 2024
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$45</p>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Your guide performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Tourists Guided</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Rate</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Repeat Customers</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attractions Added</span>
                    <span className="font-medium">{myAttractions.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tours" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden">
                <ImageWithFallback
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{tour.title}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{tour.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{tour.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{tour.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground">{tour.duration}</span>
                    <span className="font-semibold">${tour.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                    <Button size="sm" variant="outline" className="flex-1">Bookings</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attractions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Attraction Recommendations</CardTitle>
              <CardDescription>Attractions you've added to the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myAttractions.map((attraction) => (
                  <div key={attraction.id} className="relative">
                    <AttractionCard attraction={attraction} />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary">My Recommendation</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tour Bookings</CardTitle>
              <CardDescription>Manage your tour bookings and schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tourist</TableHead>
                    <TableHead>Tour</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>Mountain Photography Tour</TableCell>
                    <TableCell>Oct 15, 2024</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>$150</TableCell>
                    <TableCell>
                      <Badge variant="default">Confirmed</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Contact</Button>
                        <Button size="sm" variant="outline">Details</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mike Chen</TableCell>
                    <TableCell>Local Culture Walking Tour</TableCell>
                    <TableCell>Oct 18, 2024</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>$180</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Pending</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Accept</Button>
                        <Button size="sm" variant="outline">Decline</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}