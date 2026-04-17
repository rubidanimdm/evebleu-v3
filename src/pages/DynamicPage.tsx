import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { PageBlockRenderer } from '@/components/PageBlockRenderer';
import { useLanguage } from '@/lib/i18n';
import { updateSEO, resetSEO } from '@/lib/seo';

interface PageData {
  id: string;
  slug: string;
  title: string;
  content_blocks: Array<{
    id: string;
    type: string;
    content: Record<string, any>;
    order: number;
  }>;
  meta_title: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  is_published: boolean;
}

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPage() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('pages')
        .select('id, slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setPage(data as PageData);
        updateSEO({
          title: data.meta_title || data.title,
          description: data.meta_description || undefined,
          canonicalPath: `/p/${data.slug}`,
          ogImage: data.featured_image_url || undefined,
          ogType: 'article',
        });
      }
      setLoading(false);
    }

    fetchPage();
    return () => resetSEO();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <p className="text-muted-foreground">{t('pages.pageNotFound')}</p>
          <a href="/" className="inline-block text-primary hover:underline">
            &larr; {t('nav.home') || 'Home'}
          </a>
        </div>
      </div>
    );
  }

  const blocks = [...(page.content_blocks || [])].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">{page.title}</h1>
        <div className="space-y-6">
          {blocks.map((block) => (
            <PageBlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
