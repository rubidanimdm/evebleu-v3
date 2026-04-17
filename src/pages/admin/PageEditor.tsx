import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, ChevronDown, ChevronUp, X } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface CategoryOption {
  id: string;
  name: Record<string, string>;
  slug: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function CollapsiblePanel({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card/50 border border-border/40 rounded-xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/30 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-4 pb-4 space-y-3 border-t border-border/30">{children}</div>}
    </div>
  );
}

export default function PageEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

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
  const [tagInput, setTagInput] = useState('');
  const [layoutTemplate, setLayoutTemplate] = useState('standard');
  const [isPublished, setIsPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);

  useEffect(() => {
    if (!isNew) fetchPage();
    fetchCategories();
  }, [id]);

  async function fetchCategories() {
    try {
      const { data, error } = await (supabase as any)
        .from('categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (!error && data) setCategoryOptions(data);
    } catch {
      // Categories table may not exist yet
    }
  }

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
      setPublishedAt(data.published_at || '');
      setCreatedAt(data.created_at || '');
      setUpdatedAt(data.updated_at || '');

      // Join all content_blocks text into a single HTML string
      const blocks = data.content_blocks || [];
      const html = blocks
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
        .map((block: any) => {
          if (typeof block.content === 'string') return block.content;
          if (block.content?.text) return block.content.text;
          if (block.content?.html) return block.content.html;
          return '';
        })
        .filter(Boolean)
        .join('\n');
      setBodyHtml(html);
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

  const tagsList = tags.split(',').map((t) => t.trim()).filter(Boolean);

  function addTag() {
    const newTag = tagInput.trim();
    if (!newTag) return;
    if (!tagsList.includes(newTag)) {
      const updated = [...tagsList, newTag].join(', ');
      setTags(updated);
    }
    setTagInput('');
  }

  function removeTag(tag: string) {
    const updated = tagsList.filter((t) => t !== tag).join(', ');
    setTags(updated);
  }

  function handleTagKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  }

  async function handleSave(publish?: boolean) {
    if (!title.trim()) {
      toast({ title: 'Title is required', variant: 'destructive' });
      return;
    }
    if (!slug.trim()) {
      toast({ title: 'Slug is required', variant: 'destructive' });
      return;
    }

    const shouldPublish = publish !== undefined ? publish : isPublished;

    setSaving(true);
    try {
      const contentBlocks = [{
        id: crypto.randomUUID(),
        type: 'text',
        content: { text: bodyHtml },
        order: 0,
      }];

      const pageData: Record<string, any> = {
        title: title.trim(),
        slug: slug.trim(),
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
        featured_image_url: featuredImageUrl.trim() || null,
        category: category.trim() || null,
        tags: tagsList,
        layout_template: layoutTemplate,
        is_published: shouldPublish,
        content_blocks: contentBlocks,
        updated_at: new Date().toISOString(),
      };

      if (shouldPublish && !publishedAt) {
        pageData.published_at = new Date().toISOString();
      }

      if (publish !== undefined) {
        setIsPublished(shouldPublish);
      }

      let result;
      if (isNew) {
        result = await supabase.from('pages').insert(pageData).select().single();
      } else {
        result = await supabase.from('pages').update(pageData).eq('id', id).select().single();
      }

      if (result.error) throw result.error;

      toast({ title: isNew ? 'Page created' : (publish ? 'Page published' : 'Page saved') });

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
    <div className="space-y-4">
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
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main column */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Title */}
          <div className="bg-card/50 border border-border/40 rounded-xl p-4">
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter page title"
              className="text-2xl font-bold border-0 bg-transparent px-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/40"
            />
          </div>

          {/* Body — Rich Text Editor */}
          <RichTextEditor content={bodyHtml} onChange={setBodyHtml} />

          {/* SEO section */}
          <CollapsiblePanel title="SEO Settings" defaultOpen={false}>
            <div className="space-y-2 pt-2">
              <Label className="text-xs text-muted-foreground">Meta Title</Label>
              <Input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO title (defaults to page title if empty)"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Meta Description</Label>
              <Textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Brief description for search engines"
                rows={3}
              />
            </div>
          </CollapsiblePanel>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-4 flex-shrink-0">
          {/* Publish panel */}
          <CollapsiblePanel title="Publish">
            <div className="flex items-center gap-2 pt-2">
              <div className={`h-2 w-2 rounded-full ${isPublished ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-sm">{isPublished ? 'Published' : 'Draft'}</span>
            </div>
            {publishedAt && (
              <p className="text-xs text-muted-foreground">Published: {formatDate(publishedAt)}</p>
            )}
            {updatedAt && (
              <p className="text-xs text-muted-foreground">Updated: {formatDate(updatedAt)}</p>
            )}
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleSave(false)}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                size="sm"
                className="flex-1 gap-1.5"
                onClick={() => handleSave(true)}
                disabled={saving}
              >
                <Save className="h-3.5 w-3.5" />
                {saving ? 'Saving...' : 'Publish'}
              </Button>
            </div>
          </CollapsiblePanel>

          {/* Category */}
          <CollapsiblePanel title="Category">
            <div className="pt-2">
              {categoryOptions.length > 0 ? (
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {categoryOptions.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug}>
                        {cat.name?.[language] || cat.name?.en || cat.slug}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Guide, News, About"
                />
              )}
            </div>
          </CollapsiblePanel>

          {/* Tags */}
          <CollapsiblePanel title="Tags">
            <div className="pt-2">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tag..."
                  className="text-sm"
                />
                <Button variant="outline" size="sm" onClick={addTag}>Add</Button>
              </div>
              {tagsList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tagsList.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-0.5 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CollapsiblePanel>

          {/* Featured Image */}
          <CollapsiblePanel title="Featured Image">
            <div className="space-y-2 pt-2">
              <Input
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="text-sm"
              />
              {featuredImageUrl && (
                <div className="rounded-lg overflow-hidden border border-border/40">
                  <img
                    src={featuredImageUrl}
                    alt="Featured"
                    className="w-full max-h-40 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}
            </div>
          </CollapsiblePanel>

          {/* URL Slug */}
          <CollapsiblePanel title="URL Slug">
            <div className="pt-2">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">/</span>
                <Input
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="page-url-slug"
                  className="text-sm"
                />
              </div>
            </div>
          </CollapsiblePanel>

          {/* Layout Template */}
          <CollapsiblePanel title="Layout Template">
            <div className="pt-2">
              <Select value={layoutTemplate} onValueChange={setLayoutTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="landing">Landing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsiblePanel>
        </div>
      </div>
    </div>
  );
}
