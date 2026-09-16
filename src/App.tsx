import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReservationSection from './components/ReservationSection';
import ReviewsSection from './components/ReviewsSection';
import AboutLocationSection from './components/AboutLocationSection';
import Footer from './components/Footer';
import ItemCustomizeModal from './components/ItemCustomizeModal';
import CartDrawer from './components/CartDrawer';
import PaymentGatewayModal from './components/PaymentGatewayModal';
import { CartItem, CoffeeItem, Currency, ReservationData } from './types';
import { Check, ShoppingBag, X } from 'lucide-react';
import { formatPrice } from './utils/formatters';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currency, setCurrency] = useState<Currency>('UGX');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cero_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle?: string } | null>(null);

  // Modals & Drawers
  const [selectedCustomizeItem, setSelectedCustomizeItem] = useState<CoffeeItem | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [latestReservation, setLatestReservation] = useState<ReservationData | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cero_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (title: string, subtitle?: string) => {
    setToastMessage({ title, subtitle });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'UGX' ? 'USD' : 'UGX'));
  };

  const handleQuickAdd = (item: CoffeeItem) => {
    const cartItemId = `${item.id}-standard`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          item,
          quantity: 1,
          selectedSize: 'Standard',
          unitPriceUGX: item.priceUGX,
        },
      ];
    });

    showToast(`Added ${item.name}`, formatPrice(item.priceUGX, currency));
  };

  const handleCustomAddToCart = (customized: {
    item: CoffeeItem;
    quantity: number;
    selectedSize?: string;
    selectedMilk?: string;
    selectedSweetness?: string;
    selectedTemperature?: string;
    specialInstructions?: string;
    unitPriceUGX: number;
  }) => {
    const cartItemId = `${customized.item.id}-${customized.selectedSize || 'std'}-${
      customized.selectedMilk || 'none'
    }-${customized.selectedSweetness || 'std'}-${Date.now().toString().slice(-4)}`;

    setCartItems((prev) => [
      ...prev,
      {
        cartItemId,
        item: customized.item,
        quantity: customized.quantity,
        selectedSize: customized.selectedSize,
        selectedMilk: customized.selectedMilk,
        selectedSweetness: customized.selectedSweetness,
        selectedTemperature: customized.selectedTemperature,
        specialInstructions: customized.specialInstructions,
        unitPriceUGX: customized.unitPriceUGX,
      },
    ]);

    showToast(
      `Added ${customized.quantity}x ${customized.item.name}`,
      formatPrice(customized.unitPriceUGX * customized.quantity, currency)
    );
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('cero_cart');
    } catch {
      // ignore
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFBF3] text-[#4E0401] font-sans selection:bg-[#E88C2B] selection:text-[#380200]">
      {/* Fixed Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4E0401] text-[#FEFBF3] border-2 border-[#E88C2B] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <div className="w-8 h-8 rounded-full bg-[#E88C2B] text-[#380200] flex items-center justify-center font-bold">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#FEFBF3]">{toastMessage.title}</div>
            {toastMessage.subtitle && (
              <div className="text-[11px] text-[#E88C2B]">{toastMessage.subtitle}</div>
            )}
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white p-1 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenReservation={() => scrollToSection('reservation')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('reservation')}
          onViewLocation={() => scrollToSection('location')}
        />

        <MenuSection
          currency={currency}
          onSelectItem={(item) => setSelectedCustomizeItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        <ReservationSection
          onSuccessBooking={(res) => {
            setLatestReservation(res);
            showToast('Table Reserved!', `Ref: ${res.bookingRef}`);
          }}
        />

        <ReviewsSection />

        <AboutLocationSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenReservation={() => scrollToSection('reservation')}
      />

      {/* Customize Item Modal */}
      <ItemCustomizeModal
        item={selectedCustomizeItem}
        currency={currency}
        onClose={() => setSelectedCustomizeItem(null)}
        onAddToCart={handleCustomAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setPaymentModalOpen(true)}
      />

      {/* Secure Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onClearCart={handleClearCart}
        customerDefaultName={latestReservation?.customerName}
        customerDefaultPhone={latestReservation?.phoneNumber}
      />

      {/* Floating Cart Pill on Mobile */}
      {totalCartCount > 0 && !cartDrawerOpen && (
        <div className="md:hidden fixed bottom-5 left-4 right-4 z-40">
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#E88C2B] text-[#380200] font-bold text-sm shadow-2xl flex items-center justify-between border border-[#380200]/20"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>View Your Order ({totalCartCount})</span>
            </div>
            <span className="bg-[#380200] text-[#FEFBF3] px-2.5 py-1 rounded-lg text-xs font-semibold">
              {formatPrice(
                cartItems.reduce((acc, i) => acc + i.unitPriceUGX * i.quantity, 0),
                currency
              )}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
