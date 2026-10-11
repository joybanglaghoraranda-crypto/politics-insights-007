import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Flame,
  BookmarkCheck,
  Scale,
  Landmark,
  Vote,
  TrendingUp,
  Globe2,
  Handshake,
  MessageSquareQuote,
  BarChart3,
  Info,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ArticleCard } from '../components/ArticleCard';
import { AdSlot } from '../components/AdSlot';
import {
  getPublishedArticles,
  getLeadArticle,
  getEditorPickArticles,
  getArticlesByCategorySlug,
} from '../lib/articles';
import { SITE_CONFIG } from '../config/site';

interface SectionHeaderProps {
  titleBn: string;
  titleEn: string;
  categorySlug: string;
  icon?: React.ReactNode;
  accentColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  titleBn,
  titleEn,
  categorySlug,
  icon,
  accentColor = 'border-red-800',
}) => (
  <div
    className={`flex items-center justify-between border-b-2 ${accentColor} pb-2.5 mb-5`}
  >
    <div className="flex items-center gap-2.5">
      {icon && <span className="text-red-800">{icon}</span>}
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
        {titleBn}
      </h2>
      <span className="hidden sm:inline-block text-xs font-serif uppercase tracking-widest text-slate-500 border-l border-slate-300 pl-2.5">
        {titleEn}
      </span>
    </div>
    <Link
      to={`/category/${categorySlug}`}
      className="text-xs sm:text-sm font-bold text-red-800 hover:text-red-950 inline-flex items-center gap-1 group"
    >
      <span>সব দেখুন</span>
      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  </div>
);

