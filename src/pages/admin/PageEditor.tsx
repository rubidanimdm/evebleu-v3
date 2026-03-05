import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft, Save, Plus, GripVertical, Trash2, ChevronUp, ChevronDown,
  Type, Image, Video, MousePointer, Minus, LayoutGrid, Ship,
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import TextBlock from '@/components/admin/blocks/TextBlock';
import ImageBlock from '@/components/admin/blocks/ImageBlock';
import VideoBlock from '@/components/admin/blocks/VideoBlock';
import CTABlock from '@/components/admin/blocks/CTABlock';
import DividerBlock from '@/components/admin/blocks/DividerBlock';
import VenueGridBlock from '@/components/admin/blocks/VenueGridBlock';
import YachtCarouselBlock from '@/components/admin/blocks/YachtCarouselBlock';

interface PageBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'cta' | 'divider' | 'venue_grid' | 'yacht_carousel';
  content: Record<string, any>;
  order: number;
}

const BLOCK_TYPES = [
  { type: 'text', label: 'Text', icon: Type },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'video', label: 'Video', icon: Video },
  { type: 'cta', label: 'Call to Action', icon: MousePointer },
  { type: 'divider', label: 'Divider', icon: Minus },
  { type: 'venue_grid', label: 'Venue Grid', icon: LayoutGrid },
  { type: 'yacht_carousel', label: 'Yacht Carousel', icon: Ship },
] as const;

