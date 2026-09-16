import { useState, FormEvent } from 'react';
import { Star, MessageSquarePlus, CheckCircle, ThumbsUp, Sparkles, Filter, X } from 'lucide-react';
import { ReviewItem } from '../types';
import { CAFE_REVIEWS, CERO_CAFE_INFO } from '../data/cafeData';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(CAFE_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  // Form states for new review
  const [authorName, setAuthorName] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [favoriteOrder, setFavoriteOrder] = useState('');
  const [userLocation, setUserLocation] = useState('Kampala, Uganda');

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating >= filterRating;
  });

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !userComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      rating: userRating,
      date: 'Just now',
      comment: userComment.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      verified: true,
      location: userLocation.trim() || 'Kampala, Uganda',
      favoriteOrder: favoriteOrder.trim() || undefined,
    };

    setReviews([newRev, ...reviews]);
    setShowReviewModal(false);
    setAuthorName('');
    setUserComment('');
    setFavoriteOrder('');
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FEFBF3] text-[#4E0401]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Google Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E88C2B]/20 text-[#4E0401] border border-[#E88C2B]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#E88C2B]" /> Google Verified 4.9 ★ Rating
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4E0401] tracking-tight">
              Loved by Coffee Lovers & Night Travelers
            </h2>
            <p className="text-sm sm:text-base text-[#4E0401]/80 leading-relaxed font-light">
              From Nadiia’s famous "100 Cappuccino from 100 places in Uganda" tour to regular night drivers and remote workers, see why CERO COFFEE at Shell Bulenga is celebrated.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="leave-review-btn"
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-3 rounded-xl bg-[#4E0401] text-[#FEFBF3] hover:bg-[#380200] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#E88C2B]" />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>

        {/* Rating Breakdown Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-[#F9F4EB] border border-[#E8DFD3] mb-10 items-center">
          {/* Main Score */}
          <div className="sm:col-span-4 text-center sm:text-left sm:border-r border-[#E8DFD3] sm:pr-8">
            <div className="text-5xl font-serif font-bold text-[#4E0401]">
              {CERO_CAFE_INFO.googleRating}
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-[#E88C2B] text-[#E88C2B]" />
              ))}
            </div>
            <p className="text-xs text-[#4E0401]/70">
              Based on {reviews.length} verified ratings on Google Maps & CERO guestbooks.
            </p>
            <span className="inline-block mt-2 text-[11px] font-semibold text-[#E88C2B]">
              Top 1% Coffee Shops in Kampala
            </span>
          </div>

          {/* Highlights */}
          <div className="sm:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-[#E8DFD3]">
              <span className="text-[#4E0401]/60 block mb-1">Microfoam & Flavor</span>
              <span className="font-bold text-sm text-[#4E0401]">5.0 / 5.0</span>
              <p className="text-[10px] text-[#4E0401]/60 mt-0.5">Bugisu Arabica specialty</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E8DFD3]">
              <span className="text-[#4E0401]/60 block mb-1">24/7 Service</span>
              <span className="font-bold text-sm text-[#4E0401]">4.9 / 5.0</span>
              <p className="text-[10px] text-[#4E0401]/60 mt-0.5">Always welcoming & alert</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E8DFD3] col-span-2 sm:col-span-1">
              <span className="text-[#4E0401]/60 block mb-1">Ambiance & Wi-Fi</span>
              <span className="font-bold text-sm text-[#4E0401]">4.9 / 5.0</span>
              <p className="text-[10px] text-[#4E0401]/60 mt-0.5">Fast power & fiber net</p>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-2 mb-6 text-xs overflow-x-auto pb-2">
          <span className="text-[#4E0401]/60 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#E88C2B]" /> Filter:
          </span>
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterRating === 'all'
                ? 'bg-[#4E0401] text-[#FEFBF3]'
                : 'bg-[#F9F4EB] text-[#4E0401] hover:bg-[#E8DFD3]'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterRating === 5
                ? 'bg-[#4E0401] text-[#FEFBF3]'
                : 'bg-[#F9F4EB] text-[#4E0401] hover:bg-[#E8DFD3]'
            }`}
          >
            5.0 Stars
          </button>
          <button
            onClick={() => setFilterRating(4.8)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterRating === 4.8
                ? 'bg-[#4E0401] text-[#FEFBF3]'
                : 'bg-[#F9F4EB] text-[#4E0401] hover:bg-[#E8DFD3]'
            }`}
          >
            4.8+ Stars
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-[#E8DFD3] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-[#E88C2B]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#4E0401]">{rev.author}</span>
                        {rev.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" title="Verified Customer" />
                        )}
                      </div>
                      <span className="text-[11px] text-[#4E0401]/60">{rev.location}</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#4E0401]/50">{rev.date}</span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(rev.rating)
                          ? 'fill-[#E88C2B] text-[#E88C2B]'
                          : 'text-[#E8DFD3]'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-[#4E0401] ml-1">{rev.rating}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#4E0401]/85 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Footer with Favorite Order */}
              {rev.favoriteOrder && (
                <div className="pt-3 border-t border-[#E8DFD3] flex items-center justify-between text-[11px] text-[#4E0401]/70">
                  <span>Favorite order:</span>
                  <span className="font-semibold text-[#E88C2B]">{rev.favoriteOrder}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal for adding user review */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FEFBF3] rounded-2xl max-w-lg w-full p-6 border-2 border-[#E88C2B]/40 shadow-2xl relative space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8DFD3] pb-3">
                <h3 className="font-serif font-bold text-lg text-[#4E0401]">
                  Write a Review for CERO COFFEE
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-1 rounded-full text-[#4E0401]/60 hover:text-[#4E0401]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#4E0401] block mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Esther Namubiru"
                    className="w-full px-3 py-2 rounded-xl border border-[#4E0401]/20 bg-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4E0401] block mb-1">Star Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="p-1 text-[#E88C2B]"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= userRating ? 'fill-[#E88C2B] text-[#E88C2B]' : 'text-[#E8DFD3]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-bold text-[#4E0401] ml-2 text-sm">{userRating} Stars</span>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#4E0401] block mb-1">Your Feedback *</label>
                  <textarea
                    rows={3}
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="Tell us about the coffee, taste, atmosphere, or 24/7 service..."
                    className="w-full px-3 py-2 rounded-xl border border-[#4E0401]/20 bg-white text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#4E0401] block mb-1">Favorite Item</label>
                    <input
                      type="text"
                      value={favoriteOrder}
                      onChange={(e) => setFavoriteOrder(e.target.value)}
                      placeholder="e.g. Iced Spanish Latte"
                      className="w-full px-3 py-2 rounded-xl border border-[#4E0401]/20 bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#4E0401] block mb-1">City / Town</label>
                    <input
                      type="text"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      placeholder="e.g. Kampala, Uganda"
                      className="w-full px-3 py-2 rounded-xl border border-[#4E0401]/20 bg-white text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#4E0401]/20 font-semibold text-[#4E0401]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#E88C2B] text-[#380200] font-bold"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
