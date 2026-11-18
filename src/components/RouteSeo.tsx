import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SHOP_CONFIG } from '../config/shop';

const PAGE_META:Record<string,{title:string;description:string}>={
 '/': {title:'Paithani & Silk Sarees in Pune | Tejaswini Silk',description:'Explore Paithani, Nauvari, bridal and silk sarees at Tejaswini Silk on Kumthekar Road, Pune. Browse the collection and enquire on WhatsApp.'},
 '/shop': {title:'Shop All Sarees | Tejaswini Silk Pune',description:'Browse our sarees by collection, fabric, colour and price. Explore silk, Paithani and bridal designs at our Pune boutique.'},
 '/collections': {title:'Saree Collections | Tejaswini Silk Pune',description:'Explore available collections of Paithani, silk, Nauvari and bridal sarees at Tejaswini Silk in Pune.'},
 '/sale': {title:'Saree Offers | Tejaswini Silk Pune',description:'View genuine currently available saree offers from Tejaswini Silk Pune.'},
 '/upcoming-sarees': {title:'Upcoming Sarees | Tejaswini Silk Pune',description:'Discover upcoming saree arrivals announced by Tejaswini Silk Pune.'},
 '/about': {title:'About Our Boutique | Tejaswini Silk Pune',description:'Discover Tejaswini Silk boutique in Sadashiv Peth, Pune, specializing in Paithani and traditional silk sarees.'},
 '/contact': {title:'Visit Tejaswini Silk Pune | Store & Contact',description:'Visit Tejaswini Silk on Kumthekar Road, Sadashiv Peth, Pune or enquire about sarees via WhatsApp.'},
 '/policies': {title:'Store Policies | Tejaswini Silk Pune',description:'Contact Tejaswini Silk for current delivery and return terms before placing an order.'}
};
export const RouteSeo:React.FC=()=>{
 const {pathname}=useLocation();
 useEffect(()=>{
  if(pathname.startsWith('/admin')) return;
  const info=PAGE_META[pathname];
  if(info) document.title=info.title;
  const desc=document.querySelector('meta[name="description"]');
  if(info && desc) desc.setAttribute('content',info.description);
  const url=SHOP_CONFIG.siteUrl.replace(/\/$/,'')+pathname;
  document.querySelector('link[rel="canonical"]')?.setAttribute('href',url);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content',url);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',info?.title || 'Saree Details | Tejaswini Silk Pune');
 },[pathname]);
 return null;
};