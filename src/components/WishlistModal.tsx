import React from 'react';
import { DbSaree } from '../types/database';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  wishlistSarees: DbSaree[];
  onClose: () => void;
  onRemove: (saree: DbSaree) => void;
  onAddToCart: (saree: DbSaree) => void;
  onQuickView: (saree: DbSaree) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  wishlistSarees,
  onClose,
  onRemove,
  onAddToCart,
  onQuickView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-2xl border border-[#e3bdc3] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e3bdc3]/60 flex items-center justify-between bg-[#fbf9f8]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#b0004a] fill-[#b0004a]" />
            <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">
              Your Saved Sarees ({wishlistSarees.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5a4044] hover:text-[#b0004a] rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-[#e3bdc3]/40">
          {wishlistSarees.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Heart className="w-10 h-10 text-[#e3bdc3] mx-auto" />
              <p className="font-serif text-base font-bold text-[#1b1c1c]">No saved sarees yet</p>
              <p className="text-xs text-[#5a4044]">
                Click the heart icon on any saree to save it for your bridal consultation.
              </p>
            </div>
          ) : (
            wishlistSarees.map((saree) => {
              const cover = saree.images && saree.images.length > 0
                ? saree.images[0]
                : '/images/hero_paithani_bridal_1793599014021.jpg';

              return (
                <div key={saree.id} className="py-4 flex gap-4 items-center">
                  <div
                    onClick={() => {
                      onClose();
                      onQuickView(saree);
                    }}
                    className="w-16 h-20 bg-[#f6f3f2] rounded border border-[#e3bdc3]/60 overflow-hidden cursor-pointer shrink-0"
                  >
                    <img 
                      src={cover} 
                      alt={saree.name} 
                      width="64"
                      height="80"
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1">
                    <h4
                      onClick={() => {
                        onClose();
                        onQuickView(saree);
                      }}
                      className="font-serif text-sm font-bold text-[#1b1c1c] hover:text-[#b0004a] cursor-pointer line-clamp-1"
                    >
                      {saree.name}
                    </h4>
                    {saree.marathi_name && (
                      <div className="font-devanagari text-[11px] text-[#805062]">
                        {saree.marathi_name}
                      </div>
                    )}
                    <div className="font-serif text-sm font-bold text-[#b0004a] mt-1 tabular-nums">
                      ₹{saree.price_inr.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {saree.in_stock && (
                      <button
                        onClick={() => onAddToCart(saree)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#b0004a] hover:bg-[#90003b] rounded flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                    <button
                      onClick={() => onRemove(saree)}
                      className="p-1.5 text-[#805062] hover:text-[#ba1a1a] cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
