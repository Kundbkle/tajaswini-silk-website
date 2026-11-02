import React, { useState } from 'react';
import { Compass, Sparkles, Shield } from 'lucide-react';

export const DrapeStudio: React.FC<{ onExploreCategory?: (category: string) => void }> = ({ onExploreCategory }) => {
  const [selectedDrape, setSelectedDrape] = useState<'nauvari' | 'peshwai' | 'nivi'>('nauvari');
  const [activeMotif, setActiveMotif] = useState<string>('bangadi-mor');

  const drapeStyles = [
    {
      id: 'nauvari' as const,
      name: 'Nauvari (9-Yard Kashta Drape)',
      marathi: 'पारंपरिक नऊवारी (काष्ठा) नेसण',
      era: 'Traditional Maharashtrian Bridal',
      description: 'The iconic 9-yard drape worn by brides and families across Maharashtra. The fabric passes between the legs and pleats are securely tucked at the back (kashta), combining traditional majesty with effortless mobility.',
      bestFor: 'Wedding Muhurat & Sakharpuda',
      sareeLength: '9 Yards (8.2 Meters)',
      pleatStyle: 'Back-Tucked Kashta + Front Fan Pleats',
      image: '/images/hero_paithani_bridal_1793599014021.jpg'
    },
    {
      id: 'peshwai' as const,
      name: 'Royal Peshwai Seedha Pallu',
      marathi: 'शाही पेशवाई सीधा पदर',
      era: 'Historic Shaniwar Wada Influence',
      description: 'Draped with the rich zari pallu brought over the right shoulder to rest across the front, displaying the exquisite peacock and parrot motifs to full effect.',
      bestFor: 'Gaurihar Pujan & Antarpat',
      sareeLength: '6.3 Meters with Blouse Piece',
      pleatStyle: 'Front Display Draped Pallu',
      image: '/images/saree_royal_purple_gold_1793599015840.jpg'
    },
    {
      id: 'nivi' as const,
      name: 'Classic Nivi 6-Yard Elegance',
      marathi: 'अभिजात निवी नेसण',
      era: 'Contemporary & Reception Elegance',
      description: 'Clean knife pleats at the waist with an elongated shoulder pallu that cascades fluidly, highlighting the natural sheen of pure silk yarn.',
      bestFor: 'Reception & Festive Celebrations',
      sareeLength: '6.3 Meters',
      pleatStyle: 'Shoulder Cascade & Waist Pleats',
      image: '/images/saree_emerald_mor_pallu_1793599015334.jpg'
    }
  ];

  const motifs = [
    {
      id: 'bangadi-mor',
      name: 'Bangadi Mor (Peacock in Bangle)',
      marathi: 'बांगडी मोर',
      symbolism: 'Auspicious Joy & Bridal Beauty',
      detail: 'A peacock perched inside a circular bangle (bangadi). Woven into Paithani pallus as an enduring symbol of grace, loyalty, and celebration.'
    },
    {
      id: 'asawali',
      name: 'Asawali (Flowering Vine)',
      marathi: 'असावली वेल',
      symbolism: 'Abundance & Peshwai Heritage',
      detail: 'An undulating vine bearing blossomed lotuses and buds, rooted in historic Pune architectural carvings and traditional textile motifs.'
    },
    {
      id: 'narali',
      name: 'Narali (Coconut) Border',
      marathi: 'नारळी काठ',
      symbolism: 'Protection & Auspicious Beginnings',
      detail: 'Triangular serrated geometric patterns resembling coconuts, traditional across Western Maharashtra borders.'
    },
    {
      id: 'munia',
      name: 'Muniya (Parrot)',
      marathi: 'मुनिया / पोपट',
      symbolism: 'Cheer, Devotion & Natural Grace',
      detail: 'Parrots woven along the selvage borders in contrasting green and red silk accents, framing the saree body.'
    }
  ];

  const currentDrape = drapeStyles.find((d) => d.id === selectedDrape)!;
  const currentMotif = motifs.find((m) => m.id === activeMotif)!;

  return (
    <section id="drape-studio" className="py-16 bg-[#ffffff] border-t border-[#e3bdc3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b0004a] mb-2">
            <Compass className="w-3.5 h-3.5 text-[#b0004a]" />
            <span>Maharashtrian Traditions</span>
            <span aria-hidden="true">·</span>
            <span>Kumthekar Road</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1b1c1c] tracking-tight">
            Traditional Drape Guide & Motifs
          </h2>
          <p className="text-sm sm:text-base text-[#5a4044] mt-2 font-normal">
            Understand traditional draping styles and the cultural significance behind iconic Paithani motifs.
          </p>
        </div>

        {/* Drape Selector Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {drapeStyles.map((drape) => {
            const active = selectedDrape === drape.id;
            return (
              <button
                key={drape.id}
                onClick={() => setSelectedDrape(drape.id)}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#b0004a] text-white shadow-md'
                    : 'bg-[#f6f3f2] text-[#5a4044] hover:bg-[#ffd9de]/50 hover:text-[#b0004a]'
                }`}
              >
                {drape.name}
              </button>
            );
          })}
        </div>

        {/* Drape Preview Card */}
        <div className="bg-[#fbf9f8] border border-[#e3bdc3] rounded-lg overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 mb-14">
          
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto bg-[#f0eded]">
            <img
              src={currentDrape.image}
              alt={currentDrape.name}
              width="800"
              height="600"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-bold text-[#b0004a] border border-[#e3bdc3]">
              {currentDrape.era}
            </div>
          </div>

          {/* Drape Specifications & Notes */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="font-devanagari text-base font-semibold text-[#b0004a]">
                  {currentDrape.marathi}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1b1c1c]">
                  {currentDrape.name}
                </h3>
              </div>

              <p className="text-sm text-[#5a4044] leading-relaxed">
                {currentDrape.description}
              </p>

              {/* Spec Checklist */}
              <div className="pt-2 space-y-2.5 border-t border-[#e3bdc3]/60 text-xs text-[#1b1c1c]">
                <div className="flex items-center justify-between py-1 border-b border-[#e3bdc3]/30">
                  <span className="text-[#805062] font-medium">Fabric Requirement:</span>
                  <span className="font-semibold">{currentDrape.sareeLength}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#e3bdc3]/30">
                  <span className="text-[#805062] font-medium">Pleating Structure:</span>
                  <span className="font-semibold">{currentDrape.pleatStyle}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#e3bdc3]/30">
                  <span className="text-[#805062] font-medium">Recommended For:</span>
                  <span className="font-semibold text-[#b0004a]">{currentDrape.bestFor}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (onExploreCategory) {
                    onExploreCategory(selectedDrape === 'nauvari' ? '9-Yard Paithani' : 'Paithani Pure Silk');
                  }
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#b0004a] hover:bg-[#90003b] rounded transition-colors cursor-pointer"
              >
                Browse Sarees in this Style
              </button>
            </div>

          </div>

        </div>

        {/* Motif Explorer */}
        <div>
          <div className="mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b1c1c]">
              Paithani Motif Meanings
            </h3>
            <p className="text-xs text-[#5a4044] mt-0.5">
              Select a traditional motif to explore its auspicious Maharashtrian heritage.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {motifs.map((motif) => {
              const active = activeMotif === motif.id;
              return (
                <button
                  key={motif.id}
                  onClick={() => setActiveMotif(motif.id)}
                  className={`p-3.5 text-left rounded-lg border transition-all cursor-pointer ${
                    active
                      ? 'bg-white border-[#b0004a] shadow-sm ring-1 ring-[#b0004a]'
                      : 'bg-[#f6f3f2] border-[#e3bdc3]/70 hover:bg-white text-[#5a4044]'
                  }`}
                >
                  <div className="font-devanagari text-xs text-[#b0004a] font-semibold mb-0.5">
                    {motif.marathi}
                  </div>
                  <div className="font-serif text-sm font-bold text-[#1b1c1c] line-clamp-1">
                    {motif.name}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-[#fbf9f8] border border-[#e3bdc3] rounded-lg p-6 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c59b27]" />
              <span className="font-serif text-lg font-bold text-[#1b1c1c]">
                {currentMotif.name} ({currentMotif.marathi})
              </span>
            </div>
            <p className="text-sm text-[#5a4044] leading-relaxed">
              {currentMotif.detail}
            </p>
            <div className="text-xs text-[#805062] pt-1">
              <strong className="text-[#1b1c1c]">Significance: </strong>
              {currentMotif.symbolism}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
