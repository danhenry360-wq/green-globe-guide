import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HOTEL_DATA } from '@/data/hotel_data';
import { MapPin, ExternalLink } from 'lucide-react'; // already imported in Hotels.tsx

export default function HotelDetail() {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const navigate = useNavigate();

  const hotel = useMemo(() => {
    for (const country of HOTEL_DATA)
      for (const state of country.states)
        for (const h of state.hotels)
          if (h.slug === hotelSlug) return { ...h, country: country.country, flag: country.flagPath };
    return null;
  }, [hotelSlug]);

  if (!hotel) return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div>
        <p className="mb-4">Hotel not found.</p>
        <button onClick={() => navigate(-1)} className="text-accent hover:underline">← Go back</button>
      </div>
    </div>
  );

  return (
    <>
      <head>
        <title>{hotel.name} | BudQuest Verified 420 Hotel</title>
        <meta name="description" content={hotel.policyHighlights} />
      </head>

      <div className="min-h-screen bg-background text-white">
        <Navigation />

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* back link */}
            <button onClick={() => navigate(-1)} className="mb-6 text-accent hover:underline text-sm">← Back to list</button>

            {/* hero card */}
            <div className="rounded-xl border border-border bg-card/50 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={hotel.image || 'https://via.placeholder.com/600x400?text=Hotel'}
                  alt={hotel.name}
                  className="w-full md:w-96 h-64 object-cover rounded-lg border border-border"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={hotel.flag} alt={hotel.country} className="h-5 w-7 rounded border border-border" />
                    <span className="text-xs text-muted-foreground">{hotel.country}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{hotel.name}</h1>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" /> {hotel.city}, {hotel.state}
                  </p>

                  <a
                    href={hotel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition"
                  >
                    <ExternalLink className="w-4 h-4" /> Book now
                  </a>
                </div>
              </div>
            </div>

            {/* policy */}
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <h2 className="text-lg font-semibold mb-3">Cannabis policy</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{hotel.policyHighlights}</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
