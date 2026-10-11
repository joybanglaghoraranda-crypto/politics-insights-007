# GitHub, Cloudflare Pages & Custom Domain (`politicsinsights007.com`) Setup Guide

This guide covers:
1. Pushing the codebase to GitHub
2. Deploying to **Cloudflare Pages (Free Tier)**
3. Live DNS inspection findings for `politicsinsights007.com`
4. Step-by-step custom domain, HTTPS, and canonical redirect configuration
5. Google Search Console setup

---

## 1. GitHub Repository Setup

1. Create a free account or sign in at [https://github.com](https://github.com).
2. Click **New repository** (top-right `+` icon).
3. Set Repository Name: `politics-insights-007`
4. Set Visibility: **Private** (recommended so editorial drafts stay private; Cloudflare Pages Free Tier supports private repositories at zero cost) or **Public**.
5. Do **not** check "Add a README" (since the project already includes one). Click **Create repository**.
6. In your local project folder (`C:\Users\ASUS\.gemini\antigravity\scratch\politics-insights-007`), run:
   ```bash
   git init
   git add .
   git commit -m "Initial Phase 1 MVP release for Politics Insights 007"
   git branch -M main
   git remote add origin https://github.com/joybanglaghoraranda-crypto/politics-insights-007.git
   git push -u origin main
   ```

---

## 2. Cloudflare Pages Deployment Instructions

### Why Cloudflare Pages Free Tier?
Unlike Vercel Hobby (which strictly prohibits commercial use and monetization in its Terms of Service), **Cloudflare Pages Free Tier explicitly permits commercial and monetized websites**, includes unlimited static bandwidth, free automatic SSL/HTTPS certificates, and up to 500 builds per month.

### Step-by-Step Setup:
1. Sign up or log in to [https://dash.cloudflare.com/](https://dash.cloudflare.com/).
2. In the left sidebar, go to **Workers & Pages** → click **Create** → select the **Pages** tab → click **Connect to Git**.
3. Authorize Cloudflare to access your GitHub account and select the `politics-insights-007` repository.
4. Configure the build settings exactly as follows:
   - **Project name:** `politics-insights-007`
   - **Production branch:** `main`
   - **Framework preset:** `Vite` (or `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** Add `NODE_VERSION` = `22`
5. Click **Save and Deploy**.
6. Within ~1 minute, Cloudflare will run `npm run build` (which compiles all Markdown articles, runs TypeScript + Vite, and pre-renders static Open Graph + JSON-LD HTML files for every route) and give you a staging URL: `https://politics-insights-007.pages.dev`.

---

## 3. Live DNS Inspection Report for `politicsinsights007.com`

Before recommending any DNS changes, we inspected the live DNS records of `politicsinsights007.com` and `www.politicsinsights007.com`:

| Record Host | Type | Current Live Value | TTL | Purpose / Finding |
| :--- | :--- | :--- | :--- | :--- |
| `politicsinsights007.com` | `NS` | `ns-cloud-a1.googledomains.com` (through `a4`) | `21600` | Currently using Google Cloud DNS / Squarespace Domains (migrated from Google Domains). |
| `politicsinsights007.com` | `SOA` | `ns-cloud-a1.googledomains.com` | `21600` | Standard Start of Authority record. |
| `politicsinsights007.com` | `TXT` | `v=spf1 -all` | `14400` | Anti-spoofing SPF policy indicating no outbound mail server is currently active. **Preserve this record** unless you add a custom email provider. |
| `politicsinsights007.com` | `A` / `AAAA` | *(None configured)* | — | Apex domain currently has no web server IP assigned. |
| `politicsinsights007.com` | `MX` | *(None configured)* | — | No custom domain email server currently active. |
| `www.politicsinsights007.com` | `CNAME` | `ghs.google.com` | `5489` | Previously pointed to Google Hosted Services (Blogger / Google Sites). **Must be updated** to point to Cloudflare Pages. |

---

## 4. Connecting `https://www.politicsinsights007.com/` & Enabling HTTPS

You have two safe ways to connect your domain to Cloudflare Pages. **Option A (Full Cloudflare DNS Zone)** is strongly recommended by Cloudflare because it supports both `www.politicsinsights007.com` and apex `politicsinsights007.com` redirects with automatic HTTPS.

### Option A (Recommended): Connect via Cloudflare DNS Zone (Supports Both `www` and Apex Redirects)
1. In your Cloudflare Dashboard, click **Websites** → **Add a domain** → enter `politicsinsights007.com` → choose the **Free ($0/month)** plan.
2. Cloudflare will scan your existing records. Verify that your existing `TXT` record (`v=spf1 -all`) is preserved.
3. Go to **Workers & Pages** → select your `politics-insights-007` project → **Custom domains** → click **Set up a custom domain**:
   - Add `www.politicsinsights007.com` (Primary canonical domain)
   - Add `politicsinsights007.com` (Apex domain)
   Cloudflare will automatically create the exact `CNAME` records pointing to `politics-insights-007.pages.dev` (delete the old `www` `CNAME` pointing to `ghs.google.com` if imported).
4. In your domain registrar dashboard (Squarespace Domains / Google Domains), replace the 4 `ns-cloud-a*.googledomains.com` nameservers with the 2 Cloudflare nameservers provided in your Cloudflare dashboard.
5. **Configure Canonical Redirect (`politicsinsights007.com` → `https://www.politicsinsights007.com`):**
   - In Cloudflare Dashboard → **Rules** → **Redirect Rules** → click **Create rule** (or use the built-in "Redirect apex to www" template):
   - **If:** Hostname equals `politicsinsights007.com`
   - **Then:** Dynamic Redirect to `concat("https://www.politicsinsights007.com", http.request.uri.path)` with Status Code `301 (Permanent Redirect)` and check **Preserve query string**.
6. **Enable Strict HTTPS:**
   - In Cloudflare Dashboard → **SSL/TLS** → **Edge Certificates**:
   - Enable **Always Use HTTPS** (`On`).
   - Set **Minimum TLS Version** to `TLS 1.2`.

### Option B (Alternative): Keep Google/Squarespace Nameservers (CNAME Only for `www`)
If you prefer not to change nameservers:
1. In Cloudflare Pages → **Custom domains** → add `www.politicsinsights007.com`.
2. Log in to your Google Domains / Squarespace Domains DNS settings.
3. Edit the existing `CNAME` record for host `www`:
   - Change Value from `ghs.google.com` to `politics-insights-007.pages.dev`
4. Keep your existing `TXT` (`v=spf1 -all`) record untouched.
5. In Squarespace/Google Domains **Website / Forwarding** settings, set a `301 Permanent Forward` from `politicsinsights007.com` to `https://www.politicsinsights007.com`.

### Verification Checklist After DNS Propagation:
- Open `https://www.politicsinsights007.com/` — verify the padlock (HTTPS) is active and the homepage loads.
- Open `http://politicsinsights007.com/` and `https://politicsinsights007.com/` — verify both redirect (`301`) to `https://www.politicsinsights007.com/`.
- Test an article URL directly: `https://www.politicsinsights007.com/article/parliamentary-standing-committee-oversight-framework`.

---

## 5. Domain Renewal vs. Hosting Cost Disclosure

- **Hosting Cost (Cloudflare Pages Free Tier):** **$0.00 / month**
- **SSL/HTTPS Certificate (Cloudflare Universal SSL):** **$0.00 / year**
- **Existing Custom Domain (`politicsinsights007.com`):** Already owned ($0 initial purchase cost). However, every `.com` domain requires an **annual registrar renewal fee** (typically **~$12 to $20 USD/year** depending on your current registrar, or ~$10.44/year at wholesale cost if transferred to Cloudflare Registrar). Never let your domain expire, as losing a domain disrupts search rankings and AdSense approval.

---

## 6. Google Search Console Setup (Free Indexing & SEO Monitoring)

1. Go to [https://search.google.com/search-console](https://search.google.com/search-console).
2. Add property: `https://www.politicsinsights007.com/`.
3. Verify ownership using the **DNS TXT record** method (add the provided `google-site-verification=...` TXT record in your DNS settings alongside your existing records).
4. Once verified, go to **Sitemaps** in the left menu and submit:
   `https://www.politicsinsights007.com/sitemap.xml`
