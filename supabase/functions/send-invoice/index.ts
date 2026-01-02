import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvoiceRequest {
  bookingId: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    // Create user client to verify authentication
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      console.error("Failed to get user:", userError);
      return new Response(
        JSON.stringify({ error: "Authentication failed" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("User authenticated:", user.id);

    // Service role client for fetching data
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    const { bookingId }: InvoiceRequest = await req.json();
    
    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: "Missing booking ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify booking belongs to the authenticated user
    const { data: booking, error: bookingError } = await adminClient
      .from('bookings_public')
      .select(`
        id,
        booking_number,
        booking_date,
        user_id,
        supplier_id
      `)
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      console.error("Booking not found:", bookingError);
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (booking.user_id !== user.id) {
      console.error("User not authorized for this booking");
      return new Response(
        JSON.stringify({ error: "Not authorized to access this booking" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch financial data
    const { data: financial } = await adminClient
      .from('bookings_financial')
      .select('total_amount')
      .eq('booking_id', bookingId)
      .single();

    // Fetch supplier name
    let supplierName = 'Concierge Service';
    if (booking.supplier_id) {
      const { data: supplier } = await adminClient
        .from('suppliers')
        .select('name')
        .eq('id', booking.supplier_id)
        .single();
      if (supplier?.name) {
        supplierName = supplier.name;
      }
    }
    const { data: publicProfile } = await adminClient
      .from('profiles_public')
      .select('full_name')
      .eq('id', user.id)
      .single();

    const { data: privateProfile } = await adminClient
      .from('profiles_private')
      .select('email, invoice_email')
      .eq('id', user.id)
      .single();

    const customerName = publicProfile?.full_name || 'Valued Customer';
    const customerEmail = privateProfile?.invoice_email || privateProfile?.email || user.email;
    const amount = financial?.total_amount || 0;
    const itemTitle = supplierName;

    if (!customerEmail) {
      return new Response(
        JSON.stringify({ error: "No email address found for customer" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const invoiceData = {
      bookingNumber: booking.booking_number,
      customerName,
      customerEmail,
      itemTitle,
      amount,
      currency: 'AED',
      bookingDate: booking.booking_date,
    };

    // Generate invoice HTML with premium branding
    const invoiceHtml = generateInvoiceHtml(invoiceData);
    
    // Check if Resend API key is configured
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.log("Invoice generated (email not configured):", {
        bookingNumber: invoiceData.bookingNumber,
        customerEmail: invoiceData.customerEmail,
        amount: `${invoiceData.amount} ${invoiceData.currency}`,
      });
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Invoice recorded. Email service pending configuration.",
          invoiceNumber: invoiceData.bookingNumber 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AI My Dubai <invoices@aimydubai.com>",
        to: [customerEmail],
        subject: `Your AI My Dubai Invoice - ${invoiceData.bookingNumber}`,
        html: invoiceHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Email send failed:", errorText);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Failed to send invoice email",
          details: errorText 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailResult = await emailResponse.json();
    
    console.log("Invoice sent successfully to:", customerEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Invoice sent successfully",
        invoiceNumber: invoiceData.bookingNumber,
        emailId: emailResult.id 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Invoice error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

interface InvoiceHtmlData {
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  itemTitle: string;
  amount: number;
  currency: string;
  bookingDate: string;
}

function generateInvoiceHtml(data: InvoiceHtmlData): string {
  const invoiceDate = new Date().toLocaleDateString('en-AE', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const formattedAmount = new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: data.currency || 'AED',
    minimumFractionDigits: 0,
  }).format(data.amount);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice - ${data.bookingNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0B0B0F;
      color: #F5F5F7;
      line-height: 1.6;
    }
    .invoice-container {
      max-width: 600px;
      margin: 0 auto;
      background: #121218;
      border: 1px solid rgba(214, 180, 106, 0.2);
      border-radius: 16px;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #1A1A22 0%, #121218 100%);
      padding: 40px;
      text-align: center;
      border-bottom: 1px solid rgba(214, 180, 106, 0.3);
    }
    .logo {
      width: 80px;
      height: 80px;
      margin-bottom: 16px;
    }
    .brand-name {
      font-size: 24px;
      font-weight: 500;
      color: #D6B46A;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .tagline {
      font-size: 12px;
      color: #A9A9B2;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .invoice-title {
      background: rgba(214, 180, 106, 0.08);
      padding: 24px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(214, 180, 106, 0.15);
    }
    .invoice-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #A9A9B2;
    }
    .invoice-number {
      font-size: 18px;
      font-weight: 500;
      color: #D6B46A;
    }
    .invoice-date {
      text-align: right;
      color: #F5F5F7;
    }
    .content {
      padding: 40px;
    }
    .section {
      margin-bottom: 32px;
    }
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #D6B46A;
      margin-bottom: 12px;
    }
    .customer-name {
      font-size: 18px;
      font-weight: 500;
      color: #F5F5F7;
    }
    .customer-email {
      color: #A9A9B2;
      font-size: 14px;
    }
    .line-item {
      background: rgba(214, 180, 106, 0.05);
      border: 1px solid rgba(214, 180, 106, 0.15);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 16px;
    }
    .item-title {
      font-size: 16px;
      font-weight: 500;
      color: #F5F5F7;
      margin-bottom: 8px;
    }
    .item-date {
      font-size: 14px;
      color: #A9A9B2;
    }
    .total-section {
      background: linear-gradient(135deg, rgba(214, 180, 106, 0.15) 0%, rgba(214, 180, 106, 0.05) 100%);
      border: 1px solid rgba(214, 180, 106, 0.3);
      border-radius: 12px;
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .total-label {
      font-size: 14px;
      color: #A9A9B2;
    }
    .total-amount {
      font-size: 28px;
      font-weight: 600;
      color: #D6B46A;
    }
    .footer {
      background: #0B0B0F;
      padding: 32px 40px;
      text-align: center;
      border-top: 1px solid rgba(214, 180, 106, 0.15);
    }
    .footer-text {
      font-size: 12px;
      color: #A9A9B2;
      margin-bottom: 8px;
    }
    .footer-brand {
      font-size: 14px;
      color: #D6B46A;
      font-weight: 500;
    }
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(214, 180, 106, 0.3), transparent);
      margin: 24px 0;
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #D6B46A, #B88A2A); border-radius: 16px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 32px; color: #0B0B0F; font-weight: bold;">AI</span>
      </div>
      <div class="brand-name">AI MY DUBAI</div>
      <div class="tagline">Premium Concierge Service</div>
    </div>
    
    <div class="invoice-title">
      <div>
        <div class="invoice-label">Invoice Number</div>
        <div class="invoice-number">${data.bookingNumber}</div>
      </div>
      <div class="invoice-date">
        <div class="invoice-label">Date</div>
        <div>${invoiceDate}</div>
      </div>
    </div>
    
    <div class="content">
      <div class="section">
        <div class="section-title">Billed To</div>
        <div class="customer-name">${data.customerName}</div>
        <div class="customer-email">${data.customerEmail}</div>
      </div>
      
      <div class="divider"></div>
      
      <div class="section">
        <div class="section-title">Service Details</div>
        <div class="line-item">
          <div class="item-title">${data.itemTitle}</div>
          <div class="item-date">Service Date: ${data.bookingDate}</div>
        </div>
      </div>
      
      <div class="total-section">
        <div class="total-label">Total Amount</div>
        <div class="total-amount">${formattedAmount}</div>
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-text">Thank you for choosing AI My Dubai</div>
      <div class="footer-text">Your satisfaction is our priority</div>
      <div class="divider"></div>
      <div class="footer-brand">AI MY DUBAI</div>
      <div class="footer-text">Concierge. It. Done.</div>
    </div>
  </div>
</body>
</html>
  `;
}
