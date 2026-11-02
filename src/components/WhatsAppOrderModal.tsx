import React, { useState } from 'react';
import { DbSaree } from '../types/database';
import { X, MessageSquare, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { buildWhatsAppCartMessage, SHOP_CONFIG } from '../config/shop';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  items: Array<{ saree: DbSaree; quantity: number }>;
  onClose: () => void;
  onClearCart: () => void;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  items,
  onClose,
  onClearCart
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const totalAmount = items.reduce(
    (sum, item) => sum + item.saree.price_inr * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const cartPayload = items.map((item) => ({
      id: item.saree.id,
      name: item.saree.name,
      price: item.saree.price_inr,
      quantity: item.quantity
    }));

    const url = buildWhatsAppCartMessage(cartPayload, {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim()
    });

    // Open WhatsApp
    window.open(url, '_blank');
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl border border-[#e3bdc3] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e3bdc3]/60 flex items-center justify-between bg-[#fbf9f8]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#25d366] fill-[#25d366]" />
            <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">
              Complete Order on WhatsApp
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5a4044] hover:text-[#b0004a] rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Cart Summary Header */}
            <div className="p-3.5 bg-[#fbf9f8] border border-[#e3bdc3]/70 rounded text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-[#1b1c1c]">
                <span>Total Items ({items.reduce((s, i) => s + i.quantity, 0)}):</span>
                <span className="font-serif text-base text-[#b0004a] tabular-nums">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-[#5a4044] leading-relaxed">
                Clicking the button will open WhatsApp with your itemized saree order pre-filled. Our shop team will confirm stock and provide UPI/bank details directly.
              </p>
            </div>

            {/* Customer Inputs - empty by default, no fake defaults */}
            <div>
              <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 98220 00000"
                className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                Delivery Address (with City & PIN Code)
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter complete shipping address if delivery is required"
                className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                Notes / Customization (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Fall & Pico request, wedding date, or matching blouse piece inquiry"
                className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#25d366] hover:bg-[#20ba5a] rounded flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send Order via WhatsApp (+91 {SHOP_CONFIG.whatsapp})</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs font-medium text-[#5a4044] hover:text-[#1b1c1c]"
              >
                Cancel and Return to Bag
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#805062] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00662c]" />
              <span>Direct communication with Tejaswini Silk owners in Sadashiv Peth</span>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
