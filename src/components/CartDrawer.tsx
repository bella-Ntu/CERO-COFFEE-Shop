import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalUGX = cartItems.reduce((sum, item) => sum + item.unitPriceUGX * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        id="cart-drawer"
        className="w-full max-w-md bg-[#FEFBF3] text-[#4E0401] h-full shadow-2xl flex flex-col justify-between border-l-2 border-[#E88C2B]/30"
      >
        {/* Drawer Header */}
        <div className="p-5 bg-[#4E0401] text-[#FEFBF3] flex items-center justify-between border-b border-[#E88C2B]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E88C2B] text-[#380200] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#FEFBF3]">Your Order</h3>
              <p className="text-[11px] text-[#FEFBF3]/70">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in basket
              </p>
            </div>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FEFBF3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F9F4EB] text-[#4E0401]/40 flex items-center justify-center mx-auto border border-[#E8DFD3]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#4E0401]">Your cart is empty</h4>
              <p className="text-xs text-[#4E0401]/70 max-w-xs mx-auto">
                Explore our specialty Ugandan coffee roasts, iced Spanish lattes, and fresh pastries.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#E88C2B] text-[#380200] text-xs font-bold hover:bg-[#D67A1B] transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((cartItem) => (
              <div
                key={cartItem.cartItemId}
                className="p-3.5 rounded-2xl bg-white border border-[#E8DFD3] shadow-xs flex gap-3.5 items-start"
              >
                {/* Item Thumbnail */}
                <img
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E8DFD3]"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-bold text-sm text-[#4E0401] leading-tight truncate">
                      {cartItem.item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(cartItem.cartItemId)}
                      className="text-[#4E0401]/40 hover:text-rose-600 transition-colors p-0.5"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Customization tags */}
                  <div className="text-[11px] text-[#4E0401]/70 flex flex-wrap gap-1">
                    {cartItem.selectedSize && (
                      <span className="px-1.5 py-0.5 rounded bg-[#F9F4EB] font-medium text-[10px]">
                        {cartItem.selectedSize}
                      </span>
                    )}
                    {cartItem.selectedMilk && (
                      <span className="px-1.5 py-0.5 rounded bg-[#F9F4EB] font-medium text-[10px]">
                        {cartItem.selectedMilk}
                      </span>
                    )}
                    {cartItem.selectedSweetness && (
                      <span className="px-1.5 py-0.5 rounded bg-[#F9F4EB] font-medium text-[10px]">
                        {cartItem.selectedSweetness}
                      </span>
                    )}
                  </div>

                  {cartItem.specialInstructions && (
                    <p className="text-[10px] text-[#E88C2B] italic truncate">
                      "{cartItem.specialInstructions}"
                    </p>
                  )}

                  {/* Price & Quantity Controls */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E88C2B]">
                      {formatPrice(cartItem.unitPriceUGX * cartItem.quantity, currency)}
                    </span>

                    <div className="flex items-center gap-2 border border-[#4E0401]/20 rounded-lg bg-[#FEFBF3] px-1.5 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                        className="text-[#4E0401] hover:text-[#E88C2B] p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#4E0401] w-4 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                        className="text-[#4E0401] hover:text-[#E88C2B] p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[#F9F4EB] border-t border-[#E8DFD3] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#4E0401]/70">
                <span>Pickup / Table Service</span>
                <span className="font-semibold text-emerald-700">Shell Bulenga (Next to KFC)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#4E0401] pt-1 border-t border-[#E8DFD3]">
                <span>Estimated Total:</span>
                <span className="text-[#E88C2B] font-serif text-lg">
                  {formatPrice(totalUGX, currency)}
                </span>
              </div>
            </div>

            <button
              id="cart-proceed-checkout-btn"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 rounded-xl bg-[#4E0401] text-[#FEFBF3] font-bold text-sm hover:bg-[#380200] transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#E88C2B]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
