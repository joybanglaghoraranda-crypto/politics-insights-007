import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { SearchPage } from './pages/SearchPage';
import { EssentialPage } from './pages/EssentialPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
        <Header />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/search" element={<SearchPage />} />

            {/* Essential Policy, Contact & Monetization Pages */}
            <Route path="/about" element={<EssentialPage pageType="about" />} />
            <Route path="/contact" element={<EssentialPage pageType="contact" />} />
            <Route
              path="/editorial-policy"
              element={<EssentialPage pageType="editorial-policy" />}
            />
            <Route
              path="/corrections-policy"
              element={<EssentialPage pageType="corrections-policy" />}
            />
            <Route
              path="/privacy-policy"
              element={<EssentialPage pageType="privacy-policy" />}
            />
            <Route
              path="/terms-of-use"
              element={<EssentialPage pageType="terms-of-use" />}
            />
            <Route path="/advertise" element={<EssentialPage pageType="advertise" />} />
            <Route path="/submit-tip" element={<EssentialPage pageType="submit-tip" />} />

            {/* Custom 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
