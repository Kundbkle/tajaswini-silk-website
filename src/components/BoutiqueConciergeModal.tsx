import React, { useState } from 'react';
import { X, Video, MapPin, Calendar, Clock, MessageSquare, Phone } from 'lucide-react';
import { SHOP_CONFIG, buildWhatsAppConsultationMessage } from '../config/shop';

interface BoutiqueConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BoutiqueConciergeModal: React.FC<BoutiqueConciergeModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [appointmentType, setAppointmentType] = useState<'video' | 'store'>('video');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const url = buildWhatsAppConsultationMessage({
      name: name.trim(),
      phone: phone.trim(),
      date: date.trim(),
      type: appointmentType,
      notes: notes.trim()
    });

    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl border border-[#e3bdc3] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e3bdc3]/60 flex items-center justify-between bg-[#fbf9f8]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#25d366]" />
            <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">
              Book Consultation on WhatsApp
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
            
            {/* Consultation Type Toggle */}
            <div>
              <label className="block text-xs font-semibold text-[#1b1c1c] mb-1.5">
                Choose Consultation Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAppointmentType('video')}
                  className={`p-3 text-left border rounded transition-all cursor-pointer ${
                    appointmentType === 'video'
                      ? 'border-[#b0004a] bg-[#ffd9de]/30 ring-1 ring-[#b0004a]'
                      : 'border-[#e3bdc3] bg-white text-[#5a4044]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#b0004a]">
                    <Video className="w-3.5 h-3.5" />
                    Live WhatsApp Video
                  </div>
                  <p className="text-[11px] text-[#805062] mt-0.5">
                    View sarees in daylight on video call
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType('store')}
                  className={`p-3 text-left border rounded transition-all cursor-pointer ${
                    appointmentType === 'store'
                      ? 'border-[#b0004a] bg-[#ffd9de]/30 ring-1 ring-[#b0004a]'
                      : 'border-[#e3bdc3] bg-white text-[#5a4044]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#b0004a]">
                    <MapPin className="w-3.5 h-3.5" />
                    Kumthekar Road Visit
                  </div>
                  <p className="text-[11px] text-[#805062] mt-0.5">
                    In-person visit at Sadashiv Peth store
                  </p>
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radhika Deshmukh"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                  WhatsApp Phone *
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
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                Preferred Date & Time
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Tomorrow 4:00 PM or Dec 15th"
                className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                What are you looking for? (Occasion / Colours / Budget)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Looking for pure silk Rani pink Paithani for bridal Muhurat..."
                className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
              />
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#25d366] hover:bg-[#20ba5a] rounded flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send Request via WhatsApp (+91 {SHOP_CONFIG.whatsapp})</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs font-medium text-[#5a4044] hover:text-[#1b1c1c]"
              >
                Close Window
              </button>
            </div>

            {/* Direct Phone Numbers */}
            <div className="pt-2 border-t border-[#e3bdc3]/60 text-center text-xs text-[#5a4044] space-y-1">
              <div>Or call our showroom directly:</div>
              <div className="font-semibold text-[#1b1c1c] flex items-center justify-center gap-3">
                <a href={`tel:${SHOP_CONFIG.owners[0].phone}`} className="hover:text-[#b0004a]">
                  Anand Trimal: {SHOP_CONFIG.owners[0].phone}
                </a>
                <span>·</span>
                <a href={`tel:${SHOP_CONFIG.owners[1].phone}`} className="hover:text-[#b0004a]">
                  Rajesh Trimal: {SHOP_CONFIG.owners[1].phone}
                </a>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
