import { useState, MouseEvent } from 'react';
import { Search, Star, Sparkles, Plus, Flame, Check } from 'lucide-react';
import { CoffeeCategory, CoffeeItem, Currency } from '../types';
import { COFFEE_MENU } from '../data/cafeData';
import { formatPrice } from '../utils/formatters';

interface MenuSectionProps {
  currency: Currency;
  onSelectItem: (item: CoffeeItem) => void;
  onQuickAdd: (item: CoffeeItem) => void;
}

export default function MenuSection({
  currency,
  onSelectItem,
  onQuickAdd,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CoffeeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'espresso', label: 'Espresso & Hot Brews' },
    { id: 'iced', label: 'Iced & Cold Brews' },
    { id: 'teas', label: 'Teas & Refreshers' },
    { id: 'pastries', label: 'Bakery & Savory' },
    { id: 'beans', label: 'Artisan Beans' },
  ];

  const filteredItems = COFFEE_MENU.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.origin && item.origin.toLowerCase().includes(query)) ||
      item.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  const handleQuickAddClick = (e: MouseEvent, item: CoffeeItem) => {
    e.stopPropagation();
    onQuickAdd(item);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#FEFBF3] text-[#4E0401]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E88C2B]/20 text-[#4E0401] border border-[#E88C2B]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#E88C2B]" /> Handcrafted In Bulenga
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4E0401] tracking-tight">
            Our Specialty Menu & Roasts
          </h2>
          <p className="text-sm sm:text-base text-[#4E0401]/80 leading-relaxed font-light">
            Every cup is dialed in fresh on high-precision grinders using 100% single-origin Ugandan beans.
            Order ahead for rapid counter pickup or dine in at our cozy lounge.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#4E0401]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="menu-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cappuccino, cold brew, rolex..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#4E0401]/20 bg-white/90 text-sm focus:outline-none focus:border-[#E88C2B] focus:ring-1 focus:ring-[#E88C2B] shadow-xs text-[#4E0401]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#4E0401]/60 hover:text-[#4E0401]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Count Info */}
            <div className="text-xs text-[#4E0401]/70">
              Showing <span className="font-bold text-[#4E0401]">{filteredItems.length}</span> items · Open 24 Hours
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id as CoffeeCategory | 'all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#4E0401] text-[#FEFBF3] shadow-md'
                    : 'bg-[#F9F4EB] text-[#4E0401]/80 hover:bg-[#E88C2B]/20 hover:text-[#4E0401] border border-[#E8DFD3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#F9F4EB] rounded-2xl border border-[#E8DFD3]">
            <p className="text-base font-serif font-bold text-[#4E0401]">No items found</p>
            <p className="text-xs text-[#4E0401]/70 mt-1">
              Try searching for something else or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 px-4 py-2 rounded-lg bg-[#E88C2B] text-[#380200] text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`menu-card-${item.id}`}
                onClick={() => onSelectItem(item)}
                className="group relative bg-white rounded-2xl border border-[#E8DFD3] hover:border-[#E88C2B] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Card Media */}
                <div className="relative h-48 w-full overflow-hidden bg-[#380200]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isPopular && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E88C2B] text-[#380200] shadow-xs flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-[#380200]" /> Popular
                      </span>
                    )}
                    {item.isNew && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#4E0401] text-[#FEFBF3] border border-[#E88C2B]">
                        New
                      </span>
                    )}
                  </div>

                  {/* Rating pill */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[#FEFBF3] text-xs font-semibold">
                    <Star className="w-3 h-3 fill-[#E88C2B] text-[#E88C2B]" />
                    <span>{item.rating.toFixed(1)}</span>
                    <span className="text-white/60 text-[10px]">({item.reviewCount})</span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#4E0401] text-[#FEFBF3] text-xs font-bold border border-[#E88C2B]/50 shadow-md">
                    {formatPrice(item.priceUGX, currency)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {item.origin && (
                      <span className="text-[11px] font-semibold text-[#E88C2B] tracking-wide uppercase">
                        {item.origin}
                      </span>
                    )}
                    <h3 className="text-lg font-serif font-bold text-[#4E0401] group-hover:text-[#E88C2B] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#4E0401]/70 line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags & Action row */}
                  <div className="pt-2 border-t border-[#E8DFD3] flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 1).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F9F4EB] text-[#4E0401]/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleQuickAddClick(e, item)}
                        id={`quick-add-${item.id}`}
                        aria-label={`Quick add ${item.name} to cart`}
                        className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                          justAddedId === item.id
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#E88C2B] text-[#380200] hover:bg-[#D67A1B]'
                        }`}
                        title="Add 1 to cart immediately"
                      >
                        {justAddedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span className="text-[11px] hidden sm:inline">Add</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-[#4E0401]/30 text-[11px] font-semibold text-[#4E0401] hover:bg-[#4E0401] hover:text-[#FEFBF3] transition-colors"
                      >
                        Customize
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
