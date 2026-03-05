import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY');
    if (!RAPIDAPI_KEY) {
      throw new Error('RAPIDAPI_KEY is not configured');
    }

    const { destination, checkIn, checkOut, guests, rooms } = await req.json();

    // Step 1: Search for destination ID
    const destResponse = await fetch(
      `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${encodeURIComponent(destination || 'Dubai')}`,
      {
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
        },
      }
    );

    if (!destResponse.ok) {
      throw new Error(`Destination search failed [${destResponse.status}]: ${await destResponse.text()}`);
    }

    const destData = await destResponse.json();
    const destId = destData?.data?.[0]?.dest_id;
    const destType = destData?.data?.[0]?.search_type || 'city';

    if (!destId) {
      return new Response(JSON.stringify({ hotels: [], message: 'Destination not found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 2: Search hotels
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const arrivalDate = checkIn || tomorrow.toISOString().split('T')[0];
    const departureDate = checkOut || dayAfter.toISOString().split('T')[0];

    const searchUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${destId}&search_type=${destType}&arrival_date=${arrivalDate}&departure_date=${departureDate}&adults=${guests || 2}&room_qty=${rooms || 1}&currency_code=AED&languagecode=en-us&page_number=1&units=metric&temperature_unit=c`;

    const hotelsResponse = await fetch(searchUrl, {
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
      },
    });

    if (!hotelsResponse.ok) {
      throw new Error(`Hotel search failed [${hotelsResponse.status}]: ${await hotelsResponse.text()}`);
    }

    const hotelsData = await hotelsResponse.json();
    
    // Map API results to our format
    const hotels = (hotelsData?.data?.hotels || []).slice(0, 20).map((h: any) => ({
      id: String(h.hotel_id || h.property?.id || ''),
      name: h.property?.name || h.hotel_name || 'Unknown Hotel',
      location: h.property?.wishlistName || h.accessibilityLabel?.split('\n')?.[1] || 'Dubai',
      image: h.property?.photoUrls?.[0] || h.max_photo_url || h.main_photo_url || '',
      rating: h.property?.reviewScore || h.review_score || 0,
      reviewCount: h.property?.reviewCount || h.review_nr || 0,
      reviewLabel: h.property?.reviewScoreWord || h.review_score_word || '',
      pricePerNight: Math.round(h.property?.priceBreakdown?.grossPrice?.value || h.min_total_price || 0),
      originalPrice: h.property?.priceBreakdown?.strikethroughPrice?.value ? Math.round(h.property.priceBreakdown.strikethroughPrice.value) : undefined,
      stars: h.property?.propertyClass || h.class || 0,
      amenities: extractAmenities(h),
      description: h.accessibilityLabel || h.property?.wishlistName || '',
      distanceFromCenter: h.property?.distanceFromCenter || '',
      freeCancel: h.property?.freeCancellation || false,
      breakfastIncluded: h.property?.breakfastIncluded || false,
      tags: extractTags(h),
      checkoutPrice: h.property?.priceBreakdown?.grossPrice?.value ? Math.round(h.property.priceBreakdown.grossPrice.value) : undefined,
      currency: h.property?.priceBreakdown?.grossPrice?.currency || 'AED',
    }));

    return new Response(JSON.stringify({ hotels }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error searching hotels:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ hotels: [], error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractAmenities(h: any): string[] {
  const amenities: string[] = [];
  const badges = h.property?.checkinCheckoutConfig || {};
  if (h.property?.isPreferred) amenities.push('Popular');
  // Generic amenities based on star rating
  const stars = h.property?.propertyClass || h.class || 0;
  if (stars >= 4) {
    amenities.push('WiFi', 'Pool', 'Restaurant');
    if (stars >= 5) amenities.push('Spa', 'Gym');
  } else {
    amenities.push('WiFi');
  }
  return amenities;
}

function extractTags(h: any): string[] {
  const tags: string[] = [];
  if (h.property?.isPreferred) tags.push('Preferred');
  if (h.property?.freeCancellation) tags.push('Free Cancel');
  if (h.badge?.text) tags.push(h.badge.text);
  return tags.slice(0, 2);
}
