// Service Categories - used for routing and filtering
export const SERVICE_CATEGORIES = {
  DINING: 'dining',
  TRANSPORT: 'transport',
  HOTEL: 'hotel',
  FLIGHT: 'flight',
  CLUB: 'club',
  EXPERIENCE: 'experience',
} as const;

// Concierge Intents - used for pre-filling AI chat
export const CONCIERGE_INTENTS = {
  CUSTOM_REQUEST: 'CUSTOM_REQUEST',
  HOTEL_BOOKING: 'HOTEL_BOOKING',
  FLIGHT_BOOKING: 'FLIGHT_BOOKING',
} as const;

// Map categories to supplier database category values
export const CATEGORY_TO_SUPPLIER_MAP: Record<string, string> = {
  [SERVICE_CATEGORIES.DINING]: 'restaurant',
  [SERVICE_CATEGORIES.TRANSPORT]: 'transport',
  [SERVICE_CATEGORIES.CLUB]: 'nightlife',
  [SERVICE_CATEGORIES.EXPERIENCE]: 'yacht',
  // HOTEL and FLIGHT are handled via concierge, not suppliers
};

// Intent messages for concierge pre-fill
export const INTENT_MESSAGES: Record<string, string> = {
  [CONCIERGE_INTENTS.CUSTOM_REQUEST]: 'I have a custom request that I need help with.',
  [CONCIERGE_INTENTS.HOTEL_BOOKING]: 'I need to book a hotel in Dubai.',
  [CONCIERGE_INTENTS.FLIGHT_BOOKING]: 'I need to book a flight.',
};

// Type exports
export type ServiceCategory = typeof SERVICE_CATEGORIES[keyof typeof SERVICE_CATEGORIES];
export type ConciergeIntent = typeof CONCIERGE_INTENTS[keyof typeof CONCIERGE_INTENTS];
