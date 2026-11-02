import React, { useState, useEffect, useRef } from 'react';
import { DbSaree, SareeInsert } from '../types/database';
import {
  supabase,
  isSupabaseConfigured,
  getSarees,
  createSaree,
  updateSaree,
  deleteSaree,
  uploadSareeImage
} from '../lib/supabase';
import { compressImage } from '../utils/imageCompression';
import { SHOP_CONFIG, SHOP_CATEGORIES, FABRICS, LENGTH_OPTIONS } from '../config/shop';
import {
  Lock,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Camera,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Eye,
  Star,
  Sparkles,
  ArrowUpDown,
  MoveLeft,
  MoveRight,
  X,
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';

interface LocalPhotoItem {
  id: string;
  blob?: Blob;
  previewUrl: string;
  isExistingUrl?: boolean;
}

export const AdminPage: React.FC = () => {
  // Auth state
  const [session, setSession] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Products state
  const [sarees, setSarees] = useState<DbSaree[]>([]);
  const [loadingSarees, setLoadingSarees] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSareeId, setEditingSareeId] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [marathiName, setMarathiName] = useState('');
  const [category, setCategory] = useState<string>(SHOP_CATEGORIES[0]);
  const [fabric, setFabric] = useState<string>(FABRICS[0]);
  const [priceInr, setPriceInr] = useState<number | ''>('');
  const [length, setLength] = useState<string>(LENGTH_OPTIONS[1]);
  const [colour, setColour] = useState('');
  const [description, setDescription] = useState('');
  const [blouseDetails, setBlouseDetails] = useState('');
  const [careInstructions, setCareInstructions] = useState('');
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [inStock, setInStock] = useState(true);

  // Photos for upload / reorder
  const [photos, setPhotos] = useState<LocalPhotoItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Check auth session
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      // In demo / fallback mode, simulate local session if remembered
      const localAdmin = localStorage.getItem('tejaswini_admin_demo_logged_in');
      if (localAdmin === 'true') {
        setSession({ user: { email: 'owner@tejaswinisilk.com' } });
      }
      setAuthChecking(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthChecking(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthChecking(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch products when session is present
  useEffect(() => {
    if (session) {
      loadProducts();
    }
  }, [session]);

  const loadProducts = async () => {
    setLoadingSarees(true);
    try {
      const data = await getSarees();
      setSarees(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingSarees(false);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      // Demo login
      if (email && password) {
        localStorage.setItem('tejaswini_admin_demo_logged_in', 'true');
        setSession({ user: { email } });
      } else {
        setAuthError('Please enter an email and password.');
      }
      setAuthLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        setAuthError(error.message);
      } else {
        setSession(data.session);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Login failed');
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('tejaswini_admin_demo_logged_in');
    setSession(null);
  };

  // Open Form to Add New
  const handleOpenAddForm = () => {
    setEditingSareeId(null);
    setName('');
    setMarathiName('');
    setCategory(SHOP_CATEGORIES[0]);
    setFabric(FABRICS[0]);
    setPriceInr('');
    setLength(LENGTH_OPTIONS[1]);
    setColour('');
    setDescription('');
    setBlouseDetails('');
    setCareInstructions('Strictly dry clean only. Store wrapped in unbleached pure cotton muslin cloth.');
    setIsNewArrival(true);
    setIsFeatured(false);
    setInStock(true);
    setPhotos([]);
    setFormError(null);
    setFormSuccess(null);
    setIsFormOpen(true);
  };

  // Open Form to Edit Existing
  const handleOpenEditForm = (saree: DbSaree) => {
    setEditingSareeId(saree.id);
    setName(saree.name);
    setMarathiName(saree.marathi_name || '');
    setCategory(saree.category);
    setFabric(saree.fabric);
    setPriceInr(saree.price_inr);
    setLength(saree.length);
    setColour(saree.colour);
    setDescription(saree.description);
    setBlouseDetails(saree.blouse_details || '');
    setCareInstructions(
      Array.isArray(saree.care_instructions)
        ? saree.care_instructions.join('\n')
        : (saree.care_instructions || '')
    );
    setIsNewArrival(saree.is_new_arrival);
    setIsFeatured(saree.is_featured);
    setInStock(saree.in_stock);

    const existingPhotos: LocalPhotoItem[] = (saree.images || []).map((url, i) => ({
      id: `existing-${i}`,
      previewUrl: url,
      isExistingUrl: true
    }));
    setPhotos(existingPhotos);

    setFormError(null);
    setFormSuccess(null);
    setIsFormOpen(true);
  };

  // Handle Photo selection from Gallery or Camera
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadProgress(`Compressing ${files.length} photo(s)...`);

    try {
      const compressedItems: LocalPhotoItem[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Compress and resize browser-side to max 1600px width/height, ~80% quality
        const res = await compressImage(file, 1600, 1600, 0.8);
        compressedItems.push({
          id: `new-${Date.now()}-${i}`,
          blob: res.blob,
          previewUrl: res.previewUrl,
          isExistingUrl: false
        });
      }
      setPhotos((prev) => [...prev, ...compressedItems]);
      setUploadProgress(null);
    } catch (err: any) {
      console.error(err);
      setFormError('Failed to process one or more photos.');
      setUploadProgress(null);
    }

    // Reset input value so same files can be re-selected if needed
    e.target.value = '';
  };

  // Reorder photos: move index
  const handleMovePhoto = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= photos.length) return;
    setPhotos((prev) => {
      const copy = [...prev];
      const item = copy.splice(fromIndex, 1)[0];
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  // Set a photo as Cover (move to position 0)
  const handleSetCover = (index: number) => {
    if (index === 0) return;
    handleMovePhoto(index, 0);
  };

  // Remove photo from list
  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Save Saree (Add or Update)
  const handleSaveSaree = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // Validation
    if (!name.trim()) {
      setFormError('Please enter the Saree Name.');
      return;
    }
    if (!category) {
      setFormError('Please select a Category.');
      return;
    }
    if (!priceInr || Number(priceInr) <= 0) {
      setFormError('Please enter a valid Price in INR.');
      return;
    }
    if (photos.length === 0) {
      setFormError('Please upload at least one photo of the saree.');
      return;
    }

    setFormSubmitting(true);
    setUploadProgress('Uploading photos to secure storage...');

    try {
      const finalImageUrls: string[] = [];

      for (let i = 0; i < photos.length; i++) {
        const item = photos[i];
        if (item.isExistingUrl) {
          finalImageUrls.push(item.previewUrl);
        } else if (item.blob) {
          setUploadProgress(`Uploading photo ${i + 1} of ${photos.length}...`);
          const url = await uploadSareeImage(item.blob, `${name.slice(0, 20)}_${i}.webp`);
          finalImageUrls.push(url);
        }
      }

      setUploadProgress('Saving saree record to database...');

      const payload: SareeInsert = {
        name: name.trim(),
        marathi_name: marathiName.trim() || null,
        category,
        fabric,
        price_inr: Number(priceInr),
        length,
        colour: colour.trim() || 'Multicolour',
        description: description.trim(),
        blouse_details: blouseDetails.trim() || null,
        care_instructions: careInstructions.trim() || null,
        is_new_arrival: isNewArrival,
        is_featured: isFeatured,
        in_stock: inStock,
        images: finalImageUrls
      };

      if (editingSareeId) {
        await updateSaree(editingSareeId, payload);
        setFormSuccess('Saree updated successfully!');
      } else {
        await createSaree(payload);
        setFormSuccess('New saree added to catalog successfully!');
      }

      await loadProducts();
      setTimeout(() => {
        setIsFormOpen(false);
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || 'Failed to save saree. Check database connection.');
    } finally {
      setFormSubmitting(false);
      setUploadProgress(null);
    }
  };

  // Toggle In Stock status with one tap
  const handleToggleStock = async (saree: DbSaree) => {
    try {
      const updated = !saree.in_stock;
      await updateSaree(saree.id, { in_stock: updated });
      setSarees((prev) =>
        prev.map((s) => (s.id === saree.id ? { ...s, in_stock: updated } : s))
      );
    } catch (err: any) {
      alert(`Failed to update stock: ${err.message}`);
    }
  };

  // Toggle New Arrival with one tap
  const handleToggleNewArrival = async (saree: DbSaree) => {
    try {
      const updated = !saree.is_new_arrival;
      await updateSaree(saree.id, { is_new_arrival: updated });
      setSarees((prev) =>
        prev.map((s) => (s.id === saree.id ? { ...s, is_new_arrival: updated } : s))
      );
    } catch (err: any) {
      alert(`Failed to update New Arrival status: ${err.message}`);
    }
  };

  // Delete saree with confirmation
  const handleDeleteSaree = async (saree: DbSaree) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${saree.name}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      await deleteSaree(saree.id, saree.images);
      setSarees((prev) => prev.filter((s) => s.id !== saree.id));
    } catch (err: any) {
      alert(`Failed to delete saree: ${err.message}`);
    }
  };

  // Filtered sarees list for search
  const displayedSarees = sarees.filter((s) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.marathi_name && s.marathi_name.toLowerCase().includes(q)) ||
      s.category.toLowerCase().includes(q) ||
      s.colour.toLowerCase().includes(q)
    );
  });

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbf9f8]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b0004a]" />
      </div>
    );
  }

  // LOGIN SCREEN
  if (!session) {
    return (
      <div className="min-h-screen bg-[#fbf9f8] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
          <img
            src="/logo.png"
            alt={SHOP_CONFIG.name}
            width="64"
            height="64"
            className="w-16 h-16 object-contain mx-auto"
            onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
          />
          <h2 className="font-serif text-3xl font-bold text-[#1b1c1c]">
            {SHOP_CONFIG.name} Owner Portal
          </h2>
          <p className="font-devanagari text-sm text-[#805062]">
            {SHOP_CONFIG.tagline}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-xl border border-[#e3bdc3] rounded-lg sm:px-10 space-y-6">
            
            {!isSupabaseConfigured && (
              <div className="p-3.5 bg-[#ffd9de]/40 border border-[#e3bdc3] rounded text-xs space-y-1 text-[#5a4044]">
                <div className="font-bold text-[#b0004a] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Demo Mode Active</span>
                </div>
                <p>
                  To connect your real database, add <code className="font-mono bg-white px-1">VITE_SUPABASE_URL</code> and <code className="font-mono bg-white px-1">VITE_SUPABASE_ANON_KEY</code> to your environment. You can enter any email/password to test locally.
                </p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                  Owner Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@tejaswinisilk.com"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                />
              </div>

              {authError && (
                <div className="p-3 bg-[#ffdad6] text-[#ba1a1a] text-xs rounded border border-[#ffdad6] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#b0004a] hover:bg-[#90003b] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Lock className="w-4 h-4" />
                <span>{authLoading ? 'Signing In...' : 'Sign In to Admin'}</span>
              </button>
            </form>

            <div className="pt-2 text-center">
              <a href="/" className="text-xs text-[#805062] hover:text-[#b0004a]">
                ← Return to Public Website
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // LOGGED-IN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c]">
      
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#e3bdc3] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Logo"
              width="32"
              height="32"
              className="w-8 h-8 object-contain"
              onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
            />
            <div>
              <span className="font-serif font-bold text-base text-[#b0004a]">
                Tejaswini Admin
              </span>
              <span className="hidden sm:inline text-xs text-[#805062] ml-2">
                Kumthekar Road Catalog Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-[#5a4044] hover:text-[#b0004a]"
            >
              <span>View Live Store</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-[#805062] hover:text-[#ba1a1a] border border-[#e3bdc3] rounded flex items-center gap-1.5 hover:bg-[#ffdad6]/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Phone Action Bar: Add Saree Button & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-[#e3bdc3] shadow-xs">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1b1c1c]">
              Catalog Inventory ({sarees.length})
            </h1>
            <p className="text-xs text-[#5a4044] mt-0.5">
              Add sarees directly from your phone with camera or photo gallery.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#805062]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search inventory..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-[#f6f3f2] border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
              />
            </div>

            <button
              onClick={handleOpenAddForm}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#b0004a] hover:bg-[#90003b] rounded flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Saree</span>
            </button>
          </div>
        </div>

        {/* Product Cards List (Phone-Optimized Card Grid) */}
        {loadingSarees ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#b0004a] mx-auto" />
            <p className="text-xs text-[#5a4044]">Loading catalog...</p>
          </div>
        ) : displayedSarees.length === 0 ? (
          <div className="py-16 text-center bg-white border border-[#e3bdc3] rounded-lg p-6 space-y-3">
            <p className="font-serif text-base font-bold text-[#1b1c1c]">No sarees found</p>
            <p className="text-xs text-[#5a4044]">Tap "+ Add Saree" to upload your first saree with photos.</p>
            <button
              onClick={handleOpenAddForm}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#b0004a] rounded hover:bg-[#90003b]"
            >
              Add Saree
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedSarees.map((saree) => {
              const cover = saree.images && saree.images.length > 0 ? saree.images[0] : '/images/hero_paithani_bridal_1793599014021.jpg';
              return (
                <div
                  key={saree.id}
                  className="bg-white border border-[#e3bdc3] rounded-lg overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Image Preview & Badges */}
                    <div className="relative aspect-[16/10] bg-[#f6f3f2] overflow-hidden">
                      <img
                        src={cover}
                        alt={saree.name}
                        width="400"
                        height="250"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span className="bg-black/75 text-white px-2 py-0.5 text-[10px] rounded font-semibold">
                          {saree.images?.length || 0} photo(s)
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <a
                          href={`/saree/${saree.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-white/90 text-[#5a4044] hover:text-[#b0004a] rounded-full shadow-sm block"
                          title="View on public site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Saree Info */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#805062]">
                        <span className="font-bold uppercase tracking-wider">{saree.category}</span>
                        <span>{saree.fabric}</span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-[#1b1c1c] line-clamp-1">
                        {saree.name}
                      </h3>

                      {saree.marathi_name && (
                        <div className="font-devanagari text-xs text-[#805062] line-clamp-1">
                          {saree.marathi_name}
                        </div>
                      )}

                      <div className="text-base font-bold text-[#b0004a] tabular-nums font-serif">
                        ₹{saree.price_inr.toLocaleString('en-IN')}
                      </div>

                      <p className="text-xs text-[#5a4044] line-clamp-2">
                        {saree.description}
                      </p>
                    </div>
                  </div>

                  {/* One-Tap Controls: Stock & New Arrival */}
                  <div className="p-3 bg-[#fbf9f8] border-t border-[#e3bdc3]/60 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {/* One-tap In Stock Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleStock(saree)}
                        className={`py-1.5 px-2 rounded font-semibold border text-center transition-colors cursor-pointer ${
                          saree.in_stock
                            ? 'bg-[#dbffdb] text-[#00662c] border-[#008239]/40'
                            : 'bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]/40'
                        }`}
                      >
                        {saree.in_stock ? '✓ In Stock' : '✕ Sold Out'}
                      </button>

                      {/* One-tap New Arrival Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleNewArrival(saree)}
                        className={`py-1.5 px-2 rounded font-semibold border text-center transition-colors cursor-pointer ${
                          saree.is_new_arrival
                            ? 'bg-[#ffd9de] text-[#b0004a] border-[#b0004a]/40'
                            : 'bg-white text-[#805062] border-[#e3bdc3]'
                        }`}
                      >
                        {saree.is_new_arrival ? '★ New Arrival' : 'Standard'}
                      </button>
                    </div>

                    {/* Edit & Delete Action Buttons */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={() => handleOpenEditForm(saree)}
                        className="text-[#b0004a] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Saree</span>
                      </button>

                      <button
                        onClick={() => handleDeleteSaree(saree)}
                        className="text-[#805062] hover:text-[#ba1a1a] flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* ADD / EDIT SAREE MODAL (PHONE-OPTIMIZED) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-[#e3bdc3] overflow-hidden max-h-[95vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-[#e3bdc3] flex items-center justify-between bg-[#fbf9f8]">
              <h2 className="font-serif text-lg font-bold text-[#1b1c1c]">
                {editingSareeId ? 'Edit Saree Details' : 'Add New Saree'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 text-[#5a4044] hover:text-[#b0004a] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveSaree} className="overflow-y-auto p-5 flex-1 space-y-4">
              
              {formError && (
                <div className="p-3 bg-[#ffdad6] text-[#ba1a1a] text-xs rounded border border-[#ffdad6] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="p-3 bg-[#dbffdb] text-[#00662c] text-xs rounded border border-[#008239]/30 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              {uploadProgress && (
                <div className="p-3 bg-[#ffd9de]/50 text-[#b0004a] text-xs rounded border border-[#b0004a]/30 flex items-center gap-2 animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                  <span>{uploadProgress}</span>
                </div>
              )}

              {/* Photo Upload Section (Phone-Optimized) */}
              <div className="p-4 bg-[#fbf9f8] border border-[#e3bdc3] rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1b1c1c]">
                    Saree Photos ({photos.length}) *
                  </label>
                  <span className="text-[11px] text-[#805062]">
                    First photo is the Cover
                  </span>
                </div>

                {/* Upload Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Native Camera input for mobile */}
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="py-2.5 px-3 bg-white border border-[#e3bdc3] hover:border-[#b0004a] rounded text-xs font-semibold text-[#1b1c1c] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-[#b0004a]" />
                    <span>Take Photo</span>
                  </button>
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFilesSelected}
                  />

                  {/* Gallery Multi-file input */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="py-2.5 px-3 bg-white border border-[#e3bdc3] hover:border-[#b0004a] rounded text-xs font-semibold text-[#1b1c1c] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4 text-[#b0004a]" />
                    <span>Choose from Gallery</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFilesSelected}
                  />
                </div>

                {/* Photo Previews with Reorder & Set as Cover */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    {photos.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`relative rounded border p-1 bg-white space-y-1 ${
                          idx === 0 ? 'border-[#b0004a] ring-2 ring-[#b0004a]/30' : 'border-[#e3bdc3]'
                        }`}
                      >
                        <div className="aspect-square bg-[#f6f3f2] rounded overflow-hidden relative">
                          <img
                            src={item.previewUrl}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {idx === 0 && (
                            <span className="absolute top-1 left-1 bg-[#b0004a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                              Cover
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full hover:bg-black"
                            title="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Reorder & Cover controls */}
                        <div className="flex items-center justify-between text-[10px] text-[#5a4044] px-0.5">
                          <div className="flex gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMovePhoto(idx, idx - 1)}
                              className="p-0.5 hover:text-[#b0004a] disabled:opacity-30"
                              title="Move Left"
                            >
                              <MoveLeft className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === photos.length - 1}
                              onClick={() => handleMovePhoto(idx, idx + 1)}
                              className="p-0.5 hover:text-[#b0004a] disabled:opacity-30"
                              title="Move Right"
                            >
                              <MoveRight className="w-3 h-3" />
                            </button>
                          </div>

                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetCover(idx)}
                              className="text-[#b0004a] hover:underline font-semibold"
                            >
                              Set Cover
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Basic Details: Name & Marathi Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                    Saree Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rani Pink Mor-Bangadi Paithani"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                    Marathi Name (मराठी नाव - Optional)
                  </label>
                  <input
                    type="text"
                    value={marathiName}
                    onChange={(e) => setMarathiName(e.target.value)}
                    placeholder="उदा. राणी गुलाबी मोर-बांगडी पैठणी"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a] font-devanagari"
                  />
                </div>
              </div>

              {/* Category, Fabric, Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                  >
                    {SHOP_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                    Fabric *
                  </label>
                  <select
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                  >
                    {FABRICS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={priceInr}
                    onChange={(e) => setPriceInr(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 48500"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a] font-mono"
                  />
                </div>
              </div>

              {/* Length & Colour */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                    Length
                  </label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                  >
                    {LENGTH_OPTIONS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                    Colour (रंग)
                  </label>
                  <input
                    type="text"
                    value={colour}
                    onChange={(e) => setColour(e.target.value)}
                    placeholder="e.g. Rani Pink / Emerald Green / Royal Purple"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the zari pallu, borders, weave, and recommended wedding rituals..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                />
              </div>

              {/* Blouse & Care */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                    Blouse Details
                  </label>
                  <input
                    type="text"
                    value={blouseDetails}
                    onChange={(e) => setBlouseDetails(e.target.value)}
                    placeholder="e.g. 85 cm unstitched pure silk blouse piece included"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1c] mb-1">
                    Care Instructions
                  </label>
                  <input
                    type="text"
                    value={careInstructions}
                    onChange={(e) => setCareInstructions(e.target.value)}
                    placeholder="e.g. Strictly dry clean only. Wrap in pure muslin cloth."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#e3bdc3] rounded focus:outline-none focus:border-[#b0004a]"
                  />
                </div>
              </div>

              {/* Toggles: In Stock & New Arrival */}
              <div className="p-3 bg-[#f6f3f2] rounded border border-[#e3bdc3] flex flex-wrap items-center gap-6 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="rounded text-[#00662c] focus:ring-[#00662c]"
                  />
                  <span className="font-semibold text-[#1b1c1c]">Available in Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="rounded text-[#b0004a] focus:ring-[#b0004a]"
                  />
                  <span className="font-semibold text-[#1b1c1c]">Mark as New Arrival</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-[#c59b27] focus:ring-[#c59b27]"
                  />
                  <span className="font-semibold text-[#1b1c1c]">Feature on Homepage</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex gap-3 border-t border-[#e3bdc3]/60">
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#b0004a] hover:bg-[#90003b] rounded transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {formSubmitting
                    ? 'Saving to Catalog...'
                    : editingSareeId
                    ? 'Update Saree Record'
                    : 'Publish Saree to Catalog'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="py-2.5 px-4 text-xs font-semibold text-[#5a4044] hover:text-[#1b1c1c] border border-[#e3bdc3] rounded"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
