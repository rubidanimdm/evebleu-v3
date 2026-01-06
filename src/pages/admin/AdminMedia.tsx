import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, Upload, Trash2 } from 'lucide-react';

export default function AdminMedia() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">Manage images and assets</p>
        </div>
        <Button className="gap-2"><Upload className="h-4 w-4" />Upload Images</Button>
      </div>
      <Card className="border-border/50">
        <CardContent className="py-12 text-center">
          <Image className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">Media library coming soon</p>
          <p className="text-sm text-muted-foreground mt-1">Upload and manage service images here</p>
        </CardContent>
      </Card>
    </div>
  );
}
