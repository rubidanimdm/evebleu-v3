// Invoice Email Service - Placeholder for future integration
// TODO: Integrate with email service provider (e.g., Resend, SendGrid)

import { supabase } from '@/integrations/supabase/client';

interface InvoiceData {
  bookingId: string;
  customerEmail: string;
  customerName: string;
  itemTitle: string;
  amount: number;
  currency: string;
  bookingDate: string;
  bookingNumber: string;
}

/**
 * Sends an invoice/receipt email to the customer after payment
 * Currently a placeholder - needs email service integration
 * 
 * TODO: Implement with edge function + email provider
 * Options:
 * - Resend (recommended for modern apps)
 * - SendGrid
 * - Postmark
 * - AWS SES
 */
export async function sendInvoiceEmail(data: InvoiceData): Promise<{ success: boolean; error?: string }> {
  console.log('[Invoice] Preparing invoice email for:', data.customerEmail);
  
  // Placeholder: In production, this would call an edge function
  // that generates a PDF invoice and sends it via email
  
  try {
    // Log the invoice attempt for future reference
    console.log('[Invoice] Invoice data:', {
      bookingNumber: data.bookingNumber,
      amount: `${data.currency} ${data.amount}`,
      item: data.itemTitle,
      date: data.bookingDate,
    });
    
    // TODO: Uncomment and configure when email service is ready
    /*
    const { error } = await supabase.functions.invoke('send-invoice', {
      body: data,
    });
    
    if (error) throw error;
    */
    
    // For now, simulate success
    console.log('[Invoice] Invoice email queued (placeholder - not actually sent)');
    
    return { success: true };
  } catch (error: any) {
    console.error('[Invoice] Failed to send invoice:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send invoice email' 
    };
  }
}

/**
 * Generates invoice data from a booking record
 */
export function generateInvoiceFromBooking(
  booking: {
    id: string;
    booking_number: string;
    booking_date: string;
    total_amount: number | null;
  },
  customer: {
    email: string;
    full_name: string;
  },
  item: {
    title: string;
    currency: string;
  }
): InvoiceData {
  return {
    bookingId: booking.id,
    customerEmail: customer.email,
    customerName: customer.full_name,
    itemTitle: item.title,
    amount: booking.total_amount || 0,
    currency: item.currency,
    bookingDate: booking.booking_date,
    bookingNumber: booking.booking_number,
  };
}

/**
 * UI message to display when payments/invoicing is pending
 */
export const PAYMENT_PENDING_MESSAGE = 
  "Payment processing is being set up. Once confirmed, you'll receive an invoice via email.";

export const INVOICE_COMING_SOON_MESSAGE = 
  "Invoice automation coming soon. Our concierge will send your receipt manually.";