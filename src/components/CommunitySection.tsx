import React from 'react';
import {SHOP_CONFIG} from '../config/shop';
import {Instagram, Mail} from 'lucide-react';

/** Social proof is shown only when real, approved customer content exists. */
export const CommunitySection:React.FC=()=>(
  <section className="bg-white py-16 md:py-20 border-t border-[#ece2da]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
      <div>
        <p className="text-xs uppercase tracking-[.23em] text-[#9d5260]">Stay close to the weave</p>
        <h2 className="font-serif text-3xl md:text-4xl mt-3 text-[#3d2d30]">The latest from our boutique</h2>
        <p className="text-sm text-[#796660] leading-7 mt-5">Explore new drapes, videos and collection announcements. You can request updates directly from our team.</p>
        {SHOP_CONFIG.instagramUrl && <a target="_blank" rel="noopener noreferrer" href={SHOP_CONFIG.instagramUrl} className="mt-6 inline-flex gap-2 items-center underline text-[#7c303c] text-sm"><Instagram size={18}/>Follow us on Instagram</a>}
      </div>
      <div className="bg-[#faf4ed] px-7 py-9 sm:px-10">
        <Mail className="text-[#8e4550]" size={25}/>
        <h3 className="font-serif text-2xl mt-3">Collection updates</h3>
        <p className="text-sm leading-7 mt-3 text-[#78635d]">For updates on new sarees and showroom collections, email our team. Online newsletter subscriptions are not available yet.</p>
        <a href={'mailto:'+SHOP_CONFIG.email+'?subject='+encodeURIComponent('Tajaswini Silk collection updates')} className="inline-flex bg-[#7c303c] text-white text-sm px-6 py-3 mt-6">Request updates via email</a>
      </div>
    </div>
  </section>
);