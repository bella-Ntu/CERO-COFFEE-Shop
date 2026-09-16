import { useState } from 'react';
import { X, Plus, Minus, Coffee, Sparkles, Check } from 'lucide-react';
import { CoffeeItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface ItemCustomizeModalProps {
  item: CoffeeItem | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (customizedItem: {
    item: CoffeeItem;
    quantity: number;
    selectedSize?: string;
    selectedMilk?: string;
    selectedSweetness?: string;
    selectedTemperature?: string;
    specialInstructions?: string;
    unitPriceUGX: number;
  }) => void;
}

export default function ItemCustomizeModal({
  item,
  currency,
  onClose,
  onAddToCart,
}: ItemCustomizeModalProps) {
  if (!item) return null;

  const defaultSize = item.customization?.sizes?.[0]?.name || 'Standard';
  const defaultMilk = item.customization?.milks?.[0]?.name;
  const defaultSweetness = item.customization?.sweetnessLevels?.[0];
  const defaultTemp = item.customization?.temperatures?.[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [selectedMilk, setSelectedMilk] = useState(defaultMilk);
  const [selectedSweetness, setSelectedSweetness] = useState(defaultSweetness);
  const [selectedTemperature, setSelectedTemperature] = useState(defaultTemp);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate unit price based on customization
  const sizeOption = item.customization?.sizes?.find((s) => s.name === selectedSize);
  const milkOption = item.customization?.milks?.find((m) => m.name === selectedMilk);
  const extraPrice = (sizeOption?.extraPriceUGX || 0) + (milkOption?.extraPriceUGX || 0);
  const unitPriceUGX = item.priceUGX + extraPrice;
  const totalPriceUGX = unitPriceUGX * quantity;

  const handleAdd = () => {
    onAddToCart({
      item,
      quantity,
      selectedSize,
      selectedMilk,
      selectedSweetness,
      selectedTemperature,
      specialInstructions: specialInstructions.trim() || undefined,
      unitPriceUGX,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        id="item-customize-dialog"
        className="relative bg-[#FEFBF3] w-full max-w-lg rounded-2xl shadow-2xl border-2 border-[#E88C2B]/30 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 w-full bg-[#4E0401]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4E0401] via-transparent to-black/40" />

          {/* Close button */}
          <button
            id="close-customize-modal-btn"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-[#FEFBF3] hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-[#FEFBF3]">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E88C2B] text-[#380200]">
                {item.origin || 'Ugandan Specialty'}
              </span>
              {item.calories && (
                <span className="text-xs text-[#FEFBF3]/80">{item.calories}</span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FEFBF3] leading-tight">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#4E0401]">
          <p className="text-sm text-[#4E0401]/80 leading-relaxed">
            {item.description}
          </p>

          {/* Size Selection */}
          {item.customization?.sizes && item.customization.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4E0401]/90">
                Choose Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {item.customization.sizes.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedSize(s.name)}
                    className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      selectedSize === s.name
                        ? 'border-[#E88C2B] bg-[#E88C2B]/15 text-[#4E0401] font-bold shadow-xs'
                        : 'border-[#4E0401]/20 bg-white/70 hover:bg-[#FEFBF3]'
                    }`}
                  >
                    <div>{s.name}</div>
                    {s.extraPriceUGX > 0 && (
                      <div className="text-[10px] text-[#E88C2B] font-semibold">
                        +{formatPrice(s.extraPriceUGX, currency)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Selection */}
          {item.customization?.milks && item.customization.milks.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4E0401]/90">
                Choice of Milk
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.customization.milks.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setSelectedMilk(m.name)}
                    className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                      selectedMilk === m.name
                        ? 'border-[#E88C2B] bg-[#E88C2B]/15 text-[#4E0401] font-bold shadow-xs'
                        : 'border-[#4E0401]/20 bg-white/70 hover:bg-[#FEFBF3]'
                    }`}
                  >
                    <span>{m.name}</span>
                    {m.extraPriceUGX > 0 ? (
                      <span className="text-[11px] text-[#E88C2B] font-semibold">
                        +{formatPrice(m.extraPriceUGX, currency)}
                      </span>
                    ) : (
                      selectedMilk === m.name && <Check className="w-3.5 h-3.5 text-[#E88C2B]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sweetness */}
          {item.customization?.sweetnessLevels && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4E0401]/90">
                Sweetness Level
              </label>
              <div className="flex flex-wrap gap-2">
                {item.customization.sweetnessLevels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedSweetness(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedSweetness === lvl
                        ? 'border-[#4E0401] bg-[#4E0401] text-[#FEFBF3]'
                        : 'border-[#4E0401]/20 bg-white/70 text-[#4E0401]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Temperature */}
          {item.customization?.temperatures && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4E0401]/90">
                Temperature Preference
              </label>
              <div className="flex flex-wrap gap-2">
                {item.customization.temperatures.map((temp) => (
                  <button
                    key={temp}
                    type="button"
                    onClick={() => setSelectedTemperature(temp)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedTemperature === temp
                        ? 'border-[#4E0401] bg-[#4E0401] text-[#FEFBF3]'
                        : 'border-[#4E0401]/20 bg-white/70 text-[#4E0401]'
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Barista Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4E0401]/90">
              Barista Notes (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra hot, double cup, cinnamon on top"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#4E0401]/20 bg-white focus:outline-none focus:border-[#E88C2B] focus:ring-1 focus:ring-[#E88C2B]"
            />
          </div>
        </div>

        {/* Footer with Quantity & Add Button */}
        <div className="p-4 sm:p-5 bg-[#F9F4EB] border-t border-[#E88C2B]/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 border border-[#4E0401]/20 rounded-lg bg-white px-2 py-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1 text-[#4E0401] hover:text-[#E88C2B] disabled:opacity-40"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center text-sm font-bold text-[#4E0401]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-[#4E0401] hover:text-[#E88C2B]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            id="confirm-add-to-cart-btn"
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-4 rounded-xl bg-[#4E0401] text-[#FEFBF3] font-bold text-sm hover:bg-[#380200] transition-colors flex items-center justify-between shadow-md"
          >
            <span>Add to Order</span>
            <span className="text-[#E88C2B] font-bold">
              {formatPrice(totalPriceUGX, currency)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
