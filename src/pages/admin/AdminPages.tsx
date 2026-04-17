import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, FileText, Search } from 'lucide-react';

interface Page {
  id: string;
  slug: string;
  title: string;
  is_published: boolean;
  category: string | null;
  updated_at: string;
  published_at: string | null;
}

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('id, slug, title, is_published, category, updated_at, published_at')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({ title: 'Error loading pages', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  const categories = Array.from(new Set(pages.map(p => p.category).filter(Boolean))) as string[];

  const filteredPages = pages.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || page.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const { error } = await supabase.from('pages').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Page deleted' });
      fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({ title: 'Error deleting page', variant: 'destructive' });
    }
  }

  async function togglePublished(id: string, currentState: boolean) {
    try {
      const updates: Record<string, unknown> = { is_published: !currentState };
      if (!currentState) {
        updates.published_at = new Date().toISOString();
      }
      const { error } = await supabase
        .from('pages')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      fetchPages();
    } catch (error) {
      console.error('Error updating page:', error);
      toast({ title: 'Error updating page', variant: 'destructive' });
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pages</h1>
          <p className="text-muted-foreground">Manage website pages and content</p>
        </div>
        <Button className="gap-2" onClick={() => navigate('/admin/pages/new')}>
          <Plus className="h-4 w-4" />
          New Page
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pages Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No pages found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <p className="font-medium">{page.title}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      /{page.slug}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        page.is_published
                          ? 'border-green-500/50 text-green-500'
                          : 'border-muted-foreground/50 text-muted-foreground'
                      }>
                        {page.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {page.category || '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(page.updated_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Switch
                          checked={page.is_published}
                          onCheckedChange={() => togglePublished(page.id, page.is_published)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/pages/${page.id}/edit`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(page.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Blog Articles Note */}
      <Card className="border-border/50">
        <CardContent className="py-6 text-center">
          <p className="text-muted-foreground text-sm">
            Blog articles are managed as pages with category "blog". Use the table above to edit them.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
