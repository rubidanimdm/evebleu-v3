import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure application settings</p>
      </div>
      <Card className="border-border/50">
        <CardContent className="py-12 text-center">
          <Settings className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">Settings panel coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
}
