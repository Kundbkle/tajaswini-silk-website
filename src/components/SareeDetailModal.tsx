import React, { useState } from 'react';
import { DbSaree } from '../types/database';
import { X, Heart, ShoppingBag, MessageSquare, Share2, Check, ArrowLeft, MapPin } from 'lucide-react';
import { buildWhatsAppProductEnquiry, SHOP_CONFIG } from '../config/shop';

interface SareeDetailModalProps {
  saree: DbSaree | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (saree: DbSaree) => void;
  onAddToCart: (saree: DbSaree) => void;
  isStandalonePage?: boolean;
}

export const SareeDetailModal: React.FC<SareeDetailModalProps> = ({
  saree,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
  isStandalonePage = false
}) => {
  if (!saree) return null;

  const images = saree.images && saree.images.length > 0
    ? saree.images
    : ['/images/hero_paithani_bridal_1793599014021.jpg'];

  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [copiedLink, setCopiedLink] = useState(false);

  const whatsappUrl = buildWhatsAppProductEnquiry(saree);

  const handleShare = () => {
    const url = `${SHOP_CONFIG.siteUrl}/saree/${saree.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const content = (
    <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-[#e3bdc3] overflow-hidden max-h-[92vh] flex flex-col">
      
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-[#e3bdc3]/50 flex items-center justify-between bg-[#fbf9f8]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#805062]">
          <span>{saree.category}</span>
          <span aria-hidden="true">·</span>
          <span>{saree.fabric}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-1.5 text-[#5a4044] hover:text-[#b0004a] rounded hover:bg-[#f6f3f2] flex items-center gap-1 text-xs"
            title="Copy shareable link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-[#00662c]" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>

          {!isStandalonePage && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#5a4044] hover:text-[#b0004a] hover:bg-[#f6f3f2] rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="overflow-y-auto p-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Gallery */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] bg-[#f6f3f2] rounded-lg overflow-hidden border border-[#e3bdc3]/60">
            <img
              src={selectedImage}
              alt={saree.name}
              width="600"
              height="450"
              className="w-full h-full object-cover transition-all duration-300"
              loading="eager"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/hero_paithani_bridal_1793599014021.jpg';
              }}
            />
            
            <button
              onClick={() => onToggleWishlist(saree)}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                isWishlisted
                  ? 'bg-[#b0004a] text-white shadow'
                  : 'bg-white/90 text-[#5a4044] hover:text-[#b0004a]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>

            {!saree.in_stock && (
              <div className="absolute bottom-3 left-3 bg-[#1b1c1c]/90 text-white px-3 py-1 text-xs font-bold rounded">
                Currently Sold Out
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {images.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-16 h-16 rounded border overflow-hidden shrink-0 cursor-pointer ${
                    selectedImage === imgUrl ? 'border-[#b0004a] ring-2 ring-[#b0004a]/40' : 'border-[#e3bdc3]/60'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail view" width="64" height="64" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Store Location Notice */}
          <div className="p-3 bg-[#f6f3f2] border border-[#e3bdc3]/80 rounded text-xs text-[#5a4044] space-y-1">
            <div className="font-semibold text-[#1b1c1c] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#b0004a]" />
              <span>Available at Tejaswini Silk Showroom</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              657 Kumthekar Road, Sadashiv Peth, Near Kunjir Talim, Pune.
            </p>
          </div>
        </div>

        {/* Specs & Enquiry Flow */}
        <div className="md:col-span-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              {saree.marathi_name && (
                <div className="font-devanagari text-sm font-semibold text-[#b0004a]">
                  {saree.marathi_name}
                </div>
              )}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b1c1c] mt-0.5">
                {saree.name}
              </h1>
            </div>

            {/* Price Box */}
            <div className="p-3.5 bg-[#fbf9f8] border border-[#e3bdc3]/60 rounded flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#805062] uppercase tracking-wider block">Price</span>
                <span className="font-serif text-2xl font-bold text-[#b0004a] tabular-nums">
                  ₹{saree.price_inr.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right text-xs">
                {saree.in_stock ? (
                  <span className="text-[#00662c] font-semibold">✓ In Stock</span>
                ) : (
                  <span className="text-[#ba1a1a] font-semibold">Sold Out</span>
                )}
                <span className="block text-[10px] text-[#805062]">Direct Kumthekar Store</span>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="space-y-2 text-xs border-t border-[#e3bdc3]/60 pt-3">
              <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#e3bdc3]/30">
                <span className="text-[#805062]">Category:</span>
                <span className="font-medium text-right text-[#1b1c1c]">{saree.category}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#e3bdc3]/30">
                <span className="text-[#805062]">Fabric:</span>
                <span className="font-medium text-right text-[#1b1c1c]">{saree.fabric}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#e3bdc3]/30">
                <span className="text-[#805062]">Length:</span>
                <span className="font-medium text-right text-[#1b1c1c]">{saree.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#e3bdc3]/30">
                <span className="text-[#805062]">Colour:</span>
                <span className="font-medium text-right text-[#1b1c1c]">{saree.colour}</span>
              </div>
              {saree.blouse_details && (
                <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#e3bdc3]/30">
                  <span className="text-[#805062]">Blouse Piece:</span>
                  <span className="font-medium text-right text-[#1b1c1c]">{saree.blouse_details}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="text-xs text-[#5a4044] leading-relaxed">
              <strong className="text-[#1b1c1c] block mb-1">Description:</strong>
              {saree.description}
            </div>

            {/* Care Instructions */}
            {saree.care_instructions && (
              <div className="text-xs text-[#5a4044] bg-[#ffd9de]/20 p-3 rounded border border-[#e3bdc3]/40">
                <strong className="text-[#805062] block mb-0.5">Care Instructions:</strong>
                {Array.isArray(saree.care_instructions) ? (
                  <ul className="list-disc pl-4 space-y-0.5">
                    {saree.care_instructions.map((c, idx) => <li key={idx}>{c}</li>)}
                  </ul>
                ) : (
                  <span>{saree.care_instructions}</span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-[#e3bdc3]/60">
            {/* Primary: Enquire on WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#25d366] hover:bg-[#20ba5a] rounded flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Enquire on WhatsApp (+91 {SHOP_CONFIG.whatsapp})</span>
            </a>

            {saree.in_stock && (
              <button
                onClick={() => onAddToCart(saree)}
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#b0004a] bg-white border border-[#b0004a] hover:bg-[#ffd9de]/30 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );

  if (isStandalonePage) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <a 
          href="/#catalog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b0004a] mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Sarees</span>
        </a>
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {content}
    </div>
  );
};
