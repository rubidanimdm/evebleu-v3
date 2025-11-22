import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Building2, UserCircle2 } from 'lucide-react';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  fullName: z.string().min(2, { message: 'Please enter your full name' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  buildingName: z.string().min(1, { message: 'Please enter your building name' }),
  apartmentUnit: z.string().optional(),
});

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'resident' | 'manager' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    buildingName: '',
    apartmentUnit: '',
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
      // Validate form data
      signupSchema.parse(formData);

      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            building_name: formData.buildingName,
            apartment_unit: formData.apartmentUnit,
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
            title: 'Signup failed',
            description: error.message,
            variant: 'destructive',
          });
        }
        return;
      }

      toast({
        title: 'Welcome to MYAI!',
        description: 'Your account has been created successfully.',
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
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-primary">MYAI</h1>
            <p className="text-lg text-muted-foreground">
              Smart Assistant for Building Managers
            </p>
            <p className="text-sm text-muted-foreground">
              Welcome! Let's get started by selecting your role.
            </p>
          </div>

          <div className="space-y-4">
            <Card
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleRoleSelect('resident')}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UserCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>I am a Resident</CardTitle>
                    <CardDescription>Report issues and track requests</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleRoleSelect('manager')}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>I am a Building Manager</CardTitle>
                    <CardDescription>Manage tasks and residents</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="link" onClick={() => navigate('/auth')}>
              Already have an account? Sign in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            {role === 'resident' ? 'Resident' : 'Building Manager'} Registration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="buildingName">Building Name</Label>
              <Input
                id="buildingName"
                placeholder="Sunshine Apartments"
                value={formData.buildingName}
                onChange={(e) => setFormData({ ...formData, buildingName: e.target.value })}
                required
              />
            </div>

            {role === 'resident' && (
              <div className="space-y-2">
                <Label htmlFor="apartmentUnit">Apartment/Unit Number</Label>
                <Input
                  id="apartmentUnit"
                  placeholder="A-101"
                  value={formData.apartmentUnit}
                  onChange={(e) => setFormData({ ...formData, apartmentUnit: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
