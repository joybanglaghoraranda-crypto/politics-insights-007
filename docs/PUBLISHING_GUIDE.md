# Beginner-Friendly Publishing Guide & Replacing Sample Articles

This guide explains how a beginner can publish new articles, save drafts, upload images, and replace the initial demonstration articles using **only the GitHub web interface**—without touching a single line of React or TypeScript code.

---

## Part 1: How Publishing Works

1. Every article is a simple `.md` (Markdown) text file inside one of three folders:
   - `content/news/` — For standard news reports (`contentType: "news"`)
   - `content/opinion/` — For opinion and analysis pieces (`contentType: "opinion"` or `"analysis"`)
   - `content/explainers/` — For data-driven explainers (`contentType: "explainer"`)
2. Whenever you add or edit a `.md` file in GitHub and click **Commit changes**, Cloudflare Pages automatically detects the change, rebuilds the site in ~45 seconds, updates the homepage, category pages, search index, RSS feed, and XML sitemap, and generates the Facebook Open Graph preview page.

---

## Part 2: Step-by-Step — Publishing a New Article on GitHub Web UI

### Step 1: Copy a Template
1. Open your repository on GitHub.com.
2. Go to `content/templates/` and open:
   - `news-template.md` (for news)
   - `opinion-template.md` (for opinion/analysis)
   - `explainer-template.md` (for explainers)
3. Click the **Copy raw file** button (top-right corner of the file box).

### Step 2: Create the New Article File
1. Navigate to the target folder (for example, `content/news/`).
2. Click **Add file** → **Create new file**.
3. In the filename box, type a short English URL slug ending in `.md`, for example:
   `2026-10-12-national-budget-review.md`
4. Paste the template you copied in Step 1.

### Step 3: Fill in the Frontmatter (Top Metadata Block)
Edit the values inside the `---` block at the top of the file:

```yaml
---
title: "জাতীয় বাজেট বাস্তবায়ন নিয়ে সংসদীয় কমিটির নতুন সুপারিশ"
slug: "national-budget-review-2026"
date: "2026-10-12"
updatedAt: ""
author: "সম্পাদকীয় ডেস্ক"
authorRole: "পলিটিক্স ইনসাইটস ০০৭"
category: "Government & Policy"
tags:
  - "বাজেট"
  - "সংসদ"
summary: "সংবাদের মূল সারসংক্ষেপ ২-৩ বাক্যে এখানে লিখুন। এটি ফেসবুক শেয়ার প্রিভিউ এবং গুগল সার্চে দেখা যাবে।"
featuredImage: "/images/budget-policy.svg"
imageAlt: "সংসদীয় বাজেট পর্যালোচনার গ্রাফিক চিত্র"
imageCredit: "পলিটিক্স ইনসাইটস ০০৭ গ্রাফিক্স ডেস্ক"
sources:
  - title: "অর্থ মন্ত্রণালয় — ত্রৈমাসিক বাজেট প্রতিবেদন"
    url: "https://mof.gov.bd"
contentType: "news"
status: "published"
language: "bn"
isLead: true
isBreaking: true
editorPick: true
isSample: false
---
```

### Important Frontmatter Fields Explained:
- **`category`**: Must match one of the 13 categories:
  - `Bangladesh`
  - `Bangladesh Politics`
  - `International`
  - `World Politics`
  - `Elections`
  - `Government & Policy`
  - `Economy`
  - `Diplomacy`
  - `Society`
  - `Technology`
  - `Opinion & Analysis`
  - `Explainers`
- **`status`**:
  - Set `"draft"` while writing or waiting for human editor verification (it will **not** appear on the live website).
  - Change to `"published"` when verified and ready to go live.
- **`isLead`**: Set `true` if you want this article to be the main Lead Story at the top of the homepage.
- **`isBreaking`**: Set `true` to include the headline in the top Breaking News ticker.
- **`editorPick`**: Set `true` to feature the article in the "সম্পাদকীয় পছন্দ (Editor-Selected Stories)" box.
- **`isSample`**: Always set `false` for real verified articles!

### Step 4: Write the Article Body
Below the second `---`, write your article in Bengali or English:
- Use `## উপশিরোনাম` for section headings.
- Use `- তথ্য ১` for bullet points.
- Use `> "উদ্ধৃতি"` for verified direct quotes.

### Step 5: Preview & Publish
1. Click the **Preview** tab in GitHub's editor to check formatting.
2. Click **Commit changes...** (green button at the top right), add a short note like `Publish: National budget review article`, and confirm.
3. Wait ~1 minute for Cloudflare Pages to finish building. Your article is now live at `https://www.politicsinsights007.com/article/national-budget-review-2026`!

---

## Part 3: How to Upload Custom Article Images

1. Compress and resize your image to **1200 × 675 px** (16:9 ratio) in `.webp` or `.jpg` format (keep file size under **200 KB** for fast mobile loading).
2. Ensure you have copyright permission or use an original/CC0/public-domain graphic.
3. In GitHub, open the `public/images/` folder.
4. Click **Add file** → **Upload files**, drag your image (e.g., `dhaka-summit-2026.webp`), and click **Commit changes**.
5. In your article's frontmatter, set:
   ```yaml
   featuredImage: "/images/dhaka-summit-2026.webp"
   imageAlt: "ঢাকায় অনুষ্ঠিত কূটনৈতিক সম্মেলনের মূল মঞ্চ"
   imageCredit: "পিআইডি / পলিটিক্স ইনসাইটস ০০৭"
   ```

---

## Part 4: Replacing Sample Demonstration Content with Verified Articles

All initial articles included in the MVP have `isSample: true` and `[নমুনা প্রতিবেদন]` in their titles so that readers and search engines never mistake demonstration content for unverified news.

To transition to 100% live content:
1. **Update Brand Contact Placeholders:** Open `src/config/site.ts` on GitHub and replace `editorNamePlaceholder`, `editorialEmailPlaceholder`, `contactEmailPlaceholder`, `phonePlaceholder`, and `addressPlaceholder` with your real verified contact details.
2. **Publish Your First 5–10 Real Verified Articles:** Add your real articles in `content/news/`, `content/opinion/`, and `content/explainers/` with `isSample: false` and `status: "published"`.
3. **Delete or Unpublish the Sample Files:**
   - Either delete the initial sample `.md` files in `content/news/`, `content/opinion/`, and `content/explainers/` via GitHub's **Delete file** button, OR
   - Change their `status: "published"` to `status: "draft"`.
4. Once no published article has `isSample: true`, the yellow **Demonstration Content Notice** banner on the homepage and article pages disappears automatically!
