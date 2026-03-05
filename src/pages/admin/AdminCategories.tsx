import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { Plus, Pencil, Trash2, Tag, Search } from 'lucide-react';

interface Category {
  id: string;
  name: Record<string, string>;
  slug: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const EMPTY_FORM = {
  name_en: '',
  name_he: '',
  name_ar: '',
  name_fr: '',
  name_ru: '',
  slug: '',
  icon: '',
  sort_order: 0,
  is_active: true,
};

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await (supabase as any)
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({ title: 'Error loading categories', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  const filteredCategories = categories.filter((cat) => {
    const name = cat.name?.[language] || cat.name?.en || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase());
  });

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  }

  function openEdit(cat: Category) {
    setEditingId(cat.id);
    setForm({
      name_en: cat.name?.en || '',
      name_he: cat.name?.he || '',
      name_ar: cat.name?.ar || '',
      name_fr: cat.name?.fr || '',
      name_ru: cat.name?.ru || '',
      slug: cat.slug,
      icon: cat.icon || '',
      sort_order: cat.sort_order,
      is_active: cat.is_active,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!form.name_en.trim() || !form.slug.trim()) {
      toast({ title: 'Name (EN) and slug are required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: {
          en: form.name_en.trim(),
          he: form.name_he.trim(),
          ar: form.name_ar.trim(),
          fr: form.name_fr.trim(),
          ru: form.name_ru.trim(),
        },
        slug: form.slug.trim(),
        icon: form.icon.trim() || null,
        sort_order: form.sort_order,
        is_active: form.is_active,
      };

      if (editingId) {
        const { error } = await (supabase as any)
          .from('categories')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Category updated' });
      } else {
        const { error } = await (supabase as any)
          .from('categories')
          .insert(payload);
        if (error) throw error;
        toast({ title: 'Category created' });
      }

      setDialogOpen(false);
      fetchCategories();
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({ title: 'Error saving category', description: error?.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const { error } = await (supabase as any).from('categories').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Category deleted' });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({ title: 'Error deleting category', variant: 'destructive' });
    }
  }

  async function toggleActive(id: string, currentState: boolean) {
    try {
      const { error } = await (supabase as any)
        .from('categories')
        .update({ is_active: !currentState })
        .eq('id', id);
      if (error) throw error;
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      toast({ title: 'Error updating category', variant: 'destructive' });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage content categories</p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          New Category
        </Button>
      </div>

      {/* Search */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No categories found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Sort Order</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-medium">
                      {cat.name?.[language] || cat.name?.en || '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {cat.slug}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {cat.icon || '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {cat.sort_order}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={cat.is_active}
                        onCheckedChange={() => toggleActive(cat.id, cat.is_active)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}>
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Category' : 'New Category'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name (English) *</Label>
              <Input value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} placeholder="Category name" />
            </div>
            <div className="space-y-2">
              <Label>Name (Hebrew)</Label>
              <Input value={form.name_he} onChange={(e) => setForm({ ...form, name_he: e.target.value })} placeholder="Hebrew name" dir="rtl" />
            </div>
            <div className="space-y-2">
              <Label>Name (Arabic)</Label>
              <Input value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} placeholder="Arabic name" dir="rtl" />
            </div>
            <div className="space-y-2">
              <Label>Name (French)</Label>
              <Input value={form.name_fr} onChange={(e) => setForm({ ...form, name_fr: e.target.value })} placeholder="French name" />
            </div>
            <div className="space-y-2">
              <Label>Name (Russian)</Label>
              <Input value={form.name_ru} onChange={(e) => setForm({ ...form, name_ru: e.target.value })} placeholder="Russian name" />
            </div>
            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="category-slug" />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="e.g. utensils, hotel, plane" />
            </div>
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
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
