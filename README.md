# পলিটিক্স ইনসাইটস ০০৭ | Politics Insights 007

**Primary Domain:** `https://www.politicsinsights007.com/`  
**Primary Language:** Bengali (`bn-BD`) | **Secondary Language:** English (`en-US`)  
**Architecture:** Static-First React 19 + TypeScript + Tailwind CSS v4 + Build-Time Markdown/SEO Pre-Renderer  
**Target Hosting:** Cloudflare Pages (Free Tier — Commercial & Monetization Permitted)

---

## 1. Quick Start (Local Development & Production Build)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (automatically compiles Markdown content first)
npm run dev

# 3. Build production static bundle + per-route OpenGraph/JSON-LD HTML pages
npm run build

# 4. Preview production static build locally
npm run preview
```

---

## 2. Project Directory Structure

```text
politics-insights-007/
├── content/                        # All Markdown articles (No React code edits needed!)
│   ├── news/                       # Standard news reports (bn & en)
│   ├── opinion/                    # Opinion & policy analysis articles
│   ├── explainers/                 # Data-driven explainers
│   └── templates/                  # Reusable Markdown templates for beginners
│       ├── news-template.md
│       ├── opinion-template.md
│       └── explainer-template.md
├── public/
│   ├── images/                     # Optimized SVG/WebP editorial graphics & OG images
│   ├── _redirects                  # Cloudflare Pages routing rules
│   ├── favicon.svg                 # Original Politics Insights 007 emblem
│   ├── robots.txt                  # Auto-generated crawler directives
│   ├── rss.xml                     # Auto-generated RSS 2.0 feed
│   ├── search-index.json           # Auto-generated client-side search index
│   └── sitemap.xml                 # Auto-generated XML sitemap for Google Search Console
├── scripts/
│   ├── build-content.mjs           # Parses Markdown -> articles.json, sitemap.xml, rss.xml
│   └── prerender-seo.mjs           # Generates static HTML with OpenGraph & JSON-LD per URL
├── src/
│   ├── components/
│   │   ├── AdSlot.tsx              # Policy-compliant reserved advertisement container
│   │   ├── ArticleCard.tsx         # Broadsheet editorial cards (lead, standard, horizontal, compact, opinion)
│   │   ├── BrandLogo.tsx           # Original Politics Insights 007 wordmark & emblem
│   │   ├── Footer.tsx              # Newspaper footer with categories & essential policy links
│   │   ├── Header.tsx              # Masthead, Bengali/English date, search, category nav & ticker
│   │   └── SEOHead.tsx             # Dynamic client-side head tag manager
│   ├── config/
│   │   ├── categories.ts           # Central taxonomy of all 13 news categories
│   │   └── site.ts                 # Brand config, placeholders, date formatters & monetization flags
│   ├── generated/
│   │   └── articles.json           # Auto-generated at build time from content/**/*.md
│   ├── lib/
│   │   └── articles.ts             # Filtering, chronological sorting, related articles & search
│   ├── pages/
│   │   ├── ArticlePage.tsx         # Full article page with sources, UTM social sharing & FB caption tool
│   │   ├── CategoryPage.tsx        # Category archive with language filter, pagination & empty state
│   │   ├── EssentialPage.tsx       # All 8 trust/policy pages (About, Editorial, Corrections, Privacy, etc.)
│   │   ├── HomePage.tsx            # Complete 17-element digital newspaper homepage
│   │   ├── NotFoundPage.tsx        # Custom 404 error page
│   │   └── SearchPage.tsx          # Instant client-side search across all published articles
│   ├── types/
│   │   └── article.ts              # Strict TypeScript interfaces
│   ├── App.tsx                     # Application router
│   ├── index.css                   # Tailwind CSS v4 & Bengali editorial typography rules
│   └── main.tsx                    # React DOM entry point
└── docs/
    ├── PUBLISHING_GUIDE.md         # Beginner-friendly GitHub publishing & sample replacement guide
    ├── DEPLOYMENT_AND_DOMAIN_GUIDE.md # GitHub, Cloudflare Pages & politicsinsights007.com DNS guide
    └── FACEBOOK_DISTRIBUTION_AND_MONETIZATION.md # FB templates, AdSense checklist & Phase 2-4 roadmap
```

---

## 3. Essential Documentation Links

- [Beginner-Friendly Publishing & Sample Content Replacement Guide](./docs/PUBLISHING_GUIDE.md)
- [GitHub, Cloudflare Pages & Custom Domain (`politicsinsights007.com`) Setup Guide](./docs/DEPLOYMENT_AND_DOMAIN_GUIDE.md)
- [Facebook Distribution Templates, AdSense Checklist & Future Newsroom Roadmap](./docs/FACEBOOK_DISTRIBUTION_AND_MONETIZATION.md)
