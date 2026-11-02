import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DbSaree, SareeInsert, SareeUpdate } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('YOUR_SUPABASE')
);

// Create Supabase client if configured, else null or dummy client
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial starter seed data used when Supabase is not connected yet
export const STARTER_SAREES: DbSaree[] = [
  {
    id: 'rani-pink-maharani-paithani',
    name: 'Rani Pink Maharani Mor-Bangadi Paithani',
    marathi_name: 'राणी गुलाबी मोर-बांगडी पैठणी',
    category: 'Paithani Pure Silk',
    fabric: 'Pure Silk',
    price_inr: 48500,
    length: '6.3 m (with blouse piece)',
    colour: 'Rani Pink (गुलाबी)',
    description: 'Signature bridal Paithani handwoven with traditional peacock in bangle (Mor-Bangadi) motifs on the grand zari pallu. Perfect for Maharashtrian wedding Muhurat, Antarpat and Saptapadi.',
    blouse_details: '85 cm unstitched pure silk blouse piece with running zari border included.',
    care_instructions: 'Strictly dry clean only. Store wrapped in pure unbleached cotton muslin cloth.',
    is_new_arrival: true,
    is_featured: true,
    in_stock: true,
    images: [
      '/images/saree_rani_pink_peacock_1793599014522.jpg',
      '/images/hero_paithani_bridal_1793599014021.jpg'
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  },
  {
    id: 'emerald-peshwai-asawali',
    name: 'Emerald Green Royal Peshwai Asawali Paithani',
    marathi_name: 'हिरवी पेशवाई असावली पैठणी',
    category: 'Paithani Pure Silk',
    fabric: 'Pure Silk',
    price_inr: 54000,
    length: '6.3 m (with blouse piece)',
    colour: 'Emerald Green (हिरवा)',
    description: 'Regal forest emerald green pure silk with historic Peshwai Asawali flowering vine borders and twin peacock medallions. Auspicious for Sakharpuda (Engagement) and festive rituals.',
    blouse_details: '90 cm contrast zari brocade blouse piece included.',
    care_instructions: 'Dry clean only. Refold along pleats every few months to preserve zari lustre.',
    is_new_arrival: true,
    is_featured: true,
    in_stock: true,
    images: [
      '/images/saree_emerald_mor_pallu_1793599015334.jpg',
      '/images/craft_handloom_loom_pune_1793599014955.jpg'
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
  },
  {
    id: 'jamuni-antique-zari-royal',
    name: 'Shahi Jamuni Antique Zari Paithani',
    marathi_name: 'शाही जांभळी पुरातन जरी पैठणी',
    category: 'Wedding / Bridal',
    fabric: 'Pure Silk',
    price_inr: 62000,
    length: '6.3 m (with blouse piece)',
    colour: 'Royal Purple (जांभळा)',
    description: 'Deep royal purple body adorned with fine gold buttis and an opulent antique gold zari pallu. An aristocratic choice for grand wedding receptions and Gaurihar Pujan.',
    blouse_details: '1 m heavy pure silk blouse fabric with matching sleeve zari borders.',
    care_instructions: 'Dry clean only. Keep away from direct perfumes and moisture.',
    is_new_arrival: false,
    is_featured: true,
    in_stock: true,
    images: [
      '/images/saree_royal_purple_gold_1793599015840.jpg'
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString()
  },
  {
    id: 'nauvari-traditional-kashta-pink',
    name: 'Paramparik 9-Yard Nauvari Bridal Paithani',
    marathi_name: 'पारंपरिक नऊवारी काष्ठा पैठणी',
    category: '9-Yard Paithani',
    fabric: 'Pure Silk',
    price_inr: 58000,
    length: '9-Yard (Nauvari - 8.2 m)',
    colour: 'Magenta & Gold (राणी जांभळी)',
    description: 'Authentic 9-yard (Nauvari) pure silk Paithani crafted specifically for the traditional Maharashtrian Kashta drape. Holds crisp pleats effortlessly and flows regally.',
    blouse_details: 'Includes separate matching blouse length.',
    care_instructions: 'Dry clean only. Wrap in muslin cloth.',
    is_new_arrival: true,
    is_featured: true,
    in_stock: true,
    images: [
      '/images/hero_paithani_bridal_1793599014021.jpg',
      '/images/saree_rani_pink_peacock_1793599014522.jpg'
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
  }
];

// Helper functions for data access
export async function getSarees(): Promise<DbSaree[]> {
  if (!isSupabaseConfigured || !supabase) {
    // Return local storage or starter seed
    const local = localStorage.getItem('tejaswini_local_sarees');
    if (local) {
      try {
        return JSON.parse(local);
      } catch {
        return STARTER_SAREES;
      }
    }
    return STARTER_SAREES;
  }

  const { data, error } = await supabase
    .from('sarees')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching sarees from Supabase:', error.message);
    throw error;
  }

  return data as DbSaree[];
}

export async function getSareeById(id: string): Promise<DbSaree | null> {
  if (!isSupabaseConfigured || !supabase) {
    const all = await getSarees();
    return all.find((s) => s.id === id) || null;
  }

  const { data, error } = await supabase
    .from('sarees')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching saree ${id}:`, error.message);
    return null;
  }

  return data as DbSaree;
}

export async function createSaree(saree: SareeInsert): Promise<DbSaree> {
  const newSaree: DbSaree = {
    id: saree.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `saree-${Date.now()}`),
    ...saree,
    created_at: saree.created_at || new Date().toISOString()
  };

  if (!isSupabaseConfigured || !supabase) {
    const current = await getSarees();
    const updated = [newSaree, ...current];
    localStorage.setItem('tejaswini_local_sarees', JSON.stringify(updated));
    return newSaree;
  }

  const { data, error } = await supabase
    .from('sarees')
    .insert([newSaree])
    .select()
    .single();

  if (error) {
    console.error('Error inserting saree into Supabase:', error.message);
    throw error;
  }

  return data as DbSaree;
}

export async function updateSaree(id: string, updates: SareeUpdate): Promise<DbSaree> {
  if (!isSupabaseConfigured || !supabase) {
    const current = await getSarees();
    const updated = current.map((s) => (s.id === id ? { ...s, ...updates } : s));
    localStorage.setItem('tejaswini_local_sarees', JSON.stringify(updated));
    const target = updated.find((s) => s.id === id);
    if (!target) throw new Error('Saree not found');
    return target;
  }

  const { data, error } = await supabase
    .from('sarees')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating saree ${id}:`, error.message);
    throw error;
  }

  return data as DbSaree;
}

export async function deleteSaree(id: string, imageUrls?: string[]): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    const current = await getSarees();
    const updated = current.filter((s) => s.id !== id);
    localStorage.setItem('tejaswini_local_sarees', JSON.stringify(updated));
    return;
  }

  // Delete associated images in Supabase Storage if any
  if (imageUrls && imageUrls.length > 0) {
    try {
      const pathsToDelete: string[] = [];
      for (const url of imageUrls) {
        if (url.includes('/saree-images/')) {
          const parts = url.split('/saree-images/');
          if (parts[1]) pathsToDelete.push(decodeURIComponent(parts[1]));
        }
      }
      if (pathsToDelete.length > 0) {
        await supabase.storage.from('saree-images').remove(pathsToDelete);
      }
    } catch (e) {
      console.warn('Storage cleanup non-fatal error:', e);
    }
  }

  const { error } = await supabase.from('sarees').delete().eq('id', id);
  if (error) {
    console.error(`Error deleting saree ${id}:`, error.message);
    throw error;
  }
}

/**
 * Uploads an image file to Supabase Storage bucket 'saree-images'
 * Returns the public URL of the uploaded image
 */
export async function uploadSareeImage(file: Blob, fileName: string): Promise<string> {
  if (!isSupabaseConfigured || !supabase) {
    // When Supabase is not connected in demo mode, convert blob to local object URL or data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  const cleanName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const { data, error } = await supabase.storage
    .from('saree-images')
    .upload(cleanName, file, {
      contentType: file.type || 'image/jpeg',
      upsert: true
    });

  if (error) {
    console.error('Storage upload error:', error.message);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from('saree-images')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
