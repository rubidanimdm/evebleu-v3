import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import ResidentHome from './ResidentHome';
import ManagerHome from './ManagerHome';

export default function Index() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !profile) {
      navigate('/login');
    }
  }, [profile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  // Show the appropriate home screen based on user role
  if (profile.role === 'resident') {
    return <ResidentHome />;
  }

  if (profile.role === 'manager' || profile.role === 'staff') {
    return <ManagerHome />;
  }

  return null;
}
