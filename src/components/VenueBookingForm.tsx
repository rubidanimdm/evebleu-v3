import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Send, Users, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface VenueBookingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venueName: string;
}

const TIME_SLOTS = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
  '00:00', '00:30', '01:00', '01:30', '02:00',
];

export function VenueBookingForm({ open, onOpenChange, venueName }: VenueBookingFormProps) {
  const [date, setDate] = useState<Date>();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pax, setPax] = useState('');
  const [time, setTime] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const isValid = date && fullName.trim() && phone.trim() && email.trim() && pax && time && agreedToPolicy;

  const handleSubmit = () => {
    if (!isValid || !date) return;

    const formattedDate = format(date, 'dd/MM/yyyy');
    const message = [
      '--- New Booking Request ---',
      '',
      `Venue: ${venueName}`,
      `Date: ${formattedDate}`,
      `Time: ${time}`,
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Pax: ${pax}`,
    ].join('\n');

    const whatsappNumber = '971551523121';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const a = document.createElement('a');
    a.href = whatsappUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: 'Booking request sent!',
      description: `Your reservation request for ${venueName} has been submitted. We'll confirm shortly.`,
    });

    // Reset form
    setDate(undefined);
    setFullName('');
    setPhone('');
    setEmail('');
    setPax('');
    setTime('');
    setAgreedToPolicy(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center">
            Book {venueName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Venue (read-only) */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Venue</Label>
            <Input value={venueName} disabled className="bg-muted/50 font-medium" />
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Date *</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setCalendarOpen(false);
                  }}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Time *</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {TIME_SLOTS.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Full Name *</Label>
            <Input
              placeholder="John Doe"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Phone Number *</Label>
            <Input
              type="tel"
              placeholder="+971 50 123 4567"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Email *</Label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* Pax */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Number of Guests *</Label>
            <Select value={pax} onValueChange={setPax}>
              <SelectTrigger className="w-full">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 15 }, (_, i) => i + 1).map(n => (
                  <SelectItem key={n} value={String(n)}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full h-12 gap-2 text-sm font-semibold"
          >
            <Send className="w-4 h-4" />
            Send Booking Request
          </Button>

          <div className="rounded-xl border border-primary/15 bg-primary/5 p-3 space-y-2">
            <p className="text-[11px] font-semibold text-foreground text-center">⚠️ Important – Booking Policy</p>
            <ol className="text-[10px] text-muted-foreground space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Your request will be sent to our concierge team via WhatsApp.</li>
              <li>We will check availability with the venue for your requested date & time.</li>
              <li>Once the venue confirms availability, we will send you a secure payment link to complete your reservation deposit.</li>
              <li>Your booking is <span className="font-semibold text-foreground">only confirmed</span> after you receive a confirmation message from us on WhatsApp <span className="font-semibold text-foreground">and</span> complete the payment.</li>
            </ol>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <Checkbox
              checked={agreedToPolicy}
              onCheckedChange={(checked) => setAgreedToPolicy(checked === true)}
              className="mt-0.5"
            />
            <span className="text-[11px] text-muted-foreground leading-relaxed">
              I have read and agree to the <span className="font-semibold text-foreground">Booking Policy</span> above.
            </span>
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
