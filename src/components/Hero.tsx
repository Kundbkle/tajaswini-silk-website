import React from 'react';
import { ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenConcierge: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onOpenConcierge }) => (
  <section className="bg-[#faf7f1]">
    <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 min-h-[530px]">
      <div className="px-6 sm:px-12 lg:px-20 py-16 lg:py-24 flex flex-col justify-center items-start order-2 lg:order-1">
        <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-[#815d5d] font-semibold mb-6">
          <span className="w-8 h-px bg-[#ad846c]" /> The art of a beautiful drape
        </div>
        <p className="text-[#994c51] font-devanagari text-lg md:text-xl mb-4">{SHOP_CONFIG.tagline}</p>
        <h1 className="font-serif text-[2.65rem] sm:text-[3.5rem] lg:text-[4.1rem] leading-[1.12] tracking-tight text-[#382b2a] max-w-[650px]">
          Timeless sarees. <em className="text-[#a65b62] font-normal">Beautiful stories.</em>
        </h1>
        <p className="mt-7 text-[#665a57] leading-7 text-sm md:text-base max-w-[490px]">
          Discover traditional Paithani, elegant silks and wedding favourites at {SHOP_CONFIG.name}, Pune. A collection to cherish, wear and pass on.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button onClick={onExploreCollection} className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#7c303c] text-white text-sm font-semibold hover:bg-[#5e202c] transition-colors">
            Explore the collection <ArrowRight size={17} />
          </button>
          <button onClick={onOpenConcierge} className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#bfa39a] text-[#5c3c3e] text-sm font-medium hover:bg-white transition-colors">
            Personal assistance <MessageCircle size={17} />
          </button>
        </div>
        <div className="mt-10 text-xs text-[#7c6861] flex items-center gap-1.5">
          <MapPin size={14} /> Kumthekar Road, Sadashiv Peth, Pune
        </div>
      </div>
      <div className="relative min-h-[300px] sm:min-h-[450px] lg:min-h-full order-1 lg:order-2 overflow-hidden">
        <img src="/images/hero_paithani_bridal_1793599014021.jpg" alt="Traditional Paithani silk saree from Tejaswini Silk Pune" className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute bottom-7 left-7 text-white">
          <div className="uppercase text-[10px] tracking-[0.2em] mb-2">The Paithani edit</div>
          <p className="font-serif text-2xl sm:text-3xl">An heirloom of elegance</p>
        </div>
      </div>
    </div>
  </section>
);
