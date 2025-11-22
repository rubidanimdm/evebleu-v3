import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

export default function ManagerTickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('status') || 'open';

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const { data } = await supabase
      .from('tickets')
      .select('*, profiles:created_by(full_name, apartment_unit)')
      .order('created_at', { ascending: false });

    setTickets(data || []);
    setLoading(false);
  };

  const filterTickets = (status: string) => {
    return tickets.filter(t => t.status === status);
  };

  const renderTicketList = (status: string) => {
    const filteredTickets = filterTickets(status);

    if (filteredTickets.length === 0) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              No {status.replace('_', ' ')} tickets.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-3">
        {filteredTickets.map((ticket) => {
          const Icon = categoryIcons[ticket.category as keyof typeof categoryIcons];
          return (
            <Card
              key={ticket.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => navigate(`/manager/ticket/${ticket.id}`)}
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
                      <span>{ticket.profiles?.full_name}</span>
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
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading tickets...</p>
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
            <h1 className="text-2xl font-bold">Manage Tickets</h1>
            <p className="text-sm text-muted-foreground">
              {tickets.length} total tickets
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setSearchParams({ status: v })}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="open">
              Open ({filterTickets('open').length})
            </TabsTrigger>
            <TabsTrigger value="in_progress">
              In Progress ({filterTickets('in_progress').length})
            </TabsTrigger>
            <TabsTrigger value="done">
              Done ({filterTickets('done').length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="open" className="mt-6">
            {renderTicketList('open')}
          </TabsContent>
          
          <TabsContent value="in_progress" className="mt-6">
            {renderTicketList('in_progress')}
          </TabsContent>
          
          <TabsContent value="done" className="mt-6">
            {renderTicketList('done')}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
