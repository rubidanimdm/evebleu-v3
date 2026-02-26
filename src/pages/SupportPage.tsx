import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Mail, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LargePageHeader, LuxuryCard, GoldParticles } from '@/components/LuxuryElements';
import { openExternalUrl } from '@/lib/openExternalUrl';

export default function SupportPage() {
  const navigate = useNavigate();

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'AI Concierge',
      description: 'Instant assistance, 24/7',
      action: () => navigate('/concierge'),
      buttonText: 'Open Chat',
      primary: true,
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Direct line to our team',
      action: () => openExternalUrl('https://wa.me/1234567890'),
      buttonText: 'Message',
    },
    {
      icon: Phone,
      title: 'Call',
      description: 'Speak with a specialist',
      action: () => openExternalUrl('tel:+1234567890', '_self'),
      buttonText: 'Call',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'For detailed requests',
      action: () => openExternalUrl('mailto:dekel@evebleu.vip', '_self'),
      buttonText: 'Send',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={10} />
      
      <LargePageHeader 
        title="Private Support"
        subtitle="Discreet assistance. Always available."
      />

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Service Hours */}
        <LuxuryCard className="p-5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-medium text-primary">24/7 Concierge</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                AI concierge always available. Human support: 9 AM – 11 PM
              </p>
            </div>
          </div>
        </LuxuryCard>

        {/* Contact Options */}
        <div className="space-y-3 pt-2">
          {contactOptions.map((option, i) => (
            <LuxuryCard key={i} className="p-5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  option.primary 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'bg-secondary/50 border border-border/50'
                }`}>
                  <option.icon className={`w-5 h-5 ${
                    option.primary ? 'text-primary' : 'text-muted-foreground'
                  }`} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <Button 
                  variant={option.primary ? 'default' : 'outline'}
                  size="sm"
                  onClick={option.action}
                  className={`rounded-xl px-5 ${
                    option.primary 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'border-primary/20 hover:border-primary/40 hover:bg-primary/5'
                  }`}
                >
                  {option.buttonText}
                </Button>
              </div>
            </LuxuryCard>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
