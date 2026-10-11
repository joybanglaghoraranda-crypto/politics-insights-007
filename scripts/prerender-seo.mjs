import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const ARTICLES_JSON = path.join(ROOT_DIR, 'src', 'generated', 'articles.json');
const SITE_URL = 'https://www.politicsinsights007.com';

const CATEGORIES = [
  { slug: 'latest-news', nameBn: 'সর্বশেষ সংবাদ', nameEn: 'Latest News', desc: 'পলিটিক্স ইনসাইটস ০০৭-এর সর্বশেষ প্রকাশিত সংবাদ, প্রতিবেদন ও বিশ্লেষণ।' },
  { slug: 'bangladesh', nameBn: 'বাংলাদেশ', nameEn: 'Bangladesh', desc: 'বাংলাদেশের জাতীয় ঘটনাপ্রবাহ, জনজীবন, প্রশাসন ও সার্বিক পরিস্থিতির সংবাদ।' },
  { slug: 'bangladesh-politics', nameBn: 'বাংলাদেশ রাজনীতি', nameEn: 'Bangladesh Politics', desc: 'বাংলাদেশের রাজনৈতিক দল, সংসদ, সংবিধান ও রাজনৈতিক সংস্কার বিষয়ক প্রতিবেদন।' },
  { slug: 'international', nameBn: 'আন্তর্জাতিক', nameEn: 'International', desc: 'আন্তর্জাতিক অঙ্গনের গুরুত্বপূর্ণ সংবাদ ও আঞ্চলিক ঘটনাপ্রবাহ।' },
  { slug: 'world-politics', nameBn: 'বিশ্ব রাজনীতি', nameEn: 'World Politics', desc: 'বৈশ্বিক পরাশক্তি, ভূরাজনীতি ও আন্তর্জাতিক প্রতিষ্ঠানের রাজনৈতিক সমীকরণ।' },
  { slug: 'elections', nameBn: 'নির্বাচন', nameEn: 'Elections', desc: 'জাতীয় ও স্থানীয় নির্বাচন, নির্বাচন কমিশন, ভোটার উপস্থিতি ও নির্বাচনী ব্যবস্থার বিশ্লেষণ।' },
  { slug: 'government-policy', nameBn: 'সরকার ও নীতি', nameEn: 'Government & Policy', desc: 'সরকারি নীতিমালা, বাজেট, জনপ্রশাসন, আইন ও জনসেবা সংক্রান্ত প্রতিবেদন।' },
  { slug: 'economy', nameBn: 'অর্থনীতি', nameEn: 'Economy', desc: 'রাজনৈতিক অর্থনীতি, ব্যাংকিং, মূল্যস্ফীতি, রপ্তানি, রেমিট্যান্স ও উন্নয়ন বাজেট।' },
  { slug: 'diplomacy', nameBn: 'কূটনীতি', nameEn: 'Diplomacy', desc: 'দ্বিপাক্ষিক ও বহুপাক্ষিক কূটনীতি, পররাষ্ট্রনীতি, বাণিজ্য চুক্তি ও আঞ্চলিক সম্পর্ক।' },
  { slug: 'society', nameBn: 'সমাজ ও নাগরিক', nameEn: 'Society', desc: 'নাগরিক অধিকার, শিক্ষা, স্বাস্থ্য, পরিবেশ ও সামাজিক রূপান্তর বিষয়ক প্রতিবেদন।' },
  { slug: 'technology', nameBn: 'প্রযুক্তি ও নীতি', nameEn: 'Technology', desc: 'ডিজিটাল গভর্ন্যান্স, সাইবার নিরাপত্তা, কৃত্রিম বুদ্ধিমত্তা ও প্রযুক্তি নীতিমালা।' },
  { slug: 'opinion-analysis', nameBn: 'মতামত ও বিশ্লেষণ', nameEn: 'Opinion & Analysis', desc: 'রাজনীতি, নীতি ও সমসাময়িক বিষয়ে বিশেষজ্ঞ মতামত ও সম্পাদকীয় বিশ্লেষণ।' },
  { slug: 'explainers', nameBn: 'ব্যাখ্যা ও তথ্যচিত্র', nameEn: 'Explainers', desc: 'জটিল রাজনৈতিক, সাংবিধানিক ও অর্থনৈতিক বিষয়ের সহজ ও তথ্যভিত্তিক ব্যাখ্যা।' },
];

