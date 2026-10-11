import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedDate?: string;
  modifiedDate?: string;
  category?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '/',
  ogImage = '/images/og-default.svg',
  ogType = 'website',
}) => {
  useEffect(() => {
    const fullTitle = title.includes(SITE_CONFIG.brandNameBn)
      ? title
      : `${title} | ${SITE_CONFIG.brandNameBn} (${SITE_CONFIG.brandNameEn})`;
    document.title = fullTitle;

    const canonicalUrl = `${SITE_CONFIG.siteUrl}${
      canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`
    }`;
    const fullOgImage = ogImage.startsWith('http')
      ? ogImage
      : `${SITE_CONFIG.siteUrl}${ogImage}`;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:type"]', 'content', ogType);
    setMeta('meta[property="og:image"]', 'content', fullOgImage);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', fullOgImage);
  }, [title, description, canonicalPath, ogImage, ogType]);

  return null;
};
