import React from 'react';
import { Link } from 'react-router-dom';

/** The original Marathi lockup and feather artwork, extracted from the supplied PDF. */
export const BrandMark: React.FC<{ dark?: boolean; compact?: boolean }> = ({ compact = false }) => (
  <Link to="/" className={`ts-brand group inline-flex items-center shrink-0 ${compact ? 'ts-brand-compact' : ''}`} aria-label="Tejaswini Silk — Home">
    <img
      src="/tejaswini-official-logo.svg"
      alt="तेजस्विनी सिल्क — स्त्रियांचे रूप उजळवणारी"
      className="ts-brand-image"
      width="900"
      height="160"
      decoding="async"
    />
  </Link>
);
