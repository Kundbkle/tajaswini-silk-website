import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BrandCTAProps { label: string; to?: string; onClick?: () => void; variant?: 'light' | 'dark'; }
export const BrandCTA: React.FC<BrandCTAProps> = ({ label, to, onClick, variant = 'light' }) => {
  const classes = 'ts-brand-cta group inline-flex min-h-11 items-center justify-between gap-4 rounded-full pl-5 pr-1.5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[.1em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d80880] ' +
    (variant === 'dark' ? 'bg-[#a40860] text-white' : 'bg-[#fff9f5] text-[#8a2754]');
  const children = <><span className="inline-flex items-center gap-2"><img src="/tejaswini-official-feather.svg" alt="" aria-hidden="true" className="w-5 h-5 object-contain bg-white/90 rounded-full p-0.5" /><span>{label}</span></span><span className={'flex items-center justify-center shrink-0 rounded-full w-9 h-9 transition-transform duration-300 group-hover:rotate-45 '+ (variant==='dark'?'bg-white text-[#a40860]':'bg-[#aa3866] text-white')}><ArrowUpRight size={17}/></span></>;
  return to ? <Link to={to} className={classes}>{children}</Link> : <button type="button" onClick={onClick} className={classes}>{children}</button>;
};
