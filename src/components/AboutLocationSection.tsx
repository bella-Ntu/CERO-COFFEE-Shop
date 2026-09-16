import { MapPin, Phone, Clock, Navigation, ExternalLink, Shield, Wifi, Car, UtensilsCrossed, Coffee, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { CERO_CAFE_INFO } from '../data/cafeData';

export default function AboutLocationSection() {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${CERO_CAFE_INFO.address}, Phone: ${CERO_CAFE_INFO.displayPhone}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const amenities = [
    { icon: Clock, title: 'Open 24 Hours', desc: 'Serving day & night travelers on Mityana Road' },
    { icon: UtensilsCrossed, title: 'Next to KFC Bulenga', desc: 'Great for dining combos & quick stopovers' },
    { icon: Car, title: 'Shell Fuel Station', desc: 'Refuel your car with ample free secure parking' },
    { icon: Wifi, title: 'Dedicated Fiber Wi-Fi', desc: 'High-speed internet for remote laptops & phones' },
    { icon: Coffee, title: 'Single-Origin Coffee', desc: 'Mt. Elgon & Rwenzori beans freshly grounded' },
    { icon: Shield, title: '24/7 Monitored Security', desc: 'Well-lit station with on-site security guards' },
  ];

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#4E0401] text-[#FEFBF3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Story Section (Heritage) */}
        <div id="heritage" className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E88C2B] text-[#380200]">
              The CERO Coffee Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FEFBF3] leading-tight">
              Rooted in Uganda’s Rich Volcanic Soils
            </h2>
            <p className="text-sm sm:text-base text-[#FEFBF3]/85 font-light leading-relaxed">
              Uganda produces some of the most complex, aromatic coffee beans in the world.
              From the high-altitude misty slopes of <strong className="text-[#E88C2B] font-semibold">Mount Elgon (Bugisu AA)</strong> to the lush cloud forests of the <strong className="text-[#E88C2B] font-semibold">Rwenzori Mountains</strong>, CERO COFFEE celebrates local farmers and micro-lots.
            </p>
            <p className="text-sm sm:text-base text-[#FEFBF3]/85 font-light leading-relaxed">
              Conveniently positioned at Shell Bulenga on the busy A109 Mityana Road, we operate around the clock to provide high-caliber espresso, refreshing cold drinks, and a peaceful oasis for travelers, creatives, and coffee enthusiasts alike.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#380200] border border-[#E88C2B]/30">
                <span className="text-[#E88C2B] font-bold text-lg block">1,800m+</span>
                <span className="text-[#FEFBF3]/70">Elevation Sourced</span>
              </div>
              <div className="p-3 rounded-xl bg-[#380200] border border-[#E88C2B]/30">
                <span className="text-[#E88C2B] font-bold text-lg block">100%</span>
                <span className="text-[#FEFBF3]/70">Ugandan Harvested</span>
              </div>
              <div className="p-3 rounded-xl bg-[#380200] border border-[#E88C2B]/30">
                <span className="text-[#E88C2B] font-bold text-lg block">24 / 7</span>
                <span className="text-[#FEFBF3]/70">Continuous Service</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80"
              alt="Artisan Barista Pouring Coffee"
              className="rounded-2xl object-cover h-64 sm:h-72 w-full border border-[#E88C2B]/30 shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80"
              alt="Ugandan Coffee Roasting Beans"
              className="rounded-2xl object-cover h-64 sm:h-72 w-full border border-[#E88C2B]/30 shadow-lg translate-y-4"
            />
          </div>
        </div>

        {/* Location & Map Section */}
        <div className="rounded-3xl bg-[#380200] border-2 border-[#E88C2B]/40 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#FEFBF3]/15">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#E88C2B] uppercase tracking-wider">
                  Location & Contact Details
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E88C2B] text-[#380200]">
                  OPEN 24 HOURS
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FEFBF3]">
                Visit CERO COFFEE at Shell Bulenga
              </h3>
              <p className="text-xs sm:text-sm text-[#FEFBF3]/80 mt-1">
                {CERO_CAFE_INFO.address}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${CERO_CAFE_INFO.phone}`}
                id="location-call-btn"
                className="px-5 py-2.5 rounded-xl bg-[#E88C2B] text-[#380200] font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#D67A1B] transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call {CERO_CAFE_INFO.displayPhone}</span>
              </a>

              <a
                href="https://maps.google.com/?q=Shell+Bulenga+Kampala+Uganda"
                target="_blank"
                rel="noreferrer"
                id="location-directions-btn"
                className="px-5 py-2.5 rounded-xl bg-transparent border-2 border-[#FEFBF3]/70 hover:bg-[#FEFBF3] hover:text-[#4E0401] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#E88C2B]" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <button
                onClick={handleCopyAddress}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FEFBF3] transition-colors"
                title="Copy Address"
              >
                {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Interactive Map Visual Mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Map Representation */}
            <div className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden relative border border-[#E88C2B]/30 bg-[#250100]">
              {/* Stylized Map View */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-85"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #4E0401 0%, #1f0100 100%)`,
                }}
              />

              {/* Grid Roads Graphics simulation */}
              <svg className="absolute inset-0 w-full h-full stroke-[#E88C2B]/25 stroke-[2] fill-none">
                <path d="M-50 120 Q 200 100, 450 180 T 900 150" strokeWidth="8" stroke="#E88C2B/40" />
                <path d="M150 -50 L 220 500" strokeWidth="4" />
                <path d="M400 -50 L 360 500" strokeWidth="6" stroke="#FEFBF3/30" />
                <circle cx="380" cy="165" r="40" stroke="#E88C2B" strokeDasharray="4 4" />
              </svg>

              {/* Pin for CERO COFFEE */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#E88C2B] text-[#380200] flex items-center justify-center shadow-2xl animate-bounce">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <div className="w-6 h-2 bg-black/40 rounded-full mx-auto mt-1 blur-xs" />
                </div>
                <div className="mt-2 px-3 py-1.5 rounded-xl bg-[#380200] text-[#FEFBF3] border border-[#E88C2B] shadow-lg text-xs font-bold whitespace-nowrap">
                  <span className="text-[#E88C2B]">CERO COFFEE</span> · Shell Bulenga
                  <div className="text-[10px] text-white/70 font-normal">Next to KFC · Open 24/7</div>
                </div>
              </div>

              {/* Shell & KFC Neighbor markers */}
              <div className="absolute top-12 left-12 p-2 rounded-lg bg-black/60 backdrop-blur-xs text-[11px] text-white/90 border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" /> KFC Bulenga Branch
              </div>
              <div className="absolute bottom-10 right-12 p-2 rounded-lg bg-black/60 backdrop-blur-xs text-[11px] text-white/90 border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Shell Service Station
              </div>
            </div>

            {/* Practical Station Amenities */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenities.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#4E0401]/90 border border-[#E88C2B]/20 space-y-1">
                    <item.icon className="w-4 h-4 text-[#E88C2B]" />
                    <h5 className="font-bold text-xs text-[#FEFBF3]">{item.title}</h5>
                    <p className="text-[11px] text-[#FEFBF3]/70">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#E88C2B]/15 border border-[#E88C2B]/40 text-xs text-[#FEFBF3]/90 space-y-1">
                <div className="font-bold text-[#E88C2B]">Road Trip & Highway Convenience:</div>
                <p className="text-[11px]">
                  Directly accessible off the A109 Bulenga Mityana highway heading towards Mityana, Mubende, and Fort Portal. Perfect stopping point for fresh coffee, restroom access, and fuel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
