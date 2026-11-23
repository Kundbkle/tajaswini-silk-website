import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, MessageSquare } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';
import { BrandMark } from './BrandMark';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory?: (category: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'All Sarees', path: '/shop' },
  { label: 'Sale', path: '/sale' },
  { label: 'Upcoming', path: '/upcoming-sarees' }
] as const;

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    'text-sm whitespace-nowrap transition-colors hover:text-[#b70b6a] ' +
    (isActive ? 'text-[#a40860] font-semibold border-b-2 border-[#a40860] pb-1' : 'text-[#534343]');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#f1d5e2]">
      <div className="bg-[#a40860] px-2.5 py-1.5 text-center text-white text-[10px] sm:text-xs tracking-wide">
        <span className="sm:hidden">Authentic Paithani & Silk · Pune Boutique</span>
        <span className="hidden sm:inline">Traditional Paithani & Silk Sarees · Visit our Pune boutique · Enquire on WhatsApp</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60px] sm:min-h-[76px] py-2 sm:py-3 flex items-center justify-between gap-3">
        <BrandMark compact />

        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_ITEMS.map(item =>
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className={navClass}>
              {item.label}
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
          <button type="button" onClick={onOpenWishlist} aria-label="Wishlist" className="relative p-1.5 sm:p-2 text-[#563f42] hover:text-[#a40860]">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-[#a40860] text-white text-[10px] min-w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>}
          </button>
          <button type="button" onClick={onOpenCart} aria-label="Shopping bag" className="relative p-2 text-[#563f42] hover:text-[#a40860]">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#a40860] text-white text-[10px] min-w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>
          <a href={SHOP_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp enquiry"
             className="p-1.5 sm:px-3.5 sm:py-2 bg-[#25d366] text-white inline-flex items-center gap-1.5 rounded-sm">
            <MessageSquare size={18} /> <span className="hidden xl:inline text-xs font-semibold">WhatsApp</span>
          </a>
          <button type="button" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen} aria-controls="mobile-shop-menu"
            onClick={() => setMobileMenuOpen(open => !open)} className="lg:hidden p-1.5 sm:p-2 text-[#573f40]">
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && <nav id="mobile-shop-menu" aria-label="Mobile navigation" className="lg:hidden bg-[#fffbfd] border-t border-[#f1d5e2] px-5 py-3 shadow-lg">
        {NAV_ITEMS.map(item =>
          <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) =>
            'block py-3 border-b border-[#eee4dd] text-sm font-medium ' + (isActive ? 'text-[#a40860]' : 'text-[#5b4745]')}
            onClick={() => setMobileMenuOpen(false)}>{item.label}</NavLink>
        )}
      </nav>}
      <div className="boutique-brand-trim" aria-hidden="true" />
    </header>
  );
};
