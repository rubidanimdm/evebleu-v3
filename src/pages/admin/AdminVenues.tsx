import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Search, MapPin, ExternalLink, X } from 'lucide-react';

interface Venue {
  id: string;
  title: string;
  category: string;
  location: string | null;
  image_url: string | null;
  logo_path: string | null;
  website_url: string | null;
  google_maps_url: string | null;
  instagram_url: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  short_description: string | null;
  is_active: boolean;
}

interface BookingPath {
  id: string;
  catalog_item_id: string;
  supplier_id: string | null;
  commission_split: number | null;
  commission_type: string | null;
  is_preferred: boolean;
  contact_name: string | null;
  contact_phone: string | null;
  notes: string | null;
  suppliers: { id: string; name: string } | null;
}

interface SupplierOption {
  id: string;
  name: string;
}

const venueCategories = ['DINING', 'CLUB'];

const emptyForm = {
  title: '',
  category: 'DINING',
  logo_path: '',
  website_url: '',
  google_maps_url: '',
  instagram_url: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  location: '',
  short_description: '',
  image_url: '',
  is_active: true,
};

const emptyBookingPath = {
  supplier_id: '__direct__',
  commission_split: '50',
  is_preferred: false,
  contact_name: '',
  contact_phone: '',
  notes: '',
};

