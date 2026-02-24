import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import logo from '@/assets/eve-blue-logo.jpeg';
import { GoldParticles, GoldDivider } from '@/components/LuxuryElements';

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  fullName: z.string().min(1, { message: 'Please enter your name' }),
});

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signupSchema.parse({ email, password, fullName });
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Account exists',
            description: 'This email is already registered. Please sign in.',
            variant: 'destructive',
          });
          navigate('/login');
          return;
        }
        toast({
          title: 'Registration failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({ title: 'Welcome to EVE BLUE!' });
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <GoldParticles count={25} />
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />
      
      <svg 
        className="absolute bottom-0 left-0 right-0 h-64 opacity-20 pointer-events-none"
        viewBox="0 0 1920 256" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="authWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B88A2A" stopOpacity="0" />
            <stop offset="50%" stopColor="#D6B46A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B88A2A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path 
          d="M0,128 Q480,64 960,128 T1920,128" 
          fill="none" 
          stroke="url(#authWaveGradient)" 
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card/50 border border-primary/10 rounded-2xl backdrop-blur-sm p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-2xl bg-primary/10 rounded-full scale-150" />
              <img src={logo} alt="EVE BLUE" className="relative w-20 h-20 object-contain mx-auto" />
            </div>
            <h1 className="text-2xl font-medium text-primary tracking-tight mt-6">
              EVE BLUE
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Create your account
            </p>
          </div>

          <GoldDivider />

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm text-muted-foreground">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-muted-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg" 
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            <div className="text-center pt-4">
              <span className="text-muted-foreground text-sm">Already have an account? </span>
              <Link to="/login" className="text-primary hover:text-primary/80 text-sm">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
