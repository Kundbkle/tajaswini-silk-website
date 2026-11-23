import React from 'react';
import { Link } from 'react-router-dom';

/** Brand lockup following the Marathi wordmark and feather motif in the supplied artwork. */
export const BrandMark: React.FC<{ dark?: boolean; compact?: boolean }> = ({ dark = false, compact = false }) => (
  <Link to="/" className="ts-brand inline-flex shrink-0 items-center gap-2 group" aria-label="Tejaswini Silk — Home">
    <svg className="ts-brand-feather shrink-0" viewBox="0 0 68 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 48C15 35 25 30 36 30C46 29 55 24 65 12C55 36 40 43 26 45C17 46 11 47 4 48Z" fill="#E5007E"/>
      <path d="M8 45C19 28 27 21 39 17C34 28 25 38 8 45Z" fill="#E5007E"/>
      <path d="M14 42C23 22 27 14 33 5C35 18 29 31 14 42Z" fill="#E5007E"/>
      <path d="M19 40C27 23 36 13 48 8C45 23 33 36 19 40Z" fill="#E5007E"/>
      <path d="M25 41C41 33 53 29 66 26C56 41 40 45 25 41Z" fill="#E5007E"/>
      <path d="M17 45C34 48 52 48 64 40C52 55 29 55 17 45Z" fill="#E5007E"/>
      <path d="M7 48C23 50 29 57 32 61" stroke="#E5007E" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M16 45C32 45 44 38 56 29" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".75"/>
    </svg>
    <span className="ts-brand-text">
      {!compact && <span className="ts-brand-tagline">स्त्रियांचे रूप उजळवणारी...</span>}
      <span className="ts-brand-name">तेजस्विनी<span className="ts-brand-silk"> सिल्क</span></span>
    </span>
  </Link>
);
