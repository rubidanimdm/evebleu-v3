import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { ArrowLeft, Zap, Droplet, Building, Sparkles, Car, MoreHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

const categoryIcons = {
  electricity: Zap,
  water: Droplet,
  elevator: Building,
  cleaning: Sparkles,
  parking: Car,
  other: MoreHorizontal,
};

export default function MyTickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, [profile?.id]);

  const fetchTickets = async () => {
    if (!profile?.id) return;

    const { data } = await supabase
      .from('tickets')
      .select('*')
      .eq('created_by', profile.id)
      .order('created_at', { ascending: false });

    setTickets(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading your tickets...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">My Issues</h1>
            <p className="text-sm text-muted-foreground">
              {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}
            </p>
          </div>
        </div>

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">You haven't reported any issues yet.</p>
              <Button className="mt-4" onClick={() => navigate('/report-issue')}>
                Report an Issue
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => {
              const Icon = categoryIcons[ticket.category as keyof typeof categoryIcons];
              return (
                <Card
                  key={ticket.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="font-semibold text-sm text-muted-foreground">
                              {ticket.ticket_number}
                            </p>
                            <p className="font-medium line-clamp-2">
                              {ticket.description}
                            </p>
                          </div>
                          <StatusBadge status={ticket.status} />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Unit {ticket.apartment_unit}</span>
                          <span>•</span>
                          <span>{formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
