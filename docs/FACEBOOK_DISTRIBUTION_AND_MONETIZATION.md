# Facebook Distribution Plan, AdSense Readiness Checklist & Future Roadmap

---

## 1. Facebook Traffic & Content-Distribution Strategy

Because **Politics Insights 007** already has an active Facebook Page, the website is engineered so that every published article generates a static HTML file (`/article/<slug>/index.html`) containing complete **Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)** metadata.

### How to Share Articles for Maximum Reach & Clean Analytics
1. **Use the Built-In "FB ক্যাপশন" Button on Every Article Page:**
   - Open any published article on your website and click the **FB ক্যাপশন** button in the top share bar.
   - It automatically formats the Bengali headline, summary, hashtags, and the full canonical URL appended with `?utm_source=facebook&utm_medium=social&utm_campaign=article_share`.
2. **Distinguishing Facebook Visits in Google Analytics (GA4):**
   - In Google Analytics 4, navigate to **Reports → Acquisition → Traffic acquisition**.
   - Filter by `Session source / medium`:
     - Links shared using our built-in UTM helper appear under `facebook / social`.
     - Direct organic clicks from the Facebook app/web appear under `facebook.com / referral` or `m.facebook.com / referral`.
3. **Refreshing Facebook Link Previews:**
   - If you update an article's headline or image after sharing, paste the URL into the official [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/) and click **Scrape Again**.

---

## 2. Six Reusable Facebook Post Templates (Bengali & English)

### Template 1: Breaking / Developing News (ব্রেকিং বা জরুরি সংবাদ)
```text
🔴 তাৎক্ষণিক সংবাদ | [সংবাদের মূল শিরোনাম]

[১-২ বাক্যে কী ঘটেছে, কোথায় ঘটেছে এবং কোন দাফতরিক সূত্র তা নিশ্চিত করেছে তার সংক্ষিপ্ত বিবরণ।]

📌 মূল তথ্য:
• [যাচাইকৃত তথ্য ১]
• [যাচাইকৃত তথ্য ২]

🔗 বিস্তারিত প্রতিবেদন ও সূত্র পড়ুন:
https://www.politicsinsights007.com/article/[slug]?utm_source=facebook&utm_medium=social&utm_campaign=breaking_news

#PoliticsInsights007 #Bangladesh #BreakingNews
```

### Template 2: Standard News Report (নিয়মিত সংবাদ প্রতিবেদন)
```text
📰 [সংবাদের শিরোনাম]

[২-৩ বাক্যে সংবাদের মূল প্রেক্ষাপট ও প্রাসঙ্গিক পক্ষগুলোর নথিভুক্ত অবস্থান।]

বিস্তারিত প্রতিবেদন ও তথ্যসূত্র:
👉 https://www.politicsinsights007.com/article/[slug]?utm_source=facebook&utm_medium=social&utm_campaign=standard_news

#PoliticsInsights007 #BangladeshPolitics #PublicPolicy
```

### Template 3: Political / Constitutional Explainer (তথ্যভিত্তিক ব্যাখ্যা)
```text
🔍 সহজ ব্যাখ্যা | [বিষয়টি কী ও কেন এখন আলোচনায়?]

অনেকেই জানতে চান—[মূল প্রশ্ন, যেমন: জাতীয় বাজেট কীভাবে পাস হয় বা আনুপাতিক নির্বাচন পদ্ধতি কীভাবে কাজ করে?]

১️⃣ [ধাপ বা মূল পয়েন্ট ১]
২️⃣ [ধাপ বা মূল পয়েন্ট ২]
৩️⃣ [ধাপ বা মূল পয়েন্ট ৩]

📊 সম্পূর্ণ তথ্যভিত্তিক ব্যাখ্যাটি পড়ুন:
https://www.politicsinsights007.com/article/[slug]?utm_source=facebook&utm_medium=social&utm_campaign=explainer

#Explainer #PoliticsInsights007 #PolicyAnalysis
```

### Template 4: Data Graphic / Statistics Post (তথ্যচিত্র ও পরিসংখ্যান)
```text
📊 সংখ্যায় দেখুন: [পরিসংখ্যানের বিষয়, যেমন: বার্ষিক উন্নয়ন কর্মসূচি বাস্তবায়নের হার]

সরকারি পরিসংখ্যান ([সূত্রের নাম, যেমন: বিবিএস / অর্থ মন্ত্রণালয়])-এর তথ্য অনুযায়ী:
▪ [পরিসংখ্যান ১]
▪ [পরিসংখ্যান ২]
▪ [পরিসংখ্যান ৩]

এই তথ্যের অর্থনৈতিক ও নীতিগত তাৎপর্য কী? পড়ুন আমাদের বিশ্লেষণ:
🔗 https://www.politicsinsights007.com/article/[slug]?utm_source=facebook&utm_medium=social&utm_campaign=data_graphic

#DataJournalism #Economy #PoliticsInsights007
```