const BLOCK_EDITORS: Record<string, React.FC<{ content: Record<string, any>; onChange: (c: Record<string, any>) => void }>> = {
  text: TextBlock,
  image: ImageBlock,
  video: VideoBlock,
  cta: CTABlock,
  divider: DividerBlock,
  venue_grid: VenueGridBlock,
  yacht_carousel: YachtCarouselBlock,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function PageEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [layoutTemplate, setLayoutTemplate] = useState('standard');
  const [isPublished, setIsPublished] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [blocks, setBlocks] = useState<PageBlock[]>([]);

  useEffect(() => {
    if (!isNew) fetchPage();
  }, [id]);

  async function fetchPage() {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Page not found');

      setTitle(data.title || '');
      setSlug(data.slug || '');
      setSlugManual(true);
      setMetaTitle(data.meta_title || '');
      setMetaDescription(data.meta_description || '');
      setFeaturedImageUrl(data.featured_image_url || '');
      setCategory(data.category || '');
      setTags((data.tags || []).join(', '));
      setLayoutTemplate(data.layout_template || 'standard');
      setIsPublished(data.is_published || false);
      setCreatedAt(data.created_at || '');
      setUpdatedAt(data.updated_at || '');
      setBlocks(data.blocks || []);
    } catch (error) {
      console.error('Error fetching page:', error);
      toast({ title: 'Error loading page', variant: 'destructive' });
      navigate('/admin/pages');
    } finally {
      setLoading(false);
    }
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManual) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugManual(true);
    setSlug(slugify(value));
  }

  function addBlock(type: PageBlock['type']) {
    const newBlock: PageBlock = {
      id: crypto.randomUUID(),
      type,
      content: {},
      order: blocks.length,
    };
    setBlocks([...blocks, newBlock]);
  }

  function updateBlockContent(blockId: string, content: Record<string, any>) {
    setBlocks(blocks.map((b) => (b.id === blockId ? { ...b, content } : b)));
  }

  function removeBlock(blockId: string) {
    setBlocks(blocks.filter((b) => b.id !== blockId).map((b, i) => ({ ...b, order: i })));
  }

  function moveBlock(blockId: string, direction: -1 | 1) {
    const idx = blocks.findIndex((b) => b.id === blockId);
    if (idx < 0) return;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= blocks.length) return;
    const updated = [...blocks];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    setBlocks(updated.map((b, i) => ({ ...b, order: i })));
  }

  async function handleSave() {
    if (!title.trim()) {
      toast({ title: 'Title is required', variant: 'destructive' });
      return;
    }
    if (!slug.trim()) {
      toast({ title: 'Slug is required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const pageData: Record<string, any> = {
        title: title.trim(),
        slug: slug.trim(),
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
        featured_image_url: featuredImageUrl.trim() || null,
        category: category.trim() || null,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        layout_template: layoutTemplate,
        is_published: isPublished,
        blocks,
        updated_at: new Date().toISOString(),
      };

      if (isPublished && !createdAt) {
        pageData.published_at = new Date().toISOString();
      }

      let result;
      if (isNew) {
        result = await supabase.from('pages').insert(pageData).select().single();
      } else {
        result = await supabase.from('pages').update(pageData).eq('id', id).select().single();
      }

      if (result.error) throw result.error;

      toast({ title: isNew ? 'Page created' : 'Page saved' });

      if (isNew && result.data?.id) {
        navigate(`/admin/pages/${result.data.id}/edit`, { replace: true });
      }
    } catch (error: any) {
      console.error('Error saving page:', error);
      toast({
        title: 'Error saving page',
        description: error?.message || 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/pages')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{isNew ? 'New Page' : 'Edit Page'}</h1>
            {!isNew && slug && (
              <p className="text-sm text-muted-foreground">/{slug}</p>
            )}
          </div>
        </div>
        <Button className="gap-2" onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>

      {/* Title */}
      <div className="bg-card/50 border border-border/40 rounded-xl p-6">
        <div className="space-y-2">
          <Label>Page Title</Label>
          <Input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter page title"
            className="text-lg font-semibold"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">
              {blocks.length} block{blocks.length !== 1 ? 's' : ''}
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Block
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {BLOCK_TYPES.map((bt) => (
                  <DropdownMenuItem
                    key={bt.type}
                    onClick={() => addBlock(bt.type as PageBlock['type'])}
                    className="gap-2"
                  >
                    <bt.icon className="h-4 w-4" />
                    {bt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {blocks.length === 0 ? (
            <div className="bg-card/50 border border-border/40 rounded-xl p-12 text-center">
              <Type className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground">No blocks yet. Add your first block to start building the page.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {blocks.map((block, idx) => {
                const Editor = BLOCK_EDITORS[block.type];
                const blockMeta = BLOCK_TYPES.find((bt) => bt.type === block.type);
                return (
                  <div
                    key={block.id}
                    className="bg-card/50 border border-border/40 rounded-xl overflow-hidden"
                  >
                    {/* Block header */}
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border/30 bg-muted/30">
                      <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                      <Badge variant="outline" className="text-xs">
                        {blockMeta?.label || block.type}
                      </Badge>
                      <div className="flex-1" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => moveBlock(block.id, -1)}
                        disabled={idx === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => moveBlock(block.id, 1)}
                        disabled={idx === blocks.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => removeBlock(block.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    {/* Block editor */}
                    <div className="p-4">
                      {Editor && (
                        <Editor
                          content={block.content}
                          onChange={(content) => updateBlockContent(block.id, content)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo">
          <div className="bg-card/50 border border-border/40 rounded-xl p-6 space-y-4">
            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO title (defaults to page title if empty)"
              />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Brief description for search engines"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">/</span>
                <Input
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="page-url-slug"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Featured Image URL</Label>
              <Input
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                placeholder="https://example.com/featured-image.jpg"
              />
              {featuredImageUrl && (
                <div className="rounded-lg overflow-hidden border border-border/40 mt-2">
                  <img
                    src={featuredImageUrl}
                    alt="Featured"
                    className="w-full max-h-32 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="bg-card/50 border border-border/40 rounded-xl p-6 space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Guide, News, About"
              />
            </div>
            <div className="space-y-2">
              <Label>Tags (comma-separated)</Label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="luxury, dubai, dining"
              />
            </div>
            <div className="space-y-2">
              <Label>Layout Template</Label>
              <Select value={layoutTemplate} onValueChange={setLayoutTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="full-width">Full Width</SelectItem>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Switch
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
              <Label>Published</Label>
              {isPublished && (
                <Badge variant="outline" className="border-green-500/50 text-green-500">Live</Badge>
              )}
            </div>
            {(createdAt || updatedAt) && (
              <div className="pt-4 border-t border-border/30 space-y-2 text-sm text-muted-foreground">
                {createdAt && <p>Created: {formatDate(createdAt)}</p>}
                {updatedAt && <p>Last updated: {formatDate(updatedAt)}</p>}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
