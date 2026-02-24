import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/supabase";
import { LanguageProvider } from "@/lib/i18n";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import MainScreen from "./pages/MainScreen";
import ConciergePage from "./pages/ConciergePage";
import ExplorePage from "./pages/ExplorePage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import MyPlansPage from "./pages/MyPlansPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPassword from "./pages/ResetPassword";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import SupportPage from "./pages/SupportPage";
import AdminPage from "./pages/AdminPage";
import AuthCallback from "./pages/AuthCallback";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check for admin role (manager or staff)
  const isAdmin = profile?.role === 'manager' || profile?.role === 'staff';
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user } = useAuth();
  
  return (
    <>
      <Routes>
        {/* Main Screen - same design for logged-in and logged-out users */}
        <Route path="/" element={<MainScreen />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* App Screens - protected */}
        <Route path="/concierge" element={<ProtectedRoute><ConciergePage /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
        <Route path="/item/:id" element={<ProtectedRoute><ItemDetailsPage /></ProtectedRoute>} />
        <Route path="/my-plans" element={<ProtectedRoute><MyPlansPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="/admin/customers/:id" element={<AdminRoute><CustomerDetailPage /></AdminRoute>} />
        
        {/* Legacy route redirects */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/auth" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Floating home button visible on all pages except home */}
      <FloatingHomeButton />
      {/* Floating chat button visible on all pages except concierge and auth */}
      {user && <FloatingChatButton />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
