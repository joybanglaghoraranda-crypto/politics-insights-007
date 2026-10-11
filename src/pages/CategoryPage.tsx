import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, FolderOpen, Filter } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ArticleCard } from '../components/ArticleCard';
import { CATEGORIES, getCategoryBySlug } from '../config/categories';
import { getArticlesByCategorySlug, getPublishedArticles } from '../lib/articles';
import { toBengaliNumber } from '../config/site';

const PAGE_SIZE = 6;

export const CategoryPage: React.FC = () => {
  const { slug = 'latest-news' } = useParams<{ slug: string }>();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [languageFilter, setLanguageFilter] = useState<'all' | 'bn' | 'en'>('all');

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setLanguageFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const categoryDef = getCategoryBySlug(slug);
  const rawCategoryArticles = getArticlesByCategorySlug(slug);

  const filteredArticles =
    languageFilter === 'all'
      ? rawCategoryArticles
      : rawCategoryArticles.filter((a) => a.language === languageFilter);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  if (!categoryDef) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <SEOHead
          title="বিভাগটি পাওয়া যায়নি (Category Not Found)"
          description="অনুরোধকৃত সংবাদ বিভাগটি খুঁজে পাওয়া যায়নি।"
          canonicalPath={`/category/${slug}`}
        />
        <h1 className="text-3xl font-extrabold text-slate-900">
          সংবাদ বিভাগটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-slate-600">
          আপনি যে বিভাগের সংবাদ খুঁজছেন তা বর্তমানে তালিকায় নেই। নিচের যেকোনো বৈধ বিভাগ নির্বাচন করুন:
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:border-red-800 text-sm font-bold text-slate-800 rounded-xs"
            >
              {cat.nameBn} ({cat.nameEn})
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const fallbackLatest = getPublishedArticles().slice(0, 3);

  return (
    <>
      <SEOHead
        title={`${categoryDef.nameBn} (${categoryDef.nameEn})`}
        description={categoryDef.descriptionBn}
        canonicalPath={`/category/${categoryDef.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-red-800 font-medium">
            প্রচ্ছদ (Home)
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold">{categoryDef.nameBn}</span>
        </nav>

        {/* Category Masthead Header */}
        <div className="bg-white border-t-4 border-t-red-800 border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-red-800 bg-red-50 px-2.5 py-0.5 rounded-xs border border-red-200">
                {categoryDef.nameEn}
              </span>
              <span className="text-xs text-slate-500">
                মোট প্রতিবেদন: {toBengaliNumber(filteredArticles.length)}টি
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {categoryDef.nameBn}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {categoryDef.descriptionBn}
            </p>
          </div>

          {/* Language Filter Controls */}
          <div className="flex items-center gap-1.5 self-start md:self-auto bg-slate-100 p-1 rounded-xs border border-slate-200">
            <Filter className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1" />
            <button
              type="button"
              onClick={() => setLanguageFilter('all')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xs transition-colors ${
                languageFilter === 'all'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              সব ভাষা ({toBengaliNumber(rawCategoryArticles.length)})
            </button>
            <button
              type="button"
              onClick={() => setLanguageFilter('bn')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xs transition-colors ${
                languageFilter === 'bn'
                  ? 'bg-red-800 text-white'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => setLanguageFilter('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xs transition-colors ${
                languageFilter === 'en'
                  ? 'bg-red-800 text-white'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Articles Grid or Graceful Empty Category State */}
        {visibleArticles.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="standard" />
              ))}
            </div>

            {/* Load More Pagination */}
            {hasMore && (
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="px-6 py-3 bg-[#0B192C] hover:bg-red-800 text-white font-bold text-sm rounded-xs transition-colors cursor-pointer"
                >
                  আরও প্রতিবেদন দেখুন (Load More — বাকি{' '}
                  {toBengaliNumber(filteredArticles.length - visibleCount)}টি)
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Graceful Empty Category Handling */
          <div className="bg-white border border-slate-200 p-8 sm:p-12 text-center space-y-5">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div className="max-w-lg mx-auto space-y-2">
              <h2 className="text-xl font-bold text-slate-900">
                এই বিভাগে বর্তমানে কোনো প্রকাশিত প্রতিবেদন নেই
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>{categoryDef.nameBn} ({categoryDef.nameEn})</strong> বিভাগে নতুন যাচাইকৃত প্রতিবেদন সম্পাদনাধীন রয়েছে। নিচে আমাদের সর্বশেষ প্রকাশিত প্রতিবেদনগুলো দেখতে পারেন।
              </p>
              {languageFilter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setLanguageFilter('all')}
                  className="mt-2 inline-block text-xs font-bold text-red-800 underline"
                >
                  ভাষা ফিল্টার রিসেট করুন (Show All Languages)
                </button>
              )}
            </div>

            {fallbackLatest.length > 0 && (
              <div className="pt-8 border-t border-slate-200 text-left">
                <h3 className="text-base font-extrabold text-slate-900 mb-4">
                  সর্বশেষ প্রকাশিত অন্যান্য প্রতিবেদন:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {fallbackLatest.map((article) => (
                    <ArticleCard key={article.slug} article={article} variant="standard" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Category Directory Bar */}
        <div className="bg-white border border-slate-200 p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            অন্যান্য সংবাদ বিভাগ ব্রাউজ করুন (Browse All Categories)
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className={`px-3 py-1.5 text-xs font-bold rounded-xs border transition-colors ${
                  cat.slug === categoryDef.slug
                    ? 'bg-red-800 text-white border-red-800'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-red-800'
                }`}
              >
                {cat.nameBn}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
