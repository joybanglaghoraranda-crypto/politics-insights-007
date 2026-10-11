import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';

interface AdSlotProps {
  slotId: string;
  label?: string;
  format?: 'leaderboard' | 'rectangle' | 'in-article';
  showPreview?: boolean;
}

/**
 * Policy-Compliant Reserved Advertisement Container:
 * - Never displays fake ads, fake click buttons, or misleading banners.
 * - Remains completely hidden in production until live AdSense or direct sponsorship is enabled,
 *   unless the site owner turns on "Ad Slot Layout Preview" to inspect spacing.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  label = 'বিজ্ঞাপন স্থান (Reserved Advertisement Position)',
  format = 'leaderboard',
  showPreview = false,
}) => {
  const shouldRender =
    SITE_CONFIG.monetization.enableLiveAdSense ||
    SITE_CONFIG.monetization.showReservedSlotOutlinesDefault ||
    showPreview;

  if (!shouldRender) {
    return null;
  }

  const sizeClasses =
    format === 'leaderboard'
      ? 'min-h-[90px] max-w-4xl mx-auto'
      : format === 'in-article'
      ? 'min-h-[110px] w-full my-6'
      : 'min-h-[250px] w-full';

  return (
    <aside
      aria-label="Advertisement Space"
      data-ad-slot={slotId}
      className={`border border-dashed border-slate-300 bg-slate-100/80 rounded-xs p-3 flex flex-col items-center justify-center text-center ${sizeClasses}`}
    >
      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-1">
        বিজ্ঞাপন সংরক্ষিত স্থান • AD SLOT ({slotId})
      </span>
      <p className="text-xs text-slate-600 max-w-md">
        {label} — গুগল অ্যাডসেন্স অনুমোদন বা সরাসরি স্পন্সরশিপ সক্রিয় করার আগ পর্যন্ত এই স্থানটি পাবলিক ভিজিটরদের কাছে স্বয়ংক্রিয়ভাবে লুকানো থাকে।
      </p>
      <Link
        to="/advertise"
        className="mt-1.5 text-[11px] font-semibold text-red-800 hover:underline"
      >
        বিজ্ঞাপন নীতিমালা দেখুন (Advertise With Us) →
      </Link>
    </aside>
  );
};
