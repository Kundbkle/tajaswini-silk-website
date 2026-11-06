import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';

export const Footer: React.FC<{ onNavigate?: (id: string) => void }> = ({ onNavigate }) => {
  const scrollTo = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#1b1c1c] text-[#fbf9f8] pt-14 pb-12 border-t border-[#303030]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Brand & Tagline & Contact Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#303030] items-start">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/tejaswini-logo.png"
                alt={SHOP_CONFIG.name}
                width="260"
                height="58"
                className="w-48 sm:w-60 h-auto object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight leading-none">
                  {SHOP_CONFIG.name}
                </h3>
                <p className="font-devanagari text-xs text-[#ffd9de] font-medium mt-1">
                  {SHOP_CONFIG.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#dcd9d9] max-w-md leading-relaxed">
              Authentic Paithani pure silk, traditional 9-yard Nauvari drapes, Kanjeevarams, and bridal saree collections in the heart of Pune’s textile quarter.
            </p>

            {/* GST Number Displayed prominently as requested */}
            <div className="inline-block p-2.5 bg-[#303030] rounded border border-[#5a4044] text-xs">
              <span className="text-[#ffd9de] font-semibold">GSTIN: </span>
              <span className="font-mono text-white font-bold tracking-wider">{SHOP_CONFIG.gstNo}</span>
            </div>
          </div>

          {/* Quick WhatsApp Action Banner */}
          <div className="lg:col-span-6 p-5 bg-[#303030] border border-[#5a4044] rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#25d366] fill-[#25d366]" />
                <span className="text-sm font-bold text-white">Direct WhatsApp Assistance</span>
              </div>
              <span className="font-mono text-xs text-[#ffd9de] font-semibold">
                +91 {SHOP_CONFIG.whatsapp}
              </span>
            </div>
            
            <p className="text-xs text-[#dcd9d9]">
              Planning a wedding or searching for a specific Paithani colour and border? Connect with our showroom team on WhatsApp for video viewing or instant order booking.
            </p>

            <a
              href={SHOP_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#25d366] hover:bg-[#20ba5a] rounded transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Message on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Middle Row: Store Location, Owners, Hours & Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-[#303030] text-xs">
          
          {/* Col 1: Showroom Address */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Store Address
            </h4>
            <div className="flex items-start gap-2 text-[#dcd9d9]">
              <MapPin className="w-4 h-4 text-[#b0004a] shrink-0 mt-0.5" />
              <address className="not-italic leading-relaxed">
                {SHOP_CONFIG.address.number}, {SHOP_CONFIG.address.shopNo},<br />
                {SHOP_CONFIG.address.building},<br />
                {SHOP_CONFIG.address.street}, {SHOP_CONFIG.address.area},<br />
                {SHOP_CONFIG.address.landmark},<br />
                {SHOP_CONFIG.address.city} {SHOP_CONFIG.address.postalCode}
              </address>
            </div>

            {SHOP_CONFIG.googleMapsUrl && (
              <a
                href={SHOP_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#ffd9de] hover:underline pt-1"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Col 2: Owners & Telephone */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-1 text-[#dcd9d9]">
              {SHOP_CONFIG.owners.map((owner) => (
                <div key={owner.name} className="flex items-center justify-between">
                  <span>{owner.name}:</span>
                  <a href={`tel:${owner.phone}`} className="text-white hover:text-[#ffd9de] font-mono">
                    {owner.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#404040] space-y-1.5 text-[#dcd9d9]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#b0004a]" />
                <span>Landline: {SHOP_CONFIG.landline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#b0004a]" />
                <a href={`mailto:${SHOP_CONFIG.email}`} className="hover:underline">
                  {SHOP_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Opening Hours & Socials (hidden if empty) */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Showroom Hours
            </h4>
            
            {SHOP_CONFIG.openingHours ? (
              <div className="flex items-start gap-2 text-[#dcd9d9]">
                <Clock className="w-4 h-4 text-[#b0004a] shrink-0 mt-0.5" />
                <span>{SHOP_CONFIG.openingHours}</span>
              </div>
            ) : null}

            {/* Social Links (only shown if configured) */}
            {(SHOP_CONFIG.instagramUrl || SHOP_CONFIG.facebookUrl) && (
              <div className="pt-3 border-t border-[#404040] space-y-1">
                <span className="text-[#8e6f74] block">Follow Us:</span>
                <div className="flex items-center gap-3">
                  {SHOP_CONFIG.instagramUrl && (
                    <a
                      href={SHOP_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ffd9de] hover:underline"
                    >
                      Instagram
                    </a>
                  )}
                  {SHOP_CONFIG.facebookUrl && (
                    <a
                      href={SHOP_CONFIG.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ffd9de] hover:underline"
                    >
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Col 4: Quick Navigation */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-[#dcd9d9]">
              <li>
                <button onClick={() => scrollTo('catalog')} className="hover:text-[#ffd9de] cursor-pointer">
                  All Sarees Catalog
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('new-arrivals')} className="hover:text-[#ffd9de] cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('drape-studio')} className="hover:text-[#ffd9de] cursor-pointer">
                  Nauvari & Drape Guide
                </button>
              </li>
              <li>
                <a href={SHOP_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffd9de]">
                  WhatsApp Enquiry
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e6f74]">
          <div>
            © {new Date().getFullYear()} {SHOP_CONFIG.name}. Kumthekar Road, Sadashiv Peth, Pune. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>GST: {SHOP_CONFIG.gstNo}</span>
            <span aria-hidden="true">·</span>
            <span>Sadashiv Peth, Pune</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
