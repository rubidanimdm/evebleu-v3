import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Ship } from 'lucide-react';

interface BlockEditorProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export default function YachtCarouselBlock({ content, onChange }: BlockEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Max Items</Label>
        <Input
          type="number"
          value={content.maxItems ?? 4}
          onChange={(e) => onChange({ ...content, maxItems: parseInt(e.target.value) || 4 })}
          min={1}
          max={12}
        />
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={content.showPrice ?? true}
          onCheckedChange={(checked) => onChange({ ...content, showPrice: checked })}
        />
        <Label>Show Price</Label>
      </div>
      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
        <Ship className="h-4 w-4 shrink-0" />
        This block will show live yacht data from the database.
      </div>
    </div>
  );
}
