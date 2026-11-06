import React from 'react';
import { ArrowRight, MapPin, MessageSquare, Sparkles } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenConcierge: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onOpenConcierge
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-20 bg-[#fbf9f8]">
      {/* Decorative subtle aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ffd9de]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#fec1d6]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Real Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Unboxed Heritage Location Tag */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#805062] tracking-wider uppercase">
              <span className="flex items-center gap-1.5 text-[#b0004a]">
                <MapPin className="w-3.5 h-3.5 text-[#b0004a]" />
                {SHOP_CONFIG.address.street}, {SHOP_CONFIG.address.area}, {SHOP_CONFIG.address.city}
              </span>
              <span aria-hidden="true" className="text-[#8e6f74]">·</span>
              <span className="text-[#5a4044] font-medium">{SHOP_CONFIG.address.landmark}</span>
            </div>

            {/* Devanagari Brand Tagline */}
            <p className="font-devanagari text-lg sm:text-2xl font-semibold text-[#b0004a] tracking-wide">
              {SHOP_CONFIG.tagline}
            </p>

            {/* Editorial Serif Display Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b1c1c] tracking-tight leading-[1.18] [text-wrap:balance]">
              Authentic Paithani & Handpicked Silk Sarees in Pune.
            </h1>

            {/* Body Copy */}
            <p className="text-base sm:text-lg text-[#5a4044] leading-relaxed max-w-xl font-normal">
              Welcome to {SHOP_CONFIG.name} on Kumthekar Road. Discover exquisite Paithani pure silk, traditional 9-yard Nauvari, Kanjeevaram, Banarasi, and bridal sarees chosen for your most memorable moments.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#b0004a] hover:bg-[#90003b] rounded transition-all shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer"
              >
                <span>Browse Sarees</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={SHOP_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#00662c] bg-white border border-[#25d366] hover:bg-[#dbffdb]/40 rounded transition-all whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-[#25d366]" />
                <span>Chat on WhatsApp (+91 {SHOP_CONFIG.whatsapp})</span>
              </a>
            </div>

            {/* Store Owners & Phone Quick Touchpoint */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#5a4044]">
              <span className="font-semibold text-[#1b1c1c]">Contact:</span>
              {SHOP_CONFIG.owners.map((owner, idx) => (
                <span key={owner.name} className="flex items-center gap-1">
                  <span>{owner.name}</span>
                  <a href={`tel:${owner.phone}`} className="text-[#b0004a] hover:underline font-mono">
                    ({owner.phone})
                  </a>
                  {idx === 0 && <span aria-hidden="true" className="text-[#e3bdc3]">·</span>}
                </span>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Bridal Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#e3bdc3]/60 shadow-xl bg-[#f0eded]">
              <img
                src="/images/hero_paithani_bridal_1793599014021.jpg"
                alt="Authentic Paithani silk saree showcase at Tejaswini Silk Pune"
                width="1200"
                height="825"
                className="w-full h-full aspect-[4/3] lg:aspect-[16/11] object-cover hover:scale-103 transition-transform duration-700"
                loading="eager"
              />
              
              {/* Subtle scrim & photo caption overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[#ffd9de] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ffd9de]" />
                    Kumthekar Road Collection
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                    Paithani & Bridal Splendour
                  </h3>
                  <p className="text-xs text-white/90 line-clamp-1 font-devanagari">
                    {SHOP_CONFIG.address.street}, {SHOP_CONFIG.address.area}, पुणे
                  </p>
                </div>
              </div>
            </div>

            {/* Corner Store Badge */}
            <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#e3bdc3] rounded p-3 shadow-lg max-w-[220px]">
              <div className="text-[10px] uppercase font-semibold text-[#805062] tracking-wider">
                Visit Our Boutique
              </div>
              <div className="font-serif text-sm font-bold text-[#b0004a]">
                {SHOP_CONFIG.address.building}
              </div>
              <div className="text-[11px] text-[#5a4044]">
                {SHOP_CONFIG.address.shopNo}, Kumthekar Rd
              </div>
            </div>

          </div>

        </div>

        {/* 4-Column Trust Strip */}
        <div className="mt-14 pt-8 border-t border-[#e3bdc3]/60 grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="space-y-1">
            <div className="font-serif text-xl font-bold text-[#1b1c1c]">
              Pure Silk
            </div>
            <div className="text-xs font-semibold text-[#b0004a]">
              Authentic Handloom & Art Silk
            </div>
            <p className="text-xs text-[#5a4044]">
              Finest Paithanis, Kanjeevarams, Banarasi and soft silks.
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-xl font-bold text-[#1b1c1c]">
              9-Yard Nauvari
            </div>
            <div className="text-xs font-semibold text-[#b0004a]">
              Traditional Kashta Weaves
            </div>
            <p className="text-xs text-[#5a4044]">
              Authentic Marathi bridal drapes for Muhurat & ceremonies.
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-xl font-bold text-[#1b1c1c]">
              Kumthekar Road
            </div>
            <div className="text-xs font-semibold text-[#b0004a]">
              Sadashiv Peth, Pune
            </div>
            <p className="text-xs text-[#5a4044]">
              Personal service in Pune’s renowned textile hub.
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-xl font-bold text-[#1b1c1c]">
              WhatsApp Direct
            </div>
            <div className="text-xs font-semibold text-[#00662c]">
              +91 {SHOP_CONFIG.whatsapp}
            </div>
            <p className="text-xs text-[#5a4044]">
              Photos, videos & doorstep delivery inquiries on chat.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
