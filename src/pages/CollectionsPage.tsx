import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getSarees } from '../lib/supabase';
import { DbSaree } from '../types/database';
import { SHOP_CATEGORIES } from '../config/shop';
import { ArrowUpRight } from 'lucide-react';
export const CollectionsPage: React.FC = () => {
 const [items,setItems]=useState<DbSaree[]>([]);
 useEffect(()=>{document.title='Shop Collections | Tejaswini Silk Pune';getSarees().then(setItems).catch(console.error);},[]);
 const groups=SHOP_CATEGORIES.map(name=>({name,products:items.filter(s=>s.category===name)})).filter(g=>g.products.length>0);
 return <div className="min-h-screen bg-[#fffdf9]"><Header cartCount={0} wishlistCount={0} onOpenCart={()=>window.location.assign('/shop')} onOpenWishlist={()=>window.location.assign('/shop')}/><main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"><p className="text-xs tracking-[.25em] uppercase text-[#a25462]">The weave edit</p><h1 className="font-serif text-4xl md:text-5xl mt-3 text-[#352a2a]">Explore Our Collections</h1><p className="text-[#77645d] mt-4 mb-12 max-w-2xl">Discover our available Paithani, pure silk, bridal and traditional styles. Select a collection to see its sarees.</p>{groups.length ? <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">{groups.map(g=><Link key={g.name} to={'/shop?category='+encodeURIComponent(g.name)} className="group"><div className="relative aspect-[3/4] overflow-hidden bg-[#efe8e0]"><img loading="lazy" src={g.products.find(s=>s.images?.[0])?.images[0] || '/images/hero_paithani_bridal_1793599014021.jpg'} alt={g.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/><div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between gap-2"><div><p className="font-serif text-lg sm:text-2xl">{g.name}</p><p className="text-xs mt-2">{g.products.length} sarees</p></div><ArrowUpRight/></div></div></Link>)}</div> : <p className="text-sm text-[#796966] py-16 text-center">Collections will appear here as soon as sarees are added through the admin dashboard.</p>}</main><Footer/></div>;
};