export default function AdminVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [bookingPaths, setBookingPaths] = useState<BookingPath[]>([]);
  const [supplierOptions, setSupplierOptions] = useState<SupplierOption[]>([]);
  const [newBookingPath, setNewBookingPath] = useState(emptyBookingPath);
  const [loadingPaths, setLoadingPaths] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchVenues();
    fetchSupplierOptions();
  }, []);

  async function fetchVenues() {
    try {
      const { data, error } = await supabase
        .from('catalog_items')
        .select('*')
        .in('category', ['DINING', 'CLUB'])
        .order('title');

      if (error) throw error;
      setVenues(data || []);
    } catch (error) {
      console.error('Error fetching venues:', error);
      toast({ title: 'Error loading venues', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  async function fetchSupplierOptions() {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('id, name')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setSupplierOptions(data || []);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  }

  async function fetchBookingPaths(venueId: string) {
    setLoadingPaths(true);
    try {
      const { data, error } = await supabase
        .from('venue_suppliers')
        .select('*, suppliers(id, name)')
        .eq('catalog_item_id', venueId);

      if (error) throw error;
      setBookingPaths(data || []);
    } catch (error) {
      console.error('Error fetching booking paths:', error);
      toast({ title: 'Error loading booking paths', variant: 'destructive' });
    } finally {
      setLoadingPaths(false);
    }
  }

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch = venue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || venue.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  function openEdit(venue: Venue) {
    setEditingVenue(venue);
    setFormData({
      title: venue.title,
      category: venue.category,
      logo_path: venue.logo_path || '',
      website_url: venue.website_url || '',
      google_maps_url: venue.google_maps_url || '',
      instagram_url: venue.instagram_url || '',
      contact_name: venue.contact_name || '',
      contact_phone: venue.contact_phone || '',
      contact_email: venue.contact_email || '',
      location: venue.location || '',
      short_description: venue.short_description || '',
      image_url: venue.image_url || '',
      is_active: venue.is_active,
    });
    fetchBookingPaths(venue.id);
    setIsDialogOpen(true);
  }

  function resetForm() {
    setFormData(emptyForm);
    setEditingVenue(null);
    setBookingPaths([]);
    setNewBookingPath(emptyBookingPath);
  }

  async function handleSave() {
    if (!formData.title.trim()) {
      toast({ title: 'Venue name is required', variant: 'destructive' });
      return;
    }

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      logo_path: formData.logo_path.trim() || null,
      website_url: formData.website_url.trim() || null,
      google_maps_url: formData.google_maps_url.trim() || null,
      instagram_url: formData.instagram_url.trim() || null,
      contact_name: formData.contact_name.trim() || null,
      contact_phone: formData.contact_phone.trim() || null,
      contact_email: formData.contact_email.trim() || null,
      location: formData.location.trim() || null,
      short_description: formData.short_description.trim() || null,
      image_url: formData.image_url.trim() || null,
      is_active: formData.is_active,
    };

    try {
      if (editingVenue) {
        const { error } = await supabase
          .from('catalog_items')
          .update(payload)
          .eq('id', editingVenue.id);

        if (error) throw error;
        toast({ title: 'Venue updated successfully' });
      } else {
        const { error } = await supabase.from('catalog_items').insert(payload);
        if (error) throw error;
        toast({ title: 'Venue created successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchVenues();
    } catch (error) {
      console.error('Error saving venue:', error);
      toast({ title: 'Error saving venue', variant: 'destructive' });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this venue?')) return;

    try {
      const { error } = await supabase.from('catalog_items').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Venue deleted' });
      fetchVenues();
    } catch (error) {
      console.error('Error deleting venue:', error);
      toast({ title: 'Error deleting venue', variant: 'destructive' });
    }
  }

  async function toggleActive(id: string, currentState: boolean) {
    try {
      const { error } = await supabase
        .from('catalog_items')
        .update({ is_active: !currentState })
        .eq('id', id);

      if (error) throw error;
      fetchVenues();
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  }

  async function addBookingPath() {
    if (!editingVenue) return;

    const payload = {
      catalog_item_id: editingVenue.id,
      supplier_id: newBookingPath.supplier_id === '__direct__' ? null : newBookingPath.supplier_id,
      commission_split: parseFloat(newBookingPath.commission_split) || 50,
      is_preferred: newBookingPath.is_preferred,
      contact_name: newBookingPath.contact_name.trim() || null,
      contact_phone: newBookingPath.contact_phone.trim() || null,
      notes: newBookingPath.notes.trim() || null,
    };

    try {
      const { error } = await supabase.from('venue_suppliers').insert(payload);
      if (error) throw error;
      toast({ title: 'Booking path added' });
      setNewBookingPath(emptyBookingPath);
      fetchBookingPaths(editingVenue.id);
    } catch (error) {
      console.error('Error adding booking path:', error);
      toast({ title: 'Error adding booking path', variant: 'destructive' });
    }
  }

  async function removeBookingPath(pathId: string) {
    if (!editingVenue) return;

    try {
      const { error } = await supabase.from('venue_suppliers').delete().eq('id', pathId);
      if (error) throw error;
      toast({ title: 'Booking path removed' });
      fetchBookingPaths(editingVenue.id);
    } catch (error) {
      console.error('Error removing booking path:', error);
      toast({ title: 'Error removing booking path', variant: 'destructive' });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Venues</h1>
          <p className="text-muted-foreground">Manage dining & nightlife venues</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Venue
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingVenue ? 'Edit Venue' : 'Add Venue'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Venue name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {venueCategories.map(c => (
                        <SelectItem key={c} value={c}>{c === 'DINING' ? 'Dining' : 'Club'}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Short Description</Label>
                <Textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Brief description of the venue"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City or area"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <Input
                    value={formData.logo_path}
                    onChange={(e) => setFormData({ ...formData, logo_path: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Website URL</Label>
                  <Input
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Google Maps URL</Label>
                  <Input
                    value={formData.google_maps_url}
                    onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Instagram URL</Label>
                <Input
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    placeholder="Contact person"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    placeholder="+971..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    placeholder="email@venue.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>Active</Label>
              </div>

              {/* Booking Paths Section */}
              {editingVenue && (
                <div className="border-t border-border/50 pt-4 space-y-4">
                  <h3 className="font-semibold text-sm">Booking Paths</h3>
                  {loadingPaths ? (
                    <div className="flex items-center justify-center h-16">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <>
                      {bookingPaths.length > 0 && (
                        <div className="space-y-2">
                          {bookingPaths.map((path) => (
                            <div key={path.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 text-sm">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {path.suppliers ? path.suppliers.name : 'Direct'}
                                  </span>
                                  {path.is_preferred && (
                                    <Badge variant="default" className="text-xs">Preferred</Badge>
                                  )}
                                </div>
                                <div className="text-muted-foreground text-xs mt-1">
                                  {path.commission_split != null && `Commission: ${path.commission_split}%`}
                                  {path.contact_name && ` | Contact: ${path.contact_name}`}
                                  {path.notes && ` | ${path.notes}`}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0"
                                onClick={() => removeBookingPath(path.id)}
                              >
                                <X className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add new booking path */}
                      <div className="p-3 rounded-lg border border-dashed border-border/50 space-y-3">
                        <p className="text-xs text-muted-foreground font-medium">Add Booking Path</p>
                        <div className="grid grid-cols-2 gap-3">
                          <Select
                            value={newBookingPath.supplier_id}
                            onValueChange={(v) => setNewBookingPath({ ...newBookingPath, supplier_id: v })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select supplier" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__direct__">Direct (No Intermediary)</SelectItem>
                              {supplierOptions.map(s => (
                                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            value={newBookingPath.commission_split}
                            onChange={(e) => setNewBookingPath({ ...newBookingPath, commission_split: e.target.value })}
                            placeholder="Commission %"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            value={newBookingPath.contact_name}
                            onChange={(e) => setNewBookingPath({ ...newBookingPath, contact_name: e.target.value })}
                            placeholder="Contact override"
                          />
                          <Input
                            value={newBookingPath.contact_phone}
                            onChange={(e) => setNewBookingPath({ ...newBookingPath, contact_phone: e.target.value })}
                            placeholder="Phone override"
                          />
                        </div>
                        <Input
                          value={newBookingPath.notes}
                          onChange={(e) => setNewBookingPath({ ...newBookingPath, notes: e.target.value })}
                          placeholder="Notes"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={newBookingPath.is_preferred}
                              onCheckedChange={(checked) => setNewBookingPath({ ...newBookingPath, is_preferred: checked })}
                            />
                            <Label className="text-xs">Preferred</Label>
                          </div>
                          <Button size="sm" onClick={addBookingPath}>
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSave}>
                  {editingVenue ? 'Update' : 'Create'} Venue
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="DINING">Dining</SelectItem>
                <SelectItem value="CLUB">Clubs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Venues Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredVenues.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No venues found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Venue</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Maps</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVenues.map((venue) => (
                  <TableRow key={venue.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {venue.logo_path ? (
                          <img
                            src={venue.logo_path}
                            alt={venue.title}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <p className="font-medium">{venue.title}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        venue.category === 'DINING'
                          ? 'border-amber-500/50 text-amber-500'
                          : 'border-purple-500/50 text-purple-500'
                      }>
                        {venue.category === 'DINING' ? 'Dining' : 'Club'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {venue.location || '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {venue.contact_name || venue.contact_phone || '-'}
                    </TableCell>
                    <TableCell>
                      {venue.google_maps_url ? (
                        <a
                          href={venue.google_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Map
                        </a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={venue.is_active}
                        onCheckedChange={() => toggleActive(venue.id, venue.is_active)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(venue)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(venue.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
