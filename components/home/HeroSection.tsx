import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, BookOpen, Film, ArrowUpRight } from 'lucide-react';
import type { SiteSettings } from '@/schemas';

interface HeroSectionProps {
  settings: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-32 bg-gradient-to-b from-[#FFF8FB] via-[#FFF0F5] to-[#FFF8FB]">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#FCE4EC]/50 to-[#E75480]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F1D5E0] shadow-xs text-xs font-semibold text-[#BE185D]">
              <Sparkles className="w-3.5 h-3.5 fill-[#E75480] text-[#E75480]" />
              <span>{settings.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#351827] leading-[1.15]">
              {settings.hero.headline}
            </h1>

            {/* Subheadline / Intro */}
            <p className="text-sm sm:text-base lg:text-lg text-[#795B6B] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {settings.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href={settings.hero.ctaPrimary.href}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E75480] to-[#BE185D] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Film className="w-4 h-4" />
                <span>{settings.hero.ctaPrimary.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={settings.hero.ctaSecondary.href}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#F1D5E0] text-[#351827] hover:bg-[#FFF0F5] hover:text-[#BE185D] hover:border-[#E75480] text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-[#E75480]" />
                <span>{settings.hero.ctaSecondary.label}</span>
              </Link>
            </div>

            {/* Social quick links */}
            {settings.socialLinks && settings.socialLinks.length > 0 && (
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs font-medium text-[#795B6B]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#BE185D]">
                  Connect:
                </span>
                <div className="flex items-center gap-3">
                  {settings.socialLinks.slice(0, 4).map((soc) => (
                    <a
                      key={soc.platform}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[#BE185D] transition-colors"
                    >
                      <span>{soc.platform}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#E75480]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile / Portrait Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-84 lg:w-96">
              {/* Outer pink decorative framed borders */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#E75480]/20 via-[#FCE4EC] to-[#BE185D]/20 -rotate-2 -z-10" />
              <div className="absolute -inset-1 rounded-3xl border border-[#F1D5E0] rotate-1 -z-10 bg-white" />

              {/* Portrait Image container */}
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-[#FFF0F5]">
                <Image
                  src={settings.profileImage}
                  alt={settings.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 300px, 400px"
                  referrerPolicy="no-referrer"
                  className="object-cover object-top hover:scale-102 transition-transform duration-700"
                />

                {/* Subtle soft gradient scrim at base of photo */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#351827]/80 via-[#351827]/30 to-transparent" />

                {/* Name & Title card at bottom of portrait */}
                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
                  <div className="font-serif font-bold text-sm sm:text-base leading-tight">
                    {settings.name}
                  </div>
                  <div className="text-[11px] text-pink-200 font-mono tracking-wide">
                    {settings.displayRole}
                  </div>
                </div>
              </div>

              {/* Floating aesthetic pill */}
              <div className="absolute -top-3 -right-3 sm:-right-4 px-3 py-1.5 rounded-full bg-white border border-[#F1D5E0] shadow-md flex items-center gap-1.5 text-[11px] font-semibold text-[#BE185D] animate-bounce-subtle">
                <Sparkles className="w-3.5 h-3.5 text-[#E75480] fill-[#E75480]" />
                <span>AI Video Director</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
