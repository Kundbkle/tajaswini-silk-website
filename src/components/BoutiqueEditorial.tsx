import React from 'react';
import {Link} from 'react-router-dom';
export const BoutiqueEditorial:React.FC=()=>(
 <section className="grid md:grid-cols-2 bg-[#efe0da] min-h-[445px]">
   <div className="relative min-h-[350px] md:min-h-[445px] overflow-hidden">
    <img src="/images/craft_handloom_loom_pune_1793599014955.jpg" alt="Traditional Indian textile craft" loading="lazy" className="w-full h-full absolute inset-0 object-cover"/>
   </div>
   <div className="px-7 sm:px-12 lg:px-[12%] py-14 flex flex-col items-start justify-center">
     <div className="text-[#8e4659] text-[10px] font-bold uppercase tracking-[.27em]">Heritage & celebration</div>
     <h2 className="font-serif text-4xl md:text-[46px] leading-tight mt-3">Tradition, beautifully worn.</h2>
     <p className="text-[#675958] leading-7 mt-5 mb-7">Discover sarees for festive days, weddings and moments worth remembering. Explore the textures, colours and details from our Pune boutique.</p>
     <Link to="/collections" className="bg-[#682b3c] text-white text-[11px] uppercase tracking-[.12em] font-bold px-7 py-4">Explore Collections →</Link>
   </div>
 </section>
);
