export type Currency = 'UGX' | 'USD';

export type CoffeeCategory = 'espresso' | 'iced' | 'teas' | 'pastries' | 'beans';

export type SeatingArea = 'lounge' | 'terrace' | 'barista_bar' | 'workstation';

export interface CustomizationOptions {
  sizes?: { name: string; extraPriceUGX: number }[];
  milks?: { name: string; extraPriceUGX: number }[];
  sweetnessLevels?: string[];
  temperatures?: string[];
}

export interface CoffeeItem {
  id: string;
  name: string;
  category: CoffeeCategory;
  priceUGX: number;
  priceUSD: number;
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
  tags: string[];
  roastLevel?: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  origin?: string;
  isPopular?: boolean;
  isNew?: boolean;
  calories?: string;
  customization?: CustomizationOptions;
}

export interface CartItem {
  cartItemId: string;
  item: CoffeeItem;
  quantity: number;
  selectedSize?: string;
  selectedMilk?: string;
  selectedSweetness?: string;
  selectedTemperature?: string;
  specialInstructions?: string;
  unitPriceUGX: number;
}

export interface ReservationData {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  seatingArea: SeatingArea;
  occasion?: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  bookingRef: string;
}

export type PaymentMethod = 'mtn_momo' | 'airtel_money' | 'card' | 'counter';

export interface PaymentDetails {
  method: PaymentMethod;
  phoneNumber?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardHolderName?: string;
  savePaymentInfo?: boolean;
}

export interface OrderReceipt {
  orderId: string;
  type: 'takeaway' | 'dine_in' | 'reservation_deposit';
  items: CartItem[];
  subtotalUGX: number;
  serviceFeeUGX: number;
  totalUGX: number;
  totalUSD: number;
  paymentMethod: PaymentMethod;
  paymentRef: string;
  status: 'paid' | 'processing' | 'ready';
  createdAt: string;
  customerName: string;
  customerPhone: string;
  pickupTime?: string;
  reservationRef?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  verified: boolean;
  location: string;
  favoriteOrder?: string;
}

export interface CafeLocationInfo {
  name: string;
  tagline: string;
  address: string;
  district: string;
  road: string;
  landmark: string;
  phone: string;
  displayPhone: string;
  email: string;
  hours: string;
  googleRating: number;
  totalReviews: number;
  priceRange: string;
}
