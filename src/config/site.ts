export const SITE_CONFIG = {
  brandNameEn: 'Politics Insights 007',
  brandNameBn: 'পলিটিক্স ইনসাইটস ০০৭',
  taglineBn: 'রাজনীতি, জননীতি ও বিশ্বপরিসরের তথ্যভিত্তিক সংবাদ ও বিশ্লেষণ',
  taglineEn: 'Evidence-Based Reporting on Politics, Public Policy & Global Affairs',
  siteUrl: 'https://www.politicsinsights007.com',
  primaryLanguage: 'bn',
  secondaryLanguage: 'en',

  // Official Social & Contact Placeholders (Owner should replace with verified details before launch)
  facebookPageUrl: 'https://www.facebook.com/politicsinsights007',
  facebookPageLabel: 'Official Facebook Page — Politics Insights 007',
  editorNamePlaceholder: '[সম্পাদকের নাম / Editor Name — নির্ধারিতব্য]',
  editorialEmailPlaceholder: '[editorial@politicsinsights007.com]',
  contactEmailPlaceholder: '[contact@politicsinsights007.com]',
  adsEmailPlaceholder: '[ads@politicsinsights007.com]',
  correctionsEmailPlaceholder: '[corrections@politicsinsights007.com]',
  tipsEmailPlaceholder: '[tips@politicsinsights007.com]',
  phonePlaceholder: '[ফোন নম্বর সংযুক্ত করুন / Phone Number Placeholder]',
  addressPlaceholder: '[কার্যালয় বা যোগাযোগের ঠিকানা সংযুক্ত করুন / Mailing Address Placeholder, Dhaka, Bangladesh]',

  // Monetization configuration
  // Keep enableLiveAdSense false until Google AdSense officially approves the domain
  monetization: {
    enableLiveAdSense: false,
    adSenseClientId: '', // e.g., 'ca-pub-XXXXXXXXXXXXXXXX' after approval
    showReservedSlotOutlinesDefault: false,
  },

  // Analytics configuration (Optional free Google Analytics 4)
  analytics: {
    gaMeasurementId: '', // e.g., 'G-XXXXXXXXXX'
  },
};

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(input: number | string): string {
  return String(input).replace(/\d/g, (d) => BENGALI_DIGITS[Number(d)] ?? d);
}

export function formatBengaliDate(isoDate: string): string {
  if (!isoDate) return '';
  const dateObj = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(dateObj.getTime())) return isoDate;

  try {
    return new Intl.DateTimeFormat('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  } catch {
    return isoDate;
  }
}

export function formatEnglishDate(isoDate: string): string {
  if (!isoDate) return '';
  const dateObj = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(dateObj.getTime())) return isoDate;

  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObj);
  } catch {
    return isoDate;
  }
}

export function getHeaderCurrentDateDisplay(): { bn: string; en: string } {
  const now = new Date();
  let bn = '';
  let en = '';
  try {
    bn = new Intl.DateTimeFormat('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(now);
    en = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(now);
  } catch {
    bn = now.toISOString().split('T')[0];
    en = bn;
  }
  return { bn, en };
}
