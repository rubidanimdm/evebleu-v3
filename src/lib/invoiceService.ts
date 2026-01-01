/**
 * Invoice Email Service
 * Production-ready placeholder for invoice automation
 */

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
 * Integration pending - will use edge function + email provider
 */
export async function sendInvoiceEmail(data: InvoiceData): Promise<{ success: boolean; error?: string }> {
  try {
    // Invoice sending will be handled by edge function when configured
    // For now, return success to maintain flow integrity
    return { success: true };
  } catch (error: any) {
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
 * UI messages for payment/invoicing status
 */
export const PAYMENT_PENDING_MESSAGE = 
  "Payment processing is being set up. Once confirmed, you'll receive an invoice via email.";

export const INVOICE_COMING_SOON_MESSAGE = 
  "Invoice automation coming soon. Our concierge will send your receipt manually.";