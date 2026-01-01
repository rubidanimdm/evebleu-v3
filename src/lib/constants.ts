/**
 * SINGLE SOURCE OF TRUTH
 * 
 * These constants are the definitive reference for:
 * - Home buttons routing
 * - Explore filters
 * - Concierge intents
 * - Supplier categorization
 * - Admin/analytics
 * - Multilingual labels (i18n)
 * 
 * DO NOT RENAME OR DUPLICATE.
 */

// ======================
// SERVICE CATEGORIES
// ======================
export const SERVICE_CATEGORIES = {
  DINING: 'DINING',
  TRANSPORT: 'TRANSPORT',
  HOTEL: 'HOTEL',
  FLIGHT: 'FLIGHT',
  CLUB: 'CLUB',
  EXPERIENCE: 'EXPERIENCE',
} as const;

export type ServiceCategory = typeof SERVICE_CATEGORIES[keyof typeof SERVICE_CATEGORIES];

// ======================
// AI CONCIERGE INTENTS
// ======================
export const CONCIERGE_INTENTS = {
  CUSTOM_REQUEST: 'CUSTOM_REQUEST',
} as const;

export type ConciergeIntent = typeof CONCIERGE_INTENTS[keyof typeof CONCIERGE_INTENTS];

// ======================
// CATEGORY → SUPPLIER MAP
// ======================
// Maps service categories to database supplier.category values
export const CATEGORY_TO_SUPPLIER_MAP: Record<string, string> = {
  [SERVICE_CATEGORIES.DINING]: 'restaurant',
  [SERVICE_CATEGORIES.TRANSPORT]: 'transport',
  [SERVICE_CATEGORIES.CLUB]: 'nightlife',
  [SERVICE_CATEGORIES.EXPERIENCE]: 'yacht',
  [SERVICE_CATEGORIES.HOTEL]: 'hotel',
  [SERVICE_CATEGORIES.FLIGHT]: 'flight',
};

// ======================
// CATEGORY LABELS (EN)
// ======================
// Used for UI display, will be extended via i18n
export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  [SERVICE_CATEGORIES.DINING]: 'Dining',
  [SERVICE_CATEGORIES.TRANSPORT]: 'Transport',
  [SERVICE_CATEGORIES.HOTEL]: 'Hotel',
  [SERVICE_CATEGORIES.FLIGHT]: 'Flight',
  [SERVICE_CATEGORIES.CLUB]: 'Club',
  [SERVICE_CATEGORIES.EXPERIENCE]: 'Experience',
};

// ======================
// INTENT MESSAGES
// ======================
// Pre-filled messages for AI concierge based on intent
export const INTENT_MESSAGES: Record<string, string> = {
  [CONCIERGE_INTENTS.CUSTOM_REQUEST]: 'I have a custom request that I need help with.',
  // Category-based intents (when no supplier exists yet)
  [SERVICE_CATEGORIES.HOTEL]: 'I need to book a hotel in Dubai.',
  [SERVICE_CATEGORIES.FLIGHT]: 'I need to book a flight.',
};

// ======================
// HOME BUTTON CONFIG
// ======================
// Defines behavior for each home button
export const HOME_BUTTON_CONFIG: Record<ServiceCategory | 'CUSTOM', {
  routeType: 'explore' | 'concierge';
  param: string;
}> = {
  [SERVICE_CATEGORIES.DINING]: { routeType: 'explore', param: SERVICE_CATEGORIES.DINING },
  [SERVICE_CATEGORIES.TRANSPORT]: { routeType: 'explore', param: SERVICE_CATEGORIES.TRANSPORT },
  [SERVICE_CATEGORIES.HOTEL]: { routeType: 'concierge', param: SERVICE_CATEGORIES.HOTEL },
  [SERVICE_CATEGORIES.FLIGHT]: { routeType: 'concierge', param: SERVICE_CATEGORIES.FLIGHT },
  [SERVICE_CATEGORIES.CLUB]: { routeType: 'explore', param: SERVICE_CATEGORIES.CLUB },
  [SERVICE_CATEGORIES.EXPERIENCE]: { routeType: 'explore', param: SERVICE_CATEGORIES.EXPERIENCE },
  CUSTOM: { routeType: 'concierge', param: CONCIERGE_INTENTS.CUSTOM_REQUEST },
};
