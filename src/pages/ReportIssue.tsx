import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Zap, Droplet, Building, Sparkles, Car, MoreHorizontal, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const issueSchema = z.object({
  category: z.enum(['electricity', 'water', 'elevator', 'cleaning', 'parking', 'other']),
  description: z.string().min(10, { message: 'Please describe the issue (at least 10 characters)' }).max(500),
});

const categories = [
  { id: 'electricity', label: 'Electricity', icon: Zap },
  { id: 'water', label: 'Water / Plumbing', icon: Droplet },
  { id: 'elevator', label: 'Elevator', icon: Building },
  { id: 'cleaning', label: 'Cleaning', icon: Sparkles },
  { id: 'parking', label: 'Parking', icon: Car },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

export default function ReportIssue() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      issueSchema.parse({ category, description });

      setLoading(true);

      const { data, error } = await supabase
        .from('tickets')
        .insert({
          category: category as any,
          description,
          apartment_unit: profile?.apartment_unit || '',
          created_by: profile?.id,
          ticket_number: '',
        })
        .select()
        .single();

      if (error) throw error;

      setTicketNumber(data.ticket_number);
      setStep(3);

      toast({
        title: 'Report submitted!',
        description: 'The building manager has been notified.',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to submit report. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto p-4">
          <Card className="mt-8">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <CardTitle>Thank You!</CardTitle>
              <CardDescription>
                Your report was sent to the building manager.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Your ticket number:</p>
                <p className="text-2xl font-bold text-primary">{ticketNumber}</p>
              </div>
              <div className="space-y-2">
                <Button className="w-full" onClick={() => navigate('/my-tickets')}>
                  Track My Issues
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => step === 1 ? navigate('/') : setStep(1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Report an Issue</h1>
            <p className="text-sm text-muted-foreground">
              Step {step} of 2
            </p>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-3">
            <p className="text-lg font-semibold">What's the problem?</p>
            {categories.map(({ id, label, icon: Icon }) => (
              <Card
                key={id}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleCategorySelect(id)}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="text-lg font-semibold">{label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Describe the Issue</CardTitle>
                <CardDescription>
                  Please provide details about the problem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <div className="p-3 bg-muted rounded-lg">
                    {categories.find(c => c.id === category)?.label}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Apartment/Unit</label>
                  <div className="p-3 bg-muted rounded-lg">
                    {profile?.apartment_unit}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    What's the problem? *
                  </label>
                  <Textarea
                    placeholder="Describe the issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    maxLength={500}
                    required
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {description.length}/500 characters
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? 'Submitting...' : 'Send Report'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
