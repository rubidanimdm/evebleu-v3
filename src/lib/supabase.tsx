import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle auth callback - check for tokens in URL hash
    const handleAuthCallback = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        // Set the session from URL tokens
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        
        if (!error && data.session) {
          // Clear the hash from URL and redirect to main home
          window.history.replaceState(null, '', window.location.pathname);
          navigate('/', { replace: true });
          return true;
        }
      }
      return false;
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Fetch public profile when user logs in (sensitive data via edge function)
        if (session?.user) {
          setTimeout(async () => {
            const { data } = await supabase
              .from('profiles_public')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();
            setProfile(data);
          }, 0);
        } else {
          setProfile(null);
        }

        // Redirect authenticated users away from auth pages
        if (event === 'SIGNED_IN' && (location.pathname === '/login' || location.pathname === '/signup')) {
          navigate('/', { replace: true });
        }
      }
    );

    // Initialize auth
    const initAuth = async () => {
      // First check for auth callback tokens in URL
      const handledCallback = await handleAuthCallback();
      
      if (!handledCallback) {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data } = await supabase
            .from('profiles_public')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          setProfile(data);
        }
      }
      setLoading(false);
    };

    initAuth();

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <AuthContext.Provider value={{ user, session, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
