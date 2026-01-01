import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
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
import { LargePageHeader, GoldDivider, LuxuryCard } from '@/components/LuxuryElements';
import { User, MessageSquare, Calendar, Settings, ChevronRight, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Booking {
  id: string;
  booking_number: string;
  booking_date: string;
  status: string;
  total_amount: number;
  supplier_id: string;
  conversation_id: string | null;
}

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
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

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadData();
  }, [user]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setCity((profile as any).city || '');
      setLanguage((profile as any).language || 'en');
      setBudgetStyle((profile as any).budget_style || 'premium');
      setDietaryPreferences(((profile as any).dietary_preferences || []).join(', '));
      setFavoriteCuisines(((profile as any).favorite_cuisines || []).join(', '));
      setPreferredAreas(((profile as any).preferred_areas || []).join(', '));
      setSpecialNotes((profile as any).special_notes || '');
    }
  }, [profile]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load conversations
      const { data: convData } = await supabase
        .from('conversations')
        .select('id, title, created_at, updated_at')
        .eq('user_id', user!.id)
        .order('updated_at', { ascending: false });
      
      if (convData) setConversations(convData);

      // Load bookings
      const { data: bookingData } = await supabase
        .from('bookings')
        .select('id, booking_number, booking_date, status, total_amount, supplier_id, conversation_id')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      
      if (bookingData) setBookings(bookingData);
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
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone,
          city,
          language,
          budget_style: budgetStyle,
          dietary_preferences: dietaryPreferences ? dietaryPreferences.split(',').map(s => s.trim()) : [],
          favorite_cuisines: favoriteCuisines ? favoriteCuisines.split(',').map(s => s.trim()) : [],
          preferred_areas: preferredAreas ? preferredAreas.split(',').map(s => s.trim()) : [],
          special_notes: specialNotes
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast({ title: 'Profile updated successfully' });
    } catch (error) {
      toast({ title: 'Failed to update profile', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearData = async () => {
    if (!user) return;
    if (!confirm('Are you sure you want to clear all your chat history and memories? This cannot be undone.')) return;

    try {
      // Delete all conversations (cascades to messages)
      await supabase.from('conversations').delete().eq('user_id', user.id);
      
      // Clear AI memories
      await supabase
        .from('profiles')
        .update({ ai_memories: [] })
        .eq('id', user.id);
      
      setConversations([]);
      toast({ title: 'Data cleared successfully' });
    } catch (error) {
      toast({ title: 'Failed to clear data', variant: 'destructive' });
    }
  };

  const openConversation = (convId: string) => {
    navigate(`/concierge?conversation=${convId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <LargePageHeader title="My Profile" subtitle="Manage your account and preferences" />
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-primary/10">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="chats" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chats
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary">Personal Information</CardTitle>
                <CardDescription>Update your basic profile details</CardDescription>
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
                  <Label htmlFor="phone">Phone</Label>
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
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4">
            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary">AI Memory & Preferences</CardTitle>
                <CardDescription>These help our AI personalize your experience</CardDescription>
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
                    placeholder="e.g., Halal, Vegetarian, Gluten-free"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favoriteCuisines">Favorite Cuisines</Label>
                  <Input 
                    id="favoriteCuisines" 
                    value={favoriteCuisines} 
                    onChange={(e) => setFavoriteCuisines(e.target.value)}
                    placeholder="e.g., Japanese, Italian, Middle Eastern"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredAreas">Preferred Areas</Label>
                  <Input 
                    id="preferredAreas" 
                    value={preferredAreas} 
                    onChange={(e) => setPreferredAreas(e.target.value)}
                    placeholder="e.g., DIFC, Downtown, Marina"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialNotes">Special Notes for AI</Label>
                  <Textarea 
                    id="specialNotes" 
                    value={specialNotes} 
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Anything else you'd like our AI to remember..."
                    className="bg-background/50 border-primary/20 min-h-[100px]"
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

            <GoldDivider />

            <LuxuryCard className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Data & Privacy</CardTitle>
                <CardDescription>Manage your data and privacy settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  onClick={handleClearData}
                  className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Chat History & Memories
                </Button>
              </CardContent>
            </LuxuryCard>
          </TabsContent>

          {/* Chats Tab */}
          <TabsContent value="chats" className="space-y-4">
            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary">Chat History</CardTitle>
                <CardDescription>View and continue past conversations</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading...</p>
                ) : conversations.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No conversations yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate('/concierge')}
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

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <LuxuryCard>
              <CardHeader>
                <CardTitle className="text-primary">My Bookings</CardTitle>
                <CardDescription>View your booking history</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading...</p>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No bookings yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate('/explore')}
                    >
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
                              'bg-muted text-muted-foreground'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{format(new Date(booking.booking_date), 'MMM d, yyyy')}</span>
                            {booking.total_amount && (
                              <span className="font-medium text-foreground">AED {booking.total_amount}</span>
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
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
