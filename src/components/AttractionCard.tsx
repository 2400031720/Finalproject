import { Attraction } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, MapPin, DollarSign, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AttractionCardProps {
  attraction: Attraction;
}

export function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <ImageWithFallback
        src={attraction.image}
        alt={attraction.name}
        className="w-full h-40 object-cover"
      />
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold">{attraction.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{attraction.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span>{attraction.location} • {attraction.distance}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">
          {attraction.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{attraction.category}</Badge>
          <div className="flex items-center gap-4 text-sm">
            {attraction.entryFee && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>${attraction.entryFee}</span>
              </div>
            )}
            {attraction.guideName && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{attraction.guideName}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}