export const HomePage: React.FC = () => {
  const allPublished = getPublishedArticles();
  const leadArticle = getLeadArticle();
  const latestFeed = allPublished
    .filter((a) => a.slug !== leadArticle?.slug)
    .slice(0, 6);
  const editorPicks = getEditorPickArticles(4);

  const bdPoliticsArticles = [
    ...getArticlesByCategorySlug('bangladesh-politics'),
    ...getArticlesByCategorySlug('bangladesh'),
  ].filter((v, i, arr) => arr.findIndex((x) => x.slug === v.slug) === i);

  const intlPoliticsArticles = [
    ...getArticlesByCategorySlug('world-politics'),
    ...getArticlesByCategorySlug('international'),
  ].filter((v, i, arr) => arr.findIndex((x) => x.slug === v.slug) === i);

  const govPolicyArticles = getArticlesByCategorySlug('government-policy');
  const electionArticles = getArticlesByCategorySlug('elections');
  const economyArticles = getArticlesByCategorySlug('economy');
  const diplomacyArticles = getArticlesByCategorySlug('diplomacy');
  const opinionArticles = getArticlesByCategorySlug('opinion-analysis');
  const explainerArticles = getArticlesByCategorySlug('explainers');
  const societyTechArticles = [
    ...getArticlesByCategorySlug('society'),
    ...getArticlesByCategorySlug('technology'),
  ];

  const hasSampleArticles = allPublished.some((a) => a.isSample);

  return (
    <>
      <SEOHead
        title="পলিটিক্স ইনসাইটস ০০৭ | Politics Insights 007 — রাজনীতি, নীতি ও বিশ্বপরিসর"
        description="পলিটিক্স ইনসাইটস ০০৭ (Politics Insights 007) — বাংলাদেশ ও বিশ্ব রাজনীতি, নির্বাচন, সরকারি নীতি, অর্থনীতি, কূটনীতি এবং তথ্যভিত্তিক বিশ্লেষণের নির্ভরযোগ্য ডিজিটাল সংবাদ মাধ্যম।"
        canonicalPath="/"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12">
        {/* Sample Demonstration Content Banner (Automatically disappears once all sample articles are replaced) */}
        {hasSampleArticles && (
          <div className="bg-amber-50/90 border-l-4 border-amber-700 border border-amber-200 p-3.5 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-950">
            <div className="flex items-start sm:items-center gap-2.5">
              <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5 sm:mt-0" />
              <p>
                <strong>প্রদর্শনী সংস্করণ বিজ্ঞপ্তি (Demonstration Content Notice):</strong> ওয়েবসাইটের কাঠামো, বিভাগ ও ফিচার পরীক্ষার জন্য এখানে <strong>[নমুনা প্রতিবেদন]</strong> যুক্ত রয়েছে। গিটহাবে নতুন যাচাইকৃত সংবাদ যুক্ত করলে এগুলো স্বয়ংক্রিয়ভাবে প্রতিস্থাপিত হবে।
              </p>
            </div>
            <Link
              to="/editorial-policy"
              className="font-bold text-amber-900 underline shrink-0 hover:text-red-800"
            >
              সম্পাদকীয় নীতিমালা দেখুন →
            </Link>
          </div>
        )}

        {/* Top Above-the-Fold Grid: Lead Story + Latest News Feed + Editor-Selected Important Stories */}
        <section aria-label="প্রধান সংবাদ ও সর্বশেষ প্রবাহ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Lead Story (7 columns on desktop) */}
            <div className="lg:col-span-7 space-y-6">
              {leadArticle && <ArticleCard article={leadArticle} variant="lead" />}

              {/* Editor-Selected Important Stories (Sub-grid below Lead Story) */}
              <div className="bg-white border border-slate-200 p-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <BookmarkCheck className="w-5 h-5 text-red-800" />
                    <h2 className="text-lg font-extrabold text-slate-900">
                      সম্পাদকীয় পছন্দ (Editor-Selected Stories)
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">গুরুত্বপূর্ণ প্রতিবেদন</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {editorPicks.slice(0, 4).map((article) => (
                    <ArticleCard key={article.slug} article={article} variant="compact" />
                  ))}
                </div>
              </div>
            </div>

            {/* Latest News Feed (5 columns on desktop) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-5 sm:p-6">
              <div className="flex items-center justify-between border-b-2 border-[#0B192C] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-700" />
                  <h2 className="text-xl font-extrabold text-slate-900">
                    সর্বশেষ সংবাদ (Latest News)
                  </h2>
                </div>
                <Link
                  to="/category/latest-news"
                  className="text-xs font-bold text-red-800 hover:underline"
                >
                  সব সংবাদ →
                </Link>
              </div>

              <div className="divide-y divide-slate-200">
                {latestFeed.map((article, idx) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    variant="compact"
                    indexNumber={idx + 1}
                  />
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
                <Link
                  to="/category/latest-news"
                  className="w-full text-center py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-bold rounded-xs transition-colors"
                >
                  সর্বশেষ সকল প্রতিবেদন পড়ুন →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Reserved Monetization Container (Hidden until enabled) */}
        <AdSlot slotId="home-top-leaderboard" format="leaderboard" />

        {/* Section: Bangladesh Politics & National Affairs */}
        <section aria-label="বাংলাদেশ ও রাজনীতি">
          <SectionHeader
            titleBn="বাংলাদেশ রাজনীতি ও জাতীয় অঙ্গন"
            titleEn="Bangladesh Politics & National Affairs"
            categorySlug="bangladesh-politics"
            icon={<Landmark className="w-5 h-5" />}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bdPoliticsArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} variant="standard" />
            ))}
          </div>
        </section>

        {/* Two-Column Split: Government & Public Policy + Elections & Political Institutions */}
        <section aria-label="সরকার ও নীতি এবং নির্বাচন">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Government & Public Policy */}
            <div className="bg-white border border-slate-200 p-5 sm:p-6">
              <SectionHeader
                titleBn="সরকার ও জননীতি"
                titleEn="Government & Policy"
                categorySlug="government-policy"
                icon={<Scale className="w-5 h-5" />}
              />
              <div className="space-y-4">
                {govPolicyArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="horizontal" />
                ))}
              </div>
            </div>

            {/* Elections & Political Institutions */}
            <div className="bg-white border border-slate-200 p-5 sm:p-6">
              <SectionHeader
                titleBn="নির্বাচন ও রাজনৈতিক প্রতিষ্ঠান"
                titleEn="Elections & Institutions"
                categorySlug="elections"
                icon={<Vote className="w-5 h-5" />}
              />
              <div className="space-y-4">
                {electionArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="horizontal" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Data-Driven Explainers (Highlighted Dark Editorial Band) */}
        <section
          aria-label="ব্যাখ্যা ও তথ্যচিত্র"
          className="bg-[#0B192C] text-white p-6 sm:p-8 rounded-xs border-l-4 border-red-600 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-red-400" />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  তথ্যভিত্তিক ব্যাখ্যা ও ডেটা বিশ্লেষণ (Data-Driven Explainers)
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  সংবিধান, বাজেট, নির্বাচন পদ্ধতি ও জটিল রাষ্ট্রীয় নীতির সহজবোধ্য ব্যাখ্যা
                </p>
              </div>
            </div>
            <Link
              to="/category/explainers"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-red-800 hover:bg-red-700 text-white px-3.5 py-2 rounded-xs self-start sm:self-auto transition-colors"
            >
              <span>সকল ব্যাখ্যা দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {explainerArticles.slice(0, 2).map((article) => (
              <div
                key={article.slug}
                className="bg-slate-900/90 border border-slate-800 p-5 rounded-xs flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-teal-300 font-bold uppercase tracking-wider mb-2">
                    <span>তথ্যভিত্তিক ব্যাখ্যা • EXPLAINER</span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug mb-2.5 hover:text-red-300 transition-colors">
                    <Link to={`/article/${encodeURIComponent(article.slug)}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>{article.author}</span>
                  <Link
                    to={`/article/${encodeURIComponent(article.slug)}`}
                    className="text-red-400 hover:text-red-300 font-bold"
                  >
                    সম্পূর্ণ ব্যাখ্যা পড়ুন →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: International Politics & Diplomacy */}
        <section aria-label="আন্তর্জাতিক রাজনীতি ও কূটনীতি">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* International & World Politics (7 cols) */}
            <div className="lg:col-span-7">
              <SectionHeader
                titleBn="বিশ্ব রাজনীতি ও আন্তর্জাতিক পরিক্রমা"
                titleEn="International & World Politics"
                categorySlug="world-politics"
                icon={<Globe2 className="w-5 h-5" />}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {intlPoliticsArticles.slice(0, 2).map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="standard" />
                ))}
              </div>
            </div>

            {/* Diplomacy & World Affairs (5 cols) */}
            <div className="lg:col-span-5">
              <SectionHeader
                titleBn="কূটনীতি ও পররাষ্ট্রনীতি"
                titleEn="Diplomacy & Foreign Affairs"
                categorySlug="diplomacy"
                icon={<Handshake className="w-5 h-5" />}
              />
              <div className="space-y-4">
                {diplomacyArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="standard" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Economy & Business + Society & Technology */}
        <section aria-label="অর্থনীতি, সমাজ ও প্রযুক্তি">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <SectionHeader
                titleBn="অর্থনীতি ও রাজনৈতিক অর্থনীতি"
                titleEn="Economy & Business"
                categorySlug="economy"
                icon={<TrendingUp className="w-5 h-5" />}
              />
              <div className="space-y-4">
                {economyArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="horizontal" />
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <SectionHeader
                titleBn="সমাজ, নাগরিক ও প্রযুক্তি নীতি"
                titleEn="Society & Technology"
                categorySlug="society"
              />
              <div className="space-y-4">
                {societyTechArticles.slice(0, 2).map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="horizontal" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Opinion and Analysis (Clearly Distinguished from News Reporting) */}
        <section
          aria-label="মতামত ও বিশ্লেষণ"
          className="bg-amber-950/5 border border-amber-900/20 p-6 sm:p-8 rounded-xs"
        >
          <SectionHeader
            titleBn="মতামত ও গভীর বিশ্লেষণ"
            titleEn="Opinion & Analysis"
            categorySlug="opinion-analysis"
            icon={<MessageSquareQuote className="w-5 h-5 text-amber-900" />}
            accentColor="border-amber-800"
          />
          <p className="text-xs text-slate-600 mb-5">
            *মতামত ও বিশ্লেষণ বিভাগে প্রকাশিত নিবন্ধগুলো লেখকদের নিজস্ব গবেষণালব্ধ দৃষ্টিভঙ্গি; এটি মূল সংবাদ প্রতিবেদন থেকে স্বতন্ত্র।*
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opinionArticles.slice(0, 2).map((article) => (
              <ArticleCard key={article.slug} article={article} variant="opinion" />
            ))}
          </div>
        </section>

        {/* Facebook Community & Reader Tip Callout */}
        <section
          aria-label="ফেসবুক ও পাঠক সংযোগ"
          className="bg-white border-2 border-slate-900 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-800">
              পাঠক সংযোগ ও সামাজিক মাধ্যম • COMMUNITY &amp; NEWSROOM
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              পলিটিক্স ইনসাইটস ০০৭-এর অফিসিয়াল ফেসবুক পেজে যুক্ত থাকুন
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              প্রতিদিনের যাচাইকৃত রাজনৈতিক বিশ্লেষণ, ডেটা গ্রাফিক্স এবং তাৎক্ষণিক সংবাদের আপডেট পেতে আমাদের অফিসিয়াল ফেসবুক পেজ অনুসরণ করুন অথবা জনস্বার্থ সংশ্লিষ্ট যেকোনো প্রামাণ্য তথ্য আমাদের বার্তা কক্ষে পাঠান।
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={SITE_CONFIG.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-5 py-2.5 rounded-xs transition-colors"
            >
              Facebook পেজ ভিজিট করুন
            </a>
            <Link
              to="/submit-tip"
              className="bg-[#0B192C] hover:bg-slate-800 text-white font-bold text-sm px-5 py-2.5 rounded-xs transition-colors"
            >
              সংবাদ সূত্র পাঠান
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
