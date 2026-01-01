import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  async function uploadImage(file: File, folder: string = 'catalog'): Promise<string | null> {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('catalog-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
        return null;
      }

      const { data } = supabase.storage.from('catalog-images').getPublicUrl(fileName);
      return data.publicUrl;
    } catch (error) {
      toast({ title: 'Upload failed', variant: 'destructive' });
      return null;
    } finally {
      setUploading(false);
    }
  }

  async function deleteImage(url: string): Promise<boolean> {
    try {
      // Extract path from URL
      const path = url.split('/catalog-images/')[1];
      if (!path) return false;

      const { error } = await supabase.storage.from('catalog-images').remove([path]);
      return !error;
    } catch {
      return false;
    }
  }

  return { uploadImage, deleteImage, uploading };
}
