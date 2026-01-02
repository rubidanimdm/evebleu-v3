import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Upload, X, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const catalogItemSchema = z.object({
  category: z.enum(['DINING', 'TRANSPORT', 'HOTEL', 'FLIGHT', 'CLUB', 'EXPERIENCE']),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
  price: z.number().min(0, 'Price cannot be negative').max(10000000, 'Price is too high'),
  currency: z.enum(['AED', 'USD', 'EUR']),
  pricing_unit: z.enum(['per day', 'per hour', 'per night', 'per person', 'total']),
  short_description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  details: z.record(z.string().max(200, 'Detail value too long')).optional(),
  is_active: z.boolean(),
  sort_order: z.number().int().min(0).max(10000),
});

export interface CatalogItemFormData {
  id?: string;
  category: string;
  title: string;
  image_url: string;
  price: number;
  currency: string;
  pricing_unit: string;
  short_description: string;
  details: Record<string, string>;
  is_active: boolean;
  sort_order: number;
}

const CATEGORIES = ['DINING', 'TRANSPORT', 'HOTEL', 'FLIGHT', 'CLUB', 'EXPERIENCE'] as const;

const DEFAULT_DETAILS: Record<string, string[]> = {
  TRANSPORT: ['seats', 'luggage', 'transmission', 'fuel'],
  HOTEL: ['rooms', 'amenities', 'check_in', 'check_out'],
  DINING: ['cuisine', 'dress_code', 'reservation'],
  FLIGHT: ['class', 'airline', 'duration'],
  CLUB: ['dress_code', 'age_limit', 'capacity'],
  EXPERIENCE: ['duration', 'group_size', 'includes'],
};

interface Props {
  initialData?: CatalogItemFormData;
  onSave: (data: CatalogItemFormData) => Promise<void>;
  onCancel: () => void;
}

export function CatalogItemForm({ initialData, onSave, onCancel }: Props) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CatalogItemFormData>(
    initialData || {
      category: 'TRANSPORT',
      title: '',
      image_url: '',
      price: 0,
      currency: 'AED',
      pricing_unit: 'per day',
      short_description: '',
      details: {},
      is_active: true,
      sort_order: 0,
    }
  );
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, uploading } = useImageUpload();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const url = await uploadImage(file, formData.category.toLowerCase());
    if (url) {
      setFormData(prev => ({ ...prev, image_url: url }));
    }
  };

  const handleDetailChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [key]: value },
    }));
  };

  const handleSubmit = async () => {
    // Build validation payload
    const rawPayload = {
      category: formData.category,
      title: formData.title.trim(),
      image_url: formData.image_url.trim() || '',
      price: formData.price,
      currency: formData.currency,
      pricing_unit: formData.pricing_unit,
      short_description: formData.short_description?.trim() || '',
      details: formData.details,
      is_active: formData.is_active,
      sort_order: formData.sort_order,
    };

    // Validate with Zod schema
    const validation = catalogItemSchema.safeParse(rawPayload);
    if (!validation.success) {
      const errorMessage = validation.error.errors.map(e => e.message).join(', ');
      toast({ title: 'Validation Error', description: errorMessage, variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  const detailFields = DEFAULT_DETAILS[formData.category] || [];

  return (
    <div className="space-y-5">
      {/* Category & Title */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-muted-foreground">Category *</Label>
          <Select 
            value={formData.category} 
            onValueChange={v => setFormData(prev => ({ ...prev, category: v, details: {} }))}
          >
            <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Title *</Label>
          <Input
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Mercedes G-Class"
            className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label className="text-muted-foreground">Image</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        {formData.image_url ? (
          <div className="relative rounded-xl overflow-hidden border border-primary/20">
            <img src={formData.image_url} alt="Preview" className="w-full h-40 object-cover" />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="w-full h-24 border-dashed border-primary/30 hover:border-primary/50 rounded-xl"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-5 h-5 text-primary/60" />
                <span className="text-sm text-muted-foreground">Upload Image</span>
              </div>
            )}
          </Button>
        )}
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label className="text-muted-foreground">Price *</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={e => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
            className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Currency</Label>
          <Select value={formData.currency} onValueChange={v => setFormData(prev => ({ ...prev, currency: v }))}>
            <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg">
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
          <Label className="text-muted-foreground">Unit</Label>
          <Select value={formData.pricing_unit} onValueChange={v => setFormData(prev => ({ ...prev, pricing_unit: v }))}>
            <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="per day">per day</SelectItem>
              <SelectItem value="per hour">per hour</SelectItem>
              <SelectItem value="per night">per night</SelectItem>
              <SelectItem value="per person">per person</SelectItem>
              <SelectItem value="total">total</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-muted-foreground">Short Description</Label>
        <Textarea
          value={formData.short_description}
          onChange={e => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
          placeholder="Luxury SUV with chauffeur service..."
          className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg min-h-[80px]"
        />
      </div>

      {/* Category-specific Details */}
      {detailFields.length > 0 && (
        <div className="space-y-3">
          <Label className="text-muted-foreground">Details (Optional)</Label>
          <div className="grid grid-cols-2 gap-3">
            {detailFields.map(field => (
              <div key={field} className="space-y-1">
                <Label className="text-xs text-muted-foreground capitalize">{field.replace('_', ' ')}</Label>
                <Input
                  value={formData.details[field] || ''}
                  onChange={e => handleDetailChange(field, e.target.value)}
                  placeholder={field === 'seats' ? '4' : field === 'transmission' ? 'Automatic' : ''}
                  className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg h-9 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sort Order & Active */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <Label className="text-muted-foreground text-sm">Sort Order</Label>
          <Input
            type="number"
            value={formData.sort_order}
            onChange={e => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
            className="w-20 bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg h-9"
          />
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={formData.is_active}
            onCheckedChange={c => setFormData(prev => ({ ...prev, is_active: c }))}
          />
          <Label className="text-foreground">Active</Label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1 border-primary/20 hover:bg-primary/5 rounded-xl"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!formData.title.trim() || saving}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : initialData?.id ? 'Update' : 'Create'}
        </Button>
      </div>
    </div>
  );
}
