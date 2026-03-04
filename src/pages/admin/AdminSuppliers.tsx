import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Plus, Edit2, Trash2, Search, Building2, Phone, Mail } from 'lucide-react';
import { z } from 'zod';

const supplierSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  min_spend: z.number().min(0).optional().nullable(),
  price_range: z.string().optional().nullable(),
  commission_percent: z.number().min(0).max(100),
  availability_notes: z.string().optional().nullable(),
  image_url: z.string().url().optional().nullable().or(z.literal('')),
  phone: z.string().optional().nullable(),
  whatsapp_link: z.string().url().optional().nullable().or(z.literal('')),
  is_active: z.boolean(),
  tags: z.array(z.string()).optional().nullable(),
  company_name: z.string().optional().nullable(),
  contact_name: z.string().optional().nullable(),
  contact_email: z.string().email().optional().nullable().or(z.literal('')),
  supplier_type: z.string().optional().nullable(),
  default_commission_split: z.number().min(0).max(100).optional().nullable(),
});

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
  company_name: string | null;
  contact_name: string | null;
  contact_email: string | null;
  supplier_type: string | null;
  default_commission_split: number | null;
}

const supplierTypes = [
  { value: 'direct_venue', label: 'Direct Venue', color: 'border-blue-500/50 text-blue-500' },
  { value: 'concierge_intermediary', label: 'Concierge', color: 'border-purple-500/50 text-purple-500' },
  { value: 'driver', label: 'Driver', color: 'border-green-500/50 text-green-500' },
  { value: 'tour_operator', label: 'Tour Operator', color: 'border-orange-500/50 text-orange-500' },
];

const categories = ['restaurant', 'nightlife', 'transport', 'yacht', 'event', 'spa', 'tours', 'hotel'];

const emptyForm = {
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
  company_name: '',
  contact_name: '',
  contact_email: '',
  supplier_type: 'direct_venue',
  default_commission_split: '50',
};

export default function AdminSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const { toast } = useToast();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  async function fetchSuppliers() {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setSuppliers(data || []);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      toast({ title: 'Error loading suppliers', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
      company_name: supplier.company_name || '',
      contact_name: supplier.contact_name || '',
      contact_email: supplier.contact_email || '',
      supplier_type: supplier.supplier_type || 'direct_venue',
      default_commission_split: supplier.default_commission_split?.toString() || '50',
    });
    setIsDialogOpen(true);
  }

  function resetForm() {
    setFormData(emptyForm);
    setEditingSupplier(null);
  }

  async function handleSave() {
    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim() || null,
      location: formData.location.trim() || null,
      min_spend: formData.min_spend ? parseFloat(formData.min_spend) : null,
      price_range: formData.price_range.trim() || null,
      commission_percent: parseFloat(formData.commission_percent) || 10,
      availability_notes: formData.availability_notes.trim() || null,
      image_url: formData.image_url.trim() || null,
      phone: formData.phone.trim() || null,
      whatsapp_link: formData.whatsapp_link.trim() || null,
      is_active: formData.is_active,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : null,
      company_name: formData.company_name.trim() || null,
      contact_name: formData.contact_name.trim() || null,
      contact_email: formData.contact_email.trim() || null,
      supplier_type: formData.supplier_type || null,
      default_commission_split: formData.default_commission_split ? parseFloat(formData.default_commission_split) : null,
    };

    const validation = supplierSchema.safeParse(payload);
    if (!validation.success) {
      toast({ 
        title: 'Validation Error', 
        description: validation.error.errors.map(e => e.message).join(', '), 
        variant: 'destructive' 
      });
      return;
    }

    try {
      if (editingSupplier) {
        const { error } = await supabase
          .from('suppliers')
          .update(payload)
          .eq('id', editingSupplier.id);
        
        if (error) throw error;
        toast({ title: 'Supplier updated successfully' });
      } else {
        const { error } = await supabase.from('suppliers').insert(payload);
        if (error) throw error;
        toast({ title: 'Supplier created successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchSuppliers();
    } catch (error) {
      console.error('Error saving supplier:', error);
      toast({ title: 'Error saving supplier', variant: 'destructive' });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this supplier?')) return;

    try {
      const { error } = await supabase.from('suppliers').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Supplier deleted' });
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
      toast({ title: 'Error deleting supplier', variant: 'destructive' });
    }
  }

  async function toggleActive(id: string, currentState: boolean) {
    try {
      const { error } = await supabase
        .from('suppliers')
        .update({ is_active: !currentState })
        .eq('id', id);
      
      if (error) throw error;
      fetchSuppliers();
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier network</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Supplier name"
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    placeholder="Company / business name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Supplier Type</Label>
                  <Select value={formData.supplier_type} onValueChange={(v) => setFormData({ ...formData, supplier_type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supplierTypes.map(t => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                  <Label>Contact Email</Label>
                  <Input
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    placeholder="email@supplier.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Default Commission %</Label>
                  <Input
                    type="number"
                    value={formData.default_commission_split}
                    onChange={(e) => setFormData({ ...formData, default_commission_split: e.target.value })}
                    placeholder="50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the supplier"
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
                  <Label>Price Range</Label>
                  <Input
                    value={formData.price_range}
                    onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                    placeholder="e.g., $$$$"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Min Spend ($)</Label>
                  <Input
                    type="number"
                    value={formData.min_spend}
                    onChange={(e) => setFormData({ ...formData, min_spend: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Commission %</Label>
                  <Input
                    type="number"
                    value={formData.commission_percent}
                    onChange={(e) => setFormData({ ...formData, commission_percent: e.target.value })}
                    placeholder="10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp Link</Label>
                  <Input
                    value={formData.whatsapp_link}
                    onChange={(e) => setFormData({ ...formData, whatsapp_link: e.target.value })}
                    placeholder="https://wa.me/..."
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
                <Label>Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="fine-dining, waterfront, romantic"
                />
              </div>
              <div className="space-y-2">
                <Label>Availability Notes</Label>
                <Textarea
                  value={formData.availability_notes}
                  onChange={(e) => setFormData({ ...formData, availability_notes: e.target.value })}
                  placeholder="Operating hours, booking requirements, etc."
                  rows={2}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>Active</Label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSave}>
                  {editingSupplier ? 'Update' : 'Create'} Supplier
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
                placeholder="Search suppliers..."
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

      {/* Suppliers Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredSuppliers.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No suppliers found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {supplier.image_url ? (
                          <img
                            src={supplier.image_url}
                            alt={supplier.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{supplier.company_name || supplier.name}</p>
                          {supplier.company_name && supplier.name !== supplier.company_name && (
                            <p className="text-xs text-muted-foreground">{supplier.name}</p>
                          )}
                          {!supplier.company_name && supplier.phone && (
                            <p className="text-xs text-muted-foreground">{supplier.phone}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const st = supplierTypes.find(t => t.value === supplier.supplier_type);
                        return st ? (
                          <Badge variant="outline" className={st.color}>{st.label}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        );
                      })()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{supplier.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {supplier.location || '-'}
                    </TableCell>
                    <TableCell>{supplier.commission_percent || 10}%</TableCell>
                    <TableCell>
                      <Switch
                        checked={supplier.is_active}
                        onCheckedChange={() => toggleActive(supplier.id, supplier.is_active)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(supplier)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(supplier.id)}>
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
