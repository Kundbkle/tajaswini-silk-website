import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DbSaree } from '../types/database';
import { SHOP_CATEGORIES } from '../config/shop';

interface ShopByWeaveProps {
  sarees: DbSaree[];
  onSelectCategory: (category: string) => void;
}
export const ShopByWeave: React.FC<ShopByWeaveProps> = ({ sarees, onSelectCategory }) => {
  const groups = SHOP_CATEGORIES.map((category) => {
    const matching = sarees.filter((saree) => saree.category === category);
    const withImage = matching.find((saree) => saree.images?.[0]);
    return { category, count: matching.length, image: withImage?.images[0] };
  }).filter((group) => group.count > 0);

  if (!groups.length) return null;
  return (
    <section className="bg-white py-16 md:py-20" aria-labelledby="weave-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="uppercase text-[11px] tracking-[0.25em] text-[#9c5961] font-semibold">Find your perfect drape</p>
          <h2 id="weave-heading" className="font-serif text-3xl sm:text-4xl mt-3 text-[#352a2a]">Shop by Collection</h2>
          <p className="text-sm text-[#796966] mt-3">Explore the weaves and styles currently available in our boutique.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {groups.slice(0, 8).map((group) => (
            <button type="button" key={group.category} onClick={() => onSelectCategory(group.category)} className="group text-left">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#f4eee8]">
                {group.image ? <img src={group.image} alt={group.category + ' saree collection'} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" /> : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-end gap-2">
                  <div>
                    <p className="font-serif text-lg sm:text-xl leading-snug">{group.category}</p>
                    <p className="text-[11px] text-white/85 mt-1">{group.count} {group.count === 1 ? 'saree' : 'sarees'}</p>
                  </div>
                  <ArrowUpRight size={19} className="shrink-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
