import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Phone, Mail, MessageCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Contacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data } = await supabase
      .from('contacts')
      .select('*')
      .order('display_order');

    setContacts(data || []);
    setLoading(false);
  };

  const emergencyContacts = contacts.filter(c => c.is_emergency);
  const regularContacts = contacts.filter(c => !c.is_emergency);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading contacts...</p>
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
            <h1 className="text-2xl font-bold">Emergency Contacts</h1>
            <p className="text-sm text-muted-foreground">
              Quick access to important numbers
            </p>
          </div>
        </div>

        {/* Emergency Contacts */}
        {emergencyContacts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <h2 className="font-semibold">Emergency Services</h2>
            </div>
            {emergencyContacts.map((contact) => (
              <Card key={contact.id} className="border-destructive/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => window.open(`tel:${contact.phone}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call {contact.phone}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Regular Contacts */}
        {regularContacts.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-semibold">Building Contacts</h2>
            {regularContacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{contact.role}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => window.open(`tel:${contact.phone}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  {contact.whatsapp_link && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(contact.whatsapp_link, '_blank')}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  )}
                  {contact.email && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(`mailto:${contact.email}`)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
