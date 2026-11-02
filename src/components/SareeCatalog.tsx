import React, { useState, useMemo } from 'react';
import { DbSaree } from '../types/database';
import { SareeCard } from './SareeCard';
import { Search, SlidersHorizontal, RotateCcw, PackageSearch } from 'lucide-react';
import { SHOP_CATEGORIES, FABRICS } from '../config/shop';

interface SareeCatalogProps {
  sarees: DbSaree[];
  isLoading?: boolean;
  wishlistIds: string[];
  initialCategory?: string;
  onToggleWishlist: (saree: DbSaree) => void;
  onQuickView: (saree: DbSaree) => void;
  onAddToCart: (saree: DbSaree) => void;
}

export const SareeCatalog: React.FC<SareeCatalogProps> = ({
  sarees,
  isLoading = false,
  wishlistIds,
  initialCategory = 'all',
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedColour, setSelectedColour] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  // React to initialCategory changes (e.g. from header dropdown)
  React.useEffect(() => {
    if (initialCategory && initialCategory !== 'all') {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Extract unique colours from sarees
  const availableColours = useMemo(() => {
    const set = new Set<string>();
    sarees.forEach((s) => {
      if (s.colour) {
        // take the first word or main name
        const clean = s.colour.split('(')[0].trim();
        if (clean) set.add(clean);
      }
    });
    return Array.from(set);
  }, [sarees]);

  // Price ranges
  const priceRanges: Array<{ id: string; label: string; min: number; max: number }> = [
    { id: 'all', label: 'All Prices', min: 0, max: Infinity },
    { id: 'under-25k', label: 'Under ₹25,000', min: 0, max: 25000 },
    { id: '25k-50k', label: '₹25,000 – ₹50,000', min: 25000, max: 50000 },
    { id: '50k-80k', label: '₹50,000 – ₹80,000', min: 50000, max: 80000 },
    { id: 'above-80k', label: 'Above ₹80,000', min: 80000, max: Infinity }
  ];

  // Filtering & Sorting Logic
  const filteredSarees = useMemo(() => {
    return sarees
      .filter((saree) => {
        // Category
        if (selectedCategory !== 'all' && saree.category !== selectedCategory) {
          return false;
        }
        // Fabric
        if (selectedFabric !== 'all' && saree.fabric !== selectedFabric) {
          return false;
        }
        // Price Range
        if (selectedPriceRange !== 'all') {
          const range = priceRanges.find((r) => r.id === selectedPriceRange);
          if (range && (saree.price_inr < range.min || saree.price_inr > range.max)) {
            return false;
          }
        }
        // Colour
        if (selectedColour !== 'all' && !saree.colour.toLowerCase().includes(selectedColour.toLowerCase())) {
          return false;
        }
        // In Stock Only
        if (inStockOnly && !saree.in_stock) {
          return false;
        }
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            saree.name.toLowerCase().includes(q) ||
            (saree.marathi_name && saree.marathi_name.toLowerCase().includes(q)) ||
            saree.category.toLowerCase().includes(q) ||
            saree.colour.toLowerCase().includes(q) ||
            saree.fabric.toLowerCase().includes(q) ||
            saree.description.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.price_inr - b.price_inr;
        }
        if (sortBy === 'price-desc') {
          return b.price_inr - a.price_inr;
        }
        // 'newest' default
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
  }, [sarees, selectedCategory, selectedFabric, selectedPriceRange, selectedColour, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFabric('all');
    setSelectedPriceRange('all');
    setSelectedColour('all');
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('newest');
  };

  const isFiltered =
    selectedCategory !== 'all' ||
    selectedFabric !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedColour !== 'all' ||
    inStockOnly ||
    searchQuery !== '';

  return (
    <section id="catalog" className="py-16 bg-[#fbf9f8] border-t border-[#e3bdc3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b0004a] mb-2">
              <span>Kumthekar Road Showroom</span>
              <span aria-hidden="true">·</span>
              <span>Pune</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1b1c1c] tracking-tight">
              Curated Saree Catalog
            </h2>
            <p className="text-sm text-[#5a4044] mt-1.5 max-w-xl font-normal">
              Browse our authentic Paithanis, pure silks, 9-yard Nauvaris, and bridal collections. Enquire on WhatsApp for instant videos or doorstep booking.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#805062]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sarees, colours, fabrics..."
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a] text-[#1b1c1c] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#805062] hover:text-[#b0004a]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Master Category Horizontal Tabs */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#b0004a] text-white shadow-sm'
                  : 'bg-white text-[#5a4044] border border-[#e3bdc3]/70 hover:border-[#b0004a] hover:text-[#b0004a]'
              }`}
            >
              All Categories ({sarees.length})
            </button>
            {SHOP_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              const count = sarees.filter((s) => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#b0004a] text-white shadow-sm'
                      : 'bg-white text-[#5a4044] border border-[#e3bdc3]/70 hover:border-[#b0004a] hover:text-[#b0004a]'
                  }`}
                >
                  {cat} {count > 0 && <span className="opacity-70 text-[11px]">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter Controls Bar (Fabric, Price, Colour, Sort) */}
        <div className="p-3.5 bg-[#f6f3f2] border border-[#e3bdc3]/60 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs mb-8">
          
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-semibold text-[#805062] flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter by:
            </span>

            {/* Fabric */}
            <select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
              className="bg-white border border-[#e3bdc3] rounded px-2.5 py-1.5 text-xs text-[#1b1c1c] focus:outline-none focus:border-[#b0004a]"
            >
              <option value="all">All Fabrics</option>
              {FABRICS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>

            {/* Price Range */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="bg-white border border-[#e3bdc3] rounded px-2.5 py-1.5 text-xs text-[#1b1c1c] focus:outline-none focus:border-[#b0004a]"
            >
              {priceRanges.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>

            {/* Colour */}
            {availableColours.length > 0 && (
              <select
                value={selectedColour}
                onChange={(e) => setSelectedColour(e.target.value)}
                className="bg-white border border-[#e3bdc3] rounded px-2.5 py-1.5 text-xs text-[#1b1c1c] focus:outline-none focus:border-[#b0004a]"
              >
                <option value="all">All Colours</option>
                {availableColours.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}

            {/* In Stock Toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer ml-1 text-[#5a4044]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#b0004a] focus:ring-[#b0004a]"
              />
              <span>In Stock Only</span>
            </label>

            {isFiltered && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-[#b0004a] hover:underline font-semibold ml-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Sort & Result Count */}
          <div className="flex items-center gap-3">
            <span className="text-[#805062] tabular-nums hidden sm:inline">
              Showing <strong className="text-[#1b1c1c]">{filteredSarees.length}</strong> sarees
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#e3bdc3] rounded px-3 py-1.5 text-xs text-[#1b1c1c] focus:outline-none focus:border-[#b0004a]"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="bg-white border border-[#e3bdc3]/60 rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-[#f0eded]" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-[#f0eded] rounded w-1/3" />
                  <div className="h-6 bg-[#f0eded] rounded w-3/4" />
                  <div className="h-4 bg-[#f0eded] rounded w-full" />
                  <div className="pt-3 border-t border-[#f0eded] flex justify-between">
                    <div className="h-6 bg-[#f0eded] rounded w-20" />
                    <div className="h-6 bg-[#f0eded] rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredSarees.length > 0 ? (
          /* 3-Column Luxury Product Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredSarees.map((saree) => (
              <SareeCard
                key={saree.id}
                saree={saree}
                isWishlisted={wishlistIds.includes(saree.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          /* Friendly Empty State */
          <div className="py-16 text-center bg-white border border-[#e3bdc3] rounded-lg p-8 max-w-md mx-auto space-y-4">
            <PackageSearch className="w-12 h-12 text-[#e3bdc3] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#1b1c1c]">
              No Sarees Found
            </h3>
            <p className="text-xs sm:text-sm text-[#5a4044]">
              We couldn't find any sarees matching your selected filters. Try resetting the filters or enquire directly on WhatsApp.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#b0004a] rounded hover:bg-[#90003b] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
