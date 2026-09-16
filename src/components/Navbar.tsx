import { useState } from 'react';
import { Coffee, ShoppingBag, Calendar, Phone, Menu as MenuIcon, X, MapPin, Sparkles } from 'lucide-react';
import { Currency } from '../types';
import { CERO_CAFE_INFO } from '../data/cafeData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currency: Currency;
  onToggleCurrency: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export default function Navbar({
  activeSection,
  onNavigate,
  currency,
  onToggleCurrency,
  cartCount,
  onOpenCart,
  onOpenReservation,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'menu', label: 'Menu & Order' },
    { id: 'reservation', label: 'Table Booking' },
    { id: 'heritage', label: 'Our Story' },
    { id: 'reviews', label: 'Reviews (4.9 ★)' },
    { id: 'location', label: 'Find Us' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#4E0401] text-[#FEFBF3] shadow-md border-b border-[#E88C2B]/30 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#380200] px-4 py-1.5 text-xs text-[#FEFBF3]/90 border-b border-[#E88C2B]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E88C2B] text-[#380200]">
              <Sparkles className="w-3 h-3" /> OPEN 24 HOURS
            </span>
            <span className="hidden sm:inline text-xs text-[#FEFBF3]/80">
              Shell Bulenga (Next to KFC, Mityana Rd) · Kampala
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${CERO_CAFE_INFO.phone}`}
              id="top-nav-phone-link"
              className="flex items-center gap-1.5 hover:text-[#E88C2B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E88C2B]" />
              <span className="font-medium">{CERO_CAFE_INFO.displayPhone}</span>
            </a>
            <span className="text-[#FEFBF3]/40">|</span>
            <button
              id="currency-toggle-btn"
              onClick={onToggleCurrency}
              className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#4E0401] border border-[#E88C2B]/50 hover:bg-[#E88C2B] hover:text-[#380200] transition-colors"
              title="Toggle currency between Ugandan Shillings and US Dollars"
            >
              Currency: <span className="underline">{currency}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-11 h-11 rounded-xl bg-[#E88C2B] flex items-center justify-center text-[#4E0401] shadow-lg group-hover:scale-105 transition-transform">
            <Coffee className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-serif font-bold tracking-wider text-[#FEFBF3]">
                CERO
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded font-bold tracking-wider bg-[#E88C2B] text-[#4E0401]">
                COFFEE
              </span>
            </div>
            <p className="text-[11px] tracking-widest text-[#FEFBF3]/70 uppercase font-sans">
              Specialty Roastery · Shell Bulenga
            </p>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === link.id
                  ? 'bg-[#E88C2B] text-[#380200] shadow-sm font-semibold'
                  : 'text-[#FEFBF3]/90 hover:text-[#FEFBF3] hover:bg-[#380200]/60'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Reservation CTA */}
          <button
            id="nav-reservation-btn"
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold border border-[#E88C2B] text-[#FEFBF3] hover:bg-[#E88C2B] hover:text-[#380200] transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#E88C2B] group-hover:text-[#380200]" />
            <span>Book Table</span>
          </button>

          {/* Cart Button */}
          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            aria-label="View Cart"
            className="relative p-2.5 rounded-lg bg-[#E88C2B] text-[#380200] hover:bg-[#D67A1B] transition-colors font-semibold shadow-md flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-[#380200] text-[#FEFBF3] text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#FEFBF3] hover:bg-[#380200] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#380200] border-t border-[#E88C2B]/30 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#FEFBF3]/10">
            <span className="text-xs text-[#FEFBF3]/70">Explore CERO COFFEE</span>
            <button
              onClick={onToggleCurrency}
              className="text-xs font-semibold px-2 py-1 rounded bg-[#4E0401] border border-[#E88C2B] text-[#E88C2B]"
            >
              Currency: {currency}
            </button>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                activeSection === link.id
                  ? 'bg-[#E88C2B] text-[#380200] font-semibold'
                  : 'text-[#FEFBF3]/90 hover:bg-[#4E0401]'
              }`}
            >
              <span>{link.label}</span>
              {activeSection === link.id && <span className="text-xs font-bold">•</span>}
            </button>
          ))}

          <div className="pt-3 border-t border-[#FEFBF3]/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 rounded-lg bg-[#E88C2B] text-[#380200] font-semibold text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book a Table Online
            </button>
            <a
              href={`tel:${CERO_CAFE_INFO.phone}`}
              className="w-full py-2.5 rounded-lg border border-[#E88C2B]/60 text-[#FEFBF3] text-center text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#4E0401]"
            >
              <Phone className="w-4 h-4 text-[#E88C2B]" /> Call Us ({CERO_CAFE_INFO.displayPhone})
            </a>
            <div className="flex items-center gap-2 text-xs text-[#FEFBF3]/70 justify-center pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#E88C2B]" />
              <span>Bulenga Mityana Rd at Shell Bulenga (Next to KFC)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
