import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface BlockEditorProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export default function VideoBlock({ content, onChange }: BlockEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Video URL</Label>
        <Input
          value={content.src || ''}
          onChange={(e) => onChange({ ...content, src: e.target.value })}
          placeholder="https://example.com/video.mp4 or YouTube URL"
        />
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={content.autoplay || false}
          onCheckedChange={(checked) => onChange({ ...content, autoplay: checked })}
        />
        <Label>Autoplay</Label>
      </div>
      {content.src && (
        <p className="text-xs text-muted-foreground">
          Video preview will be shown on the published page.
        </p>
      )}
    </div>
  );
}
