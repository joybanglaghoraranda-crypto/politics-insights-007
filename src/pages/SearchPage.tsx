import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ArticleCard } from '../components/ArticleCard';
import { CATEGORIES } from '../config/categories';
import { searchArticles } from '../lib/articles';
import { ContentType } from '../types/article';
import { toBengaliNumber } from '../config/site';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<ContentType | 'all'>('all');
  const [selectedLang, setSelectedLang] = useState<'all' | 'bn' | 'en'>('all');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const results = searchArticles(query, {
    categorySlug: selectedCategory,
    contentType: selectedType,
    language: selectedLang,
  });

  const popularTopics = [
    'সংসদ',
    'নির্বাচন',
    'বাজেট',
    'কূটনীতি',
    'মূল্যস্ফীতি',
    'সংবিধান',
    'জলবায়ু',
    'Governance',
  ];

  return (
    <>
      <SEOHead
        title="সংবাদ অনুসন্ধান (Search Articles)"
        description="পলিটিক্স ইনসাইটস ০০৭-এ প্রকাশিত সকল সংবাদ, মতামত, বিশ্লেষণ ও ব্যাখ্যামূলক প্রতিবেদন অনুসন্ধান করুন।"
        canonicalPath="/search"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white border-t-4 border-t-[#0B192C] border border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              সংবাদ ও বিশ্লেষণ অনুসন্ধান (Search Archive)
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              শিরোনাম, বিষয়বস্তু, ট্যাগ, লেখক বা বিভাগ অনুযায়ী প্রকাশিত সকল প্রতিবেদন খুঁজুন (কোনো পেইড সার্চ এপিআই ছাড়াই তাৎক্ষণিক ক্লায়েন্ট-সাইড অনুসন্ধান)।
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="বাংলা বা ইংরেজিতে শব্দ লিখুন (যেমন: সংসদ, বাজেট, নির্বাচন, কূটনীতি)..."
                aria-label="সংবাদ অনুসন্ধান ইনপুট"
                className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xs text-base text-slate-900 focus:outline-none focus:border-red-800 focus:bg-white"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSearchParams({});
                  }}
                  aria-label="অনুসন্ধান মুছে ফেলুন"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-red-800 hover:bg-red-900 text-white font-bold text-sm rounded-xs transition-colors cursor-pointer"
            >
              অনুসন্ধান করুন
            </button>
          </form>

          {/* Popular Topic Quick Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-500">জনপ্রিয় অনুসন্ধান:</span>
            {popularTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  setQuery(topic);
                  setSearchParams({ q: topic });
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-800 font-semibold rounded-xs border border-slate-200 cursor-pointer"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="filter-category"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                বিভাগ (Category)
              </label>
              <select
                id="filter-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xs focus:outline-none focus:border-red-800"
              >
                <option value="all">সকল বিভাগ (All Categories)</option>
                {CATEGORIES.filter((c) => c.slug !== 'latest-news').map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.nameBn} ({cat.nameEn})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-type"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                প্রতিবেদনের ধরন (Content Type)
              </label>
              <select
                id="filter-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ContentType | 'all')}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xs focus:outline-none focus:border-red-800"
              >
                <option value="all">সকল ধরন (All Types)</option>
                <option value="news">মূল প্রতিবেদন (News Report)</option>
                <option value="opinion">মতামত (Opinion)</option>
                <option value="analysis">বিশ্লেষণ (Analysis)</option>
                <option value="explainer">তথ্যভিত্তিক ব্যাখ্যা (Explainer)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-lang"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                ভাষা (Language)
              </label>
              <select
                id="filter-lang"
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value as 'all' | 'bn' | 'en')}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xs focus:outline-none focus:border-red-800"
              >
                <option value="all">বাংলা ও English (All)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results Summary & Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-700">
            <span className="font-bold flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-red-800" />
              প্রাপ্ত ফলাফল: {toBengaliNumber(results.length)}টি প্রতিবেদন
              {query.trim() && <span>(“{query.trim()}”-এর জন্য)</span>}
            </span>
            {(query ||
              selectedCategory !== 'all' ||
              selectedType !== 'all' ||
              selectedLang !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                  setSelectedType('all');
                  setSelectedLang('all');
                  setSearchParams({});
                }}
                className="text-xs font-bold text-red-800 hover:underline cursor-pointer"
              >
                সকল ফিল্টার রিসেট করুন
              </button>
            )}
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="standard" />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 p-10 text-center space-y-3">
              <h2 className="text-xl font-bold text-slate-900">
                আপনার অনুসন্ধানের সাথে মিলে এমন কোনো প্রতিবেদন পাওয়া যায়নি
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                বানান পরিবর্তন করে চেষ্টা করুন অথবা নিচের বিভাগগুলো থেকে সর্বশেষ প্রতিবেদন ব্রাউজ করুন।
              </p>
              <div className="pt-2">
                <Link
                  to="/category/latest-news"
                  className="inline-block px-4 py-2 bg-[#0B192C] text-white text-xs font-bold rounded-xs"
                >
                  সর্বশেষ সকল সংবাদ দেখুন
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
