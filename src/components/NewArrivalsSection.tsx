import React from 'react';
import { DbSaree } from '../types/database';
import { SareeCard } from './SareeCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NewArrivalsSectionProps {
  sarees: DbSaree[];
  wishlistIds: string[];
  onToggleWishlist: (saree: DbSaree) => void;
  onQuickView: (saree: DbSaree) => void;
  onAddToCart: (saree: DbSaree) => void;
  onViewAll: () => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  sarees,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onViewAll
}) => {
  const newArrivals = sarees.filter((s) => s.is_new_arrival).slice(0, 6);

  if (newArrivals.length === 0) return null;

  return (
    <section id="new-arrivals" className="py-14 bg-[#ffffff] border-t border-[#e3bdc3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b0004a] mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#b0004a]" />
              <span>Fresh Off The Loom</span>
              <span aria-hidden="true">·</span>
              <span>Pune Store</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b1c1c] tracking-tight">
              New Arrivals Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#5a4044] mt-1">
              Newly woven Paithani drapes and handpicked silk weaves just arrived at our Kumthekar Road showroom.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#b0004a] hover:text-[#90003b] hover:underline"
          >
            <span>View All Sarees</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newArrivals.map((saree) => (
            <SareeCard
              key={saree.id}
              saree={saree}
              isWishlisted={wishlistIds.includes(saree.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
