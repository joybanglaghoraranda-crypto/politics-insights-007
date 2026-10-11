import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Mail,
  FileWarning,
  Lock,
  Scale,
  Megaphone,
  Send,
  Building2,
  AlertCircle,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { AdSlot } from '../components/AdSlot';
import { SITE_CONFIG } from '../config/site';

export type EssentialPageType =
  | 'about'
  | 'contact'
  | 'editorial-policy'
  | 'corrections-policy'
  | 'privacy-policy'
  | 'terms-of-use'
  | 'advertise'
  | 'submit-tip';

interface EssentialPageProps {
  pageType: EssentialPageType;
}

export const EssentialPage: React.FC<EssentialPageProps> = ({ pageType }) => {
  const [previewAdSlots, setPreviewAdSlots] = useState(false);

  const navItems: { slug: EssentialPageType; labelBn: string; labelEn: string }[] = [
    { slug: 'about', labelBn: 'আমাদের সম্পর্কে', labelEn: 'About Us' },
    { slug: 'editorial-policy', labelBn: 'সম্পাদকীয় নীতিমালা', labelEn: 'Editorial Policy' },
    { slug: 'corrections-policy', labelBn: 'সংশোধনী নীতিমালা', labelEn: 'Corrections Policy' },
    { slug: 'contact', labelBn: 'যোগাযোগ', labelEn: 'Contact Us' },
    { slug: 'submit-tip', labelBn: 'সংবাদ সূত্র পাঠান', labelEn: 'Submit a News Tip' },
    { slug: 'advertise', labelBn: 'বিজ্ঞাপন নীতিমালা', labelEn: 'Advertise With Us' },
    { slug: 'privacy-policy', labelBn: 'গোপনীয়তা নীতি', labelEn: 'Privacy Policy' },
    { slug: 'terms-of-use', labelBn: 'ব্যবহারের শর্তাবলি', labelEn: 'Terms of Use' },
  ];

  const renderContent = () => {
    switch (pageType) {
      case 'about':
        return (
          <div className="space-y-6">
            <SEOHead
              title="আমাদের সম্পর্কে (About Us)"
              description="পলিটিক্স ইনসাইটস ০০৭ (Politics Insights 007)-এর সম্পাদকীয় লক্ষ্য, উদ্দেশ্য ও প্রকাশনা দর্শন।"
              canonicalPath="/about"
            />
            <div className="flex items-center gap-3 text-red-800">
              <Building2 className="w-7 h-7" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                আমাদের সম্পর্কে (About Politics Insights 007)
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              <strong>পলিটিক্স ইনসাইটস ০০৭ (Politics Insights 007)</strong> হলো একটি স্বাধীন ডিজিটাল সংবাদ ও নীতি-বিশ্লেষণ পোর্টাল, যার প্রধান ভাষা বাংলা এবং সহায়ক ভাষা ইংরেজি। বাংলাদেশ ও আন্তর্জাতিক রাজনীতি, নির্বাচন, সরকারি নীতি, অর্থনীতি এবং কূটনীতির জটিল বিষয়গুলোকে প্রামাণ্য তথ্য ও সহজ ভাষার মাধ্যমে পাঠকের সামনে তুলে ধরাই আমাদের মূল উদ্দেশ্য।
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-700 p-4 text-xs sm:text-sm text-amber-950">
              <strong>স্বচ্ছতা নোট (Verification Placeholder Notice):</strong> ওয়েবসাইট মালিকের চূড়ান্ত যাচাইকৃত তথ্য সংযুক্ত না হওয়া পর্যন্ত নিচে সম্পাদক, ইমেইল, ফোন নম্বর ও ঠিকানার স্থানে স্পষ্ট প্লেসহোল্ডার রাখা হয়েছে। কোনো কাল্পনিক কোম্পানি নিবন্ধন বা ভুয়া প্রেস ক্রেডেনশিয়াল এখানে দাবি করা হয়নি।
            </div>

            <h2 className="text-xl font-bold text-slate-900 pt-2">আমাদের সম্পাদকীয় ফোকাস</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>বাংলাদেশের অভ্যন্তরীণ রাজনীতি, জাতীয় সংসদ ও সাংবিধানিক প্রতিষ্ঠান;</li>
              <li>আন্তর্জাতিক রাজনীতি, ভূরাজনীতি ও বিশ্বপরিসর;</li>
              <li>জাতীয় ও স্থানীয় নির্বাচন এবং ভোটার অংশগ্রহণ সংক্রান্ত তথ্য;</li>
              <li>সরকারি নীতিমালা, বাজেট বরাদ্দ এবং জনসেবা বাস্তবায়ন;</li>
              <li>রাজনৈতিক অর্থনীতি, ব্যাংকিং, মূল্যস্ফীতি ও বৈদেশিক বাণিজ্য;</li>
              <li>তথ্যভিত্তিক ব্যাখ্যা (Data-Driven Explainers) এবং নিরপেক্ষ মতামত ও বিশ্লেষণ।</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-2">প্রকাশনা ও বার্তা কক্ষের তথ্য (Placeholders)</h2>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xs space-y-2 text-sm">
              <p>
                <strong>প্রকাশনার নাম:</strong> পলিটিক্স ইনসাইটস ০০৭ (Politics Insights 007)
              </p>
              <p>
                <strong>ওয়েবসাইট:</strong>{' '}
                <a href={SITE_CONFIG.siteUrl} className="text-red-800 underline">
                  {SITE_CONFIG.siteUrl}
                </a>
              </p>
              <p>
                <strong>সম্পাদক / প্রকাশক:</strong> {SITE_CONFIG.editorNamePlaceholder}
              </p>
              <p>
                <strong>সম্পাদকীয় ইমেইল:</strong> {SITE_CONFIG.editorialEmailPlaceholder}
              </p>
              <p>
                <strong>যোগাযোগের ঠিকানা:</strong> {SITE_CONFIG.addressPlaceholder}
              </p>
            </div>
          </div>
        );

      case 'editorial-policy':
        return (
          <div className="space-y-6">
            <SEOHead
              title="সম্পাদকীয় ও এআই ব্যবহারের নীতিমালা (Editorial & AI Policy)"
              description="পলিটিক্স ইনসাইটস ০০৭-এর তথ্য যাচাই, রাজনৈতিক নিরপেক্ষতা এবং কৃত্রিম বুদ্ধিমত্তা ব্যবহারের কঠোর নীতিমালা।"
              canonicalPath="/editorial-policy"
            />
            <div className="flex items-center gap-3 text-red-800">
              <ShieldCheck className="w-7 h-7" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                সম্পাদকীয় ও এআই নীতিমালা (Editorial Integrity &amp; AI Safeguards)
              </h1>
            </div>

            <p className="text-slate-700 leading-relaxed">
              <strong>পলিটিক্স ইনসাইটস ০০৭</strong> রাজনৈতিক নিরপেক্ষতা, তথ্যের প্রামাণ্যতা এবং পাঠকের আস্থাকে সর্বোচ্চ অগ্রাধিকার দেয়। আমরা কোনো রাজনৈতিক দল, জোট বা প্রার্থীর পক্ষে প্রচারণা চালাই না; বরং নথিভুক্ত অবস্থান, সরকারি সিদ্ধান্ত ও যাচাইযোগ্য প্রমাণের ভিত্তিতে প্রতিবেদন প্রকাশ করি।
            </p>

            <h2 className="text-xl font-bold text-slate-900">১. তথ্য যাচাই ও সূত্র উল্লেখের নীতি</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>প্রতিটি গুরুত্বপূর্ণ দাবি বা পরিসংখ্যানের ক্ষেত্রে প্রাথমিক সূত্র (সরকারি গেজেট, আদালত বা সংসদীয় নথি, প্রাতিষ্ঠানিক প্রতিবেদন) কিংবা স্বতন্ত্রভাবে নির্ভরযোগ্য সূত্র উল্লেখ করা বাধ্যতামূলক।</li>
              <li>অভিযোগ (Allegation) এবং প্রতিষ্ঠিত সত্যের (Established Fact) মধ্যে স্পষ্ট ভাষাগত পার্থক্য বজায় রাখা হয়। অপ্রমাণিত রাজনৈতিক অভিযোগ প্রকাশ করা হয় না।</li>
              <li>অন্য কোনো সংবাদমাধ্যমের পূর্ণাঙ্গ প্রতিবেদন কপি বা পুনঃপ্রকাশ (Plagiarism) সম্পূর্ণ নিষিদ্ধ।</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900">২. সংবাদ, মতামত ও স্পন্সরড কন্টেন্টের পৃথকীকরণ</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>মূল প্রতিবেদন (News Report):</strong> যাচাইকৃত তথ্য ও প্রামাণ্য সূত্রের বস্তুনিষ্ঠ বিবরণ।</li>
              <li><strong>মতামত ও বিশ্লেষণ (Opinion &amp; Analysis):</strong> লেখকের নিজস্ব যুক্তি ও বিশ্লেষণ, যা সর্বদা স্পষ্ট ব্যাজ ও ডিসক্লেইমার দিয়ে মূল সংবাদ থেকে আলাদা রাখা হয়।</li>
              <li><strong>স্পন্সরড কন্টেন্ট (Sponsored Content):</strong> বাণিজ্যিক বা বিজ্ঞাপনদাতার অর্থায়নে প্রকাশিত নিবন্ধে স্পষ্টভাবে ‘স্পন্সরড’ লেবেল প্রদর্শিত হয়।</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900">৩. কৃত্রিম বুদ্ধিমত্তা (AI) ব্যবহারের সুরক্ষা নীতিমালা</h2>
            <div className="bg-slate-900 text-slate-100 p-5 rounded-xs space-y-3 text-sm">
              <p className="font-bold text-emerald-400">
                পলিটিক্স ইনসাইটস ০০৭-এ এআই কেবল সহায়ক টুল হিসেবে ব্যবহৃত হতে পারে, কখনোই মানব সম্পাদকের বিকল্প হিসেবে নয়:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-200">
                <li><strong>যেসব কাজে এআই সহায়তা নেওয়া হতে পারে:</strong> শিরোনামের বিকল্প প্রস্তাব, সংক্ষিপ্ত সারসংক্ষেপ তৈরি, অনুবাদ সহায়তা, বানান ও ব্যাকরণ সম্পাদনা, এবং জটিল ডেটা সাজানো।</li>
                <li><strong>কঠোর নিষেধাজ্ঞা:</strong> এআই দিয়ে কখনোই কোনো তথ্য, উদ্ধৃতি, নথি বা সূত্র তৈরি (Fabricate) করা যাবে না।</li>
                <li><strong>মানব অনুমোদন বাধ্যতামূলক:</strong> প্রতিটি প্রতিবেদন প্রকাশের পূর্বে মানব সম্পাদকের দ্বারা মূল সূত্র ও অনুবাদের প্রেক্ষাপট যাচাই করা বাধ্যতামূলক।</li>
              </ul>
            </div>
          </div>
        );

      case 'corrections-policy':
        return (
          <div className="space-y-6">
            <SEOHead
              title="সংশোধনী নীতিমালা (Corrections Policy)"
              description="পলিটিক্স ইনসাইটস ০০৭-এ প্রকাশিত সংবাদের তথ্যগত ত্রুটি সংশোধন ও পাঠকের মতামত গ্রহণের প্রক্রিয়া।"
              canonicalPath="/corrections-policy"
            />
            <div className="flex items-center gap-3 text-red-800">
              <FileWarning className="w-7 h-7" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                সংশোধনী নীতিমালা (Corrections Policy)
              </h1>
            </div>

            <p className="text-slate-700 leading-relaxed">
              সর্বোচ্চ সতর্কতা সত্ত্বেও কোনো প্রতিবেদনে অনিচ্ছাকৃত তথ্যগত, সংখ্যাগত বা বানানগত ত্রুটি ঘটলে <strong>পলিটিক্স ইনসাইটস ০০৭</strong> তা গোপন না করে দ্রুত ও স্বচ্ছভাবে সংশোধন করতে প্রতিশ্রুতিবদ্ধ।
            </p>

            <h2 className="text-xl font-bold text-slate-900">সংশোধনের প্রক্রিয়া</h2>
            <ol className="list-decimal pl-6 space-y-2.5 text-slate-700">
              <li>
                <strong>পাঠকের অবহিতকরণ:</strong> কোনো পাঠক বা সংশ্লিষ্ট পক্ষ কোনো তথ্যের অসংগতি আমাদের নজরে আনলে প্রথমে প্রামাণ্য নথিপত্র দিয়ে তা যাচাই করা হয়।
              </li>
              <li>
                <strong>স্পষ্ট সংশোধনী নোট:</strong> মূল প্রতিবেদনে তথ্য সংশোধন করার পাশাপাশি নিবন্ধের নিচে <em>“সংশোধনী নোট (Correction Note)”</em> যুক্ত করে কবে এবং কী পরিবর্তন করা হয়েছে তা উল্লেখ করা হয় এবং <code>updatedAt</code> তারিখ হালনাগাদ করা হয়।
              </li>
              <li>
                <strong>অপসারণ নীতি:</strong> কেবল বিশেষ আইনি বাধ্যবাধকতা বা গুরুতর নিরাপত্তা ঝুঁকি ছাড়া প্রকাশিত নিবন্ধ নীরবে মুছে ফেলা হয় না; বরং সংশোধনী নোটসহ আপডেট রাখা হয়।
              </li>
            </ol>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xs text-sm space-y-2">
              <p className="font-bold text-slate-900">সংশোধনী অনুরোধ পাঠানোর ঠিকানা:</p>
              <p>
                ইমেইল: <span className="font-mono text-red-800">{SITE_CONFIG.correctionsEmailPlaceholder}</span>
              </p>
              <p className="text-slate-600 text-xs">
                অনুগ্রহ করে ইমেইলে সংশ্লিষ্ট প্রতিবেদনের লিংক (URL), যে অংশে ত্রুটি রয়েছে তার উল্লেখ এবং সঠিক তথ্যের প্রামাণ্য সূত্র সংযুক্ত করুন।
              </p>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <SEOHead
              title="যোগাযোগ (Contact Us)"
              description="পলিটিক্স ইনসাইটস ০০৭-এর বার্তা কক্ষ, সম্পাদকীয় ডেস্ক ও বিজ্ঞাপন বিভাগে যোগাযোগের তথ্য।"
              canonicalPath="/contact"
            />
            <div className="flex items-center gap-3 text-red-800">
              <Mail className="w-7 h-7" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                যোগাযোগ (Contact Us)
              </h1>
            </div>

            <p className="text-slate-700 leading-relaxed">
              সংবাদ সংক্রান্ত যেকোনো প্রশ্ন, মতামত, সংশোধনী অনুরোধ বা বিজ্ঞাপনের জন্য নিচের বিভাগীয় মাধ্যমগুলোতে আমাদের সাথে যোগাযোগ করতে পারেন।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xs space-y-2">
                <h2 className="font-bold text-base text-slate-900">বার্তা ও সম্পাদকীয় ডেস্ক</h2>
                <p>সম্পাদক: {SITE_CONFIG.editorNamePlaceholder}</p>
                <p>ইমেইল: <span className="font-mono text-red-800">{SITE_CONFIG.editorialEmailPlaceholder}</span></p>
                <p>সাধারণ যোগাযোগ: <span className="font-mono">{SITE_CONFIG.contactEmailPlaceholder}</span></p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xs space-y-2">
                <h2 className="font-bold text-base text-slate-900">সংশোধনী ও সংবাদ সূত্র</h2>
                <p>সংশোধনী ডেস্ক: <span className="font-mono text-red-800">{SITE_CONFIG.correctionsEmailPlaceholder}</span></p>
                <p>সংবাদ সূত্র (Tips): <span className="font-mono">{SITE_CONFIG.tipsEmailPlaceholder}</span></p>
                <p>ফোন: {SITE_CONFIG.phonePlaceholder}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xs space-y-2 md:col-span-2">
                <h2 className="font-bold text-base text-slate-900">ডাকযোগে যোগাযোগ ও সোশ্যাল মিডিয়া</h2>
                <p>ঠিকানা: {SITE_CONFIG.addressPlaceholder}</p>
                <p>
                  অফিসিয়াল ফেসবুক পেজ:{' '}
                  <a
                    href={SITE_CONFIG.facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-bold hover:underline"
                  >
                    {SITE_CONFIG.facebookPageUrl}
                  </a>
                </p>
              </div>
            </div>
          </div>
        );

      case 'submit-tip':
        return (
          <div className="space-y-6">
            <SEOHead
              title="সংবাদ সূত্র পাঠান (Submit a News Tip)"
              description="জনস্বার্থ সংশ্লিষ্ট প্রামাণ্য তথ্য ও নথিপত্র পলিটিক্স ইনসাইটস ০০৭-এর বার্তা কক্ষে পাঠানোর নির্দেশিকা।"
              canonicalPath="/submit-tip"
            />
            <div className="flex items-center gap-3 text-red-800">
              <Send className="w-7 h-7" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                সংবাদ সূত্র পাঠান (Submit a News Tip)
              </h1>
            </div>

            <p className="text-slate-700 leading-relaxed">
              জনস্বার্থ, সরকারি নীতি, বাজেট বাস্তবায়ন, নির্বাচন বা প্রাতিষ্ঠানিক অনিয়ম সংক্রান্ত কোনো প্রামাণ্য তথ্য বা দলিল আপনার কাছে থাকলে আমাদের বার্তা কক্ষে পাঠাতে পারেন। আমরা তথ্যদাতার গোপনীয়তা রক্ষা করি এবং প্রতিটি তথ্য স্বাধীনভাবে যাচাই করার পরই কেবল প্রতিবেদন প্রকাশ করি।
            </p>

            <h2 className="text-xl font-bold text-slate-900">তথ্য পাঠানোর পূর্বে করণীয়</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>গুজব বা ব্যক্তিগত আক্রোশমূলক বক্তব্যের পরিবর্তে সরকারি প্রজ্ঞাপন, অডিট প্রতিবেদন, আদালতের নথি বা যাচাইযোগ্য পরিসংখ্যান সংযুক্ত করুন।</li>
              <li>ঘটনার স্থান, তারিখ এবং সংশ্লিষ্ট দপ্তর বা প্রতিষ্ঠানের নাম স্পষ্টভাবে উল্লেখ করুন।</li>
              <li>অনিরাপদ পাবলিক ওয়াই-ফাই ব্যবহার করে সংবেদনশীল নথি পাঠাবেন না।</li>
            </ul>

            <div className="bg-slate-900 text-white p-5 rounded-xs space-y-2 text-sm">
              <p className="font-bold text-red-400">সরাসরি বার্তা কক্ষে ইমেইল করুন:</p>
              <p className="font-mono text-base">{SITE_CONFIG.tipsEmailPlaceholder}</p>
              <p className="text-xs text-slate-400">
                (নোট: ফেজ-১ স্ট্যাটিক ওয়েবসাইটে কোনো ভুয়া লগইন বা অরক্ষিত ডেটাবেস ফর্ম রাখা হয়নি, যাতে তথ্যদাতার নিরাপত্তা ঝুঁকিতে না পড়ে।)
              </p>
            </div>
          </div>
        );

      case 'advertise':
        return (
          <div className="space-y-6">
            <SEOHead
              title="বিজ্ঞাপন দিন (Advertise With Us)"
              description="পলিটিক্স ইনসাইটস ০০৭-এ ডিসপ্লে বিজ্ঞাপন ও স্পন্সরড কন্টেন্ট প্রকাশের নীতিমালা ও যোগাযোগ।"
              canonicalPath="/advertise"
            />
            <div className="flex items-center gap-3 text-red-800">
              <Megaphone className="w-7 h-7" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                বিজ্ঞাপন ও স্পন্সরশিপ নীতিমালা (Advertise With Us)
              </h1>
            </div>

            <p className="text-slate-700 leading-relaxed">
              বাংলাদেশ ও বিশ্ব রাজনীতি, অর্থনীতি এবং জননীতি বিষয়ে সচেতন পাঠকদের কাছে আপনার প্রতিষ্ঠান, গবেষণা প্রকাশনা, শিক্ষা কার্যক্রম বা বৈধ পণ্যের বার্তা পৌঁছে দিতে <strong>পলিটিক্স ইনসাইটস ০০৭</strong>-এ বিজ্ঞাপন দিতে পারেন।
            </p>

            <h2 className="text-xl font-bold text-slate-900">আমাদের বিজ্ঞাপন মানদণ্ড</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>স্পষ্ট লেবেলিং:</strong> সকল বিজ্ঞাপন এবং স্পন্সরড নিবন্ধ মূল সম্পাদকীয় সংবাদ থেকে স্পষ্টভাবে আলাদা রাখা হয়।</li>
              <li><strong>পাঠকবান্ধব অবস্থান:</strong> সংবাদের লেখা ঢেকে ফেলে বা নেভিগেশনে বাধা সৃষ্টি করে এমন পপ-আপ বিজ্ঞাপন আমরা প্রদর্শন করি না।</li>
              <li><strong>নিষিদ্ধ বিজ্ঞাপন:</strong> অবৈধ পণ্য, জুয়া/বেটিং, বিভ্রান্তিকর আর্থিক প্রলোভন, ঘৃণাত্মক বক্তব্য বা ভুয়া সংবাদের বিজ্ঞাপন গ্রহণ করা হয় না।</li>
            </ul>

            {/* Interactive Ad Slot Layout Preview Toggle for the Website Owner */}
            <div className="bg-slate-50 border border-slate-300 p-5 rounded-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    সংরক্ষিত বিজ্ঞাপন স্থান প্রিভিউ (Reserved Ad Container Layout Preview)
                  </h3>
                  <p className="text-xs text-slate-600">
                    পাবলিক সাইটে কোনো ভুয়া বিজ্ঞাপন দেখানো হয় না। তবে লেআউট পরীক্ষার জন্য নিচের বাটনে ক্লিক করে সংরক্ষিত স্থানটি দেখতে পারেন:
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewAdSlots(!previewAdSlots)}
                  className="px-4 py-2 bg-[#0B192C] text-white text-xs font-bold rounded-xs shrink-0 cursor-pointer"
                >
                  {previewAdSlots ? 'প্রিভিউ লুকান' : 'বিজ্ঞাপন স্লট প্রিভিউ দেখুন'}
                </button>
              </div>
              <AdSlot
                slotId="advertise-page-demo"
                format="leaderboard"
                showPreview={previewAdSlots}
              />
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xs text-sm space-y-1.5">
              <p className="font-bold text-slate-900">বিজ্ঞাপন বিভাগের যোগাযোগ:</p>
              <p>ইমেইল: <span className="font-mono text-red-800">{SITE_CONFIG.adsEmailPlaceholder}</span></p>
            </div>
          </div>
        );

      case 'privacy-policy':
        return (
          <div className="space-y-6">
            <SEOHead
              title="গোপনীয়তা নীতি (Privacy Policy)"
              description="পলিটিক্স ইনসাইটস ০০৭-এর পাঠক তথ্য সুরক্ষা, কুকিজ, অ্যানালিটিক্স এবং গুগল অ্যাডসেন্স সংক্রান্ত গোপনীয়তা নীতি।"
              canonicalPath="/privacy-policy"
            />
            <div className="flex items-center gap-3 text-red-800">
              <Lock className="w-7 h-7" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                গোপনীয়তা নীতি (Privacy Policy)
              </h1>
            </div>

            <p className="text-xs text-slate-500">সর্বশেষ হালনাগাদ: ১১ অক্টোবর ২০২৬</p>

            <p className="text-slate-700 leading-relaxed">
              <strong>পলিটিক্স ইনসাইটস ০০৭</strong> (<code>https://www.politicsinsights007.com/</code>) পাঠকদের ব্যক্তিগত গোপনীয়তা রক্ষায় অঙ্গীকারবদ্ধ। এই ওয়েবসাইটটি ব্যবহারের সময় কোন ধরনের প্রযুক্তিগত তথ্য সংগৃহীত হতে পারে এবং তা কীভাবে ব্যবহৃত হয়, নিচে তা স্পষ্টভাবে ব্যাখ্যা করা হলো।
            </p>

            <h2 className="text-xl font-bold text-slate-900">১. স্বয়ংক্রিয়ভাবে সংগৃহীত লগ ও অ্যানালিটিক্স তথ্য</h2>
            <p className="text-slate-700 leading-relaxed">
              অন্যান্য ওয়েবসাইটের মতো আমাদের হোস্টিং প্ল্যাটফর্ম (Cloudflare Pages) এবং ঐচ্ছিক ওয়েব অ্যানালিটিক্স টুল (যেমন Google Analytics) ব্রাউজারের ধরন, অজ্ঞাতনামা আইপি অ্যাড্রেস, রেফারিং পেজ (যেমন Facebook থেকে আগমন), এবং পঠিত পৃষ্ঠাগুলোর সাধারণ পরিসংখ্যান সংগ্রহ করতে পারে। এই তথ্য কেবল ওয়েবসাইটের কারিগরি মানোন্নয়নের জন্য ব্যবহৃত হয়।
            </p>

            <h2 className="text-xl font-bold text-slate-900">২. কুকিজ এবং তৃতীয় পক্ষের বিজ্ঞাপন (Google AdSense Disclosure)</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>ভবিষ্যতে বা অনুমোদনের পর ওয়েবসাইটে Google AdSense বা তৃতীয় পক্ষের বিজ্ঞাপন নেটওয়ার্ক সক্রিয় করা হলে, গুগলসহ তৃতীয় পক্ষের ভেন্ডররা ব্যবহারকারীর পূর্ববর্তী ভিজিটের ওপর ভিত্তি করে বিজ্ঞাপন প্রদর্শনের জন্য কুকিজ (যেমন DART/Advertising cookies) ব্যবহার করতে পারে।</li>
              <li>ব্যবহারকারীরা চাইলে গুগলের <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-red-800 underline">Ads Settings</a> পৃষ্ঠায় গিয়ে পার্সোনালাইজড বিজ্ঞাপন বন্ধ (Opt-out) করতে পারেন অথবা ব্রাউজার সেটিংস থেকে কুকিজ নিষ্ক্রিয় করতে পারেন।</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900">৩. বাহ্যিক লিংক (External Links)</h2>
            <p className="text-slate-700 leading-relaxed">
              সংবাদের প্রামাণ্যতার জন্য আমাদের নিবন্ধে বিভিন্ন সরকারি পোর্টাল, আন্তর্জাতিক সংস্থা বা গবেষণা প্রতিষ্ঠানের বাহ্যিক লিংক যুক্ত থাকে। সেসব ওয়েবসাইটের নিজস্ব গোপনীয়তা নীতির ওপর আমাদের কোনো নিয়ন্ত্রণ নেই।
            </p>
          </div>
        );

      case 'terms-of-use':
      default:
        return (
          <div className="space-y-6">
            <SEOHead
              title="ব্যবহারের শর্তাবলি (Terms of Use)"
              description="পলিটিক্স ইনসাইটস ০০৭ ওয়েবসাইট ব্যবহারের আইনি শর্তাবলি ও কপিরাইট নীতিমালা।"
              canonicalPath="/terms-of-use"
            />
            <div className="flex items-center gap-3 text-red-800">
              <Scale className="w-7 h-7" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                ব্যবহারের শর্তাবলি (Terms of Use)
              </h1>
            </div>

            <p className="text-slate-700 leading-relaxed">
              <code>https://www.politicsinsights007.com/</code> ওয়েবসাইটটি ব্রাউজ বা ব্যবহার করার মাধ্যমে আপনি নিচের শর্তাবলিতে সম্মতি প্রদান করছেন:
            </p>

            <h2 className="text-xl font-bold text-slate-900">১. মেধাস্বত্ব ও উদ্ধৃতি নিয়ম</h2>
            <p className="text-slate-700 leading-relaxed">
              পলিটিক্স ইনসাইটস ০০৭-এ প্রকাশিত মৌলিক প্রতিবেদন, বিশ্লেষণ ও গ্রাফিক্সের স্বত্ব সংরক্ষিত। সংক্ষিপ্ত উদ্ধৃতি ব্যবহারের ক্ষেত্রে স্পষ্টভাবে <strong>“পলিটিক্স ইনসাইটস ০০৭ (Politics Insights 007)”</strong>-এর নাম ও মূল প্রতিবেদনের সক্রিয় লিংক (Canonical URL) উল্লেখ করতে হবে। লিখিত অনুমতি ছাড়া সম্পূর্ণ নিবন্ধ হুবহু পুনঃপ্রকাশ করা নিষিদ্ধ।
            </p>

            <h2 className="text-xl font-bold text-slate-900">২. তথ্যের উদ্দেশ্য</h2>
            <p className="text-slate-700 leading-relaxed">
              এই ওয়েবসাইটে প্রকাশিত আইন, সংবিধান, কর বা অর্থনীতি বিষয়ক ব্যাখ্যামূলক নিবন্ধগুলো কেবল জনসাধারণের তথ্য ও শিক্ষামূলক উদ্দেশ্যে প্রকাশিত; এগুলোকে পেশাদার আইনি বা আর্থিক পরামর্শ (Legal or Financial Advice) হিসেবে গণ্য করা যাবে না।
            </p>

            <div className="bg-slate-100 border border-slate-300 p-4 rounded-xs flex items-center gap-2.5 text-xs text-slate-700">
              <AlertCircle className="w-4 h-4 text-slate-600 shrink-0" />
              <span>যেকোনো আইনি বা প্রাতিষ্ঠানিক অনুসন্ধানের জন্য যোগাযোগ করুন: {SITE_CONFIG.contactEmailPlaceholder}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Navigation for Essential Pages */}
        <aside className="lg:col-span-4 bg-white border border-slate-200 p-5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2.5 mb-3">
            নীতিমালা ও প্রাতিষ্ঠানিক তথ্য
          </h2>
          <nav aria-label="Essential Pages Navigation" className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.slug}
                to={`/${item.slug}`}
                className={`block px-3.5 py-2.5 text-sm font-bold rounded-xs transition-colors ${
                  pageType === item.slug
                    ? 'bg-[#0B192C] text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-red-800'
                }`}
              >
                <div>{item.labelBn}</div>
                <div
                  className={`text-[11px] font-normal ${
                    pageType === item.slug ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {item.labelEn}
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Panel */}
        <div className="lg:col-span-8 bg-white border-t-4 border-t-red-800 border border-slate-200 p-6 sm:p-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
