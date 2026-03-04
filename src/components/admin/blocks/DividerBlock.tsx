import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BlockEditorProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export default function DividerBlock({ content, onChange }: BlockEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Label (optional)</Label>
        <Input
          value={content.label || ''}
          onChange={(e) => onChange({ ...content, label: e.target.value })}
          placeholder="e.g. Section Break"
        />
      </div>
      <div className="flex items-center gap-4 py-2">
        <div className="flex-1 border-t border-border/60" />
        {content.label && (
          <>
            <span className="text-xs text-muted-foreground">{content.label}</span>
            <div className="flex-1 border-t border-border/60" />
          </>
        )}
      </div>
    </div>
  );
}
