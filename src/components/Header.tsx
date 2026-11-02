import React, { useState } from 'react';
import { ShoppingBag, Heart, Menu, X, MessageSquare, Phone } from 'lucide-react';
import { SHOP_CONFIG, SHOP_CATEGORIES } from '../config/shop';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f8]/95 backdrop-blur-md border-b border-[#e3bdc3]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Zone 1: Logo + Brand + Marathi Tagline */}
        <a 
          href="/" 
          className="flex items-center gap-3 group text-left whitespace-nowrap shrink-0"
        >
          <img
            src="/logo.png"
            alt={SHOP_CONFIG.name}
            width="44"
            height="44"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded"
            loading="eager"
            onError={(e) => {
              // Graceful fallback if image is missing
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#b0004a] block leading-none">
              {SHOP_CONFIG.name}
            </span>
            <span className="font-devanagari text-[11px] sm:text-xs text-[#805062] font-medium block mt-1 tracking-wide">
              {SHOP_CONFIG.tagline}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5a4044]">
          <button
            onClick={() => scrollTo('catalog')}
            className="hover:text-[#b0004a] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            All Sarees
          </button>
          
          <button
            onClick={() => scrollTo('new-arrivals')}
            className="hover:text-[#b0004a] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            New Arrivals
          </button>

          {/* Categories Quick Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              className="hover:text-[#b0004a] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 flex items-center gap-1"
            >
              <span>Categories</span>
              <span className="text-[10px]">▼</span>
            </button>

            {categoriesDropdownOpen && (
              <div 
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#e3bdc3] rounded-lg shadow-xl py-2 z-50 animate-fadeIn text-xs"
              >
                {SHOP_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat);
                      scrollTo('catalog');
                      setCategoriesDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[#ffd9de]/30 hover:text-[#b0004a] transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => scrollTo('drape-studio')}
            className="hover:text-[#b0004a] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            Drape Guide
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-[#b0004a] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            Store & Contact
          </button>
        </nav>

        {/* Zone 3: Actions (Wishlist, Cart, WhatsApp Store CTA) */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#5a4044] hover:text-[#b0004a] transition-colors"
            title="View Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#b0004a] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#5a4044] hover:text-[#b0004a] transition-colors"
            title="Shopping Bag"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#b0004a] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* WhatsApp Primary CTA */}
          <a
            href={SHOP_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#25d366] hover:bg-[#20ba5a] rounded transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="text-[11px] font-mono sm:hidden">8446006000</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#5a4044] hover:text-[#b0004a]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fbf9f8] border-b border-[#e3bdc3] px-6 py-4 space-y-3 animate-fadeIn text-sm">
          <button
            onClick={() => scrollTo('catalog')}
            className="block w-full text-left py-1.5 font-medium text-[#1b1c1c] hover:text-[#b0004a]"
          >
            All Sarees
          </button>
          <button
            onClick={() => scrollTo('new-arrivals')}
            className="block w-full text-left py-1.5 font-medium text-[#1b1c1c] hover:text-[#b0004a]"
          >
            New Arrivals
          </button>
          <button
            onClick={() => scrollTo('drape-studio')}
            className="block w-full text-left py-1.5 font-medium text-[#1b1c1c] hover:text-[#b0004a]"
          >
            Drape Guide
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="block w-full text-left py-1.5 font-medium text-[#1b1c1c] hover:text-[#b0004a]"
          >
            Store & Contact
          </button>
          
          <div className="pt-2 border-t border-[#e3bdc3]/60 text-xs text-[#805062] space-y-1">
            <div className="font-semibold text-[#1b1c1c]">Kumthekar Road, Sadashiv Peth, Pune</div>
            <div>WhatsApp: +91 {SHOP_CONFIG.whatsapp}</div>
            <div>Landline: {SHOP_CONFIG.landline}</div>
          </div>
        </div>
      )}
    </header>
  );
};
