import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Rss, FileText, Mail, ExternalLink } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CATEGORIES } from '../config/categories';
import { SITE_CONFIG, toBengaliNumber } from '../config/site';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t-4 border-red-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Brand Identity & Editorial Commitment */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <BrandLogo variant="footer" />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong>পলিটিক্স ইনসাইটস ০০৭ (Politics Insights 007)</strong> একটি স্বাধীন ও তথ্যনিষ্ঠ ডিজিটাল সংবাদ ও নীতি-বিশ্লেষণ প্ল্যাটফর্ম। বাংলাদেশ ও আন্তর্জাতিক রাজনীতি, নির্বাচন, সরকারি নীতি, অর্থনীতি ও কূটনীতির প্রামাণ্য প্রতিবেদন ও বিশ্লেষণ পাঠকের কাছে পৌঁছে দেওয়াই আমাদের লক্ষ্য।
            </p>
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xs text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>সম্পাদকীয় শুদ্ধতা ও এআই স্বচ্ছতা অঙ্গীকার</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                প্রতিটি প্রতিবেদন মানব সম্পাদকের যাচাই সাপেক্ষে প্রকাশিত হয়। সংবাদ, মতামত, ব্যাখ্যা ও স্পন্সরড কন্টেন্ট সর্বদা স্পষ্টভাবে আলাদা লেবেল দ্বারা চিহ্নিত করা হয়।
              </p>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="lg:col-span-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              সংবাদ ও বিশ্লেষণ বিভাগসমূহ (Categories)
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-slate-300 hover:text-white hover:underline transition-colors block"
                  >
                    {category.nameBn}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/search"
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors block"
                >
                  সকল সংবাদ অনুসন্ধান →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Essential Policy & Contact Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              নীতিমালা ও যোগাযোগ (Policies &amp; Contact)
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  আমাদের সম্পর্কে (About Us)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  যোগাযোগ (Contact Us)
                </Link>
              </li>
              <li>
                <Link to="/editorial-policy" className="hover:text-white transition-colors">
                  সম্পাদকীয় ও এআই নীতিমালা (Editorial Policy)
                </Link>
              </li>
              <li>
                <Link to="/corrections-policy" className="hover:text-white transition-colors">
                  সংশোধনী নীতিমালা (Corrections Policy)
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  গোপনীয়তা নীতি (Privacy Policy)
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="hover:text-white transition-colors">
                  ব্যবহারের শর্তাবলি (Terms of Use)
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="hover:text-white transition-colors">
                  বিজ্ঞাপন দিন (Advertise With Us)
                </Link>
              </li>
              <li>
                <Link to="/submit-tip" className="hover:text-white transition-colors">
                  সংবাদ সূত্র পাঠান (Submit a News Tip)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Contact Bar & Technical Links */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="space-y-1">
            <p>
              সম্পাদকীয় যোগাযোগ:{' '}
              <span className="text-slate-200 font-mono">{SITE_CONFIG.editorialEmailPlaceholder}</span>{' '}
              | সম্পাদক: <span className="text-slate-200">{SITE_CONFIG.editorNamePlaceholder}</span>
            </p>
            <p>
              © {toBengaliNumber(currentYear)} {SITE_CONFIG.brandNameBn} ({SITE_CONFIG.brandNameEn})। সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={SITE_CONFIG.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-semibold"
            >
              <span>Official Facebook Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white"
            >
              <Rss className="w-3.5 h-3.5 text-orange-400" />
              <span>RSS Feed</span>
            </a>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>XML Sitemap</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>বার্তা কক্ষ</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
