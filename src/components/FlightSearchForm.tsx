import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Send, Users, Plane, PlaneLanding, PlaneTakeoff } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/lib/openExternalUrl';
import { useLanguage } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';

interface FlightSearchFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CABIN_CLASSES = ['economy', 'premiumEconomy', 'business', 'first'] as const;

export function FlightSearchForm({ open, onOpenChange }: FlightSearchFormProps) {
  const { t } = useLanguage();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState('');
  const [cabinClass, setCabinClass] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [departCalendarOpen, setDepartCalendarOpen] = useState(false);
  const [returnCalendarOpen, setReturnCalendarOpen] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [flexibleDates, setFlexibleDates] = useState(false);

  const isValid =
    origin.trim() &&
    destination.trim() &&
    departDate &&
    (tripType === 'oneway' || returnDate) &&
    passengers &&
    cabinClass &&
    fullName.trim() &&
    phone.trim() &&
    email.trim() &&
    agreedToPolicy;

  const handleSubmit = async () => {
    if (!isValid || !departDate) return;

    // Save to database
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('bookings_public').insert({
        booking_type: 'flight',
        guest_name: fullName,
        guest_phone: phone,
        guest_email: email || null,
        user_id: user?.id || null,
        booking_date: format(departDate, 'yyyy-MM-dd'),
        party_size: parseInt(passengers) || 1,
        details: {
          origin,
          destination,
          depart_date: format(departDate, 'yyyy-MM-dd'),
          return_date: returnDate ? format(returnDate, 'yyyy-MM-dd') : null,
          passengers: parseInt(passengers),
          cabin_class: cabinClass,
          trip_type: tripType,
          flexible_dates: flexibleDates,
        },
      } as any);
    } catch (err) {
      console.error('Failed to save flight request:', err);
    }

    const formattedDepart = format(departDate, 'dd/MM/yyyy');
    const formattedReturn = returnDate ? format(returnDate, 'dd/MM/yyyy') : 'N/A';

    const message = [
      '--- ✈️ New Flight Request ---',
      '',
      `Trip Type: ${tripType === 'roundtrip' ? 'Round Trip' : 'One Way'}`,
      `From: ${origin}`,
      `To: ${destination}`,
      `Departure: ${formattedDepart}`,
      tripType === 'roundtrip' ? `Return: ${formattedReturn}` : null,
      `Passengers: ${passengers}`,
      `Class: ${t(`flights.${cabinClass}`)}`,
      flexibleDates ? 'Flexible Dates: ±3 days' : null,
      '',
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappNumber = '971551523121';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    openExternalUrl(whatsappUrl);

    toast({
      title: t('flights.requestSent'),
      description: t('flights.requestSentDesc'),
    });

    // Reset
    setOrigin('');
    setDestination('');
    setDepartDate(undefined);
    setReturnDate(undefined);
    setPassengers('');
    setCabinClass('');
    setFullName('');
    setPhone('');
    setEmail('');
    setAgreedToPolicy(false);
    setFlexibleDates(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center flex items-center justify-center gap-2">
            <Plane className="w-5 h-5 text-primary" />
            {t('flights.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Trip Type */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={tripType === 'roundtrip' ? 'default' : 'outline'}
              className="flex-1 h-9 text-xs"
              onClick={() => setTripType('roundtrip')}
            >
              {t('flights.roundTrip')}
            </Button>
            <Button
              type="button"
              variant={tripType === 'oneway' ? 'default' : 'outline'}
              className="flex-1 h-9 text-xs"
              onClick={() => setTripType('oneway')}
            >
              {t('flights.oneWay')}
            </Button>
          </div>

          {/* Origin */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{t('flights.from')} *</Label>
            <div className="relative">
              <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('flights.fromPlaceholder')}
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{t('flights.to')} *</Label>
            <div className="relative">
              <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('flights.toPlaceholder')}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{t('flights.departDate')} *</Label>
            <Popover open={departCalendarOpen} onOpenChange={setDepartCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !departDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departDate ? format(departDate, 'PPP') : t('booking.selectDate')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={departDate}
                  onSelect={(d) => {
                    setDepartDate(d);
                    setDepartCalendarOpen(false);
                  }}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          {tripType === 'roundtrip' && (
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{t('flights.returnDate')} *</Label>
              <Popover open={returnCalendarOpen} onOpenChange={setReturnCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !returnDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, 'PPP') : t('booking.selectDate')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={(d) => {
                      setReturnDate(d);
                      setReturnCalendarOpen(false);
                    }}
                    disabled={(d) =>
                      d < (departDate || new Date(new Date().setHours(0, 0, 0, 0)))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Flexible Dates */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none py-1">
            <Checkbox
              checked={flexibleDates}
              onCheckedChange={(checked) => setFlexibleDates(checked === true)}
            />
            <span className="text-xs text-muted-foreground">
              {t('flights.flexibleDates')}
            </span>
          </label>

          {/* Passengers & Class row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{t('flights.passengers')} *</Label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger className="w-full">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="#" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{t('flights.class')} *</Label>
              <Select value={cabinClass} onValueChange={setCabinClass}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('flights.selectClass')} />
                </SelectTrigger>
                <SelectContent>
                  {CABIN_CLASSES.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {t(`flights.${cls}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-primary/15" />

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{t('booking.fullName')} *</Label>
            <Input
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{t('booking.phone')} *</Label>
            <Input
              type="tel"
              placeholder="+971 50 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{t('booking.email')} *</Label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full h-12 gap-2 text-sm font-semibold"
          >
            <Send className="w-4 h-4" />
            {t('flights.sendRequest')}
          </Button>

          {/* Policy */}
          <div className="rounded-xl border border-primary/15 bg-primary/5 p-3 space-y-2">
            <p className="text-[11px] font-semibold text-foreground text-center">
              {t('flights.policyTitle')}
            </p>
            <ol className="text-[10px] text-muted-foreground space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>{t('flights.policyStep1')}</li>
              <li>{t('flights.policyStep2')}</li>
              <li>{t('flights.policyStep3')}</li>
              <li>{t('flights.policyStep4')}</li>
            </ol>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <Checkbox
              checked={agreedToPolicy}
              onCheckedChange={(checked) => setAgreedToPolicy(checked === true)}
              className="mt-0.5"
            />
            <span className="text-[11px] text-muted-foreground leading-relaxed">
              {t('flights.agreePolicy')} <span className="font-semibold text-foreground">{t('flights.flightPolicy')}</span> {t('booking.agreeSuffix')}
            </span>
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
