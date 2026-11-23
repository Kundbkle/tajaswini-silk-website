import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';
import { BrandMark } from './BrandMark';

const footerLinks = [
  {label:'Home',to:'/'}, {label:'Collections',to:'/collections'}, {label:'All Sarees',to:'/shop'},
  {label:'Sale',to:'/sale'}, {label:'Upcoming',to:'/upcoming-sarees'}
];

export const Footer: React.FC<{onNavigate?: (id:string)=>void}> = () => (
  <footer id="contact" className="ts-footer bg-[#0e0e12] text-[#f7f6f6] border-t-4 border-[#d80880]">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_.85fr_1fr] gap-10 lg:gap-16 pb-12 border-b border-white/15">
        <div>
          <BrandMark />
          <p className="text-sm leading-7 text-[#d4d1d5] mt-6 max-w-sm">
            Discover traditional Paithani, pure silk and celebratory sarees at our boutique on Kumthekar Road, Pune.
          </p>
          <a href={SHOP_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#d80880] text-white font-semibold text-xs tracking-wide px-5 py-3 mt-6 hover:bg-[#b70b6a] transition-colors">
            <MessageCircle size={18} /> Chat with our boutique
          </a>
          {(SHOP_CONFIG.instagramUrl || SHOP_CONFIG.facebookUrl) && <div className="flex items-center gap-4 mt-6">
            {SHOP_CONFIG.instagramUrl && <a href={SHOP_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#e8e3e8] hover:text-[#ff9cca]"><Instagram size={21}/></a>}
            {SHOP_CONFIG.facebookUrl && <a href={SHOP_CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#e8e3e8] hover:text-[#ff9cca]"><Facebook size={21}/></a>}
          </div>}
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="text-sm uppercase tracking-[.2em] font-bold text-[#fff] mb-5">Explore</h2>
          <div className="flex flex-col gap-3.5">
            {footerLinks.map(item=><Link key={item.to} to={item.to} className="text-sm text-[#ddd8dc] hover:text-[#ff9cca] transition-colors">{item.label}</Link>)}
          </div>
        </nav>
        <div>
          <h2 className="text-sm uppercase tracking-[.2em] font-bold text-white mb-5">Visit & Contact</h2>
          <div className="space-y-4 text-sm leading-6 text-[#ddd8dc]">
            <p className="flex items-start gap-3"><MapPin className="text-[#ff86bd] shrink-0 mt-0.5" size={18}/><span>{SHOP_CONFIG.address.full}</span></p>
            <a href={'tel:+91'+SHOP_CONFIG.whatsapp} className="flex items-center gap-3 hover:text-[#ff9cca]"><Phone className="text-[#ff86bd] shrink-0" size={18}/>{SHOP_CONFIG.whatsappDisplay}</a>
            <a href={'mailto:'+SHOP_CONFIG.email} className="flex items-center gap-3 break-all hover:text-[#ff9cca]"><Mail className="text-[#ff86bd] shrink-0" size={18}/>{SHOP_CONFIG.email}</a>
            {SHOP_CONFIG.openingHours && <p className="flex items-center gap-3"><Clock className="text-[#ff86bd] shrink-0" size={18}/>{SHOP_CONFIG.openingHours}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-7 text-xs text-[#c6c2c5]">
        <p>© {new Date().getFullYear()} {SHOP_CONFIG.name}, Pune. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link to="/policies" className="hover:text-white underline-offset-4 hover:underline">Store policies</Link>
          <span>Made for timeless drapes</span>
        </div>
      </div>
    </div>
  </footer>
);
