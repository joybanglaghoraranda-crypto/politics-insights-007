import rawArticles from '../generated/articles.json';
import { Article, ContentType } from '../types/article';
import { getCategoryByName, getCategoryBySlug } from '../config/categories';

const allArticles = rawArticles as Article[];

export function getPublishedArticles(): Article[] {
  return allArticles.filter((article) => article.status === 'published');
}

export function getDraftArticles(): Article[] {
  return allArticles.filter((article) => article.status === 'draft');
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getPublishedArticles().find(
    (article) => article.slug.toLowerCase() === decodeURIComponent(slug).toLowerCase()
  );
}

export function getLeadArticle(): Article | undefined {
  const published = getPublishedArticles();
  return published.find((a) => a.isLead) || published[0];
}

export function getBreakingArticles(): Article[] {
  const published = getPublishedArticles();
  const breaking = published.filter((a) => a.isBreaking);
  return breaking.length > 0 ? breaking : published.slice(0, 5);
}

export function getEditorPickArticles(limit = 4): Article[] {
  const published = getPublishedArticles();
  const picks = published.filter((a) => a.editorPick);
  return (picks.length > 0 ? picks : published).slice(0, limit);
}

export function getArticlesByCategorySlug(categorySlug: string): Article[] {
  const published = getPublishedArticles();
  if (categorySlug === 'latest-news') {
    return published;
  }

  const categoryDef = getCategoryBySlug(categorySlug);
  if (!categoryDef) return [];

  return published.filter((article) => {
    const articleCatDef = getCategoryByName(article.category);
    if (articleCatDef && articleCatDef.slug === categoryDef.slug) {
      return true;
    }
    if (
      categorySlug === 'opinion-analysis' &&
      (article.contentType === 'opinion' || article.contentType === 'analysis')
    ) {
      return true;
    }
    if (categorySlug === 'explainers' && article.contentType === 'explainer') {
      return true;
    }
    return false;
  });
}

export function getRelatedArticles(currentArticle: Article, limit = 3): Article[] {
  const published = getPublishedArticles().filter((a) => a.slug !== currentArticle.slug);

  const scored = published.map((candidate) => {
    let score = 0;
    if (candidate.category.toLowerCase() === currentArticle.category.toLowerCase()) {
      score += 4;
    }
    if (candidate.contentType === currentArticle.contentType) {
      score += 2;
    }
    const sharedTags = candidate.tags.filter((t) => currentArticle.tags.includes(t));
    score += sharedTags.length * 2;
    return { candidate, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((item) => item.candidate);
}

export function searchArticles(
  query: string,
  options?: {
    categorySlug?: string;
    contentType?: ContentType | 'all';
    language?: 'all' | 'bn' | 'en';
  }
): Article[] {
  let pool = getPublishedArticles();

  if (options?.categorySlug && options.categorySlug !== 'all') {
    pool = getArticlesByCategorySlug(options.categorySlug);
  }

  if (options?.contentType && options.contentType !== 'all') {
    pool = pool.filter((a) => a.contentType === options.contentType);
  }

  if (options?.language && options.language !== 'all') {
    pool = pool.filter((a) => a.language === options.language);
  }

  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return pool;

  const terms = trimmed.split(/\s+/).filter(Boolean);

  return pool.filter((article) => {
    const searchableText = [
      article.title,
      article.titleEn || '',
      article.summary,
      article.summaryEn || '',
      article.category,
      article.author,
      article.tags.join(' '),
      article.bodyMarkdown,
    ]
      .join(' ')
      .toLowerCase();

    return terms.every((term) => searchableText.includes(term));
  });
}

export function getContentTypeMeta(contentType: ContentType): {
  labelBn: string;
  labelEn: string;
  badgeClass: string;
  isOpinionOrAnalysis: boolean;
} {
  switch (contentType) {
    case 'opinion':
      return {
        labelBn: 'মতামত',
        labelEn: 'Opinion',
        badgeClass: 'bg-amber-900/90 text-amber-50 border-amber-700',
        isOpinionOrAnalysis: true,
      };
    case 'analysis':
      return {
        labelBn: 'বিশ্লেষণ',
        labelEn: 'Analysis',
        badgeClass: 'bg-indigo-950 text-indigo-100 border-indigo-800',
        isOpinionOrAnalysis: true,
      };
    case 'explainer':
      return {
        labelBn: 'তথ্যভিত্তিক ব্যাখ্যা',
        labelEn: 'Explainer',
        badgeClass: 'bg-teal-900 text-teal-50 border-teal-700',
        isOpinionOrAnalysis: false,
      };
    case 'sponsored':
      return {
        labelBn: 'স্পন্সরড কন্টেন্ট',
        labelEn: 'Sponsored',
        badgeClass: 'bg-stone-800 text-stone-100 border-stone-600',
        isOpinionOrAnalysis: false,
      };
    case 'news':
    default:
      return {
        labelBn: 'মূল প্রতিবেদন',
        labelEn: 'News Report',
        badgeClass: 'bg-red-800 text-white border-red-900',
        isOpinionOrAnalysis: false,
      };
  }
}
