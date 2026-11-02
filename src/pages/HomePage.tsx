import React, { useState, useEffect } from 'react';
import { DbSaree } from '../types/database';
import { getSarees } from '../lib/supabase';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { NewArrivalsSection } from '../components/NewArrivalsSection';
import { SareeCatalog } from '../components/SareeCatalog';
import { DrapeStudio } from '../components/DrapeStudio';
import { HeritageStory } from '../components/HeritageStory';
import { Footer } from '../components/Footer';
import { SareeDetailModal } from '../components/SareeDetailModal';
import { BoutiqueConciergeModal } from '../components/BoutiqueConciergeModal';
import { CartDrawer } from '../components/CartDrawer';
import { WhatsAppOrderModal } from '../components/WhatsAppOrderModal';
import { WishlistModal } from '../components/WishlistModal';
import { MessageSquare, Check } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';

export const HomePage: React.FC = () => {
  const [sarees, setSarees] = useState<DbSaree[]>([]);
  const [loadingSarees, setLoadingSarees] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Cart & Wishlist state with persistence in localStorage (starts clean and empty, no fake customers)
  const [cart, setCart] = useState<Array<{ saree: DbSaree; quantity: number }>>(() => {
    try {
      const saved = localStorage.getItem('tejaswini_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tejaswini_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [selectedSareeForDetail, setSelectedSareeForDetail] = useState<DbSaree | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('tejaswini_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tejaswini_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Load products from Supabase
  useEffect(() => {
    setLoadingSarees(true);
    getSarees()
      .then((data) => setSarees(data))
      .catch((err) => console.error('Failed to load sarees:', err))
      .finally(() => setLoadingSarees(false));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleWishlist = (saree: DbSaree) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(saree.id);
      if (exists) {
        showToast(`Removed from saved list.`);
        return prev.filter((id) => id !== saree.id);
      } else {
        showToast(`Saved "${saree.name}" to wishlist.`);
        return [...prev, saree.id];
      }
    });
  };

  const handleAddToCart = (saree: DbSaree) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.saree.id === saree.id);
      if (existing) {
        return prev.map((item) =>
          item.saree.id === saree.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { saree, quantity: 1 }];
    });
    showToast(`Added "${saree.name}" to your bag.`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (sareeId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.saree.id === sareeId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as Array<{ saree: DbSaree; quantity: number }>
    );
  };

  const handleRemoveFromCart = (sareeId: string) => {
    setCart((prev) => prev.filter((item) => item.saree.id !== sareeId));
    showToast('Removed from bag.');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wishlistedSarees = sarees.filter((s) => wishlistIds.includes(s.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f8] text-[#1b1c1c] selection:bg-[#ffd9de] selection:text-[#b0004a]">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1c] text-white text-xs px-4 py-2.5 rounded-lg shadow-xl border border-[#e3bdc3]/40 flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-[#25d366]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCollection={() => scrollTo('catalog')}
          onOpenConcierge={() => setIsConciergeOpen(true)}
        />

        {/* New Arrivals Section driven by is_new_arrival */}
        <NewArrivalsSection
          sarees={sarees}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(saree) => setSelectedSareeForDetail(saree)}
          onAddToCart={handleAddToCart}
          onViewAll={() => scrollTo('catalog')}
        />

        {/* Full Catalog with multi-attribute filtering */}
        <SareeCatalog
          sarees={sarees}
          isLoading={loadingSarees}
          wishlistIds={wishlistIds}
          initialCategory={selectedCategory}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(saree) => setSelectedSareeForDetail(saree)}
          onAddToCart={handleAddToCart}
        />

        {/* Traditional Drape Guide & Motif Codex */}
        <DrapeStudio
          onExploreCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Showroom Narrative on Kumthekar Road Sadashiv Peth */}
        <HeritageStory />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollTo} />

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <a
          href={SHOP_CONFIG.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          title="Direct WhatsApp Assistance"
        >
          <MessageSquare className="w-5 h-5 fill-white text-white" />
          <span className="text-xs font-bold hidden sm:inline">WhatsApp Us</span>
        </a>
      </div>

      {/* Saree Detail Quick-View Modal */}
      <SareeDetailModal
        saree={selectedSareeForDetail}
        isWishlisted={selectedSareeForDetail ? wishlistIds.includes(selectedSareeForDetail.id) : false}
        onClose={() => setSelectedSareeForDetail(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Direct WhatsApp Consultation Modal */}
      <BoutiqueConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Real WhatsApp Order Modal (no fake checkout) */}
      <WhatsAppOrderModal
        isOpen={isCheckoutOpen}
        items={cart}
        onClose={() => setIsCheckoutOpen(false)}
        onClearCart={() => setCart([])}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        wishlistSarees={wishlistedSarees}
        onClose={() => setIsWishlistOpen(false)}
        onRemove={handleToggleWishlist}
        onAddToCart={(item) => {
          handleAddToCart(item);
          setIsWishlistOpen(false);
        }}
        onQuickView={(item) => setSelectedSareeForDetail(item)}
      />

    </div>
  );
};
