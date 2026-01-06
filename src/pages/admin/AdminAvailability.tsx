import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Calendar as CalendarIcon, X, Check, Ban, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CatalogItem {
  id: string;
  title: string;
  category: string;
}

interface Availability {
  id: string;
  catalog_item_id: string;
  date: string;
  is_available: boolean;
  capacity: number | null;
  notes: string | null;
}

export default function AdminAvailability() {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [bulkAction, setBulkAction] = useState<'available' | 'blocked' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCatalogItems();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      fetchAvailability();
    }
  }, [selectedItem, currentMonth]);

  async function fetchCatalogItems() {
    try {
      const { data } = await supabase
        .from('catalog_items')
        .select('id, title, category')
        .eq('is_active', true)
        .order('title');
      
      setCatalogItems(data || []);
      if (data && data.length > 0) {
        setSelectedItem(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching catalog items:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAvailability() {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    try {
      const { data } = await supabase
        .from('service_availability')
        .select('*')
        .eq('catalog_item_id', selectedItem)
        .gte('date', format(start, 'yyyy-MM-dd'))
        .lte('date', format(end, 'yyyy-MM-dd'));
      
      setAvailability(data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  }

  function getAvailabilityForDate(date: Date): Availability | undefined {
    return availability.find(a => a.date === format(date, 'yyyy-MM-dd'));
  }

  async function toggleDateAvailability(date: Date) {
    const dateStr = format(date, 'yyyy-MM-dd');
    const existing = getAvailabilityForDate(date);

    try {
      if (existing) {
        const { error } = await supabase
          .from('service_availability')
          .update({ is_available: !existing.is_available })
          .eq('id', existing.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('service_availability')
          .insert({
            catalog_item_id: selectedItem,
            date: dateStr,
            is_available: false,
          });
        
        if (error) throw error;
      }

      fetchAvailability();
    } catch (error) {
      console.error('Error updating availability:', error);
      toast({ title: 'Error updating availability', variant: 'destructive' });
    }
  }

  async function applyBulkAction() {
    if (!bulkAction || selectedDates.length === 0) return;

    const isAvailable = bulkAction === 'available';

    try {
      for (const date of selectedDates) {
        const dateStr = format(date, 'yyyy-MM-dd');
        const existing = getAvailabilityForDate(date);

        if (existing) {
          await supabase
            .from('service_availability')
            .update({ is_available: isAvailable })
            .eq('id', existing.id);
        } else {
          await supabase
            .from('service_availability')
            .insert({
              catalog_item_id: selectedItem,
              date: dateStr,
              is_available: isAvailable,
            });
        }
      }

      toast({ title: `${selectedDates.length} dates updated` });
      setSelectedDates([]);
      setBulkAction(null);
      fetchAvailability();
    } catch (error) {
      console.error('Error applying bulk action:', error);
      toast({ title: 'Error updating dates', variant: 'destructive' });
    }
  }

  async function blockDateRange(startDate: Date, endDate: Date) {
    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    try {
      for (const date of dates) {
        const dateStr = format(date, 'yyyy-MM-dd');
        const existing = getAvailabilityForDate(date);

        if (existing) {
          await supabase
            .from('service_availability')
            .update({ is_available: false })
            .eq('id', existing.id);
        } else {
          await supabase
            .from('service_availability')
            .insert({
              catalog_item_id: selectedItem,
              date: dateStr,
              is_available: false,
            });
        }
      }

      toast({ title: `Blocked ${dates.length} dates` });
      fetchAvailability();
    } catch (error) {
      console.error('Error blocking dates:', error);
      toast({ title: 'Error blocking dates', variant: 'destructive' });
    }
  }

  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayOfMonth = startOfMonth(currentMonth).getDay();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Availability Calendar</h1>
        <p className="text-muted-foreground">Manage service availability and block dates</p>
      </div>

      {/* Service Selector */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label className="mb-2 block">Select Service</Label>
              <Select value={selectedItem} onValueChange={setSelectedItem}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {catalogItems.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.title} ({item.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => blockDateRange(new Date(), addDays(new Date(), 6))}
            >
              Block Next 7 Days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => blockDateRange(new Date(), addDays(new Date(), 29))}
            >
              Block Next 30 Days
            </Button>
          </div>

          {selectedDates.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <span className="text-sm">{selectedDates.length} dates selected</span>
              <div className="flex-1" />
              <Button size="sm" variant="outline" onClick={() => { setBulkAction('available'); applyBulkAction(); }}>
                <Check className="h-4 w-4 mr-1" />
                Mark Available
              </Button>
              <Button size="sm" variant="outline" onClick={() => { setBulkAction('blocked'); applyBulkAction(); }}>
                <Ban className="h-4 w-4 mr-1" />
                Block
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelectedDates([])}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!selectedItem ? (
            <div className="text-center py-12 text-muted-foreground">
              Select a service to manage availability
            </div>
          ) : (
            <>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for offset */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-16" />
                ))}

                {/* Day cells */}
                {monthDays.map(day => {
                  const avail = getAvailabilityForDate(day);
                  const isBlocked = avail && !avail.is_available;
                  const isSelected = selectedDates.some(d => format(d, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
                  const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));

                  return (
                    <button
                      key={format(day, 'yyyy-MM-dd')}
                      className={cn(
                        'h-16 rounded-lg border text-left p-2 transition-colors',
                        isPast && 'opacity-50 cursor-not-allowed',
                        isBlocked && !isPast && 'bg-destructive/10 border-destructive/50',
                        !isBlocked && !isPast && 'bg-green-500/10 border-green-500/50 hover:bg-green-500/20',
                        isSelected && 'ring-2 ring-primary'
                      )}
                      onClick={() => {
                        if (isPast) return;
                        if (selectedDates.length > 0) {
                          setSelectedDates(prev => 
                            isSelected 
                              ? prev.filter(d => format(d, 'yyyy-MM-dd') !== format(day, 'yyyy-MM-dd'))
                              : [...prev, day]
                          );
                        } else {
                          toggleDateAvailability(day);
                        }
                      }}
                      disabled={isPast}
                    >
                      <div className="flex flex-col h-full">
                        <span className="text-sm font-medium">{format(day, 'd')}</span>
                        {isBlocked && !isPast && (
                          <Badge variant="destructive" className="text-[10px] mt-auto w-fit">
                            Blocked
                          </Badge>
                        )}
                        {avail?.capacity && (
                          <span className="text-[10px] text-muted-foreground">
                            Cap: {avail.capacity}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/50" />
                  <span className="text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-destructive/20 border border-destructive/50" />
                  <span className="text-muted-foreground">Blocked</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
