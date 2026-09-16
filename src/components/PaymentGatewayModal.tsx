import { useState, useEffect, FormEvent } from 'react';
import { 
  X, ShieldCheck, Lock, CreditCard, Smartphone, Store, 
  CheckCircle2, AlertCircle, Loader2, ArrowRight, Printer, Copy, Check 
} from 'lucide-react';
import { CartItem, Currency, OrderReceipt, PaymentMethod } from '../types';
import { CERO_CAFE_INFO } from '../data/cafeData';
import { formatPrice, generatePaymentRef, validateCardNumber } from '../utils/formatters';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onClearCart: () => void;
  customerDefaultPhone?: string;
  customerDefaultName?: string;
}

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  cartItems,
  currency,
  onClearCart,
  customerDefaultPhone = '',
  customerDefaultName = '',
}: PaymentGatewayModalProps) {
  const [method, setMethod] = useState<PaymentMethod>('mtn_momo');
  const [phoneNumber, setPhoneNumber] = useState(customerDefaultPhone);
  const [customerName, setCustomerName] = useState(customerDefaultName);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState(customerDefaultName);
  const [orderType, setOrderType] = useState<'takeaway' | 'dine_in'>('takeaway');

  const [paymentState, setPaymentState] = useState<'form' | 'processing' | 'success'>('form');
  const [processingStep, setProcessingStep] = useState('Initiating secure handshake...');
  const [errorMessage, setErrorMessage] = useState('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Sync defaults if provided
  useEffect(() => {
    if (customerDefaultPhone && !phoneNumber) setPhoneNumber(customerDefaultPhone);
    if (customerDefaultName && !customerName) {
      setCustomerName(customerDefaultName);
      setCardHolder(customerDefaultName);
    }
  }, [customerDefaultPhone, customerDefaultName]);

  if (!isOpen) return null;

  const subtotalUGX = cartItems.reduce((sum, item) => sum + item.unitPriceUGX * item.quantity, 0);
  const serviceFeeUGX = 0; // Free service
  const totalUGX = subtotalUGX + serviceFeeUGX;
  const totalUSD = totalUGX / 3750;

  const handleCardNumberChange = (val: string) => {
    // Format card number with spaces every 4 digits
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      setCardExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setCardExpiry(cleaned);
    }
  };

  const handlePay = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your name for the order receipt.');
      return;
    }

    if (method === 'mtn_momo' || method === 'airtel_money') {
      if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, '').length < 9) {
        setErrorMessage('Please enter a valid Ugandan mobile number (e.g. 0772 424002 or 0701 234567)');
        return;
      }
    } else if (method === 'card') {
      const cardCheck = validateCardNumber(cardNumber);
      if (!cardCheck.isValid) {
        setErrorMessage('Please enter a valid 16-digit card number.');
        return;
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        setErrorMessage('Please enter a valid expiry date (MM/YY).');
        return;
      }
      if (!cardCvc || cardCvc.length < 3) {
        setErrorMessage('Please enter a valid 3-digit security code (CVC).');
        return;
      }
    }

    // Begin simulated secure banking flow
    setPaymentState('processing');
    setProcessingStep('Encrypting transaction via 256-bit TLS...');

    setTimeout(() => {
      if (method === 'mtn_momo') {
        setProcessingStep(`Sending instant MoMo push request to ${phoneNumber}...`);
      } else if (method === 'airtel_money') {
        setProcessingStep(`Awaiting Airtel Money PIN confirmation on ${phoneNumber}...`);
      } else if (method === 'card') {
        setProcessingStep('Verifying card with 3D Secure / Verified by Visa...');
      } else {
        setProcessingStep('Registering pickup order at Shell Bulenga counter...');
      }
    }, 900);

    setTimeout(() => {
      setProcessingStep('Authorizing payment and issuing digital receipt...');
    }, 1800);

    setTimeout(() => {
      const newReceipt: OrderReceipt = {
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        type: orderType,
        items: [...cartItems],
        subtotalUGX,
        serviceFeeUGX,
        totalUGX,
        totalUSD,
        paymentMethod: method,
        paymentRef: generatePaymentRef(method),
        status: 'paid',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        customerName: customerName.trim(),
        customerPhone: phoneNumber.trim() || CERO_CAFE_INFO.displayPhone,
        pickupTime: 'Ready in 10–15 Minutes at Shell Bulenga',
      };

      setReceipt(newReceipt);
      setPaymentState('success');
      onClearCart();
    }, 2600);
  };

  const copyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="payment-gateway-modal"
        className="relative bg-[#FEFBF3] w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-[#E88C2B]/40 overflow-hidden flex flex-col my-auto max-h-[95vh]"
      >
        {/* Top Header */}
        <div className="bg-[#4E0401] text-[#FEFBF3] px-6 py-4 flex items-center justify-between border-b border-[#E88C2B]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E88C2B] text-[#380200] flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#FEFBF3]">
                CERO Secure Payment Gateway
              </h3>
              <p className="text-[11px] text-[#FEFBF3]/75 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E88C2B]" /> 256-Bit TLS Encrypted · PCI-DSS Level 1
              </p>
            </div>
          </div>

          <button
            id="close-payment-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FEFBF3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content based on state */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {paymentState === 'processing' ? (
            /* Processing Screen */
            <div className="py-12 text-center space-y-5">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#E88C2B]/20 animate-ping" />
                <div className="w-16 h-16 rounded-full bg-[#4E0401] text-[#E88C2B] flex items-center justify-center shadow-lg">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-serif font-bold text-[#4E0401]">
                  Processing Your Payment Securely
                </h4>
                <p className="text-sm text-[#4E0401]/80 max-w-sm mx-auto font-medium">
                  {processingStep}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F9F4EB] border border-[#E8DFD3] max-w-md mx-auto text-xs text-[#4E0401]/70">
                Please do not close this window or navigate away while the transaction is being verified with the network provider.
              </div>
            </div>
          ) : paymentState === 'success' && receipt ? (
            /* Success & Digital Receipt Screen */
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#4E0401]">
                  Payment Successful!
                </h3>
                <p className="text-xs sm:text-sm text-[#4E0401]/70">
                  Your order is confirmed at CERO COFFEE Shell Bulenga.
                </p>
              </div>

              {/* Digital Receipt Card */}
              <div className="bg-[#4E0401] text-[#FEFBF3] rounded-2xl p-6 border border-[#E88C2B]/40 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FEFBF3]/15 pb-3">
                  <div>
                    <span className="text-[10px] text-[#E88C2B] uppercase tracking-wider font-bold">
                      OFFICIAL RECEIPT
                    </span>
                    <div className="font-serif font-bold text-base text-[#FEFBF3]">
                      Order #{receipt.orderId}
                    </div>
                  </div>
                  <button
                    onClick={() => copyRef(receipt.paymentRef)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-xs text-[#FEFBF3] hover:bg-white/20 transition-colors font-mono"
                  >
                    <span>{receipt.paymentRef}</span>
                    {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Items Summary in Receipt */}
                <div className="space-y-2 py-2 text-xs">
                  {receipt.items.map((cartItem, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[#FEFBF3]/90">
                      <span>
                        {cartItem.quantity}x {cartItem.item.name}
                        {cartItem.selectedSize ? ` (${cartItem.selectedSize})` : ''}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(cartItem.unitPriceUGX * cartItem.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#FEFBF3]/15 pt-3 flex items-center justify-between">
                  <span className="text-xs uppercase text-[#FEFBF3]/70 font-semibold">Total Paid</span>
                  <span className="text-xl font-bold text-[#E88C2B]">
                    {formatPrice(receipt.totalUGX, currency)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#FEFBF3]/80 border-t border-[#FEFBF3]/10">
                  <div>
                    <span className="text-[#FEFBF3]/60 block">Pickup Location</span>
                    <span className="font-semibold text-[#FEFBF3]">Shell Bulenga (Next to KFC)</span>
                  </div>
                  <div>
                    <span className="text-[#FEFBF3]/60 block">Est. Time</span>
                    <span className="font-semibold text-emerald-300">Ready in 10-15 mins</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl border border-[#4E0401]/30 text-xs font-semibold text-[#4E0401] hover:bg-[#4E0401] hover:text-[#FEFBF3] transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Receipt
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#E88C2B] text-[#380200] text-xs font-bold hover:bg-[#D67A1B] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Main Checkout Form */
            <form onSubmit={handlePay} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Order Preference: Dine-in vs Takeaway */}
              <div className="flex items-center gap-3 p-1.5 rounded-xl bg-[#F9F4EB] border border-[#E8DFD3]">
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    orderType === 'takeaway'
                      ? 'bg-[#4E0401] text-[#FEFBF3] shadow-xs'
                      : 'text-[#4E0401]/80 hover:text-[#4E0401]'
                  }`}
                >
                  🥡 Quick Takeaway Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('dine_in')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    orderType === 'dine_in'
                      ? 'bg-[#4E0401] text-[#FEFBF3] shadow-xs'
                      : 'text-[#4E0401]/80 hover:text-[#4E0401]'
                  }`}
                >
                  ☕ Dine-In Table Service
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4E0401]">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* MTN MoMo */}
                  <button
                    type="button"
                    onClick={() => setMethod('mtn_momo')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      method === 'mtn_momo'
                        ? 'border-[#E88C2B] bg-[#E88C2B]/15 ring-2 ring-[#E88C2B]/30'
                        : 'border-[#E8DFD3] bg-white hover:bg-[#FEFBF3]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Smartphone className="w-4 h-4 text-amber-600" />
                      {method === 'mtn_momo' && <span className="text-[10px] font-bold text-[#E88C2B]">Active</span>}
                    </div>
                    <div className="mt-2">
                      <div className="font-bold text-xs text-[#4E0401]">MTN MoMo</div>
                      <div className="text-[10px] text-[#4E0401]/60">Uganda Mobile Money</div>
                    </div>
                  </button>

                  {/* Airtel Money */}
                  <button
                    type="button"
                    onClick={() => setMethod('airtel_money')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      method === 'airtel_money'
                        ? 'border-[#E88C2B] bg-[#E88C2B]/15 ring-2 ring-[#E88C2B]/30'
                        : 'border-[#E8DFD3] bg-white hover:bg-[#FEFBF3]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Smartphone className="w-4 h-4 text-rose-600" />
                      {method === 'airtel_money' && <span className="text-[10px] font-bold text-[#E88C2B]">Active</span>}
                    </div>
                    <div className="mt-2">
                      <div className="font-bold text-xs text-[#4E0401]">Airtel Money</div>
                      <div className="text-[10px] text-[#4E0401]/60">Uganda Airtel MoMo</div>
                    </div>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setMethod('card')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      method === 'card'
                        ? 'border-[#E88C2B] bg-[#E88C2B]/15 ring-2 ring-[#E88C2B]/30'
                        : 'border-[#E8DFD3] bg-white hover:bg-[#FEFBF3]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      {method === 'card' && <span className="text-[10px] font-bold text-[#E88C2B]">Active</span>}
                    </div>
                    <div className="mt-2">
                      <div className="font-bold text-xs text-[#4E0401]">Credit / Debit</div>
                      <div className="text-[10px] text-[#4E0401]/60">Visa, Mastercard</div>
                    </div>
                  </button>

                  {/* Pay at Counter */}
                  <button
                    type="button"
                    onClick={() => setMethod('counter')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      method === 'counter'
                        ? 'border-[#E88C2B] bg-[#E88C2B]/15 ring-2 ring-[#E88C2B]/30'
                        : 'border-[#E8DFD3] bg-white hover:bg-[#FEFBF3]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Store className="w-4 h-4 text-[#4E0401]" />
                      {method === 'counter' && <span className="text-[10px] font-bold text-[#E88C2B]">Active</span>}
                    </div>
                    <div className="mt-2">
                      <div className="font-bold text-xs text-[#4E0401]">Pay at Counter</div>
                      <div className="text-[10px] text-[#4E0401]/60">Cash on pickup</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Name input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4E0401]">
                  Name on Order / Receipt *
                </label>
                <input
                  type="text"
                  id="checkout-customer-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. John Mukasa"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#4E0401]/20 bg-white text-sm text-[#4E0401] focus:outline-none focus:border-[#E88C2B]"
                  required
                />
              </div>

              {/* Specific inputs according to payment method */}
              {method === 'mtn_momo' && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-900">MTN Mobile Money Prompt</span>
                    <span className="text-[10px] text-amber-800">Uganda USSD Push</span>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#4E0401]">
                      MTN Registered Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="momo-phone-input"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="0772 424002 or +256 77..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white text-sm text-[#4E0401] focus:outline-none focus:border-[#E88C2B]"
                    />
                    <p className="text-[11px] text-amber-800/80 mt-1">
                      A prompt will appear instantly on your MTN SIM to approve {formatPrice(totalUGX, currency)} with your MoMo PIN.
                    </p>
                  </div>
                </div>
              )}

              {method === 'airtel_money' && (
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-900">Airtel Money Prompt</span>
                    <span className="text-[10px] text-rose-800">Uganda USSD Push</span>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#4E0401]">
                      Airtel Registered Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="airtel-phone-input"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="0701 234567 or 075..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 bg-white text-sm text-[#4E0401] focus:outline-none focus:border-[#E88C2B]"
                    />
                    <p className="text-[11px] text-rose-800/80 mt-1">
                      An approval push notification will be sent to your Airtel line for confirmation.
                    </p>
                  </div>
                </div>
              )}

              {method === 'card' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Credit or Debit Card</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                      <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">VISA</span>
                      <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-bold">Mastercard</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          id="card-number-input"
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#E88C2B] font-mono"
                        />
                        <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Expires (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#E88C2B] font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">CVC / CVV</label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#E88C2B] font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {method === 'counter' && (
                <div className="p-4 rounded-2xl bg-[#F9F4EB] border border-[#E8DFD3] space-y-2 text-xs text-[#4E0401]/80">
                  <p className="font-bold text-[#4E0401]">Pay on Arrival at Counter</p>
                  <p>
                    Your order will be sent straight to the CERO espresso station at Shell Bulenga (next to KFC). Pay with cash, MoMo, or card when you collect your drinks.
                  </p>
                </div>
              )}

              {/* Order Breakdown */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8DFD3] space-y-2 text-xs">
                <div className="flex justify-between text-[#4E0401]/70">
                  <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span>{formatPrice(subtotalUGX, currency)}</span>
                </div>
                <div className="flex justify-between text-[#4E0401]/70">
                  <span>Service & Packaging</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>
                <div className="border-t border-[#E8DFD3] pt-2 flex justify-between text-sm font-bold text-[#4E0401]">
                  <span>Total Amount</span>
                  <span className="text-base text-[#E88C2B] font-serif font-bold">
                    {formatPrice(totalUGX, currency)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="submit-payment-btn"
                className="w-full py-3.5 rounded-xl bg-[#4E0401] text-[#FEFBF3] font-bold text-sm hover:bg-[#380200] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Lock className="w-4 h-4 text-[#E88C2B]" />
                <span>
                  Authorize & Pay {formatPrice(totalUGX, currency)}
                </span>
                <ArrowRight className="w-4 h-4 text-[#E88C2B]" />
              </button>

              {/* Security Footer */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-[#4E0401]/60 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> SSL 256-Bit
                </span>
                <span>•</span>
                <span>PCI-DSS Validated</span>
                <span>•</span>
                <span>Fraud Protected</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
