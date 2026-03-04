import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { LayoutGrid } from 'lucide-react';

interface BlockEditorProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

const VENUE_CATEGORIES = ['DINING', 'CLUB', 'YACHT', 'EXPERIENCE', 'HOTEL', 'TRANSPORT', 'FLIGHT'] as const;

export default function VenueGridBlock({ content, onChange }: BlockEditorProps) {
  const selectedCategories: string[] = content.categories || [];

  function toggleCategory(cat: string) {
    const updated = selectedCategories.includes(cat)
      ? selectedCategories.filter((c: string) => c !== cat)
      : [...selectedCategories, cat];
    onChange({ ...content, categories: updated });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Categories</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {VENUE_CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Max Items</Label>
        <Input
          type="number"
          value={content.maxItems ?? 6}
          onChange={(e) => onChange({ ...content, maxItems: parseInt(e.target.value) || 6 })}
          min={1}
          max={24}
        />
      </div>
      <div className="space-y-2">
        <Label>Layout</Label>
        <Select
          value={content.layout || 'grid'}
          onValueChange={(value) => onChange({ ...content, layout: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="list">List</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={content.featuredOnly || false}
          onCheckedChange={(checked) => onChange({ ...content, featuredOnly: checked })}
        />
        <Label>Featured Only</Label>
      </div>
      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
        <LayoutGrid className="h-4 w-4 shrink-0" />
        This block will show live venue data from the database.
      </div>
    </div>
  );
}
