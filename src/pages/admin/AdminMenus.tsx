import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { Plus, Pencil, Trash2, Menu as MenuIcon, Search } from 'lucide-react';

interface MenuItem {
  id: string;
  label: Record<string, string>;
  url: string;
  menu_location: string;
  is_external: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const LOCATIONS = [
  { value: 'top_nav', label: 'Top Navigation' },
  { value: 'footer_legal', label: 'Footer Legal' },
];

const EMPTY_FORM = {
  label_en: '',
  label_he: '',
  label_ar: '',
  label_fr: '',
  label_ru: '',
  url: '',
  menu_location: 'top_nav',
  is_external: false,
  sort_order: 0,
  is_active: true,
};

export default function AdminMenus() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('top_nav');
  const { toast } = useToast();
  const { language } = useLanguage();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  async function fetchMenuItems() {
    try {
      const { data, error } = await (supabase as any)
        .from('site_menus')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast({ title: 'Error loading menus', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  function getItemsByLocation(location: string) {
    return items.filter((item) => item.menu_location === location);
  }

  function openAdd(location: string) {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, menu_location: location });
    setDialogOpen(true);
  }

  function openEdit(item: MenuItem) {
    setEditingId(item.id);
    setForm({
      label_en: item.label?.en || '',
      label_he: item.label?.he || '',
      label_ar: item.label?.ar || '',
      label_fr: item.label?.fr || '',
      label_ru: item.label?.ru || '',
      url: item.url,
      menu_location: item.menu_location,
      is_external: item.is_external,
      sort_order: item.sort_order,
      is_active: item.is_active ?? true,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!form.label_en.trim() || !form.url.trim()) {
      toast({ title: 'Label (EN) and URL are required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        label: {
          en: form.label_en.trim(),
          he: form.label_he.trim(),
          ar: form.label_ar.trim(),
          fr: form.label_fr.trim(),
          ru: form.label_ru.trim(),
        },
        url: form.url.trim(),
        menu_location: form.menu_location,
        is_external: form.is_external,
        sort_order: form.sort_order,
        is_active: form.is_active,
      };

      if (editingId) {
        const { error } = await (supabase as any)
          .from('site_menus')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Menu item updated' });
      } else {
        const { error } = await (supabase as any)
          .from('site_menus')
          .insert(payload);
        if (error) throw error;
        toast({ title: 'Menu item created' });
      }

      setDialogOpen(false);
      fetchMenuItems();
    } catch (error: any) {
      console.error('Error saving menu item:', error);
      toast({ title: 'Error saving menu item', description: error?.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const { error } = await (supabase as any).from('site_menus').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Menu item deleted' });
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast({ title: 'Error deleting menu item', variant: 'destructive' });
    }
  }

  function renderTable(location: string) {
    const locationItems = getItemsByLocation(location);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (locationItems.length === 0) {
      return (
        <div className="text-center py-12">
          <MenuIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No menu items</p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>External</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Sort Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locationItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.label?.[language] || item.label?.en || '-'}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {item.url}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {item.is_external ? 'Yes' : 'No'}
              </TableCell>
              <TableCell>
                <Switch
                  checked={item.is_active ?? true}
                  onCheckedChange={async (checked) => {
                    await (supabase as any).from('site_menus').update({ is_active: checked }).eq('id', item.id);
                    fetchMenuItems();
                  }}
                />
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {item.sort_order}
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Menus</h1>
        <p className="text-muted-foreground">Manage site navigation menus</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {LOCATIONS.map((loc) => (
            <TabsTrigger key={loc.value} value={loc.value}>
              {loc.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {LOCATIONS.map((loc) => (
          <TabsContent key={loc.value} value={loc.value} className="space-y-4">
            <div className="flex justify-end">
              <Button className="gap-2" onClick={() => openAdd(loc.value)}>
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>
            <Card className="border-border/50">
              <CardContent className="p-0">
                {renderTable(loc.value)}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Menu Item' : 'New Menu Item'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label (English) *</Label>
              <Input value={form.label_en} onChange={(e) => setForm({ ...form, label_en: e.target.value })} placeholder="Menu label" />
            </div>
            <div className="space-y-2">
              <Label>Label (Hebrew)</Label>
              <Input value={form.label_he} onChange={(e) => setForm({ ...form, label_he: e.target.value })} placeholder="Hebrew label" dir="rtl" />
            </div>
            <div className="space-y-2">
              <Label>Label (Arabic)</Label>
              <Input value={form.label_ar} onChange={(e) => setForm({ ...form, label_ar: e.target.value })} placeholder="Arabic label" dir="rtl" />
            </div>
            <div className="space-y-2">
              <Label>Label (French)</Label>
              <Input value={form.label_fr} onChange={(e) => setForm({ ...form, label_fr: e.target.value })} placeholder="French label" />
            </div>
            <div className="space-y-2">
              <Label>Label (Russian)</Label>
              <Input value={form.label_ru} onChange={(e) => setForm({ ...form, label_ru: e.target.value })} placeholder="Russian label" />
            </div>
            <div className="space-y-2">
              <Label>URL *</Label>
              <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="/about or https://..." />
            </div>
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_external} onCheckedChange={(checked) => setForm({ ...form, is_external: checked })} />
              <Label>External Link</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_active} onCheckedChange={(checked) => setForm({ ...form, is_active: checked })} />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
