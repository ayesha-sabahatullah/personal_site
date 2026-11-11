'use client';

import Link from 'next/link';
import { ArrowUp, Sparkles, Youtube, Twitter, Instagram, Linkedin, Facebook, Music2, MessageSquare } from 'lucide-react';
import type { SiteSettings } from '@/schemas';

interface SiteFooterProps {
  settings: SiteSettings;
}

export function SiteFooter({ settings }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('youtube')) return <Youtube className="w-4 h-4" />;
    if (p.includes('twitter') || p.includes('x')) return <Twitter className="w-4 h-4" />;
    if (p.includes('instagram')) return <Instagram className="w-4 h-4" />;
    if (p.includes('tiktok')) return <Music2 className="w-4 h-4" />;
    if (p.includes('facebook')) return <Facebook className="w-4 h-4" />;
    if (p.includes('linkedin')) return <Linkedin className="w-4 h-4" />;
    return <MessageSquare className="w-4 h-4" />;
  };

  return (
    <footer className="w-full bg-[#FFF0F5] border-t border-[#F1D5E0] text-[#795B6B] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#BE185D] to-[#E75480] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-serif font-bold text-xl text-[#351827]">
                ZekoMind
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#795B6B] leading-relaxed">
              {settings.shortBio}
            </p>
            <div className="flex items-center gap-2 pt-2">
              {settings.socialLinks?.map((soc) => (
                <a
                  key={soc.platform}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-[#F1D5E0] flex items-center justify-center text-[#BE185D] hover:bg-[#FCE4EC] hover:text-[#351827] transition-colors"
                  title={soc.label}
                  aria-label={soc.label}
                >
                  {getSocialIcon(soc.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Creative & Prompts Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#351827] font-bold mb-3">
              Prompt Library
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/prompts" className="hover:text-[#BE185D] transition-colors">
                  All AI Prompts
                </Link>
              </li>
              <li>
                <Link href="/prompts?category=Cinematic" className="hover:text-[#BE185D] transition-colors">
                  Cinematic Camera Prompts
                </Link>
              </li>
              <li>
                <Link href="/prompts?category=Fashion%20%26%20Editorial" className="hover:text-[#BE185D] transition-colors">
                  Fashion & Fluid Motion
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#BE185D] transition-colors">
                  Creative Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Education Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#351827] font-bold mb-3">
              Learning Hub
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/learn" className="hover:text-[#BE185D] transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/learn/youtube-automation" className="hover:text-[#BE185D] transition-colors font-medium text-[#BE185D]">
                  YouTube Automation Blueprint
                </Link>
              </li>
              <li>
                <Link href="/learn/youtube-automation/niche-selection-channel-strategy" className="hover:text-[#BE185D] transition-colors">
                  Module 1: Niche Strategy
                </Link>
              </li>
              <li>
                <Link href="/learn/youtube-automation/algorithmic-scriptwriting-hooks" className="hover:text-[#BE185D] transition-colors">
                  Module 2: Viral Scriptwriting
                </Link>
              </li>
            </ul>
          </div>

          {/* Profile & Legal Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#351827] font-bold mb-3">
              Connect & Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-[#BE185D] transition-colors">
                  About ZekoMind
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#BE185D] transition-colors">
                  Inquiries & Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#BE185D] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#F1D5E0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#795B6B]">
            &copy; {currentYear} ZekoMind. All rights reserved. Built with Next.js, TypeScript & Tailwind CSS.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F1D5E0] bg-white text-[#795B6B] hover:text-[#BE185D] hover:bg-[#FFF8FB] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
