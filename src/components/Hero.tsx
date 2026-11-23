import React from 'react';
import { SHOP_CONFIG } from '../config/shop';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenConcierge: () => void;
}

export const Hero: React.FC<HeroProps> = ({onExploreCollection,onOpenConcierge}) => (
  <section className="grid lg:grid-cols-[46%_54%] min-h-[570px] bg-[#fceaf2]">
    <div className="px-7 sm:px-12 lg:px-[min(8vw,120px)] py-16 lg:py-20 flex flex-col justify-center items-start">
      <p className="uppercase text-[10px] tracking-[.27em] font-bold text-[#c00a72]">Heritage in every thread</p>
      <h1 className="font-serif text-[3.2rem] sm:text-[4.3rem] xl:text-[5rem] leading-[1.13] tracking-tight font-medium text-[#332c2b] mt-5">
        A story in<br/>every drape.
      </h1>
      <p className="mt-5 text-[#655956] text-[15px] max-w-sm leading-7">
        Beautiful Paithani, silk and traditional sarees, thoughtfully chosen for your special moments at {SHOP_CONFIG.name}, Pune.
      </p>
      <div className="flex flex-wrap gap-3 mt-8">
        <button onClick={onExploreCollection} className="px-7 py-3.5 bg-[#a40860] hover:bg-[#85044d] text-white uppercase tracking-[.12em] text-[11px] font-bold">Explore Sarees →</button>
        <button onClick={onOpenConcierge} className="px-7 py-3.5 border border-[#a40860] text-[#a40860] hover:bg-[#f6e6e5] uppercase tracking-[.12em] text-[11px] font-bold">Personal Assistance</button>
      </div>
    </div>
    <div className="relative min-h-[420px] lg:min-h-[570px] bg-[#bda6a0] overflow-hidden">
      <img src="/images/hero_paithani_bridal_1793599014021.jpg" alt="Paithani silk saree from Tejaswini Silk Pune" loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover object-[center_24%]"/>
      <div className="absolute bottom-7 right-7 bg-[#fffdf8]/95 text-[#623044] font-serif text-lg px-6 py-4">Handpicked for every celebration ♡</div>
    </div>
  </section>
);
