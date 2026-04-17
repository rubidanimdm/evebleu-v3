import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image, Film, Copy, Check } from 'lucide-react';
import { MEDIA_ASSETS, CATEGORIES, type MediaAsset } from '@/lib/media-registry';

function getThumbUrl(asset: MediaAsset): string {
  // public/ files use direct path
  if (asset.path.startsWith('/') && !asset.path.startsWith('/src/')) {
    return asset.path;
  }
  // src/assets — Vite serves them in dev via the path as-is
  return asset.path;
}

const CATEGORY_COLORS: Record<string, string> = {
  blog: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  yacht: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  logo: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  icon: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  video: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  hero: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  misc: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export default function AdminMedia() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<MediaAsset | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    return MEDIA_ASSETS.filter((a) => {
      if (category !== 'all' && a.category !== category) return false;
      if (search && !a.filename.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, category]);

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    MEDIA_ASSETS.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  function handleCopyPath(path: string) {
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Media Library</h1>
        <p className="text-muted-foreground">
          {MEDIA_ASSETS.length} assets &mdash;{' '}
          {Object.entries(stats)
            .map(([cat, count]) => `${count} ${cat}`)
            .join(', ')}
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search by filename..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <Tabs value={category} onValueChange={setCategory} className="w-full overflow-auto">
          <TabsList className="flex-wrap h-auto">
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value} className="text-xs">
                {cat.label}
                {cat.value !== 'all' && stats[cat.value] ? (
                  <span className="ml-1 text-muted-foreground">({stats[cat.value]})</span>
                ) : cat.value === 'all' ? (
                  <span className="ml-1 text-muted-foreground">({MEDIA_ASSETS.length})</span>
                ) : null}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Results count */}
      {search && (
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} of {MEDIA_ASSETS.length} assets
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center">
            <Image className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No assets match your filter</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((asset) => (
            <Card
              key={asset.id}
              className="border-border/50 cursor-pointer hover:border-[#E6B800]/50 transition-colors overflow-hidden group"
              onClick={() => setSelected(asset)}
            >
              <div className="aspect-square bg-black/30 relative flex items-center justify-center overflow-hidden">
                {asset.type === 'video' ? (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Film className="h-10 w-10" />
                    <span className="text-xs">Video</span>
                  </div>
                ) : (
                  <img
                    src={getThumbUrl(asset)}
                    alt={asset.filename}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML =
                        '<div class="flex items-center justify-center h-full text-muted-foreground"><span class="text-xs">Preview unavailable</span></div>';
                    }}
                  />
                )}
              </div>
              <CardContent className="p-2">
                <p className="text-xs truncate font-medium" title={asset.filename}>
                  {asset.filename}
                </p>
                <Badge className={`mt-1 text-[10px] px-1.5 py-0 ${CATEGORY_COLORS[asset.category] || ''}`}>
                  {asset.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Preview dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="truncate">{selected.filename}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-black/30 rounded-lg overflow-hidden flex items-center justify-center min-h-[200px]">
                {selected.type === 'video' ? (
                  <video
                    src={getThumbUrl(selected)}
                    controls
                    className="max-h-[400px] w-full"
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={getThumbUrl(selected)}
                    alt={selected.filename}
                    className="max-h-[400px] object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={CATEGORY_COLORS[selected.category] || ''}>
                  {selected.category}
                </Badge>
                <Badge variant="outline">{selected.type}</Badge>
                <Badge variant="outline">{selected.path.split('.').pop()?.toUpperCase()}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Input readOnly value={selected.path} className="font-mono text-xs" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyPath(selected.path)}
                  title="Copy path"
                >
                  {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
