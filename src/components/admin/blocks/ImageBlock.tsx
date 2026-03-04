import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BlockEditorProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export default function ImageBlock({ content, onChange }: BlockEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input
          value={content.src || ''}
          onChange={(e) => onChange({ ...content, src: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div className="space-y-2">
        <Label>Alt Text</Label>
        <Input
          value={content.alt || ''}
          onChange={(e) => onChange({ ...content, alt: e.target.value })}
          placeholder="Describe the image"
        />
      </div>
      <div className="space-y-2">
        <Label>Caption</Label>
        <Input
          value={content.caption || ''}
          onChange={(e) => onChange({ ...content, caption: e.target.value })}
          placeholder="Optional caption"
        />
      </div>
      {content.src && (
        <div className="rounded-lg overflow-hidden border border-border/40">
          <img
            src={content.src}
            alt={content.alt || 'Preview'}
            className="w-full max-h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
}
