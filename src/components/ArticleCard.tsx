import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, AlertCircle } from 'lucide-react';
import { Article } from '../types/article';
import { getCategoryByName, getCategorySlug } from '../config/categories';
import { formatBengaliDate, formatEnglishDate, toBengaliNumber } from '../config/site';
import { getContentTypeMeta } from '../lib/articles';

interface ArticleCardProps {
  article: Article;
  variant?: 'lead' | 'standard' | 'horizontal' | 'compact' | 'opinion';
  indexNumber?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'standard',
  indexNumber,
}) => {
  const categoryDef = getCategoryByName(article.category);
  const categorySlug = getCategorySlug(article.category);
  const categoryLabel =
    article.language === 'en'
      ? categoryDef?.nameEn || article.category
      : categoryDef?.nameBn || article.category;

  const contentTypeMeta = getContentTypeMeta(article.contentType);
  const formattedDate =
    article.language === 'en'
      ? formatEnglishDate(article.date)
      : formatBengaliDate(article.date);
  const readingTimeLabel =
    article.language === 'en'
      ? `${article.readingTimeMinutes} min read`
      : `${toBengaliNumber(article.readingTimeMinutes)} মিনিট পাঠ`;

  const articleUrl = `/article/${encodeURIComponent(article.slug)}`;

  if (variant === 'lead') {
    return (
      <article className="group bg-white border border-slate-200 shadow-xs overflow-hidden">
        <Link to={articleUrl} className="block relative overflow-hidden bg-slate-900 aspect-16/9">
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            loading="eager"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-xs border uppercase tracking-wider ${contentTypeMeta.badgeClass}`}
            >
              {contentTypeMeta.labelBn} • {contentTypeMeta.labelEn}
            </span>
            {article.isSample && (
              <span className="bg-slate-900/90 text-amber-300 border border-amber-500/50 text-[11px] font-semibold px-2.5 py-1 rounded-xs">
                নমুনা প্রতিবেদন (Sample Demo)
              </span>
            )}
          </div>
        </Link>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-red-800 mb-2.5">
            <Link
              to={`/category/${categorySlug}`}
              className="hover:underline uppercase tracking-wider"
            >
              {categoryLabel}
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-normal flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {formattedDate}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-normal flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              {readingTimeLabel}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 leading-[1.32] group-hover:text-red-800 transition-colors mb-3">
            <Link to={articleUrl} className="focus:outline-2 focus:outline-red-800">
              {article.title}
            </Link>
          </h2>

          <p className="text-slate-700 text-base sm:text-[17px] leading-relaxed mb-4">
            <Link to={articleUrl} className="hover:text-slate-900">
              {article.summary}
            </Link>
          </p>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>
              প্রতিবেদক: <strong className="text-slate-800">{article.author}</strong>
            </span>
            <Link
              to={articleUrl}
              className="font-bold text-red-800 hover:text-red-950 inline-flex items-center gap-1"
            >
              বিস্তারিত পড়ুন →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group bg-white border border-slate-200 p-4 flex flex-col sm:flex-row gap-4 items-start hover:border-slate-300 transition-colors">
        <Link
          to={articleUrl}
          className="w-full sm:w-48 shrink-0 aspect-16/10 bg-slate-900 overflow-hidden rounded-xs"
        >
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs mb-1.5">
            <Link
              to={`/category/${categorySlug}`}
              className="font-bold text-red-800 hover:underline"
            >
              {categoryLabel}
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded-xs">
              {contentTypeMeta.labelBn}
            </span>
            {article.language === 'en' && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-xs">
                EN
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-red-800 transition-colors mb-1.5">
            <Link to={articleUrl}>{article.title}</Link>
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-2">
            <Link to={articleUrl}>{article.summary}</Link>
          </p>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{readingTimeLabel}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group py-3.5 first:pt-0 last:pb-0 border-b border-slate-200 last:border-b-0 flex items-start gap-3">
        {indexNumber !== undefined && (
          <span className="text-2xl font-extrabold text-red-800/80 font-mono leading-none mt-0.5 w-6 shrink-0">
            {toBengaliNumber(indexNumber)}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
            <Link
              to={`/category/${categorySlug}`}
              className="font-bold text-red-800 hover:underline"
            >
              {categoryLabel}
            </Link>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
          <h3 className="text-[15px] font-bold text-slate-900 leading-snug group-hover:text-red-800 transition-colors">
            <Link to={articleUrl}>{article.title}</Link>
          </h3>
        </div>
      </article>
    );
  }

  if (variant === 'opinion') {
    return (
      <article className="group bg-[#FDFBF7] border-l-4 border-l-amber-800 border border-slate-200 p-5 flex flex-col justify-between hover:shadow-xs transition-shadow">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-900 text-amber-50 rounded-xs">
              <AlertCircle className="w-3 h-3" />
              {contentTypeMeta.labelBn} • {contentTypeMeta.labelEn}
            </span>
            <span className="text-xs text-slate-500">{formattedDate}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-red-800 transition-colors mb-2.5">
            <Link to={articleUrl}>{article.title}</Link>
          </h3>
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
            <Link to={articleUrl}>{article.summary}</Link>
          </p>
        </div>
        <div className="pt-3 border-t border-amber-900/15 flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-slate-900">{article.author}</p>
            {article.authorRole && <p className="text-slate-500 text-[11px]">{article.authorRole}</p>}
          </div>
          <Link to={articleUrl} className="font-bold text-amber-900 hover:underline">
            পড়ুন →
          </Link>
        </div>
      </article>
    );
  }

  // Default: 'standard' card
  return (
    <article className="group bg-white border border-slate-200 flex flex-col justify-between overflow-hidden hover:border-slate-300 transition-colors">
      <div>
        <Link to={articleUrl} className="block relative aspect-16/10 bg-slate-900 overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-xs border ${contentTypeMeta.badgeClass}`}
          >
            {contentTypeMeta.labelBn}
          </span>
        </Link>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs mb-1.5">
            <Link
              to={`/category/${categorySlug}`}
              className="font-bold text-red-800 hover:underline"
            >
              {categoryLabel}
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{formattedDate}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-red-800 transition-colors mb-2">
            <Link to={articleUrl}>{article.title}</Link>
          </h3>
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            <Link to={articleUrl}>{article.summary}</Link>
          </p>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
        <span className="truncate max-w-[180px]">{article.author}</span>
        <span>{readingTimeLabel}</span>
      </div>
    </article>
  );
};
