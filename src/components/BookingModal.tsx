import { useState } from 'react';
import { Homestay } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Calendar, Users, DollarSign } from 'lucide-react';

interface BookingModalProps {
  homestay: Homestay | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (bookingData: any) => void;
}

export function BookingModal({ homestay, isOpen, onClose, onBook }: BookingModalProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !homestay) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights * homestay.price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homestay) return;

    const bookingData = {
      homestayId: homestay.id,
      homestayTitle: homestay.title,
      checkIn,
      checkOut,
      guests,
      totalPrice: calculateTotal(),
      message,
    };

    onBook(bookingData);
    onClose();
    
    // Reset form
    setCheckIn('');
    setCheckOut('');
    setGuests(1);
    setMessage('');
  };

  if (!homestay) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book {homestay.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkIn">Check-in</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="checkOut">Check-out</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="guests">Number of Guests</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="guests"
                type="number"
                min="1"
                max={homestay.maxGuests}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="message">Message to Host (Optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any special requests or questions..."
              rows={3}
            />
          </div>
          
          {checkIn && checkOut && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Total Cost:</span>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-lg font-semibold">${calculateTotal()}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights × ${homestay.price}/night
              </p>
            </div>
          )}
        </form>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}