import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Shield } from 'lucide-react';
import { z } from 'zod';
import logo from '@/assets/eve-blue-logo.jpeg';
import { GoldParticles, GoldDivider, LuxuryCard } from '@/components/LuxuryElements';

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
            building_name: 'EVE BLUE Member',
            role: role,
          },
          emailRedirectTo: `${window.location.origin}/concierge`,
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

      navigate('/concierge');
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
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <GoldParticles count={25} />
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />
        
        <div className="relative z-10 w-full max-w-md space-y-10">
          {/* Logo and brand */}
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-2xl bg-primary/10 rounded-full scale-150" />
              <img src={logo} alt="EVE BLUE" className="relative w-24 h-24 object-contain mx-auto" />
            </div>
            <div>
              <h1 className="text-2xl font-medium text-primary tracking-tight">EVE BLUE</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Concierge. It. Done.
              </p>
            </div>
          </div>

          <GoldDivider />

          {/* Role Selection */}
          <div className="space-y-4">
            <LuxuryCard
              className="cursor-pointer p-6 hover:border-primary/40 transition-all duration-300"
              onClick={() => handleRoleSelect('resident')}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Request Access</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Join as a private member</p>
                </div>
              </div>
            </LuxuryCard>

            <LuxuryCard
              className="cursor-pointer p-6 hover:border-primary/40 transition-all duration-300"
              onClick={() => handleRoleSelect('manager')}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary/50 rounded-xl border border-border/50 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Partner Access</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Supplier or admin registration</p>
                </div>
              </div>
            </LuxuryCard>
          </div>

          <div className="text-center pt-4">
            <Button 
              variant="link" 
              onClick={() => navigate('/auth')} 
              className="text-muted-foreground hover:text-primary text-sm"
            >
              Already have access? Sign in
            </Button>
            <span className="text-muted-foreground/50 mx-2">·</span>
            <Button 
              variant="link" 
              onClick={() => navigate('/')} 
              className="text-muted-foreground hover:text-primary text-sm"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <GoldParticles count={20} />
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card/50 border border-primary/10 rounded-2xl backdrop-blur-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-xl bg-primary/10 rounded-full" />
              <img src={logo} alt="EVE BLUE" className="relative w-16 h-16 object-contain mx-auto" />
            </div>
            <h2 className="text-xl font-medium text-primary mt-4">Create Account</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {role === 'resident' ? 'Member Registration' : 'Partner Registration'}
            </p>
          </div>

          <GoldDivider />

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm text-muted-foreground">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="h-12 bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
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
                className="h-12 bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
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
                className="h-12 bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
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
                className="h-12 bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 border-primary/20 hover:border-primary/40 hover:bg-primary/5 rounded-xl"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 h-12 font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl" 
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Continue'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
