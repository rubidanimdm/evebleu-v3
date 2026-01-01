import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Shield } from 'lucide-react';
import { z } from 'zod';
import logo from '@/assets/logo.png';

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
            building_name: 'AI My Dubai Member',
            role: role,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Account exists',
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
        title: 'Welcome',
        description: 'Your account has been created.',
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
            <img src={logo} alt="AI My Dubai" className="w-24 h-24 mx-auto object-contain" />
            <div>
              <h1 className="text-xl font-medium text-foreground tracking-tight">AI My Dubai</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Concierge. It. Done.
              </p>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <Card
              className="cursor-pointer border-border/50 bg-card hover:border-primary/50 transition-luxury"
              onClick={() => handleRoleSelect('resident')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium">Request Access</CardTitle>
                    <CardDescription className="text-sm">Join as a private member</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card
              className="cursor-pointer border-border/50 bg-card hover:border-primary/50 transition-luxury"
              onClick={() => handleRoleSelect('manager')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium">Partner Access</CardTitle>
                    <CardDescription className="text-sm">Supplier or admin registration</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              variant="link" 
              onClick={() => navigate('/auth')} 
              className="text-muted-foreground hover:text-primary text-sm"
            >
              Already have access? Sign in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 bg-card">
        <CardHeader className="text-center pb-4">
          <img src={logo} alt="AI My Dubai" className="w-16 h-16 mx-auto mb-4 object-contain" />
          <CardTitle className="text-lg font-medium">Create Account</CardTitle>
          <CardDescription className="text-sm">
            {role === 'resident' ? 'Member Registration' : 'Partner Registration'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm text-muted-foreground">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="h-12 bg-background border-border/50 focus:border-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm text-muted-foreground">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+971 50 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12 bg-background border-border/50 focus:border-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 bg-background border-border/50 focus:border-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-muted-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-12 bg-background border-border/50 focus:border-primary/50"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 border-border/50"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1 h-12 font-medium" disabled={loading}>
                {loading ? 'Creating...' : 'Continue'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
