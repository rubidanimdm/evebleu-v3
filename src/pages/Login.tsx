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
import { ArrowLeft, Mail } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Please enter your password' }),
});

type Mode = 'login' | 'forgot' | 'reset-sent';

export default function Login() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      loginSchema.parse({ email, password });
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Access denied',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({ title: 'Welcome back' });
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !z.string().email().safeParse(email).success) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setMode('reset-sent');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send reset email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
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
              {mode === 'login' && 'Sign in to your account'}
              {mode === 'forgot' && 'Reset your password'}
              {mode === 'reset-sent' && 'Check your email'}
            </p>
          </div>

          <GoldDivider />

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm text-muted-foreground">Password</Label>
                  <Button
                    type="button"
                    variant="link"
                    className="text-xs text-muted-foreground hover:text-primary p-0 h-auto"
                    onClick={() => { resetForm(); setMode('forgot'); }}
                  >
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
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
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center pt-4">
                <span className="text-muted-foreground text-sm">Don't have an account? </span>
                <Link to="/signup" className="text-primary hover:text-primary/80 text-sm">
                  Sign up
                </Link>
              </div>

            </form>
          )}

          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <p className="text-sm text-muted-foreground text-center">
                Enter your email and we'll send you a link to reset your password.
              </p>

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

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg" 
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="text-center pt-4">
                <Button 
                  type="button"
                  variant="link" 
                  onClick={() => { resetForm(); setMode('login'); }}
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Button>
              </div>
            </form>
          )}

          {mode === 'reset-sent' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Check your email</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to <span className="text-foreground">{email}</span>
                </p>
              </div>

              <Button 
                onClick={() => { resetForm(); setMode('login'); }}
                className="w-full h-12 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
              >
                Back to Sign In
              </Button>

              <p className="text-xs text-muted-foreground">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setMode('forgot')}
                  className="text-primary hover:underline"
                >
                  try again
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
