import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const ROOT_DIR = process.cwd();
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const GENERATED_DIR = path.join(ROOT_DIR, 'src', 'generated');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const SITE_URL = 'https://www.politicsinsights007.com';

const CATEGORY_SLUGS = [
  'latest-news',
  'bangladesh',
  'bangladesh-politics',
  'international',
  'world-politics',
  'elections',
  'government-policy',
  'economy',
  'diplomacy',
  'society',
  'technology',
  'opinion-analysis',
  'explainers',
];

const ESSENTIAL_PAGES = [
  'about',
  'contact',
  'editorial-policy',
  'corrections-policy',
  'privacy-policy',
  'terms-of-use',
  'advertise',
  'submit-tip',
  'search',
];

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function getMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'templates') continue;
      files = files.concat(getMarkdownFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      if (entry.name.toLowerCase() === 'readme.md') continue;
      files.push(fullPath);
    }
  }
  return files;
}

function estimateReadingTimeMinutes(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 160));
}

function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateEditorialImages() {
  ensureDir(IMAGES_DIR);

  const ogDefaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B192C"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.6" stroke-opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="60" y="60" width="1080" height="510" fill="none" stroke="#B91C1C" stroke-width="3"/>
  <rect x="60" y="60" width="14" height="510" fill="#DC2626"/>
  <text x="110" y="160" fill="#F87171" font-family="Inter, sans-serif" font-size="22" font-weight="700" letter-spacing="4">POLITICS INSIGHTS 007 • WWW.POLITICSINSIGHTS007.COM</text>
  <text x="110" y="265" fill="#FFFFFF" font-family="'Noto Sans Bengali', 'Hind Siliguri', sans-serif" font-size="68" font-weight="800">পলিটিক্স ইনসাইটস ০০৭</text>
  <text x="110" y="340" fill="#E2E8F0" font-family="Merriweather, Georgia, serif" font-size="40" font-weight="700">Politics Insights 007</text>
  <line x1="110" y1="380" x2="520" y2="380" stroke="#DC2626" stroke-width="4"/>
  <text x="110" y="440" fill="#CBD5E1" font-family="'Noto Sans Bengali', sans-serif" font-size="28" font-weight="500">বাংলাদেশ ও বিশ্ব রাজনীতি • নির্বাচন • সরকারি নীতি • অর্থনীতি • কূটনীতি • তথ্যভিত্তিক বিশ্লেষণ</text>
  <text x="110" y="495" fill="#94A3B8" font-family="Inter, sans-serif" font-size="22" font-weight="500">Evidence-Based Political Journalism, Public Policy &amp; Global Affairs</text>
</svg>`;
  fs.writeFileSync(path.join(IMAGES_DIR, 'og-default.svg'), ogDefaultSvg, 'utf-8');

  const visualThemes = [
    {
      file: 'parliament-reform.svg',
      badge: 'সংসদ ও সংবিধান • PARLIAMENT & REFORM',
      title: 'সাংবিধানিক সংস্কার ও সংসদীয় জবাবদিহিতা',
      subtitle: 'Institutional Balance & Legislative Oversight Analysis',
      accent: '#B91C1C',
      bg1: '#0B192C',
      bg2: '#1E293B',
      chartType: 'pillars',
    },
    {
      file: 'election-turnout-data.svg',
      badge: 'নির্বাচন ও ভোটার তথ্য • ELECTION DATA',
      title: 'স্থানীয় ও জাতীয় নির্বাচনে ভোটার উপস্থিতির প্রবণতা',
      subtitle: 'Comparative Voter Turnout & Demographic Participation Trends',
      accent: '#0284C7',
      bg1: '#0F172A',
      bg2: '#1E3A5F',
      chartType: 'bars',
    },
    {
      file: 'budget-policy.svg',
      badge: 'সরকারি নীতি ও বাজেট • PUBLIC POLICY',
      title: 'জনসেবা খাতে বরাদ্দ ও বাস্তবায়ন কাঠামো',
      subtitle: 'Fiscal Allocation, Social Safety Nets & Implementation Metrics',
      accent: '#0D9488',
      bg1: '#0A192F',
      bg2: '#134E4A',
      chartType: 'line',
    },
    {
      file: 'indo-pacific-diplomacy.svg',
      badge: 'আন্তর্জাতিক কূটনীতি • DIPLOMACY',
      title: 'বঙ্গোপসাগর ও ইন্দো-প্যাসিফিক কৌশলগত ভারসাম্য',
      subtitle: 'Multilateral Trade Corridors, Maritime Security & Regional Diplomacy',
      accent: '#4F46E5',
      bg1: '#0F172A',
      bg2: '#1E1B4B',
      chartType: 'network',
    },
    {
      file: 'inflation-economy.svg',
      badge: 'অর্থনীতি ও বাজার • POLITICAL ECONOMY',
      title: 'মূল্যস্ফীতি নিয়ন্ত্রণ, রপ্তানি বহুমুখীকরণ ও শ্রমবাজার',
      subtitle: 'Supply Chain Resilience, Remittance Flows & Monetary Policy',
      accent: '#D97706',
      bg1: '#18181B',
      bg2: '#27272A',
      chartType: 'bars',
    },
    {
      file: 'global-summit.svg',
      badge: 'বিশ্ব রাজনীতি • WORLD POLITICS',
      title: 'বহুপাক্ষিক বিশ্বব্যবস্থা ও গ্লোবাল সাউথের নতুন সমীকরণ',
      subtitle: 'Geopolitical Shifts, Climate Finance & International Institutions',
      accent: '#E11D48',
      bg1: '#0F172A',
      bg2: '#31102F',
      chartType: 'network',
    },
    {
      file: 'civic-governance.svg',
      badge: 'নাগরিক সেবা ও সুশাসন • GOVERNANCE',
      title: 'স্থানীয় সরকার সেবা ও ডিজিটাল পাবলিক ইনফ্রাস্ট্রাকচার',
      subtitle: 'Citizen Service Delivery, Transparency & Civic Accountability',
      accent: '#2563EB',
      bg1: '#0B192C',
      bg2: '#172554',
      chartType: 'pillars',
    },
    {
      file: 'digital-governance-tech.svg',
      badge: 'প্রযুক্তি ও তথ্যনিরাপত্তা • TECH POLICY',
      title: 'কৃত্রিম বুদ্ধিমত্তা, উপাত্ত সুরক্ষা ও ডিজিটাল নীতিমালা',
      subtitle: 'AI Governance, Cybersecurity Standards & Digital Rights Framework',
      accent: '#7C3AED',
      bg1: '#0F172A',
      bg2: '#2E1065',
      chartType: 'line',
    },
  ];

  for (const item of visualThemes) {
    let graphicMarkup = '';
    if (item.chartType === 'bars') {
      graphicMarkup = `
        <g transform="translate(760, 160)">
          <rect x="0" y="0" width="340" height="310" rx="8" fill="#0F172A" fill-opacity="0.7" stroke="#475569" stroke-width="1.5"/>
          <line x1="40" y1="260" x2="300" y2="260" stroke="#64748B" stroke-width="2"/>
          <rect x="60" y="150" width="36" height="110" rx="3" fill="#64748B"/>
          <rect x="115" y="110" width="36" height="150" rx="3" fill="#94A3B8"/>
          <rect x="170" y="85" width="36" height="175" rx="3" fill="${item.accent}"/>
          <rect x="225" y="50" width="36" height="210" rx="3" fill="#38BDF8"/>
          <text x="65" y="285" fill="#94A3B8" font-family="Inter, sans-serif" font-size="13">Q1</text>
          <text x="120" y="285" fill="#94A3B8" font-family="Inter, sans-serif" font-size="13">Q2</text>
          <text x="175" y="285" fill="#94A3B8" font-family="Inter, sans-serif" font-size="13">Q3</text>
          <text x="230" y="285" fill="#94A3B8" font-family="Inter, sans-serif" font-size="13">Q4</text>
        </g>`;
    } else if (item.chartType === 'pillars') {
      graphicMarkup = `
        <g transform="translate(760, 150)">
          <rect x="0" y="0" width="340" height="320" rx="8" fill="#0F172A" fill-opacity="0.7" stroke="#475569" stroke-width="1.5"/>
          <polygon points="170,35 50,95 290,95" fill="none" stroke="${item.accent}" stroke-width="3"/>
          <rect x="75" y="105" width="24" height="145" fill="#64748B"/>
          <rect x="130" y="105" width="24" height="145" fill="#94A3B8"/>
          <rect x="185" y="105" width="24" height="145" fill="#94A3B8"/>
          <rect x="240" y="105" width="24" height="145" fill="#64748B"/>
          <rect x="45" y="255" width="250" height="16" rx="2" fill="${item.accent}"/>
        </g>`;
    } else if (item.chartType === 'line') {
      graphicMarkup = `
        <g transform="translate(760, 155)">
          <rect x="0" y="0" width="340" height="310" rx="8" fill="#0F172A" fill-opacity="0.7" stroke="#475569" stroke-width="1.5"/>
          <polyline fill="none" stroke="${item.accent}" stroke-width="4" points="40,230 100,190 160,205 220,120 290,75"/>
          <circle cx="40" cy="230" r="6" fill="#FFFFFF"/>
          <circle cx="100" cy="190" r="6" fill="#FFFFFF"/>
          <circle cx="160" cy="205" r="6" fill="#FFFFFF"/>
          <circle cx="220" cy="120" r="6" fill="#FFFFFF"/>
          <circle cx="290" cy="75" r="7" fill="${item.accent}" stroke="#FFFFFF" stroke-width="2"/>
        </g>`;
    } else {
      graphicMarkup = `
        <g transform="translate(760, 155)">
          <rect x="0" y="0" width="340" height="310" rx="8" fill="#0F172A" fill-opacity="0.7" stroke="#475569" stroke-width="1.5"/>
          <circle cx="170" cy="155" r="95" fill="none" stroke="#475569" stroke-width="1.5" stroke-dasharray="6 4"/>
          <circle cx="170" cy="155" r="55" fill="none" stroke="${item.accent}" stroke-width="2"/>
          <line x1="75" y1="155" x2="265" y2="155" stroke="#475569" stroke-width="1.5"/>
          <line x1="170" y1="60" x2="170" y2="250" stroke="#475569" stroke-width="1.5"/>
          <circle cx="170" cy="155" r="12" fill="${item.accent}"/>
          <circle cx="115" cy="110" r="8" fill="#38BDF8"/>
          <circle cx="235" cy="120" r="8" fill="#F87171"/>
          <circle cx="215" cy="210" r="8" fill="#34D399"/>
        </g>`;
    }

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${item.bg1}"/>
      <stop offset="100%" stop-color="${item.bg2}"/>
    </linearGradient>
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#94A3B8" fill-opacity="0.22"/>
    </pattern>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#dots)"/>
  <rect x="50" y="50" width="1100" height="575" rx="6" fill="none" stroke="#334155" stroke-width="2"/>
  <rect x="50" y="50" width="12" height="575" fill="${item.accent}"/>
  <rect x="95" y="105" width="460" height="42" rx="4" fill="${item.accent}" fill-opacity="0.25" stroke="${item.accent}" stroke-width="1.5"/>
  <text x="115" y="132" fill="#F8FAFC" font-family="'Noto Sans Bengali', Inter, sans-serif" font-size="18" font-weight="700">${escapeXml(item.badge)}</text>
  <text x="95" y="235" fill="#FFFFFF" font-family="'Noto Sans Bengali', 'Hind Siliguri', sans-serif" font-size="38" font-weight="700">${escapeXml(item.title)}</text>
  <text x="95" y="295" fill="#CBD5E1" font-family="Merriweather, Georgia, serif" font-size="21" font-weight="400">${escapeXml(item.subtitle)}</text>
  <line x1="95" y1="340" x2="680" y2="340" stroke="#334155" stroke-width="2"/>
  <text x="95" y="535" fill="#94A3B8" font-family="'Noto Sans Bengali', Inter, sans-serif" font-size="18" font-weight="600">পলিটিক্স ইনসাইটস ০০৭ • POLITICS INSIGHTS 007 EDITORIAL GRAPHIC</text>
  <text x="95" y="568" fill="#64748B" font-family="Inter, sans-serif" font-size="14">SAMPLE DEMONSTRATION VISUAL • OWN EDITORIAL ILLUSTRATION (CC0 / ORIGINAL)</text>
  ${graphicMarkup}
</svg>`;
    fs.writeFileSync(path.join(IMAGES_DIR, item.file), svgContent, 'utf-8');
  }
}

