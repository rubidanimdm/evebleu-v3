import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Handshake, Search } from 'lucide-react';

interface Affiliate {
  id: string;
  name: string;
  company: string | null;
  type: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  commission_rate: number;
  commission_type: string;
  notes: string | null;
  is_active: boolean;
  total_earned: number;
  created_at: string;
  updated_at: string;
}

const TYPES = [
  { value: 'all', label: 'All' },
  { value: 'concierge', label: 'Concierge' },
  { value: 'tour_operator', label: 'Tour Operator' },
  { value: 'promoter', label: 'Promoter' },
  { value: 'hotel_partner', label: 'Hotel Partner' },
];

const TYPE_COLORS: Record<string, string> = {
  concierge: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  tour_operator: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  promoter: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  hotel_partner: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
};

const EMPTY_FORM = {
  name: '',
  company: '',
  type: 'concierge',
  contact_name: '',
  email: '',
  phone: '',
  commission_rate: 0,
  commission_type: 'percentage',
  notes: '',
  is_active: true,
};

export default function AdminAffiliates() {
  const [items, setItems] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchAffiliates();
  }, []);

  async function fetchAffiliates() {
    try {
      const { data, error } = await (supabase as any)
        .from('affiliates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching affiliates:', error);
      toast({ title: 'Error loading affiliates', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.company && item.company.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  }

  function openEdit(item: Affiliate) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      company: item.company || '',
      type: item.type,
      contact_name: item.contact_name || '',
      email: item.email || '',
      phone: item.phone || '',
      commission_rate: item.commission_rate,
      commission_type: item.commission_type,
      notes: item.notes || '',
      is_active: item.is_active,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      toast({ title: 'Name is required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        company: form.company.trim() || null,
        type: form.type,
        contact_name: form.contact_name.trim() || null,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        commission_rate: form.commission_rate,
        commission_type: form.commission_type,
        notes: form.notes.trim() || null,
        is_active: form.is_active,
      };

      if (editingId) {
        const { error } = await (supabase as any)
          .from('affiliates')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Affiliate updated' });
      } else {
        const { error } = await (supabase as any)
          .from('affiliates')
          .insert(payload);
        if (error) throw error;
        toast({ title: 'Affiliate created' });
      }

      setDialogOpen(false);
      fetchAffiliates();
    } catch (error: any) {
      console.error('Error saving affiliate:', error);
      toast({ title: 'Error saving affiliate', description: error?.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this affiliate?')) return;

    try {
      const { error } = await (supabase as any).from('affiliates').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Affiliate deleted' });
      fetchAffiliates();
    } catch (error) {
      console.error('Error deleting affiliate:', error);
      toast({ title: 'Error deleting affiliate', variant: 'destructive' });
    }
  }

  function getTypeLabel(type: string) {
    return TYPES.find((t) => t.value === type)?.label || type;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Affiliates</h1>
          <p className="text-muted-foreground">Manage partners and commissions</p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Affiliate
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Handshake className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No affiliates found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {item.company || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={TYPE_COLORS[item.type] || ''}>
                        {getTypeLabel(item.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {item.commission_rate}
                      {item.commission_type === 'percentage' ? '%' : ' (fixed)'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {item.email || '-'}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={item.is_active}
                        onCheckedChange={async (checked) => {
                          await (supabase as any)
                            .from('affiliates')
                            .update({ is_active: checked, updated_at: new Date().toISOString() })
                            .eq('id', item.id);
                          fetchAffiliates();
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                          <Pencil className="h-4 w-4" />
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

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Affiliate' : 'New Affiliate'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Partner name"
              />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Company name"
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concierge">Concierge</SelectItem>
                  <SelectItem value="tour_operator">Tour Operator</SelectItem>
                  <SelectItem value="promoter">Promoter</SelectItem>
                  <SelectItem value="hotel_partner">Hotel Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Contact Name</Label>
              <Input
                value={form.contact_name}
                onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                placeholder="Contact person"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+971..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Commission Rate</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.commission_rate}
                  onChange={(e) => setForm({ ...form, commission_rate: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Commission Type</Label>
                <Select
                  value={form.commission_type}
                  onValueChange={(value) => setForm({ ...form, commission_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.is_active}
                onCheckedChange={(checked) => setForm({ ...form, is_active: checked })}
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
