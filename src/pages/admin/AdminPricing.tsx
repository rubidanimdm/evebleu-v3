import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Plus, Edit2, Trash2, DollarSign, Percent, Calendar } from 'lucide-react';

interface PricingRule {
  id: string;
  catalog_item_id: string;
  name: string;
  rule_type: string;
  start_date: string | null;
  end_date: string | null;
  days_of_week: number[] | null;
  price_modifier_type: string;
  price_modifier_value: number;
  min_advance_days: number | null;
  max_advance_days: number | null;
  min_quantity: number | null;
  priority: number;
  is_active: boolean;
  catalog_item?: { title: string } | null;
}

interface CatalogItem {
  id: string;
  title: string;
}

const ruleTypes = [
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'day_of_week', label: 'Day of Week' },
  { value: 'early_bird', label: 'Early Bird' },
  { value: 'last_minute', label: 'Last Minute' },
  { value: 'volume', label: 'Volume Discount' },
];

const daysOfWeek = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

const emptyForm = {
  catalog_item_id: '',
  name: '',
  rule_type: 'seasonal',
  start_date: '',
  end_date: '',
  days_of_week: [] as number[],
  price_modifier_type: 'percentage',
  price_modifier_value: '',
  min_advance_days: '',
  max_advance_days: '',
  min_quantity: '',
  priority: '0',
  is_active: true,
};

