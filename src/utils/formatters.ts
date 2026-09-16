import { Currency, PaymentMethod } from '../types';
import { EXCHANGE_RATE_USD } from '../data/cafeData';

export function formatPrice(amountUGX: number, currency: Currency): string {
  if (currency === 'USD') {
    const usd = amountUGX / EXCHANGE_RATE_USD;
    return `$${usd.toFixed(2)}`;
  }
  // Format as Ugandan Shillings (e.g. USh 12,000)
  return `USh ${amountUGX.toLocaleString()}`;
}

export function generateBookingRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'CERO-';
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

export function generatePaymentRef(method: PaymentMethod): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  switch (method) {
    case 'mtn_momo':
      return `MOMO-${timestamp}-${random}`;
    case 'airtel_money':
      return `AIRTEL-${timestamp}-${random}`;
    case 'card':
      return `CARD-SEC-${timestamp}-${random}`;
    case 'counter':
      return `COUNTER-PAY-${timestamp}`;
    default:
      return `TXN-${timestamp}`;
  }
}

export function validateCardNumber(num: string): { isValid: boolean; brand: 'visa' | 'mastercard' | 'unknown' } {
  const sanitized = num.replace(/\s+/g, '');
  const isVisa = /^4[0-9]{12}(?:[0-9]{3})?$/.test(sanitized);
  const isMastercard = /^5[1-5][0-9]{14}$/.test(sanitized);
  const isValid = sanitized.length >= 13 && sanitized.length <= 19;
  return {
    isValid,
    brand: isVisa ? 'visa' : isMastercard ? 'mastercard' : 'unknown',
  };
}

export function formatUgandanPhone(phone: string): string {
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.startsWith('256')) {
    return `+${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }
  if (clean.startsWith('0')) {
    return `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}`;
  }
  return phone;
}
