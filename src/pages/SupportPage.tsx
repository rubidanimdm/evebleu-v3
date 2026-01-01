import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Mail, Clock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SupportPage() {
  const navigate = useNavigate();

  const contactOptions = [
    {
      icon: Sparkles,
      title: 'AI Concierge',
      description: 'Get instant help with bookings and recommendations',
      action: () => navigate('/'),
      buttonText: 'Chat Now',
      primary: true,
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Message our team directly',
      action: () => window.open('https://wa.me/1234567890', '_blank'),
      buttonText: 'Open WhatsApp',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with a concierge specialist',
      action: () => window.open('tel:+1234567890'),
      buttonText: 'Call Now',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'For detailed inquiries',
      action: () => window.open('mailto:concierge@luxe.com'),
      buttonText: 'Send Email',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b border-border px-4 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold text-foreground">Support</h1>
          <p className="text-sm text-muted-foreground">We're here to help</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Service Hours */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">24/7 Concierge Service</p>
              <p className="text-sm text-muted-foreground">
                Our AI concierge is always available. Human support: 9 AM - 11 PM
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Options */}
        <div className="space-y-3">
          {contactOptions.map((option, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  option.primary ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <option.icon className={`w-6 h-6 ${
                    option.primary ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <Button 
                  variant={option.primary ? 'default' : 'outline'}
                  size="sm"
                  onClick={option.action}
                >
                  {option.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Teaser */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-2">Frequently Asked Questions</h3>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">• How do I modify or cancel a booking?</p>
            <p className="text-muted-foreground">• What payment methods do you accept?</p>
            <p className="text-muted-foreground">• How does the concierge service work?</p>
          </div>
          <Button variant="link" className="px-0 mt-2" onClick={() => navigate('/')}>
            Ask our concierge for help →
          </Button>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