function buildContent() {
  ensureDir(GENERATED_DIR);
  ensureDir(PUBLIC_DIR);
  generateEditorialImages();

  const mdFiles = getMarkdownFiles(CONTENT_DIR);
  const articles = [];
  const seenSlugs = new Set();

  for (const filePath of mdFiles) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    const slug = (data.slug || path.basename(filePath, path.extname(filePath))).trim();
    if (seenSlugs.has(slug)) {
      console.warn(`[build-content] Duplicate slug detected: "${slug}" in ${filePath}`);
      continue;
    }
    seenSlugs.add(slug);

    const htmlBody = marked.parse(content, { async: false });
    const readingTimeMinutes = estimateReadingTimeMinutes(content);

    articles.push({
      title: data.title || 'Untitled Article',
      titleEn: data.titleEn || '',
      slug,
      date: data.date || '2026-10-11',
      updatedAt: data.updatedAt || '',
      author: data.author || 'সম্পাদকীয় ডেস্ক (Editorial Desk)',
      authorRole: data.authorRole || 'পলিটিক্স ইনসাইটস ০০৭ ডেস্ক',
      category: data.category || 'Bangladesh Politics',
      CategorySlug: data.categorySlug || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      summary: data.summary || '',
      summaryEn: data.summaryEn || '',
      featuredImage: data.featuredImage || '/images/parliament-reform.svg',
      imageAlt: data.imageAlt || data.title || 'Article illustration',
      imageCredit: data.imageCredit || 'পলিটিক্স ইনসাইটস ০০৭ গ্রাফিক্স ডেস্ক',
      sources: Array.isArray(data.sources) ? data.sources : [],
      contentType: data.contentType || 'news', // 'news' | 'opinion' | 'analysis' | 'explainer' | 'sponsored'
      status: data.status || 'published', // 'published' | 'draft'
      language: data.language || 'bn', // 'bn' | 'en'
      isLead: Boolean(data.isLead),
      isBreaking: Boolean(data.isBreaking),
      editorPick: Boolean(data.editorPick),
      isSample: data.isSample !== undefined ? Boolean(data.isSample) : true,
      readingTimeMinutes,
      bodyMarkdown: content.trim(),
      bodyHtml: htmlBody,
      sourcePath: path.relative(ROOT_DIR, filePath).replace(/\\/g, '/'),
    });
  }

  articles.sort((a, b) => {
    const dateCompare = String(b.date).localeCompare(String(a.date));
    if (dateCompare !== 0) return dateCompare;
    return a.title.localeCompare(b.title);
  });

  // Write full generated dataset for the React application
  const outputJsonPath = path.join(GENERATED_DIR, 'articles.json');
  fs.writeFileSync(outputJsonPath, JSON.stringify(articles, null, 2), 'utf-8');

  // Filter published articles for public search index, sitemap, and RSS feed
  const publishedArticles = articles.filter((a) => a.status === 'published');

  const searchIndex = publishedArticles.map((a) => ({
    title: a.title,
    titleEn: a.titleEn,
    slug: a.slug,
    date: a.date,
    author: a.author,
    category: a.category,
    tags: a.tags,
    summary: a.summary,
    summaryEn: a.summaryEn,
    featuredImage: a.featuredImage,
    imageAlt: a.imageAlt,
    contentType: a.contentType,
    language: a.language,
    isSample: a.isSample,
    readingTimeMinutes: a.readingTimeMinutes,
  }));

  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'search-index.json'),
    JSON.stringify(searchIndex, null, 2),
    'utf-8'
  );

  // Generate XML Sitemap
  const today = new Date().toISOString().split('T')[0];
  const sitemapUrls = [
    { loc: `${SITE_URL}/`, lastmod: today, changefreq: 'hourly', priority: '1.0' },
    ...CATEGORY_SLUGS.map((cat) => ({
      loc: `${SITE_URL}/category/${cat}`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.8',
    })),
    ...ESSENTIAL_PAGES.map((page) => ({
      loc: `${SITE_URL}/${page}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.6',
    })),
    ...publishedArticles.map((article) => ({
      loc: `${SITE_URL}/article/${encodeURIComponent(article.slug)}`,
      lastmod: article.updatedAt || article.date || today,
      changefreq: 'weekly',
      priority: '0.9',
    })),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${escapeXml(u.lastmod)}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');

  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');

  // Generate RSS 2.0 Feed
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>পলিটিক্স ইনসাইটস ০০৭ | Politics Insights 007</title>
    <link>${SITE_URL}/</link>
    <description>বাংলাদেশ ও বিশ্ব রাজনীতি, নির্বাচন, সরকারি নীতি, অর্থনীতি ও কূটনীতির তথ্যভিত্তিক সংবাদ ও বিশ্লেষণ।</description>
    <language>bn-BD</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${publishedArticles
  .slice(0, 25)
  .map(
    (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE_URL}/article/${encodeURIComponent(a.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/article/${encodeURIComponent(a.slug)}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <category>${escapeXml(a.category)}</category>
      <description>${escapeXml(a.summary)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rssXml, 'utf-8');

  console.log(
    `[build-content] Processed ${articles.length} total articles (${publishedArticles.length} published, ${
      articles.length - publishedArticles.length
    } drafts). Generated articles.json, search-index.json, sitemap.xml, robots.txt, and rss.xml.`
  );
}

buildContent();