### Template 5: Original Short-Video / Reel Summary (শর্ট-ভিডিও বা রিলস ক্যাপশন)
```text
🎥 ৬০ সেকেন্ডে মূল বিষয়: [ভিডিওর শিরোনাম]

এই ভিডিওতে জানুন:
✔ [মূল পয়েন্ট ১]
✔ [মূল পয়েন্ট ২]

📄 ভিডিওতে উল্লেখিত সরকারি নথি ও বিস্তারিত প্রতিবেদন পড়ুন কমেন্টে দেওয়া লিংকে অথবা এখানে:
https://www.politicsinsights007.com/article/[slug]?utm_source=facebook&utm_medium=social&utm_campaign=reels_summary

#ReelsBD #PoliticsInsights007 #NewsExplainer
```

### Template 6: Opinion & Policy Analysis (মতামত ও বিশ্লেষণ)
```text
✍️ মতামত ও বিশ্লেষণ | [নিবন্ধের শিরোনাম]
লেখক: [লেখকের নাম ও পরিচয়]

"[নিবন্ধ থেকে ১-২ বাক্যের একটি শক্তিশালী ও যুক্তিপূর্ণ উদ্ধৃতি]"

(বিশেষ দ্রষ্টব্য: এটি লেখকের নিজস্ব বিশ্লেষণমূলক নিবন্ধ।)

🔗 সম্পূর্ণ নিবন্ধটি পড়ুন:
https://www.politicsinsights007.com/article/[slug]?utm_source=facebook&utm_medium=social&utm_campaign=opinion

#Opinion #PolicyDebate #PoliticsInsights007
```

---

## 3. Google AdSense Readiness Checklist

> **Important Disclosure:** Google AdSense approval is determined solely by Google's automated and human review teams under the [Google Publisher Policies](https://support.google.com/adsense/answer/9335564). No developer can guarantee approval or specific income. Complete every item below **before** submitting your application:

- [ ] **1. Replace All Sample Demonstration Articles:** Delete or set `status: "draft"` on all initial `[নমুনা প্রতিবেদন]` files and publish at least **20–30 original, well-researched, human-verified articles** (600–1,200+ words each) across your core categories.
- [ ] **2. Replace Contact & Editor Placeholders:** Update `src/config/site.ts` so that `/about`, `/contact`, and the footer show your real editor name, active email addresses (`@politicsinsights007.com` or verified email), and mailing address.
- [ ] **3. Verify Essential Trust Pages Are Live:** Confirm `/about`, `/contact`, `/privacy-policy`, `/editorial-policy`, `/corrections-policy`, and `/terms-of-use` are accessible and free of placeholder brackets.
- [ ] **4. Ensure Zero Empty Categories in Navigation:** Either publish at least 2–3 real articles in each of the 13 categories or temporarily hide unused categories in `src/config/categories.ts` during your AdSense review so reviewers never land on an "Under Construction" or empty section.
- [ ] **5. Custom Domain & HTTPS Active:** Apply using `https://www.politicsinsights007.com` (never apply with the `.pages.dev` subdomain).
- [ ] **6. Keep Fake Ads Disabled:** Keep `enableLiveAdSense: false` in `src/config/site.ts` until Google gives you your official `ca-pub-XXXXXXXXXXXXXXXX` script and `ads.txt` line.

---

## 4. Future Phase 3 Newsroom Architecture (Reporter, Editor & Admin Dashboard)

In **Phase 1 (MVP)**, content is managed safely via GitHub Markdown files with zero server or database cost. Do **not** build a database or login system until you have multiple daily reporters.

When you are ready for **Phase 3 (Newsroom Dashboard)**, here is the exact architecture and cost blueprint:

### Role Capabilities to Introduce in Phase 3:
1. **Reporter Role:**
   - Secure login with Two-Factor Authentication (2FA).
   - Rich-text / Markdown submission form with mandatory fields for `sources` (URLs) and `imageCredit`.
   - Ability to view own submission status (`Draft`, `Pending Review`, `Revision Requested`, `Published`).
2. **Editor Role:**
   - Review queue for all pending reporter submissions.
   - Inline revision notes, fact-check checklist verification, and `Approve / Reject` controls.
   - Scheduled publication (`publishAt` timestamp triggered via Cloudflare Cron Triggers).
3. **Administrator Role:**
   - Role-based access control (RBAC) management (`reporter`, `editor`, `admin`).
   - Category taxonomy management, site settings, editorial audit logs, and direct sponsor banner scheduling.

### Technical Stack & Cost Implications for Phase 3:
| Component | Recommended Option A (Git-Backed CMS) | Recommended Option B (Dynamic Serverless Backend) |
| :--- | :--- | :--- |
| **Technology** | **Decap CMS / Pages CMS** + Cloudflare Workers OAuth proxy | **Cloudflare Pages Functions + Cloudflare D1 (SQLite) + R2 Storage + Cloudflare Access / Lucia Auth** |
| **How It Works** | Provides a clean web admin UI (`/admin`) that commits `.md` files directly to your GitHub repo. | Stores articles in a relational D1 database and uploaded images in Cloudflare R2 object storage. |
| **Security Requirements** | GitHub OAuth + branch protection rules (reporters open Pull Requests; editors merge). | Password hashing (Argon2/bcrypt), HTTP-only session cookies, CSRF protection, rate limiting, and audit logs. |
| **Monthly Cost** | **$0/month** within Cloudflare Workers & GitHub free tiers. | **$0/month** up to Cloudflare Free limits (5 GB D1 storage, 10 GB R2 storage, 100k Worker requests/day); **$5–$20/month** (Workers Paid plan) if traffic scales heavily. |
