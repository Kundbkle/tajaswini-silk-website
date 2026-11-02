import React from 'react';
import { DbSaree } from '../types/database';
import { Heart, Eye, ShoppingBag, MessageSquare } from 'lucide-react';
import { buildWhatsAppProductEnquiry } from '../config/shop';

interface SareeCardProps {
  saree: DbSaree;
  isWishlisted: boolean;
  onToggleWishlist: (saree: DbSaree) => void;
  onQuickView: (saree: DbSaree) => void;
  onAddToCart: (saree: DbSaree) => void;
}

export const SareeCard: React.FC<SareeCardProps> = ({
  saree,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const coverImage = saree.images && saree.images.length > 0
    ? saree.images[0]
    : '/images/hero_paithani_bridal_1793599014021.jpg';

  const whatsappEnquiryUrl = buildWhatsAppProductEnquiry(saree);

  return (
    <div className="group relative bg-[#ffffff] border border-[#e3bdc3]/60 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#d81b60]/50">
      
      {/* Product Image Container */}
      <div 
        className="relative aspect-[4/3] bg-[#f6f3f2] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(saree)}
      >
        <img
          src={coverImage}
          alt={saree.name}
          width="400"
          height="300"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/hero_paithani_bridal_1793599014021.jpg';
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {!saree.in_stock && (
            <span className="bg-[#1b1c1c]/90 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-bold rounded">
              Sold Out
            </span>
          )}
          {saree.is_new_arrival && saree.in_stock && (
            <span className="bg-[#b0004a] text-white px-2.5 py-1 text-[11px] font-bold rounded shadow-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(saree);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-[#b0004a] text-white shadow'
              : 'bg-white/85 text-[#5a4044] hover:text-[#b0004a] hover:bg-white shadow-sm'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Hover Action Bar */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(saree);
            }}
            className="flex-1 py-2 text-xs font-semibold text-[#1b1c1c] bg-white/95 hover:bg-white rounded shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#b0004a]" />
            <span>View Details</span>
          </button>
          
          {saree.in_stock && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(saree);
              }}
              className="py-2 px-3 text-xs font-semibold text-white bg-[#b0004a] hover:bg-[#90003b] rounded shadow-md flex items-center justify-center transition-colors"
              title="Add to Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* Category & Fabric as unboxed clean metadata */}
          <div className="flex items-center gap-2 text-xs text-[#805062]">
            <span className="font-semibold uppercase tracking-wider">{saree.category}</span>
            <span aria-hidden="true">·</span>
            <span>{saree.fabric}</span>
            {saree.colour && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate max-w-[120px]">{saree.colour}</span>
              </>
            )}
          </div>

          {/* Saree Name */}
          <h3
            onClick={() => onQuickView(saree)}
            className="font-serif text-base sm:text-lg font-bold text-[#1b1c1c] group-hover:text-[#b0004a] transition-colors cursor-pointer line-clamp-1"
          >
            {saree.name}
          </h3>

          {/* Optional Marathi Name */}
          {saree.marathi_name && (
            <div className="font-devanagari text-xs text-[#805062] line-clamp-1 font-medium">
              {saree.marathi_name}
            </div>
          )}

          {/* Description highlight */}
          <p className="text-xs text-[#5a4044] line-clamp-2 leading-relaxed">
            {saree.description}
          </p>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="pt-3 border-t border-[#e3bdc3]/40 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#805062] uppercase tracking-wider">Price (INR)</div>
            <div className="font-serif text-lg font-bold text-[#b0004a] tabular-nums">
              ₹{saree.price_inr.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Enquiry Button as requested */}
            <a
              href={whatsappEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-2.5 py-1.5 text-[#00662c] bg-[#dbffdb]/80 hover:bg-[#dbffdb] border border-[#008239]/30 rounded transition-colors whitespace-nowrap flex items-center gap-1"
              title="Enquire on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25d366] fill-[#25d366]" />
              <span>WhatsApp</span>
            </a>

            {saree.in_stock ? (
              <button
                onClick={() => onAddToCart(saree)}
                className="text-xs font-semibold px-3 py-1.5 text-white bg-[#b0004a] hover:bg-[#90003b] rounded transition-colors whitespace-nowrap cursor-pointer"
              >
                Add to Bag
              </button>
            ) : (
              <span className="text-xs text-[#805062] font-medium px-2 py-1 bg-[#f6f3f2] rounded">
                Sold Out
              </span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
