import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BlockEditorProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export default function CTABlock({ content, onChange }: BlockEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Button Text</Label>
        <Input
          value={content.text || ''}
          onChange={(e) => onChange({ ...content, text: e.target.value })}
          placeholder="e.g. Book Now"
        />
      </div>
      <div className="space-y-2">
        <Label>URL</Label>
        <Input
          value={content.url || ''}
          onChange={(e) => onChange({ ...content, url: e.target.value })}
          placeholder="https://example.com or /page-slug"
        />
      </div>
      <div className="space-y-2">
        <Label>Style</Label>
        <Select
          value={content.style || 'primary'}
          onValueChange={(value) => onChange({ ...content, style: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="ghost">Ghost</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
