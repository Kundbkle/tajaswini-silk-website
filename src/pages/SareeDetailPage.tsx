import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DbSaree } from '../types/database';
import { getSareeById } from '../lib/supabase';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SareeDetailModal } from '../components/SareeDetailModal';
import { CartDrawer } from '../components/CartDrawer';
import { WishlistModal } from '../components/WishlistModal';
import { WhatsAppOrderModal } from '../components/WhatsAppOrderModal';
import { ArrowLeft, PackageSearch } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';

export const SareeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [saree, setSaree] = useState<DbSaree | null>(null);
  const [loading, setLoading] = useState(true);

  // Cart & Wishlist state from localStorage
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

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tejaswini_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tejaswini_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getSareeById(id)
      .then((data) => {
        setSaree(data);
        if (data) {
          document.title = `${data.name} | Tejaswini Silk, Pune`;
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleToggleWishlist = (item: DbSaree) => {
    setWishlistIds((prev) =>
      prev.includes(item.id) ? prev.filter((i) => i !== item.id) : [...prev, item.id]
    );
  };

  const handleAddToCart = (item: DbSaree) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.saree.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.saree.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { saree: item, quantity: 1 }];
    });
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
    setCart((prev) => prev.filter((c) => c.saree.id !== sareeId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f8] text-[#1b1c1c]">
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="max-w-4xl mx-auto py-20 text-center animate-pulse space-y-4">
            <div className="h-8 bg-[#f0eded] rounded w-1/3 mx-auto" />
            <div className="h-64 bg-[#f0eded] rounded max-w-xl mx-auto" />
          </div>
        ) : saree ? (
          <SareeDetailModal
            saree={saree}
            isWishlisted={wishlistIds.includes(saree.id)}
            onClose={() => {}}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            isStandalonePage={true}
          />
        ) : (
          <div className="max-w-md mx-auto py-16 text-center bg-white border border-[#e3bdc3] rounded-lg p-8 space-y-4">
            <PackageSearch className="w-12 h-12 text-[#e3bdc3] mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-[#1b1c1c]">
              Saree Not Found
            </h2>
            <p className="text-xs sm:text-sm text-[#5a4044]">
              This saree design may have been sold or moved. Please explore our live collection or message us on WhatsApp.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                to="/#catalog"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#b0004a] rounded hover:bg-[#90003b]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Catalog</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer onNavigate={() => {}} />

      {/* Cart Drawer */}
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
        wishlistSarees={saree && wishlistIds.includes(saree.id) ? [saree] : []}
        onClose={() => setIsWishlistOpen(false)}
        onRemove={handleToggleWishlist}
        onAddToCart={(item) => {
          handleAddToCart(item);
          setIsWishlistOpen(false);
        }}
        onQuickView={() => {}}
      />
    </div>
  );
};
