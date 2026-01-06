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
import { Plus, Edit2, Trash2, Search, Package, Copy } from 'lucide-react';

interface CatalogItem {
  id: string;
  title: string;
  category: string;
  price: number;
  currency: string;
  pricing_unit: string;
  short_description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  supplier_id: string | null;
  min_people: number | null;
  max_people: number | null;
  duration_minutes: number | null;
  location: string | null;
  cancellation_policy: string | null;
  deposit_percent: number | null;
  supplier?: { name: string } | null;
}

interface Supplier {
  id: string;
  name: string;
}

const categories = ['restaurant', 'nightlife', 'transport', 'yacht', 'event', 'spa', 'tours', 'hotel', 'experience'];
const pricingUnits = ['per person', 'per booking', 'per hour', 'per day', 'flat rate'];

const emptyForm = {
  title: '',
  category: 'restaurant',
  price: '',
  currency: 'AED',
  pricing_unit: 'per person',
  short_description: '',
  image_url: '',
  is_active: true,
  sort_order: '0',
  supplier_id: '',
  min_people: '1',
  max_people: '',
  duration_minutes: '',
  location: '',
  cancellation_policy: '',
  deposit_percent: '0',
};

export default function AdminCatalog() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [itemsRes, suppliersRes] = await Promise.all([
        supabase
          .from('catalog_items')
          .select('*, supplier:suppliers(name)')
          .order('sort_order'),
        supabase.from('suppliers').select('id, name').eq('is_active', true).order('name'),
      ]);
      
      setItems(itemsRes.data || []);
      setSuppliers(suppliersRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  function openEdit(item: CatalogItem) {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      price: item.price.toString(),
      currency: item.currency,
      pricing_unit: item.pricing_unit,
      short_description: item.short_description || '',
      image_url: item.image_url || '',
      is_active: item.is_active,
      sort_order: item.sort_order.toString(),
      supplier_id: item.supplier_id || '',
      min_people: item.min_people?.toString() || '1',
      max_people: item.max_people?.toString() || '',
      duration_minutes: item.duration_minutes?.toString() || '',
      location: item.location || '',
      cancellation_policy: item.cancellation_policy || '',
      deposit_percent: item.deposit_percent?.toString() || '0',
    });
    setIsDialogOpen(true);
  }

  function duplicateItem(item: CatalogItem) {
    setEditingItem(null);
    setFormData({
      title: `${item.title} (Copy)`,
      category: item.category,
      price: item.price.toString(),
      currency: item.currency,
      pricing_unit: item.pricing_unit,
      short_description: item.short_description || '',
      image_url: item.image_url || '',
      is_active: false,
      sort_order: (item.sort_order + 1).toString(),
      supplier_id: item.supplier_id || '',
      min_people: item.min_people?.toString() || '1',
      max_people: item.max_people?.toString() || '',
      duration_minutes: item.duration_minutes?.toString() || '',
      location: item.location || '',
      cancellation_policy: item.cancellation_policy || '',
      deposit_percent: item.deposit_percent?.toString() || '0',
    });
    setIsDialogOpen(true);
  }

  function resetForm() {
    setFormData(emptyForm);
    setEditingItem(null);
  }

  async function handleSave() {
    if (!formData.title.trim()) {
      toast({ title: 'Title is required', variant: 'destructive' });
      return;
    }

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      currency: formData.currency,
      pricing_unit: formData.pricing_unit,
      short_description: formData.short_description.trim() || null,
      image_url: formData.image_url.trim() || null,
      is_active: formData.is_active,
      sort_order: parseInt(formData.sort_order) || 0,
      supplier_id: formData.supplier_id || null,
      min_people: parseInt(formData.min_people) || 1,
      max_people: formData.max_people ? parseInt(formData.max_people) : null,
      duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
      location: formData.location.trim() || null,
      cancellation_policy: formData.cancellation_policy.trim() || null,
      deposit_percent: parseFloat(formData.deposit_percent) || 0,
    };

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('catalog_items')
          .update(payload)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: 'Service updated successfully' });
      } else {
        const { error } = await supabase.from('catalog_items').insert(payload);
        if (error) throw error;
        toast({ title: 'Service created successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({ title: 'Error saving service', variant: 'destructive' });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase.from('catalog_items').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Service deleted' });
      fetchData();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({ title: 'Error deleting service', variant: 'destructive' });
    }
  }

  async function toggleActive(id: string, currentState: boolean) {
    try {
      const { error } = await supabase
        .from('catalog_items')
        .update({ is_active: !currentState })
        .eq('id', id);
      
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  }

  async function updatePrice(id: string, newPrice: string) {
    const price = parseFloat(newPrice);
    if (isNaN(price) || price < 0) return;

    try {
      const { error } = await supabase
        .from('catalog_items')
        .update({ price })
        .eq('id', id);
      
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating price:', error);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Services / Catalog</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Service' : 'Add Service'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Service name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(c => (
                        <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Select value={formData.supplier_id} onValueChange={(v) => setFormData({ ...formData, supplier_id: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No supplier</SelectItem>
                    {suppliers.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Brief description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Price *</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={formData.currency} onValueChange={(v) => setFormData({ ...formData, currency: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AED">AED</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pricing Unit</Label>
                  <Select value={formData.pricing_unit} onValueChange={(v) => setFormData({ ...formData, pricing_unit: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pricingUnits.map(u => (
                        <SelectItem key={u} value={u}>{u}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Min People *</Label>
                  <Input
                    type="number"
                    value={formData.min_people}
                    onChange={(e) => setFormData({ ...formData, min_people: e.target.value })}
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max People</Label>
                  <Input
                    type="number"
                    value={formData.max_people}
                    onChange={(e) => setFormData({ ...formData, max_people: e.target.value })}
                    placeholder="Unlimited"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration (min)</Label>
                  <Input
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                    placeholder="60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Service location"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deposit %</Label>
                  <Input
                    type="number"
                    value={formData.deposit_percent}
                    onChange={(e) => setFormData({ ...formData, deposit_percent: e.target.value })}
                    placeholder="0"
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

              <div className="space-y-2">
                <Label>Cancellation Policy</Label>
                <Textarea
                  value={formData.cancellation_policy}
                  onChange={(e) => setFormData({ ...formData, cancellation_policy: e.target.value })}
                  placeholder="Cancellation terms..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>Active</Label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSave}>
                  {editingItem ? 'Update' : 'Create'} Service
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
                placeholder="Search services..."
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
                {categories.map(c => (
                  <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No services found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Min People</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{item.title}</p>
                          {item.location && (
                            <p className="text-xs text-muted-foreground">{item.location}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.supplier?.name || '-'}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        defaultValue={item.price}
                        className="w-24 h-8"
                        onBlur={(e) => updatePrice(item.id, e.target.value)}
                      />
                      <span className="text-xs text-muted-foreground ml-1">
                        {item.currency} {item.pricing_unit}
                      </span>
                    </TableCell>
                    <TableCell>{item.min_people || 1}</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.is_active}
                        onCheckedChange={() => toggleActive(item.id, item.is_active)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => duplicateItem(item)} title="Duplicate">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
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
