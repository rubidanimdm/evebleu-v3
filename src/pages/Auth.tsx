import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import logo from '@/assets/logo.png';
import { GoldParticles, GoldDivider } from '@/components/LuxuryElements';
import { ArrowLeft, Mail } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Please enter your password' }),
});

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  fullName: z.string().min(1, { message: 'Please enter your name' }),
});

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset-sent';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
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
      navigate('/home');
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signupSchema.parse({ email, password, fullName });
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
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
          setMode('login');
          return;
        }
        toast({
          title: 'Registration failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({ title: 'Welcome to AI My Dubai!' });
      navigate('/home');
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
    setFullName('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <GoldParticles count={25} />
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />
      
      {/* Decorative wave */}
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
          {/* Logo and brand */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-2xl bg-primary/10 rounded-full scale-150" />
              <img src={logo} alt="AI My Dubai" className="relative w-20 h-20 object-contain mx-auto" />
            </div>
            <h1 className="text-2xl font-medium text-primary tracking-tight mt-6">
              AI MY DUBAI
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {mode === 'login' && 'Sign in to your account'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot' && 'Reset your password'}
              {mode === 'reset-sent' && 'Check your email'}
            </p>
          </div>

          <GoldDivider />

          {/* Login Form */}
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
                <Button 
                  type="button"
                  variant="link" 
                  onClick={() => { resetForm(); setMode('signup'); }}
                  className="text-primary hover:text-primary/80 text-sm p-0"
                >
                  Sign up
                </Button>
              </div>

              <div className="text-center">
                <Button 
                  type="button"
                  variant="link" 
                  onClick={() => navigate('/')} 
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Back to Home
                </Button>
              </div>
            </form>
          )}

          {/* Signup Form */}
          {mode === 'signup' && (
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
                <Button 
                  type="button"
                  variant="link" 
                  onClick={() => { resetForm(); setMode('login'); }}
                  className="text-primary hover:text-primary/80 text-sm p-0"
                >
                  Sign in
                </Button>
              </div>
            </form>
          )}

          {/* Forgot Password Form */}
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

          {/* Reset Email Sent */}
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
