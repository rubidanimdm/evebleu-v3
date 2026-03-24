import { openExternalUrl } from '@/lib/openExternalUrl';

const WHATSAPP_NUMBER = '971551523121';

const INTENT_MESSAGES: Record<string, string> = {
  DESERT: 'Hi! I\'m interested in a Desert Safari VIP experience 🏜️',
  CAR: 'Hi! I\'m interested in luxury car rental 🚗',
  BIRTHDAY: 'Hi! I\'d like to plan a birthday celebration 🎂',
  AIRPORT_PICKUP: 'Hi! I need an airport pickup/transfer ✈️',
  VIP_DRIVER: 'Hi! I\'d like to book a VIP driver 🚘',
  HELICOPTER: 'Hi! I\'m interested in a helicopter tour over Dubai 🚁',
  YACHT: 'Hi! I\'m interested in a yacht charter ⛵',
  IBIZA_2026: 'Hi! I\'m interested in Concierge services in Ibiza 2026 🏝️🎉',
};

export function openWhatsAppConcierge(intent?: string, extra?: string) {
  let message = 'Hi! I\'d like to speak with the concierge ✨';

  if (intent && INTENT_MESSAGES[intent]) {
    message = INTENT_MESSAGES[intent];
  }

  if (extra) {
    message += `\n${extra}`;
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  // Use anchor click for reliable cross-environment navigation
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
