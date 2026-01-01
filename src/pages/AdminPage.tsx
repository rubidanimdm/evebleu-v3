import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
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
import { Plus, Edit2, Trash2, Users, DollarSign, Calendar, Package } from 'lucide-react';
import { format } from 'date-fns';
import { LargePageHeader, LuxuryCard, GoldParticles } from '@/components/LuxuryElements';
import { CatalogManager } from '@/components/admin/CatalogManager';

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
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={10} />
      
      <LargePageHeader 
        title="Admin Panel"
        subtitle="Manage suppliers and bookings"
      />

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <LuxuryCard className="p-5 text-center">
            <p className="text-3xl font-medium text-primary">{stats.activeSuppliers}</p>
            <p className="text-xs text-muted-foreground mt-1">Active Suppliers</p>
          </LuxuryCard>
          <LuxuryCard className="p-5 text-center">
            <p className="text-3xl font-medium text-warning">{stats.pendingBookings}</p>
            <p className="text-xs text-muted-foreground mt-1">Pending Bookings</p>
          </LuxuryCard>
          <LuxuryCard className="p-5 text-center">
            <p className="text-3xl font-medium text-success">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Revenue</p>
          </LuxuryCard>
          <LuxuryCard className="p-5 text-center">
            <p className="text-3xl font-medium text-foreground">{bookings.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Bookings</p>
          </LuxuryCard>
        </div>

        <Tabs defaultValue="catalog" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-primary/10 rounded-xl p-1">
            <TabsTrigger value="catalog" className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-1.5">
              <Package className="w-4 h-4" />
              Catalog
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Suppliers
            </TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-4">
            <CatalogManager />
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-primary">Suppliers ({suppliers.length})</h2>
              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                    <Plus className="w-4 h-4" /> Add Supplier
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto bg-card border-primary/10">
                  <DialogHeader>
                    <DialogTitle className="text-primary">{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Name *</Label>
                        <Input 
                          value={formData.name} 
                          onChange={e => setFormData({ ...formData, name: e.target.value })} 
                          className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Category *</Label>
                        <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                          <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Description</Label>
                      <Textarea 
                        value={formData.description} 
                        onChange={e => setFormData({ ...formData, description: e.target.value })} 
                        className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Location</Label>
                        <Input 
                          value={formData.location} 
                          onChange={e => setFormData({ ...formData, location: e.target.value })} 
                          className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Price Range</Label>
                        <Input 
                          placeholder="$$$$" 
                          value={formData.price_range} 
                          onChange={e => setFormData({ ...formData, price_range: e.target.value })} 
                          className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Min Spend ($)</Label>
                        <Input 
                          type="number" 
                          value={formData.min_spend} 
                          onChange={e => setFormData({ ...formData, min_spend: e.target.value })} 
                          className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Commission %</Label>
                        <Input 
                          type="number" 
                          value={formData.commission_percent} 
                          onChange={e => setFormData({ ...formData, commission_percent: e.target.value })} 
                          className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Image URL</Label>
                      <Input 
                        value={formData.image_url} 
                        onChange={e => setFormData({ ...formData, image_url: e.target.value })} 
                        className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Phone</Label>
                        <Input 
                          value={formData.phone} 
                          onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                          className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">WhatsApp Link</Label>
                        <Input 
                          value={formData.whatsapp_link} 
                          onChange={e => setFormData({ ...formData, whatsapp_link: e.target.value })} 
                          className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Tags (comma separated)</Label>
                      <Input 
                        placeholder="romantic, vip, group" 
                        value={formData.tags} 
                        onChange={e => setFormData({ ...formData, tags: e.target.value })} 
                        className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Availability Notes</Label>
                      <Textarea 
                        value={formData.availability_notes} 
                        onChange={e => setFormData({ ...formData, availability_notes: e.target.value })} 
                        className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <Switch checked={formData.is_active} onCheckedChange={c => setFormData({ ...formData, is_active: c })} />
                      <Label className="text-foreground">Active</Label>
                    </div>
                    <Button onClick={handleSaveSupplier} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                      {editingSupplier ? 'Update Supplier' : 'Create Supplier'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="flex gap-1.5 justify-center">
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {suppliers.map(supplier => (
                  <LuxuryCard key={supplier.id} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium text-foreground">{supplier.name}</h3>
                          <Badge className={`${supplier.is_active ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-border'} border`}>
                            {supplier.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Badge variant="outline" className="border-primary/20 text-primary/80">{supplier.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{supplier.location}</p>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Min: ${supplier.min_spend || 0}</span>
                          <span>Commission: {supplier.commission_percent}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => openEdit(supplier)}
                          className="rounded-xl hover:bg-primary/10 hover:text-primary"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteSupplier(supplier.id)}
                          className="rounded-xl hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </LuxuryCard>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-lg font-medium text-primary">Recent Bookings</h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="flex gap-1.5 justify-center">
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            ) : bookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map(booking => (
                  <LuxuryCard key={booking.id} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium text-foreground">{booking.booking_number}</h3>
                          <Badge className={`border ${
                            booking.status === 'confirmed' ? 'bg-primary/10 text-primary border-primary/20' :
                            booking.status === 'pending' ? 'bg-warning/10 text-warning border-warning/20' :
                            booking.status === 'completed' ? 'bg-success/10 text-success border-success/20' :
                            'bg-muted text-muted-foreground border-border'
                          }`}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {booking.supplier?.name} • {booking.user?.full_name}
                        </p>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-primary/60" />
                            {format(new Date(booking.booking_date), 'MMM d, yyyy')}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-primary/60" />
                            {booking.party_size}
                          </span>
                          {booking.total_amount && (
                            <span className="flex items-center gap-1.5">
                              <DollarSign className="w-3.5 h-3.5 text-primary/60" />
                              ${booking.total_amount}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                            >
                              Confirm
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl"
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            className="border-success/30 text-success hover:bg-success/10 rounded-xl"
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </LuxuryCard>
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
