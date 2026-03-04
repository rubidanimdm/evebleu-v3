import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function AccountButton({ className }: { className?: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate(user ? '/profile' : '/login')}
      className={className}
      title={user ? 'My Profile' : 'Sign In'}
    >
      <User className="w-5 h-5" />
    </Button>
  );
}
