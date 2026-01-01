import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Mail, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SupportPage() {
  const navigate = useNavigate();

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'AI Concierge',
      description: 'Instant assistance, 24/7',
      action: () => navigate('/'),
      buttonText: 'Open Chat',
      primary: true,
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Direct line to our team',
      action: () => window.open('https://wa.me/1234567890', '_blank'),
      buttonText: 'Message',
    },
    {
      icon: Phone,
      title: 'Call',
      description: 'Speak with a specialist',
      action: () => window.open('tel:+1234567890'),
      buttonText: 'Call',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'For detailed requests',
      action: () => window.open('mailto:concierge@aimydubai.com'),
      buttonText: 'Send',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b border-border/50 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-lg font-medium text-foreground">Support</h1>
          <p className="text-sm text-muted-foreground">Contact your concierge</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Service Hours */}
        <Card className="p-4 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">24/7 Concierge</p>
              <p className="text-sm text-muted-foreground">
                AI concierge always available. Human support: 9 AM – 11 PM
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Options */}
        <div className="space-y-3">
          {contactOptions.map((option, i) => (
            <Card key={i} className="p-4 border-border/50 bg-card">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  option.primary ? 'bg-primary/10' : 'bg-secondary'
                }`}>
                  <option.icon className={`w-5 h-5 ${
                    option.primary ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <Button 
                  variant={option.primary ? 'default' : 'outline'}
                  size="sm"
                  onClick={option.action}
                  className={!option.primary ? 'border-border/50' : ''}
                >
                  {option.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
