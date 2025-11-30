import { Homestay } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Users, Bed, Bath, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomestayCardProps {
  homestay: Homestay;
  onBook?: (homestay: Homestay) => void;
  onEdit?: (homestay: Homestay) => void;
  showActions?: boolean;
  userType?: string;
}

export function HomestayCard({ homestay, onBook, onEdit, showActions = true, userType }: HomestayCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <ImageWithFallback
          src={homestay.images[0]}
          alt={homestay.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={homestay.availability ? "default" : "secondary"}>
            {homestay.availability ? "Available" : "Booked"}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold truncate">{homestay.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{homestay.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span>{homestay.location}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {homestay.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{homestay.maxGuests}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{homestay.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{homestay.bathrooms}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {homestay.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {homestay.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{homestay.amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">${homestay.price}</span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Host: {homestay.hostName}
          </div>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          {userType === 'tourist' && onBook && (
            <Button 
              onClick={() => onBook(homestay)} 
              className="flex-1"
              disabled={!homestay.availability}
            >
              {homestay.availability ? 'Book Now' : 'Unavailable'}
            </Button>
          )}
          {userType === 'host' && onEdit && (
            <Button onClick={() => onEdit(homestay)} variant="outline" className="flex-1">
              Edit Listing
            </Button>
          )}
          {userType === 'admin' && (
            <Button variant="outline" className="flex-1">
              Review
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}