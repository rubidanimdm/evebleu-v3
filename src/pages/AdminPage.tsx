import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Users, DollarSign, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Supplier {
  id: string;
  name: string;
  category: string;
  description: string | null;
  location: string | null;
  min_spend: number | null;
  price_range: string | null;
  commission_percent: number | null;
  availability_notes: string | null;
  image_url: string | null;
  phone: string | null;
  whatsapp_link: string | null;
  is_active: boolean;
  tags: string[] | null;
}

interface Booking {
  id: string;
  booking_number: string;
  booking_date: string;
  booking_time: string | null;
  party_size: number;
  status: string;
  total_amount: number | null;
  commission_amount: number | null;
  admin_notes: string | null;
  created_at: string;
  user: { full_name: string; email: string } | null;
  supplier: { name: string } | null;
}

const categories = ['restaurant', 'nightlife', 'transport', 'yacht', 'event'];

export default function AdminPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: 'restaurant',
    description: '',
    location: '',
    min_spend: '',
    price_range: '',
    commission_percent: '10',
    availability_notes: '',
    image_url: '',
    phone: '',
    whatsapp_link: '',
    is_active: true,
    tags: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [suppliersRes, bookingsRes] = await Promise.all([
      supabase.from('suppliers').select('*').order('name'),
      supabase.from('bookings').select(`
        *,
        user:profiles(full_name, email),
        supplier:suppliers(name)
      `).order('created_at', { ascending: false }).limit(50),
    ]);

    setSuppliers(suppliersRes.data || []);
    setBookings((bookingsRes.data as unknown as Booking[]) || []);
    setLoading(false);
  }

  function resetForm() {
    setFormData({
      name: '', category: 'restaurant', description: '', location: '',
      min_spend: '', price_range: '', commission_percent: '10',
      availability_notes: '', image_url: '', phone: '', whatsapp_link: '',
      is_active: true, tags: '',
    });
    setEditingSupplier(null);
  }

  function openEdit(supplier: Supplier) {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      category: supplier.category,
      description: supplier.description || '',
      location: supplier.location || '',
      min_spend: supplier.min_spend?.toString() || '',
      price_range: supplier.price_range || '',
      commission_percent: supplier.commission_percent?.toString() || '10',
      availability_notes: supplier.availability_notes || '',
      image_url: supplier.image_url || '',
      phone: supplier.phone || '',
      whatsapp_link: supplier.whatsapp_link || '',
      is_active: supplier.is_active,
      tags: supplier.tags?.join(', ') || '',
    });
    setIsDialogOpen(true);
  }

  async function handleSaveSupplier() {
    const payload = {
      name: formData.name,
      category: formData.category,
      description: formData.description || null,
      location: formData.location || null,
      min_spend: formData.min_spend ? parseFloat(formData.min_spend) : null,
      price_range: formData.price_range || null,
      commission_percent: parseFloat(formData.commission_percent) || 10,
      availability_notes: formData.availability_notes || null,
      image_url: formData.image_url || null,
      phone: formData.phone || null,
      whatsapp_link: formData.whatsapp_link || null,
      is_active: formData.is_active,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : null,
    };

    if (editingSupplier) {
      const { error } = await supabase
        .from('suppliers')
        .update(payload)
        .eq('id', editingSupplier.id);
      
      if (error) {
        toast({ title: 'Error updating supplier', variant: 'destructive' });
        return;
      }
      toast({ title: 'Supplier updated' });
    } else {
      const { error } = await supabase.from('suppliers').insert(payload);
      if (error) {
        toast({ title: 'Error creating supplier', variant: 'destructive' });
        return;
      }
      toast({ title: 'Supplier created' });
    }

    setIsDialogOpen(false);
    resetForm();
    fetchData();
  }

  async function handleDeleteSupplier(id: string) {
    const { error } = await supabase.from('suppliers').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error deleting supplier', variant: 'destructive' });
      return;
    }
    toast({ title: 'Supplier deleted' });
    fetchData();
  }

  async function updateBookingStatus(id: string, status: string) {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (error) {
      toast({ title: 'Error updating booking', variant: 'destructive' });
      return;
    }
    toast({ title: `Booking ${status}` });
    fetchData();
  }

  const stats = {
    totalSuppliers: suppliers.length,
    activeSuppliers: suppliers.filter(s => s.is_active).length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    totalRevenue: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.total_amount || 0), 0),
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card/80 backdrop-blur border-b border-border/50 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg font-medium text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage suppliers and bookings</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{stats.activeSuppliers}</p>
            <p className="text-xs text-muted-foreground">Active Suppliers</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{stats.pendingBookings}</p>
            <p className="text-xs text-muted-foreground">Pending Bookings</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-success">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
            <p className="text-xs text-muted-foreground">Total Bookings</p>
          </Card>
        </div>

        <Tabs defaultValue="suppliers">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="suppliers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Suppliers ({suppliers.length})</h2>
              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Add Supplier
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Name *</Label>
                        <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Price Range</Label>
                        <Input placeholder="$$$$" value={formData.price_range} onChange={e => setFormData({ ...formData, price_range: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Min Spend ($)</Label>
                        <Input type="number" value={formData.min_spend} onChange={e => setFormData({ ...formData, min_spend: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Commission %</Label>
                        <Input type="number" value={formData.commission_percent} onChange={e => setFormData({ ...formData, commission_percent: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>WhatsApp Link</Label>
                        <Input value={formData.whatsapp_link} onChange={e => setFormData({ ...formData, whatsapp_link: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Tags (comma separated)</Label>
                      <Input placeholder="romantic, vip, group" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Availability Notes</Label>
                      <Textarea value={formData.availability_notes} onChange={e => setFormData({ ...formData, availability_notes: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={formData.is_active} onCheckedChange={c => setFormData({ ...formData, is_active: c })} />
                      <Label>Active</Label>
                    </div>
                    <Button onClick={handleSaveSupplier} className="w-full">
                      {editingSupplier ? 'Update Supplier' : 'Create Supplier'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-3">
                {suppliers.map(supplier => (
                  <Card key={supplier.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{supplier.name}</h3>
                          <Badge variant={supplier.is_active ? 'default' : 'secondary'}>
                            {supplier.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Badge variant="outline">{supplier.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{supplier.location}</p>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Min: ${supplier.min_spend || 0}</span>
                          <span>Commission: {supplier.commission_percent}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(supplier)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSupplier(supplier.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : bookings.length === 0 ? (
              <p className="text-muted-foreground">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map(booking => (
                  <Card key={booking.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{booking.booking_number}</h3>
                          <Badge variant={
                            booking.status === 'confirmed' ? 'default' :
                            booking.status === 'pending' ? 'secondary' :
                            'outline'
                          }>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {booking.supplier?.name} • {booking.user?.full_name}
                        </p>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(booking.booking_date), 'MMM d, yyyy')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {booking.party_size}
                          </span>
                          {booking.total_amount && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ${booking.total_amount}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <Button size="sm" onClick={() => updateBookingStatus(booking.id, 'confirmed')}>
                              Confirm
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => updateBookingStatus(booking.id, 'cancelled')}>
                              Cancel
                            </Button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <Button size="sm" variant="outline" onClick={() => updateBookingStatus(booking.id, 'completed')}>
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
}
