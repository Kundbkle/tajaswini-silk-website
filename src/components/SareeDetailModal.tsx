import React, { useState, useEffect } from 'react';
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
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  useEffect(() => {
    setSelectedImage(saree?.images?.[0] || '/images/hero_paithani_bridal_1793599014021.jpg');
  }, [saree?.id]);

  if (!saree) return null;

  const images = saree.images && saree.images.length > 0
    ? saree.images
    : ['/images/hero_paithani_bridal_1793599014021.jpg'];

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
    <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-[#f0c9dd] overflow-hidden max-h-[92vh] flex flex-col">
      
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-[#f0c9dd]/50 flex items-center justify-between bg-[#fff9fc]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8d4770]">
          <span>{saree.category}</span>
          <span aria-hidden="true">·</span>
          <span>{saree.fabric}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-1.5 text-[#5a4044] hover:text-[#ad075f] rounded hover:bg-[#fff0f6] flex items-center gap-1 text-xs"
            title="Copy shareable link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-[#00662c]" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>

          {!isStandalonePage && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#5a4044] hover:text-[#ad075f] hover:bg-[#fff0f6] rounded transition-colors"
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
          <div className="relative aspect-[4/3] bg-[#fff0f6] rounded-lg overflow-hidden border border-[#f0c9dd]/60">
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
                  ? 'bg-[#ad075f] text-white shadow'
                  : 'bg-white/90 text-[#5a4044] hover:text-[#ad075f]'
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
                    selectedImage === imgUrl ? 'border-[#ad075f] ring-2 ring-[#ad075f]/40' : 'border-[#f0c9dd]/60'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail view" width="64" height="64" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Store Location Notice */}
          <div className="p-3 bg-[#fff0f6] border border-[#f0c9dd]/80 rounded text-xs text-[#5a4044] space-y-1">
            <div className="font-semibold text-[#1b1c1c] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ad075f]" />
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
                <div className="font-devanagari text-sm font-semibold text-[#ad075f]">
                  {saree.marathi_name}
                </div>
              )}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b1c1c] mt-0.5">
                {saree.name}
              </h1>
            </div>

            {/* Price Box */}
            <div className="p-3.5 bg-[#fff9fc] border border-[#f0c9dd]/60 rounded flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#8d4770] uppercase tracking-wider block">Price</span>
                <span className="font-serif text-2xl font-bold text-[#ad075f] tabular-nums">
                  ₹{saree.price_inr.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right text-xs">
                {saree.in_stock ? (
                  <span className="text-[#00662c] font-semibold">✓ In Stock</span>
                ) : (
                  <span className="text-[#ba1a1a] font-semibold">Sold Out</span>
                )}
                <span className="block text-[10px] text-[#8d4770]">Direct Kumthekar Store</span>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="space-y-2 text-xs border-t border-[#f0c9dd]/60 pt-3">
              <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#f0c9dd]/30">
                <span className="text-[#8d4770]">Category:</span>
                <span className="font-medium text-right text-[#1b1c1c]">{saree.category}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#f0c9dd]/30">
                <span className="text-[#8d4770]">Fabric:</span>
                <span className="font-medium text-right text-[#1b1c1c]">{saree.fabric}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#f0c9dd]/30">
                <span className="text-[#8d4770]">Length:</span>
                <span className="font-medium text-right text-[#1b1c1c]">{saree.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#f0c9dd]/30">
                <span className="text-[#8d4770]">Colour:</span>
                <span className="font-medium text-right text-[#1b1c1c]">{saree.colour}</span>
              </div>
              {saree.blouse_details && (
                <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#f0c9dd]/30">
                  <span className="text-[#8d4770]">Blouse Piece:</span>
                  <span className="font-medium text-right text-[#1b1c1c]">{saree.blouse_details}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="text-xs text-[#5a4044] leading-relaxed">
              <strong className="text-[#1b1c1c] block mb-1">Description:</strong>
              {saree.description}
            </div>

            {(saree.origin_region || saree.weaver_community) && (
              <div className="border border-[#dfcfc7] bg-[#fcf7f1] p-4 text-sm">
                <h2 className="font-serif text-xl text-[#633c43] mb-2">Provenance</h2>
                {saree.origin_region && <p><strong>Region:</strong> {saree.origin_region}</p>}
                {saree.weaver_community && <p className="mt-1"><strong>Weaver community:</strong> {saree.weaver_community}</p>}
              </div>
            )}
            {saree.video_url && /^https:\/\//.test(saree.video_url) && (
              <div className="pt-3"><h2 className="font-serif text-xl mb-3">Watch the Drape</h2>
                <video controls playsInline preload="none" poster={images[0]} className="w-full max-h-[380px] bg-[#e8ddd5] rounded"><source src={saree.video_url}/></video>
              </div>
            )}
            <div className="border border-[#e7dbd3] p-3 text-xs text-[#6d5852]">
              Delivery and returns are confirmed directly by the boutique before payment.
              <a href="/policies" className="underline ml-1">View store policies</a>
            </div>

            {/* Care Instructions */}
            {saree.care_instructions && (
              <div className="text-xs text-[#5a4044] bg-[#ffe0ee]/20 p-3 rounded border border-[#f0c9dd]/40">
                <strong className="text-[#8d4770] block mb-0.5">Care Instructions:</strong>
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
          <div className="space-y-2.5 pt-4 border-t border-[#f0c9dd]/60">
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

            {!saree.in_stock && (
              <a href={`https://wa.me/91${SHOP_CONFIG.whatsapp}?text=${encodeURIComponent('Hello, please notify me when ' + saree.name + ' is available again.')}`} target="_blank" rel="noopener noreferrer" className="block w-full border border-[#a40860] text-[#a40860] py-3 text-center text-sm font-semibold">Request restock update on WhatsApp</a>
            )}
            {saree.in_stock && (
              <button
                onClick={() => onAddToCart(saree)}
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#ad075f] bg-white border border-[#ad075f] hover:bg-[#ffe0ee]/30 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ad075f] mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Sarees</span>
        </a>
        {content}
        <div className="md:hidden sticky bottom-0 bg-white border-t border-[#e5d7cf] p-3 flex gap-2 z-20">
          {saree.in_stock && <button onClick={() => onAddToCart(saree)} className="flex-1 bg-[#a40860] text-white py-3 text-xs font-semibold">Add to Bag</button>}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#e9f6e9] text-[#165c29] text-center py-3 text-xs font-semibold">WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {content}
    </div>
  );
};
