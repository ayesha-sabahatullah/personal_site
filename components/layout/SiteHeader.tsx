'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SiteSettings } from '@/schemas';

interface SiteHeaderProps {
  settings: SiteSettings;
}

export function SiteHeader({ settings }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = settings.navigation || [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Creative Work', href: '/projects' },
    { label: 'AI Prompts', href: '/prompts' },
    { label: 'Learning Hub', href: '/learn' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFF8FB]/90 border-b border-[#F1D5E0]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#BE185D] to-[#E75480] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 fill-white/80" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-xl tracking-tight text-[#351827]">
                ZekoMind
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#795B6B] font-mono">
                AI Video & Automation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all duration-150',
                    active
                      ? 'text-[#BE185D] font-semibold bg-[#FFF0F5]'
                      : 'text-[#795B6B] hover:text-[#351827] hover:bg-[#FFF0F5]/60'
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#BE185D] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/learn"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#E75480] to-[#BE185D] text-white hover:opacity-95 shadow-xs transition-all hover:shadow-sm hover:scale-[1.02]"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learning Hub</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#351827] hover:bg-[#FFF0F5] transition-colors cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#F1D5E0] bg-[#FFF8FB] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between',
                    active
                      ? 'bg-[#FCE4EC] text-[#BE185D] font-semibold'
                      : 'text-[#351827] hover:bg-[#FFF0F5]'
                  )}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#BE185D]" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#F1D5E0]/60">
            <Link
              href="/learn"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#E75480] text-white shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore YouTube Automation Course</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