const PAGES = [
  { slug: 'about', title: 'আমাদের সম্পর্কে (About Us) | পলিটিক্স ইনসাইটস ০০৭', desc: 'পলিটিক্স ইনসাইটস ০০৭-এর লক্ষ্য, সম্পাদকীয় দর্শন ও পরিচিতি।' },
  { slug: 'contact', title: 'যোগাযোগ (Contact Us) | পলিটিক্স ইনসাইটস ০০৭', desc: 'পলিটিক্স ইনসাইটস ০০৭-এর সম্পাদকীয় ও বিজ্ঞাপন বিভাগে যোগাযোগের ঠিকানা।' },
  { slug: 'editorial-policy', title: 'সম্পাদকীয় নীতিমালা (Editorial Policy) | পলিটিক্স ইনসাইটস ০০৭', desc: 'তথ্য যাচাই, রাজনৈতিক নিরপেক্ষতা ও এআই ব্যবহারের সম্পাদকীয় নীতিমালা।' },
  { slug: 'corrections-policy', title: 'সংশোধনী নীতিমালা (Corrections Policy) | পলিটিক্স ইনসাইটস ০০৭', desc: 'সংবাদের তথ্যগত ত্রুটি সংশোধন ও পাঠকের অভিযোগ নিষ্পত্তির স্বচ্ছ প্রক্রিয়া।' },
  { slug: 'privacy-policy', title: 'গোপনীয়তা নীতি (Privacy Policy) | পলিটিক্স ইনসাইটস ০০৭', desc: 'পাঠকের তথ্য সুরক্ষা, কুকিজ ও গুগল অ্যাডসেন্স সংক্রান্ত গোপনীয়তা নীতি।' },
  { slug: 'terms-of-use', title: 'ব্যবহারের শর্তাবলি (Terms of Use) | পলিটিক্স ইনসাইটস ০০৭', desc: 'পলিটিক্স ইনসাইটস ০০৭ ওয়েবসাইট ব্যবহারের নিয়মাবলি ও কপিরাইট শর্ত।' },
  { slug: 'advertise', title: 'বিজ্ঞাপন দিন (Advertise With Us) | পলিটিক্স ইনসাইটস ০০৭', desc: 'পলিটিক্স ইনসাইটস ০০৭-এ ডিসপ্লে বিজ্ঞাপন ও স্পন্সরড কন্টেন্ট প্রকাশের নীতিমালা।' },
  { slug: 'submit-tip', title: 'সংবাদ সূত্র পাঠান (Submit a News Tip) | পলিটিক্স ইনসাইটস ০০৭', desc: 'জনস্বার্থ সংশ্লিষ্ট নির্ভরযোগ্য তথ্য ও নথিপত্র পাঠানোর নির্দেশিকা।' },
  { slug: 'search', title: 'সংবাদ অনুসন্ধান (Search) | পলিটিক্স ইনসাইটস ০০৭', desc: 'পলিটিক্স ইনসাইটস ০০৭-এর প্রকাশিত সকল সংবাদ ও বিশ্লেষণ খুঁজুন।' },
];

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectMeta(templateHtml, { title, description, canonicalUrl, ogType, ogImage, jsonLd, extraMeta = '' }) {
  let html = templateHtml;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${escapeHtml(ogType)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`
  );

  const structuredBlock = [
    extraMeta,
    jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ');

  html = html.replace('<!-- STRUCTURED_DATA_PLACEHOLDER -->', structuredBlock);
  return html;
}

function writeRouteHtml(routePath, htmlContent) {
  const targetDir = path.join(DIST_DIR, routePath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf-8');
}

function runPrerender() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.warn('[prerender-seo] dist/index.html not found. Skipping static route generation.');
    return;
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');
  const articles = JSON.parse(fs.readFileSync(ARTICLES_JSON, 'utf-8')).filter(
    (a) => a.status === 'published'
  );

  // 1. Update root index.html with Organization + WebSite JSON-LD
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsMediaOrganization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Politics Insights 007',
        alternateName: 'পলিটিক্স ইনসাইটস ০০৭',
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/favicon.svg`,
        ethicsPolicy: `${SITE_URL}/editorial-policy`,
        correctionsPolicy: `${SITE_URL}/corrections-policy`,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'পলিটিক্স ইনসাইটস ০০৭ | Politics Insights 007',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['bn-BD', 'en-US'],
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  const homeHtml = injectMeta(baseTemplate, {
    title: 'পলিটিক্স ইনসাইটস ০০৭ | Politics Insights 007 — রাজনীতি, নীতি ও বিশ্বপরিসর',
    description:
      'পলিটিক্স ইনসাইটস ০০৭ (Politics Insights 007) — বাংলাদেশ ও বিশ্ব রাজনীতি, নির্বাচন, সরকারি নীতি, অর্থনীতি, কূটনীতি এবং তথ্যভিত্তিক বিশ্লেষণের নির্ভরযোগ্য ডিজিটাল সংবাদ মাধ্যম।',
    canonicalUrl: `${SITE_URL}/`,
    ogType: 'website',
    ogImage: `${SITE_URL}/images/og-default.svg`,
    jsonLd: homeJsonLd,
  });
  fs.writeFileSync(indexHtmlPath, homeHtml, 'utf-8');

  // 2. Generate static HTML for every published article
  for (const article of articles) {
    const canonicalUrl = `${SITE_URL}/article/${encodeURIComponent(article.slug)}`;
    const ogImage = article.featuredImage.startsWith('http')
      ? article.featuredImage
      : `${SITE_URL}${article.featuredImage}`;

    const schemaType =
      article.contentType === 'opinion' || article.contentType === 'analysis'
        ? 'AnalysisNewsArticle'
        : 'NewsArticle';

    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      headline: article.title,
      description: article.summary,
      image: [ogImage],
      datePublished: article.date,
      dateModified: article.updatedAt || article.date,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'NewsMediaOrganization',
        name: 'Politics Insights 007',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/favicon.svg`,
        },
      },
      articleSection: article.category,
      inLanguage: article.language === 'en' ? 'en-US' : 'bn-BD',
    };

    const extraMeta = [
      `<meta property="article:published_time" content="${escapeHtml(article.date)}" />`,
      article.updatedAt
        ? `<meta property="article:modified_time" content="${escapeHtml(article.updatedAt)}" />`
        : '',
      `<meta property="article:section" content="${escapeHtml(article.category)}" />`,
    ]
      .filter(Boolean)
      .join('\n    ');

    const articleHtml = injectMeta(baseTemplate, {
      title: `${article.title} | পলিটিক্স ইনসাইটস ০০৭ (Politics Insights 007)`,
      description: article.summary,
      canonicalUrl,
      ogType: 'article',
      ogImage,
      jsonLd: articleJsonLd,
      extraMeta,
    });

    writeRouteHtml(path.join('article', article.slug), articleHtml);
  }

  // 3. Generate static HTML for every category page
  for (const cat of CATEGORIES) {
    const canonicalUrl = `${SITE_URL}/category/${cat.slug}`;
    const catHtml = injectMeta(baseTemplate, {
      title: `${cat.nameBn} (${cat.nameEn}) | পলিটিক্স ইনসাইটস ০০৭`,
      description: cat.desc,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/images/og-default.svg`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${cat.nameBn} (${cat.nameEn})`,
        description: cat.desc,
        url: canonicalUrl,
      },
    });
    writeRouteHtml(path.join('category', cat.slug), catHtml);
  }

  // 4. Generate static HTML for essential pages
  for (const page of PAGES) {
    const canonicalUrl = `${SITE_URL}/${page.slug}`;
    const pageHtml = injectMeta(baseTemplate, {
      title: page.title,
      description: page.desc,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/images/og-default.svg`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        description: page.desc,
        url: canonicalUrl,
      },
    });
    writeRouteHtml(page.slug, pageHtml);
  }

  // 5. Generate 404.html for Cloudflare Pages
  const notFoundHtml = injectMeta(baseTemplate, {
    title: '৪০৪ - পৃষ্ঠাটি পাওয়া যায়নি (Page Not Found) | পলিটিক্স ইনসাইটস ০০৭',
    description: 'অনুরোধকৃত পৃষ্ঠাটি খুঁজে পাওয়া যায়নি। পলিটিক্স ইনসাইটস ০০৭-এর মূল পাতায় ফিরে যান।',
    canonicalUrl: `${SITE_URL}/404`,
    ogType: 'website',
    ogImage: `${SITE_URL}/images/og-default.svg`,
    jsonLd: null,
  });
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8');

  console.log(
    `[prerender-seo] Pre-rendered static SEO/OpenGraph HTML for ${articles.length} articles, ${CATEGORIES.length} categories, ${PAGES.length} essential pages, and 404.html.`
  );
}

runPrerender();
