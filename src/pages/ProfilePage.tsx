import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { useSecureProfile } from '@/hooks/useSecureProfile';
import { useSecureBookings } from '@/hooks/useSecureBookings';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BottomNav } from '@/components/BottomNav';
import { GoldDivider, LuxuryCard, GoldParticles } from '@/components/LuxuryElements';
import { User, MessageSquare, Calendar, Settings, ChevronRight, Trash2, Lock, Compass, Utensils, Car, Hotel, Plane, Sparkles, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface CatalogItem {
  id: string;
  title: string;
  category: string;
  short_description: string;
  price: number;
  currency: string;
  image_url: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  DINING: Utensils,
  TRANSPORT: Car,
  HOTEL: Hotel,
  FLIGHT: Plane,
  EXPERIENCE: Sparkles,
  CLUB: Sparkles,
};

export default function ProfilePage() {
  const { user } = useAuth();
  const { profile, fetchProfile, updateProfile, loading: profileLoading } = useSecureProfile();
  const { bookings, fetchBookings, loading: bookingsLoading } = useSecureBookings();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [language, setLanguage] = useState('en');
  const [budgetStyle, setBudgetStyle] = useState('premium');
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [favoriteCuisines, setFavoriteCuisines] = useState('');
  const [preferredAreas, setPreferredAreas] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadData();
  }, [user]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setCity(profile.city || '');
      setLanguage(profile.language || 'en');
      setBudgetStyle(profile.budget_style || 'premium');
      setDietaryPreferences((profile.dietary_preferences || []).join(', '));
      setFavoriteCuisines((profile.favorite_cuisines || []).join(', '));
      setPreferredAreas((profile.preferred_areas || []).join(', '));
      setSpecialNotes(profile.special_notes || '');
    }
  }, [profile]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Fetch profile via edge function
      await fetchProfile();
      
      // Fetch bookings via edge function
      await fetchBookings();

      // Load conversations (user can access their own via RLS)
      const { data: convData } = await supabase
        .from('conversations')
        .select('id, title, created_at, updated_at')
        .eq('user_id', user!.id)
        .order('updated_at', { ascending: false });
      
      if (convData) setConversations(convData);

      // Load catalog items (public data, accessible via RLS)
      const { data: catalogData } = await supabase
        .from('catalog_items')
        .select('id, title, category, short_description, price, currency, image_url')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(12);
      
      if (catalogData) setCatalogItems(catalogData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    
    try {
      // Use edge function to update both public and private profile data
      const success = await updateProfile({
        full_name: fullName,
        phone,
        city,
        language,
        budget_style: budgetStyle,
        dietary_preferences: dietaryPreferences ? dietaryPreferences.split(',').map(s => s.trim()) : [],
        favorite_cuisines: favoriteCuisines ? favoriteCuisines.split(',').map(s => s.trim()) : [],
        preferred_areas: preferredAreas ? preferredAreas.split(',').map(s => s.trim()) : [],
        special_notes: specialNotes
      });

      if (!success) {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      toast({ title: 'Failed to update profile', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      
      toast({ title: 'Password updated successfully' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({ title: 'Failed to update password', description: error.message, variant: 'destructive' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleClearData = async () => {
    if (!user) return;
    if (!confirm('Are you sure you want to clear all your chat history? This cannot be undone.')) return;

    try {
      await supabase.from('conversations').delete().eq('user_id', user.id);
      setConversations([]);
      toast({ title: 'Chat history cleared' });
    } catch (error) {
      toast({ title: 'Failed to clear data', variant: 'destructive' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: 'Signed out' });
    navigate('/');
  };

  const openConversation = (convId: string) => {
    navigate(`/concierge?conversation=${convId}`);
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'Guest';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Welcome Header */}
      <div className="relative bg-card/80 border-b border-primary/10 px-4 py-8 overflow-hidden">
        <GoldParticles count={15} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="relative max-w-2xl mx-auto">
          <h1 className="text-2xl font-medium text-primary">
            Welcome, {firstName}!
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {profile?.email || 'Loading...'}
          </p>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card/50 border border-primary/10">
            <TabsTrigger value="bookings" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="explore" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Compass className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Explore</span>
            </TabsTrigger>
            <TabsTrigger value="chats" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Chats</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary">My Bookings</CardTitle>
                <CardDescription>Your past and upcoming reservations</CardDescription>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading...</p>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground mb-4">No bookings yet</p>
                    <Button 
                      onClick={() => navigate('/explore')}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Compass className="w-4 h-4 mr-2" />
                      Explore Services
                    </Button>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 rounded-xl border border-primary/10 bg-card/50 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-primary">{booking.booking_number}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              booking.status === 'confirmed' ? 'bg-green-500/20 text-green-500' :
                              booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                              booking.status === 'cancelled' ? 'bg-red-500/20 text-red-500' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{format(new Date(booking.booking_date), 'MMM d, yyyy')}</span>
                            {booking.supplier?.name && (
                              <span className="text-foreground">{booking.supplier.name}</span>
                            )}
                          </div>
                          {booking.conversation_id && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => openConversation(booking.conversation_id!)}
                              className="text-xs text-primary hover:text-primary/80"
                            >
                              <MessageSquare className="w-3 h-3 mr-1" />
                              View Related Chat
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </LuxuryCard>
          </TabsContent>

          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-4">
            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary">Explore & Book</CardTitle>
                <CardDescription>Discover experiences and services</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading...</p>
                ) : catalogItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Compass className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No items available</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {catalogItems.map((item) => {
                      const IconComponent = categoryIcons[item.category] || Sparkles;
                      return (
                        <button
                          key={item.id}
                          onClick={() => navigate(`/item/${item.id}`)}
                          className="p-3 rounded-xl border border-primary/10 bg-card/50 hover:bg-card hover:border-primary/20 transition-all text-left group"
                        >
                          {item.image_url ? (
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="w-full h-20 object-cover rounded-lg mb-2"
                            />
                          ) : (
                            <div className="w-full h-20 bg-primary/10 rounded-lg mb-2 flex items-center justify-center">
                              <IconComponent className="w-8 h-8 text-primary/50" />
                            </div>
                          )}
                          <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.currency} {item.price}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
                <Button 
                  onClick={() => navigate('/explore')}
                  variant="outline"
                  className="w-full mt-4 border-primary/20 hover:bg-primary/5"
                >
                  View All Services
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </LuxuryCard>
          </TabsContent>

          {/* Chats Tab */}
          <TabsContent value="chats" className="space-y-4">
            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary">Chat History</CardTitle>
                <CardDescription>Your conversations with AI concierge</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading...</p>
                ) : conversations.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground mb-4">No conversations yet</p>
                    <Button 
                      onClick={() => navigate('/concierge')}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Start a Chat
                    </Button>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {conversations.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => openConversation(conv.id)}
                          className="w-full p-4 rounded-xl border border-primary/10 bg-card/50 hover:bg-card hover:border-primary/20 transition-all flex items-center justify-between group"
                        >
                          <div className="text-left">
                            <p className="font-medium text-sm line-clamp-1">{conv.title || 'Untitled Chat'}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(conv.updated_at), 'MMM d, yyyy · h:mm a')}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </LuxuryCard>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary">Personal Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City / Location</Label>
                  <Input 
                    id="city" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g., Dubai Marina"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-background/50 border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={isSaving}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </LuxuryCard>

            <GoldDivider />

            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary">AI Preferences</CardTitle>
                <CardDescription>Help our AI personalize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="budgetStyle">Budget Style</Label>
                  <Select value={budgetStyle} onValueChange={setBudgetStyle}>
                    <SelectTrigger className="bg-background/50 border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="ultra">Ultra Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                  <Input 
                    id="dietaryPreferences" 
                    value={dietaryPreferences} 
                    onChange={(e) => setDietaryPreferences(e.target.value)}
                    placeholder="e.g., Halal, Vegetarian"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favoriteCuisines">Favorite Cuisines</Label>
                  <Input 
                    id="favoriteCuisines" 
                    value={favoriteCuisines} 
                    onChange={(e) => setFavoriteCuisines(e.target.value)}
                    placeholder="e.g., Japanese, Italian"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredAreas">Preferred Areas</Label>
                  <Input 
                    id="preferredAreas" 
                    value={preferredAreas} 
                    onChange={(e) => setPreferredAreas(e.target.value)}
                    placeholder="e.g., DIFC, Downtown"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialNotes">Special Notes</Label>
                  <Textarea 
                    id="specialNotes" 
                    value={specialNotes} 
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Anything else for our AI to remember..."
                    className="bg-background/50 border-primary/20 min-h-[80px]"
                  />
                </div>
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={isSaving}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isSaving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </CardContent>
            </LuxuryCard>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Change Password
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <Button 
                  onClick={handleChangePassword} 
                  disabled={isChangingPassword || !newPassword || !confirmPassword}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isChangingPassword ? 'Updating...' : 'Update Password'}
                </Button>
              </CardContent>
            </LuxuryCard>

            <GoldDivider />

            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="w-full border-primary/20 hover:bg-primary/5"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </LuxuryCard>

            <GoldDivider />

            <LuxuryCard className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  onClick={handleClearData}
                  className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Chat History
                </Button>
              </CardContent>
            </LuxuryCard>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
