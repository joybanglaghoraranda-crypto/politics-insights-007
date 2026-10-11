import React from 'react';

interface BrandLogoProps {
  variant?: 'masthead' | 'compact' | 'footer';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'masthead' }) => {
  const isFooter = variant === 'footer';
  const isCompact = variant === 'compact';

  return (
    <div className="inline-flex items-center gap-3.5 select-none group">
      {/* Original Editorial Emblem */}
      <div
        className={`relative flex items-center justify-center rounded-sm bg-[#0B192C] border-2 border-red-800 shadow-sm transition-transform duration-200 group-hover:border-red-600 ${
          isCompact ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 64 64"
          className={isCompact ? 'w-7 h-7' : 'w-9 h-9 sm:w-10 sm:h-10'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 16H30C35.5228 16 40 20.4772 40 26C40 31.5228 35.5228 36 30 36H21V48H14V16ZM21 29H29.5C31.433 29 33 27.433 33 25.5C33 23.567 31.433 22 29.5 22H21V29Z"
            fill="#FFFFFF"
          />
          <rect x="44" y="22" width="6" height="26" fill="#DC2626" />
          <circle cx="47" cy="15" r="3.5" fill="#DC2626" />
        </svg>
        <span className="absolute -bottom-1.5 -right-1.5 bg-red-800 text-white text-[9px] font-mono font-bold px-1 py-0.2 rounded-xs tracking-tighter border border-[#0B192C]">
          007
        </span>
      </div>

      {/* Original Wordmark */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-extrabold tracking-tight leading-none ${
              isFooter
                ? 'text-white text-2xl sm:text-3xl'
                : isCompact
                ? 'text-[#0B192C] text-xl'
                : 'text-[#0B192C] text-2xl sm:text-4xl'
            }`}
          >
            পলিটিক্স ইনসাইটস
          </span>
          <span
            className={`font-extrabold leading-none text-red-700 ${
              isCompact ? 'text-xl' : 'text-2xl sm:text-4xl'
            }`}
          >
            ০০৭
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`font-serif font-bold uppercase tracking-[0.16em] ${
              isFooter
                ? 'text-slate-300 text-[11px]'
                : 'text-slate-700 text-[10px] sm:text-xs'
            }`}
          >
            Politics Insights 007
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-red-700" />
          <span
            className={`hidden sm:inline text-[11px] font-medium ${
              isFooter ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            তথ্যনিষ্ঠ রাজনীতি ও নীতি বিশ্লেষণ
          </span>
        </div>
      </div>
    </div>
  );
};
