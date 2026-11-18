import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DbSaree } from '../types/database';
import { getSarees } from '../lib/supabase';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SareeCard } from '../components/SareeCard';
import { SareeDetailModal } from '../components/SareeDetailModal';
import { CartDrawer } from '../components/CartDrawer';
import { WhatsAppOrderModal } from '../components/WhatsAppOrderModal';
import { WishlistModal } from '../components/WishlistModal';
import { SHOP_CATEGORIES } from '../config/shop';
import { SlidersHorizontal, Search, X } from 'lucide-react';

type CartItem = { saree: DbSaree; quantity: number };
export const ShopPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const [sarees, setSarees] = useState<DbSaree[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<DbSaree | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => { try { return JSON.parse(localStorage.getItem('tejaswini_cart') || '[]'); } catch { return []; } });
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('tejaswini_wishlist') || '[]'); } catch { return []; } });
  useEffect(() => { let active = true; getSarees().then(items => { if (active) setSarees(items); }).catch(console.error).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  useEffect(() => { localStorage.setItem('tejaswini_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('tejaswini_wishlist', JSON.stringify(wishlistIds)); }, [wishlistIds]);
  useEffect(() => { document.title = 'Shop All Sarees | Tejaswini Silk Pune'; }, []);

  const category = params.get('category') || '';
  const query = params.get('q') || '';
  const colour = params.get('colour') || '';
  const fabric = params.get('fabric') || '';
  const sort = params.get('sort') || 'newest';
  const stockOnly = params.get('stock') === '1';
  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next);
  };
  const fabrics = useMemo(() => [...new Set(sarees.map(s => s.fabric).filter(Boolean))], [sarees]);
  const colours = useMemo(() => [...new Set(sarees.map(s => s.colour).filter(Boolean))], [sarees]);
  const results = useMemo(() => {
    const filtered = sarees.filter(s =>
      (!category || s.category === category) &&
      (!fabric || s.fabric === fabric) &&
      (!colour || s.colour === colour) &&
      (!stockOnly || s.in_stock) &&
      (!query || [s.name, s.category, s.fabric, s.colour, s.description].some(v => v?.toLowerCase().includes(query.toLowerCase())))
    );
    return filtered.sort((a,b) => sort === 'price-low' ? a.price_inr - b.price_inr : sort === 'price-high' ? b.price_inr - a.price_inr : (new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()));
  }, [sarees, category, fabric, colour, stockOnly, query, sort]);
  const toggleWishlist = (s: DbSaree) => setWishlistIds(prev => prev.includes(s.id) ? prev.filter(id => id !== s.id) : [...prev, s.id]);
  const addCart = (s: DbSaree) => { setCart(prev => prev.some(i => i.saree.id === s.id) ? prev.map(i => i.saree.id === s.id ? {...i, quantity: i.quantity + 1} : i) : [...prev, {saree:s, quantity:1}]); setCartOpen(true); };
  const setQuantity = (id: string, delta: number) => setCart(prev => prev.map(i => i.saree.id === id ? {...i, quantity: Math.max(1, i.quantity + delta)} : i));
  const availableWishlist = sarees.filter(s => wishlistIds.includes(s.id));
  return <div className="min-h-screen bg-[#fffdf9]">
    <Header cartCount={cart.reduce((n,i)=>n+i.quantity,0)} wishlistCount={wishlistIds.length} onOpenCart={()=>setCartOpen(true)} onOpenWishlist={()=>setWishlistOpen(true)} />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <nav className="text-xs text-[#826c68] mb-8"><Link to="/">Home</Link> / All Sarees</nav>
      <div className="mb-10"><p className="uppercase tracking-[.25em] text-xs text-[#9e5560] mb-2">Handpicked at our Pune boutique</p><h1 className="font-serif text-4xl md:text-5xl text-[#382e2b]">Shop All Sarees</h1><p className="mt-3 text-[#786964] text-sm">Find your next beautiful drape. Browse by collection, fabric, colour and price.</p></div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-[245px] shrink-0">
          <div className="flex items-center gap-2 font-semibold text-sm uppercase tracking-widest text-[#6d3a42] border-b pb-4 mb-5"><SlidersHorizontal size={17}/> Filters</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-3">
            <label className="text-xs font-semibold text-[#564442]">Collection
              <select aria-label="Collection" value={category} onChange={e=>setFilter('category',e.target.value)} className="mt-2 block w-full bg-white border border-[#e3d7cf] px-3 py-3 text-sm"><option value="">All Collections</option>{SHOP_CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}</select>
            </label>
            <label className="text-xs font-semibold text-[#564442]">Fabric
              <select aria-label="Fabric" value={fabric} onChange={e=>setFilter('fabric',e.target.value)} className="mt-2 block w-full bg-white border border-[#e3d7cf] px-3 py-3 text-sm"><option value="">All Fabrics</option>{fabrics.map(c=><option key={c} value={c}>{c}</option>)}</select>
            </label>
            <label className="text-xs font-semibold text-[#564442]">Colour
              <select aria-label="Colour" value={colour} onChange={e=>setFilter('colour',e.target.value)} className="mt-2 block w-full bg-white border border-[#e3d7cf] px-3 py-3 text-sm"><option value="">All Colours</option>{colours.map(c=><option key={c} value={c}>{c}</option>)}</select>
            </label>
            <label className="flex items-center gap-2 text-sm text-[#564442] pt-6"><input type="checkbox" checked={stockOnly} onChange={e=>setFilter('stock',e.target.checked?'1':'')} /> In stock only</label>
          </div>
          <button onClick={()=>setParams({})} className="text-xs underline mt-5 text-[#8b4651]">Clear filters</button>
        </aside>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-7 border-b border-[#e9ddd8] pb-5">
            <div className="relative flex-1 max-w-md"><Search size={18} className="absolute top-3 left-3 text-[#977d78]"/><input placeholder="Search sarees, colours, fabrics…" aria-label="Search sarees" value={query} onChange={e=>setFilter('q',e.target.value)} className="w-full border border-[#e3d7cf] py-2.5 pl-10 pr-3 bg-white text-sm"/></div>
            <div className="flex items-center justify-between gap-4"><span className="text-xs text-[#7e6964]">{results.length} sarees</span><select aria-label="Sort sarees" value={sort} onChange={e=>setFilter('sort',e.target.value)} className="border border-[#e3d7cf] bg-white px-3 py-2.5 text-sm"><option value="newest">Newest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select></div>
          </div>
          {loading ? <p className="py-20 text-center text-[#7e6964]">Loading the collection…</p> : results.length ? <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">{results.map(s=><SareeCard key={s.id} saree={s} isWishlisted={wishlistIds.includes(s.id)} onToggleWishlist={toggleWishlist} onQuickView={setSelected} onAddToCart={addCart}/>)}</div> : <div className="text-center py-20 border border-[#e8ddd5]"><p className="font-serif text-2xl">No sarees match your filters</p><button onClick={()=>setParams({})} className="text-sm mt-5 underline">View all sarees</button></div>}
        </div>
      </div>
    </main>
    <Footer />
    <SareeDetailModal saree={selected} isWishlisted={selected ? wishlistIds.includes(selected.id) : false} onClose={()=>setSelected(null)} onToggleWishlist={toggleWishlist} onAddToCart={addCart}/>
    <CartDrawer isOpen={cartOpen} items={cart} onClose={()=>setCartOpen(false)} onUpdateQuantity={setQuantity} onRemoveItem={id=>setCart(prev=>prev.filter(i=>i.saree.id!==id))} onProceedToCheckout={()=>{setCartOpen(false);setCheckoutOpen(true);}}/>
    <WhatsAppOrderModal isOpen={checkoutOpen} items={cart} onClose={()=>setCheckoutOpen(false)} onClearCart={()=>setCart([])}/>
    <WishlistModal isOpen={wishlistOpen} wishlistSarees={availableWishlist} onClose={()=>setWishlistOpen(false)} onRemove={toggleWishlist} onAddToCart={addCart} onQuickView={setSelected}/>
  </div>;
};
