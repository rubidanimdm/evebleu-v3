import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/supabase";
import { LanguageProvider } from "@/lib/i18n";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { useAdminRole } from "@/hooks/useAdminRole";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import MainScreen from "./pages/MainScreen";
import ConciergePage from "./pages/ConciergePage";
import ExplorePage from "./pages/ExplorePage";
import DiningNightlifePage from "./pages/DiningNightlifePage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import MyPlansPage from "./pages/MyPlansPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPassword from "./pages/ResetPassword";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import SupportPage from "./pages/SupportPage";
import YachtsPage from "./pages/YachtsPage";
import YachtDetailPage from "./pages/YachtDetailPage";
import AuthCallback from "./pages/AuthCallback";
import { AdminLayout } from "@/components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSuppliers from "./pages/admin/AdminSuppliers";
import AdminCatalog from "./pages/admin/AdminCatalog";
import AdminAvailability from "./pages/admin/AdminAvailability";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminRoles from "./pages/admin/AdminRoles";

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
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useAdminRole();

  if (authLoading || roleLoading) {
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
        {/* Main Screen */}
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
        <Route path="/dining" element={<ProtectedRoute><DiningNightlifePage /></ProtectedRoute>} />
        <Route path="/item/:id" element={<ProtectedRoute><ItemDetailsPage /></ProtectedRoute>} />
        <Route path="/yachts" element={<ProtectedRoute><YachtsPage /></ProtectedRoute>} />
        <Route path="/yachts/:slug" element={<ProtectedRoute><YachtDetailPage /></ProtectedRoute>} />
        <Route path="/my-plans" element={<ProtectedRoute><MyPlansPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />

        {/* Admin routes with layout */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="suppliers" element={<AdminSuppliers />} />
          <Route path="catalog" element={<AdminCatalog />} />
          <Route path="availability" element={<AdminAvailability />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="customers/:id" element={<CustomerDetailPage />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="roles" element={<AdminRoles />} />
        </Route>
        
        {/* Legacy route redirects */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/auth" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingHomeButton />
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
