import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Crown } from 'lucide-react';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  fullName: z.string().min(2, { message: 'Please enter your full name' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
});

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'resident' | 'manager' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole: 'resident' | 'manager') => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      signupSchema.parse(formData);
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            building_name: 'LUXE Member',
            role: role,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Account already exists',
            description: 'Please sign in instead.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Registration failed',
            description: error.message,
            variant: 'destructive',
          });
        }
        return;
      }

      toast({
        title: 'Welcome to LUXE',
        description: 'Your concierge account has been created.',
      });

      navigate('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-gold-dark">
              <span className="text-primary-foreground font-bold text-3xl font-serif">L</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground font-serif tracking-wide">LUXE</h1>
              <p className="text-lg text-muted-foreground mt-2">
                Your Personal AI Concierge
              </p>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Discover and book the most exclusive experiences, curated just for you.
            </p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <Card
              className="cursor-pointer hover:border-primary transition-all hover:shadow-lg group"
              onClick={() => handleRoleSelect('resident')}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl group-hover:from-primary/30 transition-colors">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Join as a Member</CardTitle>
                    <CardDescription>Access exclusive experiences and bookings</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card
              className="cursor-pointer hover:border-primary transition-all hover:shadow-lg group"
              onClick={() => handleRoleSelect('manager')}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl group-hover:from-primary/30 transition-colors">
                    <Crown className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Partner / Admin</CardTitle>
                    <CardDescription>Manage suppliers and bookings</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="link" onClick={() => navigate('/auth')} className="text-muted-foreground">
              Already have an account? Sign in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-xl font-serif">L</span>
          </div>
          <CardTitle className="text-2xl font-serif">Create Your Account</CardTitle>
          <CardDescription>
            {role === 'resident' ? 'Member Registration' : 'Partner Registration'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-12"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1 h-12" disabled={loading}>
                {loading ? 'Creating...' : 'Get Started'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}