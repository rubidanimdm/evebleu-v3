import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import logo from '@/assets/eve-blue-logo-white.gif';
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

  const handleGoogleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({ title: 'Google sign-up failed', description: error.message, variant: 'destructive' });
      setLoading(false);
    }
  };

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
              <img src={logo} alt="EVE BLUE" className="relative w-44 h-auto object-contain mx-auto rounded" />
            </div>
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

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card/50 px-3 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base font-medium border-primary/20 hover:bg-primary/5 rounded-lg gap-3"
              disabled={loading}
              onClick={handleGoogleSignup}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
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
