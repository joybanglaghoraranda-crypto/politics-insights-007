import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  Clock,
  BookOpen,
  User,
  Share2,
  Check,
  Copy,
  ExternalLink,
  AlertTriangle,
  FileCheck2,
  MessageSquareWarning,
  Sparkles,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ArticleCard } from '../components/ArticleCard';
import { AdSlot } from '../components/AdSlot';
import {
  getArticleBySlug,
  getRelatedArticles,
  getContentTypeMeta,
} from '../lib/articles';
import { getCategoryByName, getCategorySlug } from '../config/categories';
import {
  SITE_CONFIG,
  formatBengaliDate,
  formatEnglishDate,
  toBengaliNumber,
} from '../config/site';

export const ArticlePage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedFbCaption, setCopiedFbCaption] = useState(false);
  const [showFbHelper, setShowFbHelper] = useState(false);

  const article = getArticleBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCopiedLink(false);
    setCopiedFbCaption(false);
  }, [slug]);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <SEOHead
          title="প্রতিবেদনটি পাওয়া যায়নি (Article Not Found)"
          description="অনুরোধকৃত সংবাদ প্রতিবেদনটি খুঁজে পাওয়া যায়নি।"
          canonicalPath={`/article/${slug}`}
        />
        <h1 className="text-3xl font-extrabold text-slate-900">
          প্রতিবেদনটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-slate-600">
          লিংকটি পরিবর্তিত হতে পারে অথবা প্রতিবেদনটি বর্তমানে অপ্রকাশিত (Draft) অবস্থায় রয়েছে।
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 bg-[#0B192C] text-white font-bold text-sm rounded-xs"
          >
            প্রচ্ছদে ফিরে যান
          </Link>
          <Link
            to="/search"
            className="px-5 py-2.5 bg-white border border-slate-300 text-slate-800 font-bold text-sm rounded-xs"
          >
            সংবাদ খুঁজুন
          </Link>
        </div>
      </div>
    );
  }

  const categoryDef = getCategoryByName(article.category);
  const categorySlug = getCategorySlug(article.category);
  const categoryLabel =
    article.language === 'en'
      ? categoryDef?.nameEn || article.category
      : categoryDef?.nameBn || article.category;

  const contentTypeMeta = getContentTypeMeta(article.contentType);
  const formattedPubDate =
    article.language === 'en'
      ? formatEnglishDate(article.date)
      : formatBengaliDate(article.date);
  const formattedUpdateDate = article.updatedAt
    ? article.language === 'en'
      ? formatEnglishDate(article.updatedAt)
      : formatBengaliDate(article.updatedAt)
    : '';
  const readingTimeLabel =
    article.language === 'en'
      ? `${article.readingTimeMinutes} min read`
      : `${toBengaliNumber(article.readingTimeMinutes)} মিনিট পাঠ`;

  const canonicalUrl = `${SITE_CONFIG.siteUrl}/article/${encodeURIComponent(article.slug)}`;
  const fbTrackedUrl = `${canonicalUrl}?utm_source=facebook&utm_medium=social&utm_campaign=article_share`;
  const facebookShareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    fbTrackedUrl
  )}`;
  const twitterShareHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    canonicalUrl
  )}&text=${encodeURIComponent(article.title)}`;
  const whatsappShareHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${article.title} — ${canonicalUrl}`
  )}`;

  const generatedFacebookPostText = `📌 ${article.title}\n\n${article.summary}\n\n🔗 বিস্তারিত প্রতিবেদন ও সূত্র পড়ুন:\n${fbTrackedUrl}\n\n#${categorySlug.replace(
    /-/g,
    ''
  )} #PoliticsInsights007 #BangladeshPolitics`;

  const handleCopyCanonical = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback ignored
    }
  };

  const handleCopyFbCaption = async () => {
    try {
      await navigator.clipboard.writeText(generatedFacebookPostText);
      setCopiedFbCaption(true);
      setTimeout(() => setCopiedFbCaption(false), 2500);
    } catch {
      // Fallback ignored
    }
  };

  const relatedArticles = getRelatedArticles(article, 3);

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.summary}
        canonicalPath={`/article/${article.slug}`}
        ogImage={article.featuredImage}
        ogType="article"
        publishedDate={article.date}
        modifiedDate={article.updatedAt}
        category={article.category}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 mb-6"
        >
          <Link to="/" className="hover:text-red-800 font-medium">
            প্রচ্ছদ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            to={`/category/${categorySlug}`}
            className="hover:text-red-800 font-semibold text-red-800"
          >
            {categoryLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Sample Demonstration Content Banner */}
        {article.isSample && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-700 border border-amber-200 p-4 rounded-xs flex items-start gap-3 text-xs sm:text-sm text-amber-950">
            <AlertTriangle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong>নমুনা প্রতিবেদন (Sample Demonstration Article):</strong> এই নিবন্ধটি ওয়েবসাইটের ডিজাইন, ফন্ট, মেটাডেটা এবং কন্টেন্ট কাঠামো প্রদর্শনের জন্য তৈরি। এটি কোনো ব্রেকিং ঘটনা বা কাল্পনিক সংবাদের দাবি করে না। গিটহাব থেকে প্রকৃত সংবাদ প্রকাশের সময় এই ডেমো নিবন্ধগুলো মুছে ফেলা বা প্রতিস্থাপন করা যাবে।
            </div>
          </div>
        )}

        {/* Content-Type Specific Disclosures (Opinion / Analysis / Sponsored) */}
        {contentTypeMeta.isOpinionOrAnalysis && (
          <div className="mb-6 bg-slate-900 text-slate-100 p-4 rounded-xs border-l-4 border-amber-500 text-xs sm:text-sm">
            <strong>{contentTypeMeta.labelBn} ({contentTypeMeta.labelEn}) বিভাগীয় বিজ্ঞপ্তি:</strong> এই নিবন্ধটি একটি{' '}
            {contentTypeMeta.labelBn}মূলক রচনা। এতে প্রকাশিত দৃষ্টিভঙ্গি ও বিশ্লেষণ মূল সংবাদ প্রতিবেদন থেকে স্বতন্ত্র।
          </div>
        )}

        {article.contentType === 'sponsored' && (
          <div className="mb-6 bg-stone-100 border-l-4 border-stone-700 p-4 rounded-xs text-xs sm:text-sm text-stone-900">
            <strong>স্পন্সরড কন্টেন্ট (Sponsored Content Disclosure):</strong> এই নিবন্ধটি বিজ্ঞাপনদাতার সহযোগিতায় প্রকাশিত। পলিটিক্স ইনসাইটস ০০৭-এর বার্তা কক্ষ এর সম্পাদকীয় সংবাদের সাথে স্পন্সরড কন্টেন্টের কোনো সংমিশ্রণ করে না।
          </div>
        )}

        {/* Article Header Block */}
        <header className="bg-white border border-slate-200 p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <Link
              to={`/category/${categorySlug}`}
              className="text-xs font-extrabold uppercase tracking-wider text-red-800 bg-red-50 px-2.5 py-1 rounded-xs border border-red-200 hover:bg-red-100"
            >
              {categoryLabel}
            </Link>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-xs border ${contentTypeMeta.badgeClass}`}
            >
              {contentTypeMeta.labelBn} • {contentTypeMeta.labelEn}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-[1.32] mb-4">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed border-l-3 border-red-800 pl-4 mb-6">
            {article.summary}
          </p>

          {/* Author, Dates, and Social Share Toolbar */}
          <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <User className="w-4 h-4 text-red-800" />
                <span>{article.author}</span>
                {article.authorRole && (
                  <span className="font-normal text-slate-500">({article.authorRole})</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  প্রকাশিত: {formattedPubDate}
                </span>
                {formattedUpdateDate && formattedUpdateDate !== formattedPubDate && (
                  <span>• হালনাগাদ: {formattedUpdateDate}</span>
                )}
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {readingTimeLabel}
                </span>
              </div>
            </div>

            {/* Social Sharing & Facebook Caption Generator Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={facebookShareHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ফেসবুকে শেয়ার করুন (Share on Facebook)"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xs transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Facebook শেয়ার</span>
              </a>

              <a
                href={whatsappShareHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="হোয়াটসঅ্যাপে শেয়ার করুন"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xs transition-colors"
              >
                <span>WhatsApp</span>
              </a>

              <a
                href={twitterShareHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="এক্স/টুইটারে শেয়ার করুন"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xs transition-colors"
              >
                <span>X</span>
              </a>

              <button
                type="button"
                onClick={handleCopyCanonical}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xs border border-slate-300 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>লিংক কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>লিংক কপি</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowFbHelper(!showFbHelper)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-xs border border-amber-300 cursor-pointer"
                title="ফেসবুক পেজে পোস্ট করার জন্য প্রস্তুত ক্যাপশন"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>FB ক্যাপশন</span>
              </button>
            </div>
          </div>

          {/* Ready-to-Use Facebook Page Post Caption Helper */}
          {showFbHelper && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-300 rounded-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  অফিসিয়াল ফেসবুক পেজে শেয়ারের জন্য প্রস্তুত ক্যাপশন (UTM ট্র্যাকিং যুক্ত):
                </span>
                <button
                  type="button"
                  onClick={handleCopyFbCaption}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-[#0B192C] text-white px-2.5 py-1 rounded-xs cursor-pointer"
                >
                  {copiedFbCaption ? 'কপি সম্পন্ন!' : 'ক্যাপশন কপি করুন'}
                </button>
              </div>
              <pre className="text-xs bg-white p-3 border border-slate-200 rounded-xs whitespace-pre-wrap font-sans text-slate-800">
                {generatedFacebookPostText}
              </pre>
            </div>
          )}
        </header>

        {/* Featured Image & Attribution */}
        <figure className="bg-white border border-slate-200 overflow-hidden mb-8">
          <div className="aspect-16/9 bg-slate-900 overflow-hidden">
            <img
              src={article.featuredImage}
              alt={article.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-600">
            <span>{article.imageAlt}</span>
            {article.imageCredit && (
              <span className="font-semibold text-slate-500">
                ছবি ও অলংকরণ: {article.imageCredit}
              </span>
            )}
          </figcaption>
        </figure>

        {/* Main Article Body */}
        <div className="bg-white border border-slate-200 p-6 sm:p-10 mb-8">
          <div
            className="article-prose max-w-none text-slate-800 leading-[1.85] text-base sm:text-[17.5px] space-y-5"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />

          {/* In-Article Reserved Ad Slot (Hidden unless enabled) */}
          <AdSlot slotId="article-inline" format="in-article" />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-1">প্রাসঙ্গিক বিষয়:</span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="text-xs font-semibold px-2.5 py-1 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-800 rounded-xs border border-slate-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Verified Sources & Citations Section */}
        <section
          aria-label="তথ্যসূত্র ও নথিপত্র"
          className="bg-white border border-slate-200 p-6 mb-8"
        >
          <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base mb-3">
            <FileCheck2 className="w-5 h-5 text-emerald-700" />
            <h2>তথ্যসূত্র ও প্রাসঙ্গিক দলিল (Sources &amp; Citations)</h2>
          </div>
          {article.sources && article.sources.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {article.sources.map((src, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500 mt-0.5">
                    [{index + 1}]
                  </span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-800 hover:underline font-medium inline-flex items-center gap-1 break-all"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-600">
              এই প্রতিবেদনের তথ্য পলিটিক্স ইনসাইটস ০০৭-এর নিজস্ব ডেস্ক পর্যালোচনার ওপর ভিত্তি করে প্রস্তুত।
            </p>
          )}
        </section>

        {/* Corrections & Editorial Accountability Box */}
        <section
          aria-label="সংশোধনী ও মতামত"
          className="bg-slate-100 border border-slate-300 p-5 rounded-xs mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-slate-700"
        >
          <div className="flex items-start gap-3">
            <MessageSquareWarning className="w-5 h-5 text-red-800 shrink-0 mt-0.5" />
            <div>
              <strong>তথ্যগত শুদ্ধতা ও সংশোধনী প্রক্রিয়া:</strong> এই প্রতিবেদনে কোনো তথ্যগত ত্রুটি বা অসংগতি আপনার নজরে এলে প্রমাণসহ আমাদের জানান। যাচাই সাপেক্ষে আমরা দ্রুত সংশোধনী প্রকাশ করি।
            </div>
          </div>
          <Link
            to="/corrections-policy"
            className="shrink-0 px-3.5 py-2 bg-white border border-slate-300 hover:border-red-800 text-slate-900 font-bold text-xs rounded-xs"
          >
            সংশোধনী নীতিমালা →
          </Link>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section aria-label="সম্পর্কিত প্রতিবেদন">
            <div className="border-b-2 border-[#0B192C] pb-2.5 mb-5 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900">
                সম্পর্কিত অন্যান্য প্রতিবেদন (Related Articles)
              </h2>
              <Link
                to={`/category/${categorySlug}`}
                className="text-xs font-bold text-red-800 hover:underline"
              >
                আরও দেখুন →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.slug} article={rel} variant="standard" />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
};
