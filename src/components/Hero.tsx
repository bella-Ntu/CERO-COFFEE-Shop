import { Star, Clock, MapPin, Sparkles, Coffee, ShieldCheck, ChevronRight, Phone } from 'lucide-react';
import { CERO_CAFE_INFO } from '../data/cafeData';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
  onViewLocation: () => void;
}

export default function Hero({ onExploreMenu, onBookTable, onViewLocation }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#4E0401] text-[#FEFBF3] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative Swirled Coffee Gradient & Ambient Glows */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none bg-cover bg-center mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, #E88C2B 0%, transparent 50%), radial-gradient(circle at 10% 80%, #380200 0%, transparent 60%)`,
        }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E88C2B]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#E88C2B]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Pill Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#E88C2B] text-[#380200] shadow-sm">
                <Clock className="w-3.5 h-3.5" /> Open 24 Hours Daily
              </span>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEFBF3]/10 text-[#FEFBF3] border border-[#FEFBF3]/20">
                <Star className="w-3.5 h-3.5 fill-[#E88C2B] text-[#E88C2B]" />
                <span className="font-bold text-[#FEFBF3]">{CERO_CAFE_INFO.googleRating}</span>
                <span className="text-[#FEFBF3]/70">({CERO_CAFE_INFO.totalReviews} Google Reviews)</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#FEFBF3]/80 px-2.5 py-1 rounded-full bg-[#380200]">
                Shell Bulenga · Next to KFC
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#FEFBF3] leading-[1.15]">
              Specialty Coffee,{' '}
              <span className="text-[#E88C2B] underline decoration-[#E88C2B]/40 decoration-wavy underline-offset-8">
                Poured 24/7
              </span>{' '}
              in Kampala.
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-[#FEFBF3]/90 font-light max-w-2xl leading-relaxed">
              Welcome to <strong className="font-semibold text-[#FEFBF3]">CERO COFFEE</strong> at Shell Bulenga, Kampala.
              From micro-lot Mount Elgon Bugisu AA roasts to silky cappuccinos featured on Uganda’s 100-cafe tour,
              experience handcrafted brews, fresh gourmet bites, and cozy lounge spaces day and night.
            </p>

            {/* Quick Price & Location Highlight */}
            <div className="p-3.5 rounded-xl bg-[#380200]/80 border border-[#E88C2B]/30 flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E88C2B] shrink-0" />
                <span className="text-xs sm:text-sm text-[#FEFBF3]/90">
                  A109 Bulenga Mityana Road, next to KFC at Shell Bulenga
                </span>
              </div>
              <div className="text-xs font-medium px-2.5 py-1 rounded bg-[#E88C2B]/20 text-[#E88C2B] border border-[#E88C2B]/40">
                USh 1,000 – 20,000 per person
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-[#E88C2B] text-[#380200] hover:bg-[#D67A1B] transition-all shadow-lg hover:shadow-orange-500/20 flex items-center gap-2 transform active:scale-95"
              >
                <Coffee className="w-5 h-5" />
                <span>Order Ahead / Menu</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                id="hero-book-table-btn"
                onClick={onBookTable}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-transparent text-[#FEFBF3] border-2 border-[#FEFBF3]/80 hover:bg-[#FEFBF3] hover:text-[#4E0401] transition-all flex items-center gap-2"
              >
                <span>Reserve a Table</span>
              </button>

              <button
                id="hero-find-us-btn"
                onClick={onViewLocation}
                className="px-4 py-3.5 rounded-xl text-sm font-medium text-[#FEFBF3]/90 hover:text-[#E88C2B] transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-[#E88C2B]" />
                <span>View Map</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#FEFBF3]/15 text-xs text-[#FEFBF3]/80">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#E88C2B]/20 flex items-center justify-center text-[#E88C2B]">✓</div>
                <span>100% Uganda Highland Beans</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#E88C2B]/20 flex items-center justify-center text-[#E88C2B]">✓</div>
                <span>Fast Free Fiber Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#E88C2B]/20 flex items-center justify-center text-[#E88C2B]">✓</div>
                <span>Drive-Through & Dine-In</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#E88C2B]/20 flex items-center justify-center text-[#E88C2B]">✓</div>
                <span>MTN & Airtel MoMo Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Feature Card Matching Screenshot Marbled Aesthetic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#E88C2B]/40 shadow-2xl bg-[#380200]">
              {/* Image with marbled coffee look */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=80"
                  alt="Cero Coffee Marbled Swirl Latte"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#380200] via-transparent to-black/30" />
                
                {/* Floating Badge on image */}
                <div className="absolute top-4 left-4 bg-[#380200]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E88C2B]/50 flex items-center gap-2 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#E88C2B]" />
                  <span className="font-semibold text-[#FEFBF3]">Specialty House Roast</span>
                </div>

                <div className="absolute top-4 right-4 bg-[#E88C2B] text-[#380200] font-bold text-xs px-3 py-1 rounded-full shadow">
                  4.9 ★ Rating
                </div>

                {/* Tour shoutout pill */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#380200]/90 backdrop-blur-md border border-[#E88C2B]/40 text-xs">
                  <div className="flex items-center gap-2 text-[#E88C2B] font-semibold mb-1">
                    <span>❤️ “100 cappuccino from 100 places in Uganda”</span>
                  </div>
                  <p className="text-[#FEFBF3]/90 italic">
                    “Silky microfoam and distinct Mt. Elgon notes. Top quality coffee right next to KFC Shell Bulenga.”
                  </p>
                </div>
              </div>

              {/* Quick Info footer beneath image */}
              <div className="p-4 sm:p-5 bg-[#380200] text-[#FEFBF3] border-t border-[#E88C2B]/20 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#FEFBF3]">CERO COFFEE</h4>
                  <p className="text-xs text-[#FEFBF3]/70">A109 Bulenga Mityana Rd · 0772 424002</p>
                </div>
                <a
                  href={`tel:${CERO_CAFE_INFO.phone}`}
                  id="hero-call-card-btn"
                  className="px-3.5 py-2 rounded-lg bg-[#E88C2B] text-[#380200] font-bold text-xs flex items-center gap-1.5 hover:bg-[#D67A1B] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Call 24/7
                </a>
              </div>
            </div>

            {/* Accent Card Palette Swatch Reference (Subtle nod to user's uploaded image) */}
            <div className="mt-4 flex items-center justify-between p-2.5 rounded-xl bg-[#380200]/70 border border-[#E88C2B]/20 text-[11px] text-[#FEFBF3]/80">
              <span className="font-medium">Brand Harmony:</span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#E88C2B] border border-black/20" /> Orange Grove
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#FEFBF3] border border-black/20" /> Calming White
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#4E0401] border border-white/20" /> Dark Maroon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
