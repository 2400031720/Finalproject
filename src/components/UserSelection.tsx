import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Shield, Home, MapPin, Compass } from 'lucide-react';

export function UserSelection({ onUserSelect }) {
  const userTypes = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@platform.com',
      userType: 'admin',
      icon: Shield,
      title: 'Platform Administrator',
      description: 'Manage platform content, approve listings, track analytics, and moderate user interactions.',
      features: ['Content Management', 'User Analytics', 'Listing Approval', 'Platform Moderation']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@host.com',
      userType: 'host',
      icon: Home,
      title: 'Homestay Host',
      description: 'List your properties, manage bookings, communicate with guests, and track earnings.',
      features: ['Property Listings', 'Booking Management', 'Guest Communication', 'Revenue Tracking']
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@tourist.com',
      userType: 'tourist',
      icon: MapPin,
      title: 'Tourist',
      description: 'Search homestays, make bookings, discover attractions, and get personalized recommendations.',
      features: ['Homestay Search', 'Booking System', 'Attraction Discovery', 'Personal Recommendations']
    },
    {
      id: '4',
      name: 'Elena Rodriguez',
      email: 'elena@guide.com',
      userType: 'guide',
      icon: Compass,
      title: 'Local Guide',
      description: 'Share local insights, create tours, recommend attractions, and connect with tourists.',
      features: ['Tour Creation', 'Local Insights', 'Attraction Recommendations', 'Tourist Interaction']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-4">Welcome to HomestayConnect</h1>
          <p className="text-xl text-muted-foreground">
            Your gateway to authentic travel experiences and local connections
          </p>
          <p className="text-muted-foreground mt-2">
            Choose your role to access your personalized dashboard
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userTypes.map((userType) => {
            const IconComponent = userType.icon;
            return (
              <Card key={userType.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{userType.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {userType.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Key Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {userType.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-1">Demo User:</p>
                    <p className="font-medium">{userType.name}</p>
                    <p className="text-sm text-muted-foreground">{userType.email}</p>
                  </div>
                  
                  <Button 
                    onClick={() => onUserSelect(userType)}
                    className="w-full"
                    variant={userType.userType === 'tourist' ? 'default' : 'outline'}
                  >
                    Access {userType.title} Dashboard
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>About HomestayConnect</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-3">
              <p>
                HomestayConnect bridges the gap between travelers seeking authentic experiences 
                and locals eager to share their culture and knowledge.
              </p>
              <p>
                Our platform connects tourists with carefully curated homestays while providing 
                insider access to local attractions and guided experiences from knowledgeable locals.
              </p>
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={() => onUserSelect(userTypes[2])} 
                  size="lg"
                >
                  Start Your Journey as a Tourist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}