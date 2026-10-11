import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  Calendar,
  Globe,
  Radio,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CATEGORIES } from '../config/categories';
import { SITE_CONFIG, getHeaderCurrentDateDisplay } from '../config/site';
import { getBreakingArticles } from '../lib/articles';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const dateDisplay = getHeaderCurrentDateDisplay();
  const breakingArticles = getBreakingArticles();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setMobileMenuOpen(false);
    } else {
      navigate('/search');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-2xs">
      {/* Skip to Main Content for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-red-800 focus:text-white focus:px-4 focus:py-2 focus:rounded-xs focus:font-bold"
      >
        মূল সংবাদের অংশে যান (Skip to main content)
      </a>

      {/* Top Editorial Utility Bar */}
      <div className="bg-[#0B192C] text-slate-200 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              <span>{dateDisplay.bn}</span>
              <span className="hidden md:inline text-slate-400">({dateDisplay.en})</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-red-400" />
              <span>বাংলা ও English সংস্করণ</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <Link
              to="/editorial-policy"
              className="hover:text-white inline-flex items-center gap-1 text-slate-300 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>সম্পাদকীয় নীতি</span>
            </Link>
            <Link
              to="/submit-tip"
              className="hidden md:inline hover:text-white text-slate-300 transition-colors"
            >
              সংবাদ সূত্র পাঠান
            </Link>
            <Link
              to="/about"
              className="hidden sm:inline hover:text-white text-slate-300 transition-colors"
            >
              আমাদের সম্পর্কে
            </Link>
            <a
              href={SITE_CONFIG.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-2.5 py-0.5 rounded-xs transition-colors"
            >
              Facebook পেজ
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand Masthead & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="পলিটিক্স ইনসাইটস ০০৭ হোমপেজ (Politics Insights 007 Home)"
          className="focus:outline-2 focus:outline-red-800 rounded-xs"
        >
          <BrandLogo variant="masthead" />
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          role="search"
          aria-label="সংবাদ অনুসন্ধান"
          className="hidden lg:flex items-center w-80 xl:w-96 relative"
        >
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="সংবাদ, বিষয় বা বিশ্লেষণ খুঁজুন..."
            aria-label="সংবাদ অনুসন্ধান করুন"
            className="w-full pl-3.5 pr-10 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-red-800 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            aria-label="অনুসন্ধান করুন"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-600 hover:text-red-800 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Mobile Search & Menu Buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/search"
            aria-label="সংবাদ অনুসন্ধান পাতা"
            className="p-2 text-slate-700 hover:text-red-800 border border-slate-200 rounded-xs"
          >
            <Search className="w-5 h-5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            className="p-2 text-slate-800 hover:text-red-800 border border-slate-200 rounded-xs"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Category Navigation Bar */}
      <nav
        aria-label="প্রধান সংবাদ বিভাগসমূহ (Primary Categories)"
        className="border-t border-slate-200 bg-slate-50 hidden lg:block"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center flex-wrap gap-0.5 py-1">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `inline-block px-3 py-2 text-[13.5px] font-bold transition-colors rounded-xs ${
                    isActive
                      ? 'bg-[#0B192C] text-white'
                      : 'text-slate-800 hover:bg-slate-200/75 hover:text-red-800'
                  }`
                }
              >
                প্রচ্ছদ
              </NavLink>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <NavLink
                  to={`/category/${category.slug}`}
                  className={({ isActive }) =>
                    `inline-block px-2.5 py-2 text-[13.5px] font-bold transition-colors rounded-xs ${
                      isActive
                        ? 'bg-red-800 text-white'
                        : 'text-slate-800 hover:bg-slate-200/75 hover:text-red-800'
                    }`
                  }
                >
                  {category.nameBn}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Breaking News / Editor-Selected Ticker */}
      {breakingArticles.length > 0 && (
        <div className="bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 bg-red-700 text-white text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-xs shrink-0">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>শিরোনাম</span>
            </span>
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs sm:text-sm py-0.5">
              {breakingArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/article/${encodeURIComponent(article.slug)}`}
                  className="inline-flex items-center gap-1.5 text-slate-200 hover:text-red-300 font-medium transition-colors shrink-0"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{article.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Accessible Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg max-h-[82vh] overflow-y-auto">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="সংবাদ বা বিষয় খুঁজুন..."
                aria-label="মোবাইল সংবাদ অনুসন্ধান"
                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-xs focus:outline-none focus:border-red-800"
              />
              <button
                type="submit"
                className="bg-red-800 text-white px-4 py-2 text-sm font-bold rounded-xs"
              >
                খুঁজুন
              </button>
            </form>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                সংবাদ বিভাগসমূহ (Categories)
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                <NavLink
                  to="/"
                  end
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-bold rounded-xs border ${
                      isActive
                        ? 'bg-[#0B192C] text-white border-[#0B192C]'
                        : 'bg-slate-50 text-slate-800 border-slate-200'
                    }`
                  }
                >
                  প্রচ্ছদ (Home)
                </NavLink>
                {CATEGORIES.map((cat) => (
                  <NavLink
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-bold rounded-xs border ${
                        isActive
                          ? 'bg-red-800 text-white border-red-800'
                          : 'bg-slate-50 text-slate-800 border-slate-200'
                      }`
                    }
                  >
                    {cat.nameBn}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                গুরুত্বপূর্ণ পাতা (Essential Pages)
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-800">
                  আমাদের সম্পর্কে (About Us)
                </Link>
                <Link to="/editorial-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-800">
                  সম্পাদকীয় নীতিমালা
                </Link>
                <Link to="/corrections-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-800">
                  সংশোধনী নীতিমালা
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-800">
                  যোগাযোগ (Contact)
                </Link>
                <Link to="/advertise" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-800">
                  বিজ্ঞাপন দিন (Advertise)
                </Link>
                <Link to="/submit-tip" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-800">
                  সংবাদ সূত্র পাঠান
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
