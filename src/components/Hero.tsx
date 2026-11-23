import React from 'react';
import { SHOP_CONFIG } from '../config/shop';
import { BrandCTA } from './BrandCTA';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenConcierge: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onOpenConcierge }) => (
  <section className="ts-hero grid lg:grid-cols-[46%_54%] bg-[#fceaf2]">
    <div className="ts-floral-bg px-5 sm:px-10 lg:px-[min(7vw,108px)] py-9 sm:py-12 lg:py-16 flex flex-col justify-center items-start">
      <p className="uppercase text-[10px] tracking-[.22em] font-bold text-[#b70b6a]">Heritage in every thread</p>
      <h1 className="font-serif text-[clamp(2.35rem,9.3vw,3.15rem)] sm:text-[3.5rem] lg:text-[clamp(3.2rem,4.3vw,5rem)] leading-[1.13] tracking-tight font-medium text-[#332c2b] mt-3 sm:mt-5">
        A story in<br/>every drape.
      </h1>
      <p className="mt-3 sm:mt-5 text-[#655956] text-[13px] sm:text-[15px] max-w-[480px] leading-6 sm:leading-7">
        Beautiful Paithani, silk and traditional sarees, thoughtfully chosen for your special moments at {SHOP_CONFIG.name}, Pune.
      </p>
      <div className="flex items-center flex-wrap gap-x-5 gap-y-3 mt-5 sm:mt-8">
        <BrandCTA label="Explore Sarees" onClick={onExploreCollection} variant="dark" />
        <button onClick={onOpenConcierge} type="button" className="text-[11px] font-semibold uppercase tracking-[.08em] text-[#a40860] border-b border-[#a40860] pb-1 hover:text-[#85044d]">Personal Assistance</button>
      </div>
    </div>
    <div className="relative ts-hero-photo h-[260px] sm:h-[390px] lg:h-auto lg:min-h-[520px] bg-[#bda6a0] overflow-hidden">
      <img src="/images/hero_paithani_bridal_1793599014021.jpg" alt="Paithani silk saree from Tejaswini Silk Pune" loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover object-[center_25%]"/>
      <div className="absolute bottom-4 right-4 sm:bottom-7 sm:right-7 bg-[#fffdf8]/95 text-[#96345d] font-serif text-sm sm:text-lg px-4 py-2.5 sm:px-6 sm:py-4 shadow">A drape to cherish ♡</div>
    </div>
  </section>
);