export default function AdminPricing() {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [rulesRes, itemsRes] = await Promise.all([
        supabase
          .from('pricing_rules')
          .select('*, catalog_item:catalog_items(title)')
          .order('priority', { ascending: false }),
        supabase.from('catalog_items').select('id, title').eq('is_active', true).order('title'),
      ]);
      
      setRules(rulesRes.data || []);
      setCatalogItems(itemsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  function openEdit(rule: PricingRule) {
    setEditingRule(rule);
    setFormData({
      catalog_item_id: rule.catalog_item_id,
      name: rule.name,
      rule_type: rule.rule_type,
      start_date: rule.start_date || '',
      end_date: rule.end_date || '',
      days_of_week: rule.days_of_week || [],
      price_modifier_type: rule.price_modifier_type,
      price_modifier_value: rule.price_modifier_value.toString(),
      min_advance_days: rule.min_advance_days?.toString() || '',
      max_advance_days: rule.max_advance_days?.toString() || '',
      min_quantity: rule.min_quantity?.toString() || '',
      priority: rule.priority.toString(),
      is_active: rule.is_active,
    });
    setIsDialogOpen(true);
  }

  function resetForm() {
    setFormData(emptyForm);
    setEditingRule(null);
  }

  async function handleSave() {
    if (!formData.name.trim() || !formData.catalog_item_id) {
      toast({ title: 'Name and service are required', variant: 'destructive' });
      return;
    }

    const payload = {
      catalog_item_id: formData.catalog_item_id,
      name: formData.name.trim(),
      rule_type: formData.rule_type,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
      days_of_week: formData.days_of_week.length > 0 ? formData.days_of_week : null,
      price_modifier_type: formData.price_modifier_type,
      price_modifier_value: parseFloat(formData.price_modifier_value) || 0,
      min_advance_days: formData.min_advance_days ? parseInt(formData.min_advance_days) : null,
      max_advance_days: formData.max_advance_days ? parseInt(formData.max_advance_days) : null,
      min_quantity: formData.min_quantity ? parseInt(formData.min_quantity) : null,
      priority: parseInt(formData.priority) || 0,
      is_active: formData.is_active,
    };

    try {
      if (editingRule) {
        const { error } = await supabase
          .from('pricing_rules')
          .update(payload)
          .eq('id', editingRule.id);
        
        if (error) throw error;
        toast({ title: 'Pricing rule updated' });
      } else {
        const { error } = await supabase.from('pricing_rules').insert(payload);
        if (error) throw error;
        toast({ title: 'Pricing rule created' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving rule:', error);
      toast({ title: 'Error saving pricing rule', variant: 'destructive' });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this pricing rule?')) return;

    try {
      const { error } = await supabase.from('pricing_rules').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Pricing rule deleted' });
      fetchData();
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast({ title: 'Error deleting rule', variant: 'destructive' });
    }
  }

  function toggleDayOfWeek(day: number) {
    setFormData(prev => ({
      ...prev,
      days_of_week: prev.days_of_week.includes(day)
        ? prev.days_of_week.filter(d => d !== day)
        : [...prev.days_of_week, day],
    }));
  }

  function getModifierDisplay(rule: PricingRule) {
    const sign = rule.price_modifier_value >= 0 ? '+' : '';
    if (rule.price_modifier_type === 'percentage') {
      return `${sign}${rule.price_modifier_value}%`;
    }
    return `${sign}$${rule.price_modifier_value}`;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pricing Rules</h1>
          <p className="text-muted-foreground">Manage seasonal and dynamic pricing</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRule ? 'Edit Pricing Rule' : 'Add Pricing Rule'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Service *</Label>
                <Select value={formData.catalog_item_id} onValueChange={(v) => setFormData({ ...formData, catalog_item_id: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {catalogItems.map(item => (
                      <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rule Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Summer Special"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rule Type</Label>
                  <Select value={formData.rule_type} onValueChange={(v) => setFormData({ ...formData, rule_type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ruleTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {(formData.rule_type === 'seasonal' || formData.rule_type === 'day_of_week') && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {formData.rule_type === 'day_of_week' && (
                <div className="space-y-2">
                  <Label>Days of Week</Label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                      <Button
                        key={day.value}
                        type="button"
                        variant={formData.days_of_week.includes(day.value) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleDayOfWeek(day.value)}
                      >
                        {day.label.slice(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {formData.rule_type === 'early_bird' && (
                <div className="space-y-2">
                  <Label>Minimum Days in Advance</Label>
                  <Input
                    type="number"
                    value={formData.min_advance_days}
                    onChange={(e) => setFormData({ ...formData, min_advance_days: e.target.value })}
                    placeholder="14"
                  />
                </div>
              )}

              {formData.rule_type === 'last_minute' && (
                <div className="space-y-2">
                  <Label>Maximum Days in Advance</Label>
                  <Input
                    type="number"
                    value={formData.max_advance_days}
                    onChange={(e) => setFormData({ ...formData, max_advance_days: e.target.value })}
                    placeholder="3"
                  />
                </div>
              )}

              {formData.rule_type === 'volume' && (
                <div className="space-y-2">
                  <Label>Minimum Quantity</Label>
                  <Input
                    type="number"
                    value={formData.min_quantity}
                    onChange={(e) => setFormData({ ...formData, min_quantity: e.target.value })}
                    placeholder="5"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Modifier Type</Label>
                  <Select value={formData.price_modifier_type} onValueChange={(v) => setFormData({ ...formData, price_modifier_type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Modifier Value</Label>
                  <Input
                    type="number"
                    value={formData.price_modifier_value}
                    onChange={(e) => setFormData({ ...formData, price_modifier_value: e.target.value })}
                    placeholder="-10"
                  />
                  <p className="text-xs text-muted-foreground">Use negative for discounts</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Input
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">Higher = applied first</p>
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
                  {editingRule ? 'Update' : 'Create'} Rule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rules Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : rules.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No pricing rules yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Modifier</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {rule.catalog_item?.title || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {ruleTypes.find(t => t.value === rule.rule_type)?.label || rule.rule_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={rule.price_modifier_value < 0 ? 'text-green-500' : 'text-red-500'}>
                        {getModifierDisplay(rule)}
                      </span>
                    </TableCell>
                    <TableCell>{rule.priority}</TableCell>
                    <TableCell>
                      <Badge variant={rule.is_active ? 'default' : 'secondary'}>
                        {rule.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(rule)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(rule.id)}>
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
