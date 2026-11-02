import React from 'react';
import { MapPin, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';

export const HeritageStory: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-[#fbf9f8] border-t border-[#e3bdc3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b0004a] mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#b0004a]" />
            <span>Sadashiv Peth, Pune</span>
            <span aria-hidden="true">·</span>
            <span>Kumthekar Road</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1b1c1c] tracking-tight">
            Our Showroom on Kumthekar Road
          </h2>
          <p className="font-devanagari text-base sm:text-lg text-[#b0004a] font-medium mt-2">
            {SHOP_CONFIG.tagline}
          </p>
        </div>

        {/* 2-Column Split: Image + Genuine Store Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
          
          {/* Showroom / Weaving Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#e3bdc3] shadow-md bg-[#f0eded]">
              <img
                src="/images/craft_handloom_loom_pune_1793599014955.jpg"
                alt="Traditional handloom weaving craft at Tejaswini Silk Pune"
                width="800"
                height="600"
                className="w-full h-full aspect-[4/3] object-cover hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Genuine Narrative */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#805062]">
                Pune’s Traditional Silk Destination
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b1c1c] leading-snug">
                Where Maharashtrian bridal elegance comes to life.
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#5a4044] leading-relaxed">
              Located at {SHOP_CONFIG.address.full}, {SHOP_CONFIG.name} is dedicated to offering authentic handpicked Paithani pure silk, 9-yard Nauvaris, Kanjeevarams, Banarasi brocades, and readymade ethnic wear.
            </p>

            <p className="text-sm text-[#5a4044] leading-relaxed">
              Whether you are shopping for your wedding Muhurat, Antarpat, Sakharpuda, or family celebrations, Anand Trimal and Rajesh Trimal personally guide bridal families to find the perfect colour, motif, and drape.
            </p>

            {/* Direct Contact Card */}
            <div className="p-4 bg-white border border-[#e3bdc3] rounded-lg space-y-2 text-xs">
              <div className="font-bold text-[#1b1c1c]">Personal Showroom Assistance:</div>
              <div className="flex flex-wrap items-center gap-4 text-[#5a4044]">
                <span>Anand Trimal: <strong className="text-[#1b1c1c]">8855966816</strong></span>
                <span>·</span>
                <span>Rajesh Trimal: <strong className="text-[#1b1c1c]">9922441515</strong></span>
              </div>
              <div className="text-[#805062] pt-1">
                Landline: 020 24499955 · Email: {SHOP_CONFIG.email}
              </div>
            </div>

          </div>

        </div>

        {/* 4 Pillars of Customer Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#e3bdc3]/70 rounded-lg p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#b0004a]">Authentic Weaves</span>
              <CheckCircle2 className="w-4 h-4 text-[#00662c]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#1b1c1c]">
              Pure Silk & Art Silk
            </h4>
            <p className="text-xs text-[#5a4044] leading-relaxed">
              Carefully curated Paithani, Kanjeevaram, and Banarasi collections across budgets.
            </p>
          </div>

          <div className="bg-white border border-[#e3bdc3]/70 rounded-lg p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#b0004a]">Bridal Nauvari</span>
              <CheckCircle2 className="w-4 h-4 text-[#00662c]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#1b1c1c]">
              Traditional 9-Yard
            </h4>
            <p className="text-xs text-[#5a4044] leading-relaxed">
              Complete variety of authentic Kashta drapes for Maharashtrian weddings and festivals.
            </p>
          </div>

          <div className="bg-white border border-[#e3bdc3]/70 rounded-lg p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#b0004a]">Direct Inquiries</span>
              <CheckCircle2 className="w-4 h-4 text-[#00662c]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#1b1c1c]">
              WhatsApp Video Viewing
            </h4>
            <p className="text-xs text-[#5a4044] leading-relaxed">
              Can't visit Kumthekar Road today? View any saree live on WhatsApp video call.
            </p>
          </div>

          <div className="bg-white border border-[#e3bdc3]/70 rounded-lg p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#b0004a]">Reliable Delivery</span>
              <CheckCircle2 className="w-4 h-4 text-[#00662c]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#1b1c1c]">
              Safe Courier Dispatch
            </h4>
            <p className="text-xs text-[#5a4044] leading-relaxed">
              Carefully packed sarees dispatched with tracking across Pune and all over India.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
