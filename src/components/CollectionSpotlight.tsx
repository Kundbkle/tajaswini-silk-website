import React from 'react';
import {Link} from 'react-router-dom';
import {DbSaree} from '../types/database';
import {BrandCTA} from './BrandCTA';

/** Editorial layered-product composition based on the supplied collection reference. */
export const CollectionSpotlight:React.FC<{sarees:DbSaree[]}> = ({sarees}) => {
 const picks=sarees.filter(s=>s.images?.[0]).slice(0,3);
 return <section id="catalog" className="ts-collection-spotlight relative overflow-hidden bg-[linear-gradient(110deg,#511329,#8b2c58)] text-white">
   <div className="ts-spotlight-art" aria-hidden="true"/>
   <div className="relative max-w-7xl mx-auto grid md:grid-cols-[.85fr_1.15fr] gap-5 md:gap-10 items-center px-6 sm:px-10 lg:px-16 py-11 sm:py-16 md:py-20">
     <div className="relative z-10 text-center md:text-left">
       <p className="text-[10px] sm:text-xs uppercase tracking-[.25em] text-[#edb5a0] font-semibold">The complete collection</p>
       <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mt-3 mb-6">Every saree,<br className="hidden md:block"/> <em className="font-normal text-[#f2ba9e]">one place</em></h2>
       <BrandCTA to="/shop" label="View All Sarees" />
     </div>
     <div className="relative min-h-[215px] sm:min-h-[320px] md:min-h-[340px] flex justify-center items-center">
       {picks.length>0 ? picks.map((s,i)=>{
         const positions = picks.length === 1 ? ['ts-stack-center'] : picks.length === 2 ? ['ts-stack-left','ts-stack-right'] : ['ts-stack-left','ts-stack-center','ts-stack-right'];
         return <Link key={s.id} to={'/saree/'+encodeURIComponent(s.id)} className={`ts-stack-card ${positions[i]} group absolute w-[36%] max-w-[205px] aspect-[3/4] bg-white p-1.5 sm:p-2 shadow-2xl border border-white/70`} aria-label={'View '+s.name}>
           <img src={s.images[0]} alt={s.name} loading="lazy" className="w-full h-full object-cover"/>
           <span className="absolute inset-x-1.5 sm:inset-x-2 bottom-1.5 sm:bottom-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-12 px-2 sm:px-3 pb-2 text-left">
             <span className="block text-[9px] sm:text-xs font-semibold leading-snug line-clamp-2 text-white">{s.name}</span>
             <span className="block mt-1 text-[10px] sm:text-xs text-white/90">₹{s.price_inr.toLocaleString('en-IN')}</span>
           </span>
         </Link>
       }):<div className="flex items-center justify-center w-full py-14 px-8 bg-white/5 border border-white/20 text-white/75 text-sm text-center">Explore our collection in the saree catalogue.</div>}
     </div>
   </div>
 </section>;
};
