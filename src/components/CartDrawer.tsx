import React from 'react';
import { DbSaree } from '../types/database';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';

interface CartDrawerProps {
  isOpen: boolean;
  items: Array<{ saree: DbSaree; quantity: number }>;
  onClose: () => void;
  onUpdateQuantity: (sareeId: string, delta: number) => void;
  onRemoveItem: (sareeId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.saree.price_inr * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#e3bdc3]">
        
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#e3bdc3]/60 flex items-center justify-between bg-[#fbf9f8]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#b0004a]" />
            <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">
              Shopping Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5a4044] hover:text-[#b0004a] rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-[#e3bdc3]/40">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#e3bdc3] mx-auto" />
              <p className="font-serif text-lg font-bold text-[#1b1c1c]">
                Your bag is empty
              </p>
              <p className="text-xs text-[#5a4044] max-w-xs mx-auto">
                Explore our authentic Paithani sarees and pure silks from Kumthekar Road.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#b0004a] rounded hover:bg-[#90003b] cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item) => {
              const cover = item.saree.images && item.saree.images.length > 0
                ? item.saree.images[0]
                : '/images/hero_paithani_bridal_1793599014021.jpg';

              return (
                <div key={item.saree.id} className="py-4 flex gap-4">
                  <div className="w-20 h-24 bg-[#f6f3f2] rounded border border-[#e3bdc3]/60 overflow-hidden shrink-0">
                    <img
                      src={cover}
                      alt={item.saree.name}
                      width="80"
                      height="96"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-bold text-[#1b1c1c] line-clamp-1">
                          {item.saree.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.saree.id)}
                          className="text-[#805062] hover:text-[#ba1a1a] p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.saree.marathi_name && (
                        <div className="font-devanagari text-[11px] text-[#805062] line-clamp-1">
                          {item.saree.marathi_name}
                        </div>
                      )}

                      <div className="text-[11px] text-[#805062] mt-0.5">
                        {item.saree.fabric} · {item.saree.colour}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#e3bdc3] rounded text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.saree.id, -1)}
                          className="px-2 py-0.5 text-[#5a4044] hover:bg-[#f6f3f2] cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-semibold text-[#1b1c1c] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.saree.id, 1)}
                          className="px-2 py-0.5 text-[#5a4044] hover:bg-[#f6f3f2] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-serif text-sm font-bold text-[#b0004a] tabular-nums">
                        ₹{(item.saree.price_inr * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-[#fbf9f8] border-t border-[#e3bdc3]/60 space-y-4">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#1b1c1c] font-bold text-base">
                <span>Total Amount:</span>
                <span className="font-serif text-lg text-[#b0004a] tabular-nums">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-[#5a4044]">
                Direct booking with {SHOP_CONFIG.name} via WhatsApp.
              </p>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#25d366] hover:bg-[#20ba5a] rounded flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Order via WhatsApp (+91 {SHOP_CONFIG.whatsapp})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
