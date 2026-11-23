import React from 'react';
import { Link } from 'react-router-dom';
import { DbSaree } from '../types/database';

export const SareesInMotion:React.FC<{sarees:DbSaree[]}> = ({sarees}) => {
 const videos=sarees.filter(s=>s.video_url && /^https:\/\//.test(s.video_url));
 return <section id="sarees-in-motion" className="bg-[#f8f1e9] py-16 md:py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <p className="uppercase text-xs tracking-[.23em] text-[#94505d]">Watch before you buy</p>
   <h2 className="font-serif text-3xl md:text-4xl mt-3 text-[#3e2d2d]">Sarees in Motion</h2>
   <p className="text-sm text-[#6f5c56] mt-3">See the drape, shine and movement before making an enquiry.</p>
   {videos.length ? <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-5 mt-9">{videos.map(s=><div key={s.id} className="w-[210px] sm:w-[260px] shrink-0 snap-start"><video controls playsInline preload="none" poster={s.images?.[0]} className="w-full aspect-[9/16] object-cover bg-[#e5dbd5]"><source src={s.video_url!} /></video><Link to={'/saree/'+encodeURIComponent(s.id)} className="mt-3 block text-sm text-[#643841] underline underline-offset-4">View {s.name}</Link></div>)}</div> : <div className="mt-8 border border-[#dfd0c4] bg-white/50 p-8 text-center text-sm text-[#705a55]">Product videos will appear here when the boutique uploads its first saree reel.</div>}
 </div></section>;
};