import { Coffee, Phone, MapPin, Clock, Mail, Heart, Sparkles, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { CERO_CAFE_INFO } from '../data/cafeData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenReservation: () => void;
}

export default function Footer({ onNavigate, onOpenReservation }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
  };

  return (
    <footer className="bg-[#380200] text-[#FEFBF3] border-t-2 border-[#E88C2B]/30 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E88C2B] flex items-center justify-center text-[#4E0401] shadow-md">
                <Coffee className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold tracking-wider text-[#FEFBF3]">
                  CERO
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded font-bold tracking-wider bg-[#E88C2B] text-[#4E0401] ml-1.5">
                  COFFEE
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FEFBF3]/80 leading-relaxed max-w-sm">
              Crafting premium single-origin Ugandan coffees 24 hours a day at Shell Bulenga, Kampala.
              Proudly sourcing from smallholder farmers in Mount Elgon and the Rwenzori foothills.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#FEFBF3]/70">
              <Sparkles className="w-4 h-4 text-[#E88C2B]" />
              <span>4.9 ★ Rated Specialty Cafe on Google Maps</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#E88C2B] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#FEFBF3]/80">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#E88C2B] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#E88C2B] transition-colors"
                >
                  Coffee & Pastries Menu
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="hover:text-[#E88C2B] transition-colors"
                >
                  Table & Co-Work Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('heritage')}
                  className="hover:text-[#E88C2B] transition-colors"
                >
                  Our Ugandan Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-[#E88C2B] transition-colors"
                >
                  Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details from Google Listing */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#FEFBF3]/80">
            <h4 className="font-serif font-bold text-sm text-[#E88C2B] uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E88C2B] shrink-0 mt-0.5" />
                <span>
                  Next to KFC, A109 Bulenga Mityana road at Shell Bulenga, Kampala, Uganda
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E88C2B] shrink-0" />
                <a href={`tel:${CERO_CAFE_INFO.phone}`} className="hover:text-[#E88C2B] font-semibold">
                  {CERO_CAFE_INFO.displayPhone} / +256 772 424002
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E88C2B] shrink-0" />
                <span className="text-[#E88C2B] font-bold">Open 24 Hours Daily</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E88C2B] shrink-0" />
                <span>{CERO_CAFE_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#E88C2B] uppercase tracking-wider">
              The CERO Roasters Club
            </h4>
            <p className="text-xs text-[#FEFBF3]/75 leading-relaxed">
              Get notified of seasonal micro-lot bean harvests and special tasting events in Kampala.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-500 text-xs text-emerald-200">
                ✓ Welcome to the club! We'll keep you updated.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center rounded-xl bg-[#4E0401] border border-[#E88C2B]/40 overflow-hidden">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter email address..."
                    className="w-full px-3 py-2.5 text-xs text-[#FEFBF3] bg-transparent focus:outline-none placeholder-[#FEFBF3]/40"
                    required
                  />
                  <button
                    type="submit"
                    className="p-2.5 text-[#E88C2B] hover:text-[#FEFBF3] hover:bg-[#E88C2B]/20 transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar with Color Swatch nod */}
        <div className="pt-8 border-t border-[#FEFBF3]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FEFBF3]/60">
          <div>
            © {new Date().getFullYear()} CERO COFFEE Uganda. All rights reserved.
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span>Palette:</span>
            <span className="inline-flex items-center gap-1 font-mono text-[#FEFBF3]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E88C2B]" /> #E88C2B
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[#FEFBF3]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEFBF3]" /> #FEFBF3
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[#FEFBF3]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4E0401]" /> #4E0401
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Brewed with</span>
            <Heart className="w-3.5 h-3.5 fill-[#E88C2B] text-[#E88C2B]" />
            <span>in Kampala, Uganda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
