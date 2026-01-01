import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { LuxuryCard } from '@/components/LuxuryElements';
import { CatalogItemForm, CatalogItemFormData } from './CatalogItemForm';

interface CatalogItem {
  id: string;
  category: string;
  title: string;
  image_url: string | null;
  price: number;
  currency: string;
  pricing_unit: string;
  short_description: string | null;
  details: Record<string, string>;
  is_active: boolean;
  sort_order: number;
}

const CATEGORIES = ['ALL', 'DINING', 'TRANSPORT', 'HOTEL', 'FLIGHT', 'CLUB', 'EXPERIENCE'] as const;

export function CatalogManager() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from('catalog_items')
      .select('*')
      .order('category')
      .order('sort_order');

    if (error) {
      toast({ title: 'Error loading catalog', variant: 'destructive' });
    } else {
      setItems((data || []).map(item => ({
        ...item,
        details: (item.details as Record<string, string>) || {},
      })));
    }
    setLoading(false);
  }

  const filteredItems = filterCategory === 'ALL' 
    ? items 
    : items.filter(i => i.category === filterCategory);

  const handleSave = async (formData: CatalogItemFormData) => {
    const payload = {
      category: formData.category,
      title: formData.title,
      image_url: formData.image_url || null,
      price: formData.price,
      currency: formData.currency,
      pricing_unit: formData.pricing_unit,
      short_description: formData.short_description || null,
      details: formData.details,
      is_active: formData.is_active,
      sort_order: formData.sort_order,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('catalog_items')
        .update(payload)
        .eq('id', editingItem.id);

      if (error) {
        toast({ title: 'Error updating item', variant: 'destructive' });
        return;
      }
      toast({ title: 'Item updated' });
    } else {
      const { error } = await supabase.from('catalog_items').insert(payload);
      if (error) {
        toast({ title: 'Error creating item', variant: 'destructive' });
        return;
      }
      toast({ title: 'Item created' });
    }

    setIsDialogOpen(false);
    setEditingItem(null);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    
    const { error } = await supabase.from('catalog_items').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error deleting item', variant: 'destructive' });
      return;
    }
    toast({ title: 'Item deleted' });
    fetchItems();
  };

  const openEdit = (item: CatalogItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40 bg-background/50 border-primary/20 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          size="sm" 
          onClick={openCreate}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
        >
          <Plus className="w-4 h-4" /> Add Item
        </Button>
      </div>

      {/* Items List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="flex gap-1.5 justify-center">
            <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
            <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No items in catalog. Add your first item to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map(item => (
            <LuxuryCard key={item.id} className="p-4">
              <div className="flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                
                {item.image_url && (
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-foreground truncate">{item.title}</h3>
                    <Badge className={`text-[10px] ${item.is_active ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-border'} border`}>
                      {item.is_active ? 'Active' : 'Hidden'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="text-primary">{item.price.toLocaleString()} {item.currency}</span>
                    <span>•</span>
                    <span>{item.pricing_unit}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-[10px] border-primary/20">{item.category}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEdit(item)}
                    className="h-8 w-8 hover:bg-primary/10"
                  >
                    <Edit2 className="w-4 h-4 text-primary" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </LuxuryCard>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingItem(null); }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-card border-primary/10">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {editingItem ? 'Edit Catalog Item' : 'Add Catalog Item'}
            </DialogTitle>
          </DialogHeader>
          <CatalogItemForm
            initialData={editingItem ? {
              id: editingItem.id,
              category: editingItem.category,
              title: editingItem.title,
              image_url: editingItem.image_url || '',
              price: editingItem.price,
              currency: editingItem.currency,
              pricing_unit: editingItem.pricing_unit,
              short_description: editingItem.short_description || '',
              details: editingItem.details,
              is_active: editingItem.is_active,
              sort_order: editingItem.sort_order,
            } : undefined}
            onSave={handleSave}
            onCancel={() => { setIsDialogOpen(false); setEditingItem(null); }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
