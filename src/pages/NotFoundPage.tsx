import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, Home } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ArticleCard } from '../components/ArticleCard';
import { getPublishedArticles } from '../lib/articles';

export const NotFoundPage: React.FC = () => {
  const recentArticles = getPublishedArticles().slice(0, 3);

  return (
    <>
      <SEOHead
        title="৪০৪ - পৃষ্ঠাটি পাওয়া যায়নি (Page Not Found)"
        description="অনুরোধকৃত পৃষ্ঠাটি খুঁজে পাওয়া যায়নি। পলিটিক্স ইনসাইটস ০০৭-এর মূল পাতায় ফিরে যান।"
        canonicalPath="/404"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="bg-white border-t-4 border-t-red-800 border border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-5">
          <div className="w-14 h-14 bg-red-50 text-red-800 rounded-full flex items-center justify-center mx-auto border border-red-200">
            <Compass className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-800">
            ERROR 404 • PAGE NOT FOUND
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            অনুরোধকৃত পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            আপনি যে সংবাদের লিংকটি খুঁজছেন তা স্থানান্তরিত হতে পারে অথবা ঠিকানায় বানানগত ত্রুটি থাকতে পারে। নিচের বাটন ব্যবহার করে প্রচ্ছদে ফিরে যান অথবা সংবাদ অনুসন্ধান করুন।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B192C] hover:bg-slate-800 text-white text-sm font-bold rounded-xs transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>প্রচ্ছদে ফিরে যান (Home)</span>
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-800 hover:bg-red-900 text-white text-sm font-bold rounded-xs transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>সংবাদ অনুসন্ধান করুন (Search)</span>
            </Link>
          </div>
        </div>

        {recentArticles.length > 0 && (
          <section aria-label="সর্বশেষ প্রকাশিত প্রতিবেদন">
            <h2 className="text-xl font-extrabold text-slate-900 border-b-2 border-[#0B192C] pb-2.5 mb-5">
              সর্বশেষ প্রকাশিত প্রতিবেদনসমূহ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="standard" />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};
