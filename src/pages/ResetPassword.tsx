import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import logo from '@/assets/eve-blue-logo.jpeg';
import { GoldParticles, GoldDivider } from '@/components/LuxuryElements';
import { CheckCircle, Lock } from 'lucide-react';

const passwordSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a valid session from the reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Invalid or expired reset link. Please request a new one.');
      }
    };
    checkSession();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      passwordSchema.parse({ password, confirmPassword });
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setSuccess(true);
      toast({ title: 'Password updated successfully' });
      
      // Sign out and redirect to login
      setTimeout(async () => {
        await supabase.auth.signOut();
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: 'Validation error',
          description: err.errors[0].message,
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

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card/50 border border-primary/10 rounded-2xl backdrop-blur-sm p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-2xl bg-primary/10 rounded-full scale-150" />
              <img src={logo} alt="EVE BLUE" className="relative w-20 h-20 object-contain mx-auto" />
            </div>
            <h1 className="text-2xl font-medium text-primary tracking-tight mt-6">
              {success ? 'Password Updated' : 'Set New Password'}
            </h1>
          </div>

          <GoldDivider />

          {error ? (
            <div className="text-center space-y-6">
              <p className="text-destructive">{error}</p>
              <Button 
                onClick={() => navigate('/login')}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
              >
                Back to Sign In
              </Button>
            </div>
          ) : success ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-muted-foreground">
                Your password has been updated. Redirecting to sign in...
              </p>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-muted-foreground">New Password</Label>
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm text-muted-foreground">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg" 
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
