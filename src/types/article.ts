export type ContentType = 'news' | 'opinion' | 'analysis' | 'explainer' | 'sponsored';
export type ArticleStatus = 'published' | 'draft';
export type ArticleLanguage = 'bn' | 'en';

export interface ArticleSource {
  title: string;
  url: string;
}

export interface Article {
  title: string;
  titleEn?: string;
  slug: string;
  date: string;
  updatedAt?: string;
  author: string;
  authorRole?: string;
  category: string;
  tags: string[];
  summary: string;
  summaryEn?: string;
  featuredImage: string;
  imageAlt: string;
  imageCredit: string;
  sources: ArticleSource[];
  contentType: ContentType;
  status: ArticleStatus;
  language: ArticleLanguage;
  isLead?: boolean;
  isBreaking?: boolean;
  editorPick?: boolean;
  isSample?: boolean;
  readingTimeMinutes: number;
  bodyMarkdown: string;
  bodyHtml: string;
  sourcePath?: string;
}

export interface CategoryDefinition {
  slug: string;
  nameEn: string;
  nameBn: string;
  descriptionBn: string;
  descriptionEn: string;
  showInPrimaryNav: boolean;
}
