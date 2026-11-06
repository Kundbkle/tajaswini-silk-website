/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tejaswini Silk - Master Shop Configuration
 * All business details, contact information, categories and WhatsApp helpers.
 * Used across header, footer, checkout, detail views, and SEO schemas.
 */

export const SHOP_CONFIG = {
  name: 'Tejaswini Silk',
  marathiName: 'तेजस्विनी सिल्क',
  tagline: 'स्त्रियांचे रूप उजळवणारी…',
  shortDescription: 'Pune’s cherished destination for authentic Paithani sarees, pure silk weaves, and bridal collections on Kumthekar Road.',

  // Owners & Contact details
  owners: [
    { name: 'Rajesh Trimal', phone: '9922441515', displayPhone: '+91 99224 41515' }
  ],
  whatsapp: '8446006000',
  whatsappDisplay: '+91 84460 06000',
  whatsappUrl: 'https://wa.me/918446006000',
  landline: '020 24499955',
  email: 'tejaswinisilkpune@gmail.com',

  // Physical Store Address
  address: {
    shopNo: 'Shop No. 1 & 2',
    building: 'Rang Rekha Apt.',
    number: '657',
    street: 'Kumthekar Road',
    area: 'Sadashiv Peth',
    landmark: 'Near Kunjir Talim',
    city: 'Pune',
    state: 'Maharashtra',
    postalCode: '411 030',
    country: 'India',
    full: '657, Shop No. 1 & 2, Rang Rekha Apt., Kumthekar Road, Sadashiv Peth, Near Kunjir Talim, Pune 411 030'
  },

  // Business & Tax details
  gstNo: '27ARDPT8189K2ZU',

  // Optional links & info (leave empty strings if not yet provided; UI will automatically hide them)
  // TODO: Add your store opening hours here (e.g. '10:30 AM to 8:30 PM (All 7 Days)')
  openingHours: '10:30 AM – 8:30 PM (Open All 7 Days)',

  // TODO: Add your Instagram profile URL here (e.g. 'https://instagram.com/tejaswinisilk')
  instagramUrl: '',

  // TODO: Add your Facebook page URL here (e.g. 'https://facebook.com/tejaswinisilk')
  facebookUrl: '',

  // TODO: Add your Google Maps store location URL here (e.g. 'https://maps.app.goo.gl/...')
  googleMapsUrl: '',

  // Base Site URL for Open Graph, Canonical tags & Share Links
  siteUrl: (import.meta.env.VITE_SITE_URL as string) || 'https://tajaswinisilkpune.com'
};

// 11 Master Categories as required
export const SHOP_CATEGORIES = [
  'Paithani Pure Silk',
  'Paithani Art Silk',
  '9-Yard Paithani',
  'Pure Silk',
  'Art Silk',
  'Kanjeevaram',
  'Banarasi',
  'Wedding / Bridal',
  'Readymade / Ethnic Wear',
  'Lehenga',
  'Accessories'
] as const;

export type ShopCategory = typeof SHOP_CATEGORIES[number];

export const FABRICS = [
  'Pure Silk',
  'Art Silk',
  'Cotton',
  'Silk Blend'
] as const;

export const LENGTH_OPTIONS = [
  '5.5 m',
  '6.3 m (with blouse piece)',
  '9-Yard (Nauvari - 8.2 m)',
  'Free Size'
] as const;

/**
 * Builds a WhatsApp URL for ordering cart items
 */
export function buildWhatsAppCartMessage(
  items: Array<{ name: string; price: number; quantity: number; id: string }>,
  customer: { name: string; phone: string; address?: string; notes?: string }
): string {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let msg = `*Namaste Tejaswini Silk, Pune!* 🙏\n`;
  msg += `I would like to place an order for the following saree(s):\n\n`;

  items.forEach((item, idx) => {
    const itemUrl = `${SHOP_CONFIG.siteUrl}/saree/${item.id}`;
    msg += `${idx + 1}. *${item.name}*\n`;
    msg += `   • Qty: ${item.quantity}\n`;
    msg += `   • Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
    msg += `   • Link: ${itemUrl}\n\n`;
  });

  msg += `*Total Order Value:* ₹${total.toLocaleString('en-IN')}\n\n`;
  msg += `*Customer Details:*\n`;
  msg += `• Name: ${customer.name}\n`;
  msg += `• Phone: ${customer.phone}\n`;
  if (customer.address) {
    msg += `• Delivery Address: ${customer.address}\n`;
  }
  if (customer.notes) {
    msg += `• Note / Customization: ${customer.notes}\n`;
  }
  msg += `\nPlease confirm saree availability and payment details. Dhanyavaad!`;

  return `https://wa.me/91${SHOP_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/**
 * Builds a WhatsApp URL for an enquiry on a single product
 */
export function buildWhatsAppProductEnquiry(
  product: { id: string; name: string; price_inr: number; category?: string }
): string {
  const productUrl = `${SHOP_CONFIG.siteUrl}/saree/${product.id}`;
  let msg = `*Namaste Tejaswini Silk, Pune!* 🙏\n`;
  msg += `I am interested in this saree:\n\n`;
  msg += `• *Name:* ${product.name}\n`;
  msg += `• *Price:* ₹${product.price_inr.toLocaleString('en-IN')}\n`;
  if (product.category) {
    msg += `• *Category:* ${product.category}\n`;
  }
  msg += `• *View Saree:* ${productUrl}\n\n`;
  msg += `Could you please share more pictures/video or confirm availability? Dhanyavaad!`;

  return `https://wa.me/91${SHOP_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/**
 * Builds a WhatsApp URL for booking a store visit or video consultation
 */
export function buildWhatsAppConsultationMessage(details: {
  name: string;
  phone: string;
  date?: string;
  type: 'video' | 'store';
  notes?: string;
}): string {
  let msg = `*Namaste Tejaswini Silk, Pune!* 🙏\n`;
  msg += `I would like to schedule a ${details.type === 'video' ? 'Video Call Consultation' : 'Boutique Visit at Kumthekar Road'}.\n\n`;
  msg += `• Name: ${details.name}\n`;
  msg += `• Phone: ${details.phone}\n`;
  if (details.date) {
    msg += `• Preferred Date / Time: ${details.date}\n`;
  }
  if (details.notes) {
    msg += `• Requirements: ${details.notes}\n`;
  }
  return `https://wa.me/91${SHOP_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}
