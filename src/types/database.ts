/**
 * Database schema and types for Tejaswini Silk
 * Matches the Supabase 'sarees' table definition
 */

export interface DbSaree {
  id: string;
  name: string;
  marathi_name?: string | null;
  category: string;
  fabric: string; // 'Pure Silk' | 'Art Silk' | 'Cotton' | 'Silk Blend'
  price_inr: number;
  length: string; // '5.5 m' | '6.3 m (with blouse piece)' | '9-Yard (Nauvari - 8.2 m)'
  colour: string;
  description: string;
  blouse_details?: string | null;
  care_instructions?: string | string[] | null;
  is_new_arrival: boolean;
  is_featured: boolean;
  in_stock: boolean;
  images: string[]; // Array of public URLs; images[0] is the cover
  created_at?: string;
}

export type SareeInsert = Omit<DbSaree, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type SareeUpdate = Partial<SareeInsert>;
