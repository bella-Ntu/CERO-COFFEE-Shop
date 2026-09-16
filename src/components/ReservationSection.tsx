import { useState, FormEvent } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle2, QrCode, Phone, Mail, Sparkles, AlertCircle, Share2, Printer, ChevronRight } from 'lucide-react';
import { ReservationData, SeatingArea } from '../types';
import { CERO_CAFE_INFO, SEATING_ZONES, TIME_SLOTS_24H } from '../data/cafeData';
import { generateBookingRef } from '../utils/formatters';

interface ReservationSectionProps {
  onSuccessBooking: (reservation: ReservationData) => void;
}

export default function ReservationSection({ onSuccessBooking }: ReservationSectionProps) {
  const [selectedZone, setSelectedZone] = useState<SeatingArea>('lounge');
  const [guestCount, setGuestCount] = useState(2);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('02:00 PM');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState('Casual Catchup');
  const [specialRequests, setSpecialRequests] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!phoneNumber.trim()) {
      setFormError('Please enter your phone number (e.g. 0772 123456)');
      return;
    }

    setFormError('');

    const newReservation: ReservationData = {
      id: `RES-${Date.now()}`,
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      date,
      timeSlot,
      guestCount,
      seatingArea: selectedZone,
      occasion,
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      bookingRef: generateBookingRef(),
    };

    setConfirmedReservation(newReservation);
    onSuccessBooking(newReservation);
  };

  const handleResetForm = () => {
    setConfirmedReservation(null);
    setCustomerName('');
    setPhoneNumber('');
    setEmail('');
    setSpecialRequests('');
  };

  const selectedZoneData = SEATING_ZONES.find((z) => z.id === selectedZone);

  return (
    <section id="reservation" className="py-16 sm:py-24 bg-[#F9F4EB] text-[#4E0401] border-y border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E88C2B] text-[#380200]">
            <Calendar className="w-3.5 h-3.5" /> Table & Co-Work Booking
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4E0401] tracking-tight">
            Reserve Your Spot at CERO COFFEE
          </h2>
          <p className="text-sm sm:text-base text-[#4E0401]/80 leading-relaxed font-light">
            Whether for a morning business meeting, quiet remote work with dedicated power & fiber Wi-Fi,
            or a late-night coffee break along the Mityana highway, we have your table ready 24/7.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Pass Screen */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#E88C2B] p-6 sm:p-10 shadow-xl space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E88C2B]">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4E0401]">
                We Can’t Wait to Welcome You, {confirmedReservation.customerName}!
              </h3>
              <p className="text-xs sm:text-sm text-[#4E0401]/70">
                Your reservation at Shell Bulenga is confirmed. Present this voucher or provide your phone number on arrival.
              </p>
            </div>

            {/* Official Pass Card */}
            <div className="bg-[#4E0401] text-[#FEFBF3] rounded-2xl p-6 sm:p-7 border border-[#E88C2B]/40 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E88C2B]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#FEFBF3]/15 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#E88C2B] font-bold">
                    CERO COFFEE LOUNGE
                  </span>
                  <div className="text-xl font-serif font-bold text-[#FEFBF3]">
                    Booking Pass
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#FEFBF3]/70 uppercase block">Ref Code</span>
                  <span className="text-lg font-mono font-bold text-[#E88C2B] tracking-wider">
                    {confirmedReservation.bookingRef}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-[#FEFBF3]/15 text-xs">
                <div>
                  <span className="text-[#FEFBF3]/60 block mb-1">Date</span>
                  <span className="font-semibold text-sm text-[#FEFBF3]">{confirmedReservation.date}</span>
                </div>
                <div>
                  <span className="text-[#FEFBF3]/60 block mb-1">Time Slot</span>
                  <span className="font-semibold text-sm text-[#FEFBF3]">{confirmedReservation.timeSlot}</span>
                </div>
                <div>
                  <span className="text-[#FEFBF3]/60 block mb-1">Party Size</span>
                  <span className="font-semibold text-sm text-[#FEFBF3]">
                    {confirmedReservation.guestCount} {confirmedReservation.guestCount === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <div>
                  <span className="text-[#FEFBF3]/60 block mb-1">Seating Area</span>
                  <span className="font-semibold text-sm text-[#E88C2B] capitalize">
                    {confirmedReservation.seatingArea.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white text-[#380200]">
                    <QrCode className="w-10 h-10" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-[#FEFBF3]">{CERO_CAFE_INFO.name}</p>
                    <p className="text-[#FEFBF3]/70 text-[11px]">Shell Bulenga, next to KFC</p>
                    <p className="text-[#E88C2B] text-[11px]">{CERO_CAFE_INFO.displayPhone}</p>
                  </div>
                </div>

                <div className="text-xs text-right text-[#FEFBF3]/80">
                  <span className="inline-block px-2 py-1 rounded bg-emerald-800/80 text-emerald-200 font-medium">
                    Guaranteed Table
                  </span>
                </div>
              </div>
            </div>

            {/* Practical instructions */}
            <div className="p-4 rounded-xl bg-[#F9F4EB] border border-[#E8DFD3] text-xs text-[#4E0401]/80 space-y-1.5">
              <p className="font-bold text-[#4E0401]">Good to know:</p>
              <p>• Tables are held for 20 minutes past your reserved time slot.</p>
              <p>• Free secure customer parking available right at Shell Bulenga service station.</p>
              <p>• High-speed fiber Wi-Fi password will be provided upon seating.</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl border border-[#4E0401]/30 text-xs font-semibold text-[#4E0401] hover:bg-[#4E0401] hover:text-[#FEFBF3] transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Voucher
              </button>

              <a
                href={`https://wa.me/256772424002?text=${encodeURIComponent(
                  `Hello CERO COFFEE, I have booked a table with ref: ${confirmedReservation.bookingRef} for ${confirmedReservation.date} at ${confirmedReservation.timeSlot}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Share2 className="w-4 h-4" /> Confirm on WhatsApp
              </a>

              <button
                onClick={handleResetForm}
                className="px-4 py-2.5 rounded-xl bg-[#E88C2B] text-[#380200] text-xs font-bold hover:bg-[#D67A1B] transition-colors"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Reservation Form */
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            {formError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Step 1: Select Seating Zone */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4E0401] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#4E0401] text-[#FEFBF3] text-xs flex items-center justify-center font-mono">1</span>
                  Select Your Preferred Seating Ambiance
                </label>
                <span className="text-xs text-[#4E0401]/60">4 Zones Available</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SEATING_ZONES.map((zone) => (
                  <div
                    key={zone.id}
                    id={`zone-${zone.id}`}
                    onClick={() => setSelectedZone(zone.id as SeatingArea)}
                    className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      selectedZone === zone.id
                        ? 'border-[#E88C2B] shadow-lg ring-2 ring-[#E88C2B]/30 bg-white'
                        : 'border-[#E8DFD3] hover:border-[#E88C2B]/50 bg-white/70'
                    }`}
                  >
                    <div className="h-28 w-full overflow-hidden relative">
                      <img
                        src={zone.image}
                        alt={zone.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#E88C2B] text-[#380200]">
                          {zone.capacity}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#4E0401]">{zone.name}</h4>
                        <p className="text-[11px] text-[#4E0401]/70 line-clamp-2 mt-0.5">{zone.description}</p>
                      </div>

                      <div className="pt-2 border-t border-[#E8DFD3] flex items-center justify-between text-[11px]">
                        <span className="text-[#E88C2B] font-semibold">
                          {selectedZone === zone.id ? 'Selected' : 'Select Zone'}
                        </span>
                        {selectedZone === zone.id && (
                          <div className="w-4 h-4 rounded-full bg-[#E88C2B] text-[#380200] flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Date, Time & Guests */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFD3] shadow-sm space-y-6">
              <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4E0401] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#4E0401] text-[#FEFBF3] text-xs flex items-center justify-center font-mono">2</span>
                Choose Date, Time Slot & Party Size
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Date Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4E0401] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E88C2B]" /> Date
                  </label>
                  <input
                    type="date"
                    id="reservation-date-input"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#4E0401]/20 bg-[#FEFBF3] text-sm text-[#4E0401] focus:outline-none focus:border-[#E88C2B]"
                    required
                  />
                </div>

                {/* Time Slot Picker (24/7 coverage) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4E0401] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E88C2B]" /> Time Slot (24/7 Available)
                  </label>
                  <select
                    id="reservation-time-select"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#4E0401]/20 bg-[#FEFBF3] text-sm text-[#4E0401] focus:outline-none focus:border-[#E88C2B]"
                  >
                    {TIME_SLOTS_24H.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4E0401] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#E88C2B]" /> Number of Guests
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          guestCount === num
                            ? 'bg-[#4E0401] text-[#FEFBF3] border-[#4E0401]'
                            : 'bg-[#FEFBF3] text-[#4E0401] border-[#4E0401]/20 hover:bg-[#E88C2B]/20'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Contact & Special Requests */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFD3] shadow-sm space-y-6">
              <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4E0401] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#4E0401] text-[#FEFBF3] text-xs flex items-center justify-center font-mono">3</span>
                Guest Contact Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4E0401]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="reservation-name-input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sarah Namubiru"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#4E0401]/20 bg-[#FEFBF3] text-sm text-[#4E0401] focus:outline-none focus:border-[#E88C2B]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4E0401] flex items-center justify-between">
                    <span>Phone Number *</span>
                    <span className="text-[10px] text-[#E88C2B]">Uganda: +256 / 07...</span>
                  </label>
                  <input
                    type="tel"
                    id="reservation-phone-input"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 0772 424002"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#4E0401]/20 bg-[#FEFBF3] text-sm text-[#4E0401] focus:outline-none focus:border-[#E88C2B]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4E0401]">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id="reservation-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#4E0401]/20 bg-[#FEFBF3] text-sm text-[#4E0401] focus:outline-none focus:border-[#E88C2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4E0401]">
                    Occasion (Optional)
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#4E0401]/20 bg-[#FEFBF3] text-sm text-[#4E0401] focus:outline-none focus:border-[#E88C2B]"
                  >
                    <option value="Casual Catchup">Casual Catchup & Coffee</option>
                    <option value="Remote Work / Study">Remote Work / High-Speed Wi-Fi Session</option>
                    <option value="Business Meeting">Business Discussion</option>
                    <option value="Late Night Travel Rest">Highway Travel Rest (Mityana Road)</option>
                    <option value="Birthday / Celebration">Birthday / Celebration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4E0401]">
                    Special Requests
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Desk near wall socket, quiet booth, extra napkins"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#4E0401]/20 bg-[#FEFBF3] text-sm text-[#4E0401] focus:outline-none focus:border-[#E88C2B]"
                  />
                </div>
              </div>
            </div>

            {/* Submission CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#4E0401] text-[#FEFBF3] shadow-lg">
              <div className="text-center sm:text-left">
                <div className="font-serif font-bold text-lg text-[#FEFBF3]">
                  Confirm Free Table Reservation
                </div>
                <p className="text-xs text-[#FEFBF3]/70">
                  Instant confirmation code generated · 24/7 customer assistance at 0772 424002
                </p>
              </div>

              <button
                type="submit"
                id="submit-reservation-btn"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E88C2B] text-[#380200] font-bold text-sm hover:bg-[#D67A1B] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Reserve Table Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
