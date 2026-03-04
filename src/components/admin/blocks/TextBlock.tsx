import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface BlockEditorProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export default function TextBlock({ content, onChange }: BlockEditorProps) {
  return (
    <div className="space-y-2">
      <Label>Content</Label>
      <Textarea
        value={content.text || ''}
        onChange={(e) => onChange({ ...content, text: e.target.value })}
        placeholder="Write your content here... (supports markdown)"
        rows={6}
        className="font-mono text-sm"
      />
    </div>
  );
}
