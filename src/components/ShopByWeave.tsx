import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {DbSaree} from '../types/database';

export const ShopByWeave:React.FC<{sarees:DbSaree[];onSelectCategory?:(category:string)=>void}>=({sarees})=>{
 const groups=[
  {slug:'maheshwari',name:'Maheshwari',description:'Refined borders and timeless elegance.',matches:(s:DbSaree)=>s.category==='Maheshwari'},
  {slug:'paithani',name:'Paithani',description:'Rich colour and Maharashtra’s heritage motifs.',matches:(s:DbSaree)=>s.category.toLowerCase().includes('paithani')},
  {slug:'ajrakh',name:'Ajrakh',description:'Layered patterns and a storied printing craft.',matches:(s:DbSaree)=>s.category==='Ajrakh'},
  {slug:'narayanpet',name:'Narayanpet',description:'Traditional borders and everyday grace.',matches:(s:DbSaree)=>s.category==='Narayanpet'}
 ];
 return <section className="bg-white py-16 md:py-20" aria-labelledby="weave-heading"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <p className="uppercase tracking-[.24em] text-xs font-semibold text-[#a15a63] text-center">Traditional Indian weaving</p>
  <h2 id="weave-heading" className="font-serif text-center text-3xl md:text-4xl mt-3 text-[#3b2c2c]">Shop by Weave</h2>
  <p className="text-sm text-[#796661] mt-4 text-center">Learn about each weave and explore our listed pieces.</p>
  <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-5 mt-10">
  {groups.map(g=>{const found=sarees.filter(g.matches),photo=found.find(s=>s.images?.[0])?.images[0];return <Link key={g.slug} to={'/collections/'+g.slug} className="w-[68%] sm:w-[43%] lg:w-[24%] shrink-0 snap-start group">
   <div className="relative aspect-[3/4] bg-gradient-to-br from-[#ead8cb] via-[#efe8e0] to-[#c9a68f] overflow-hidden">{photo ? <img src={photo} alt={g.name+' sarees in our catalogue'} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/> : <span className="absolute inset-0 flex items-center justify-center text-[#845f53] font-serif text-3xl"> {g.name} </span>}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
    <div className="absolute bottom-5 left-5 right-5 text-white"><p className="font-serif text-2xl">{g.name}</p><p className="text-xs mt-1">{found.length?found.length+' listed sarees':'Story & collection'}</p></div>
   </div><div className="flex items-start justify-between gap-2 mt-3"><p className="text-sm text-[#765954]">{g.description}</p><ArrowUpRight className="shrink-0 text-[#8d4651]" size={18}/></div>
  </Link>})}
  </div>
 </div></section>;
};