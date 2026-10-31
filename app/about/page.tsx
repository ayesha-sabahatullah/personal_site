import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  Award,
  BookOpen,
  Mail,
  ArrowRight,
  Cpu,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'About the Creator & Educator',
  description:
    'Learn more about the background, film production experience, teaching philosophy, and technical tools behind our AI video pipeline.',
  canonical: '/about',
});

export default function AboutPage() {
  const settings = getSiteSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'About' }]} />

      {/* Hero / Profile Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#E75480]/20 via-[#FCE4EC] to-[#BE185D]/20 rotate-1 -z-10" />
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-[#FFF0F5]">
              <Image
                src={settings.profileImage}
                alt={settings.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                referrerPolicy="no-referrer"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F1D5E0] text-xs font-semibold text-[#BE185D]">
            <Sparkles className="w-3.5 h-3.5 text-[#E75480]" />
            <span>Professional Profile & Journey</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#351827] leading-tight">
            {settings.name === '[Your Name]' ? 'Aura Chen' : settings.name}
          </h1>

          <p className="font-mono text-xs sm:text-sm text-[#BE185D] uppercase tracking-wider font-semibold">
            {settings.displayRole}
          </p>

          <p className="text-sm sm:text-base text-[#795B6B] leading-relaxed">
            {settings.fullBio}
          </p>

          {/* Contact Action */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E75480] to-[#BE185D] text-white text-xs font-semibold shadow-xs hover:opacity-95 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch ({settings.email})</span>
            </a>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#F1D5E0] text-[#351827] hover:text-[#BE185D] text-xs font-semibold transition-colors"
            >
              <span>View Creative Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      {settings.teachingPhilosophy && (
        <section className="p-8 sm:p-10 rounded-3xl bg-[#FFF0F5] border border-[#F1D5E0] space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Educational Philosophy</span>
          </div>
          <h2 className="font-serif text-2xl font-medium text-[#351827]">
            Craft Over Automation
          </h2>
          <p className="text-sm sm:text-base text-[#4A2D3C] italic leading-relaxed border-l-4 border-[#E75480] pl-4">
            &ldquo;{settings.teachingPhilosophy}&rdquo;
          </p>
        </section>
      )}

      {/* Experience Timeline */}
      {settings.experience && settings.experience.length > 0 && (
        <section className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Career Track</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#351827]">
              Creative & Teaching Experience
            </h2>
          </div>

          <div className="space-y-6">
            {settings.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#351827]">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-[#BE185D]">
                    {exp.period}
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#795B6B] mb-3">
                  {exp.organization}
                </div>

                <p className="text-xs sm:text-sm text-[#795B6B] leading-relaxed mb-4">
                  {exp.description}
                </p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1.5 pt-3 border-t border-[#FFF0F5] text-xs text-[#4A2D3C]">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E75480] shrink-0 mt-1.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {settings.education && settings.education.length > 0 && (
        <section className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Background</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#351827]">
              Education & Degrees
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settings.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#BE185D] font-bold">
                  <span>{edu.period}</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#351827]">
                  {edu.degree}
                </h3>
                <div className="text-xs text-[#795B6B] font-semibold">
                  {edu.institution}
                </div>
                {edu.description && (
                  <p className="text-xs text-[#795B6B] leading-relaxed pt-2">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & AI Tool Stack */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categorized Skills */}
        {settings.skills && settings.skills.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
              <Layers className="w-4 h-4" />
              <span>Skill Matrix</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-[#351827]">
              Disciplines & Competencies
            </h3>

            <div className="space-y-5">
              {settings.skills.map((skillGroup) => (
                <div key={skillGroup.category} className="space-y-2">
                  <h4 className="text-xs font-bold text-[#351827] uppercase tracking-wide">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FFF8FB] text-[#795B6B] border border-[#F1D5E0]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Tools */}
        {settings.aiTools && settings.aiTools.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
              <Cpu className="w-4 h-4" />
              <span>Model Specializations</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-[#351827]">
              AI Generation Software Stack
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {settings.aiTools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-3.5 rounded-xl bg-[#FFF8FB] border border-[#F1D5E0] space-y-1"
                >
                  <div className="text-[10px] font-mono text-[#795B6B] uppercase">
                    {tool.category}
                  </div>
                  <div className="text-xs font-bold text-[#351827]">
                    {tool.name}
                  </div>
                  {tool.proficiency && (
                    <div className="text-[11px] font-semibold text-[#BE185D]">
                      Level: {tool.proficiency}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Achievements / Honors (Optional) */}
      {settings.achievements && settings.achievements.length > 0 && (
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold mb-1">
              <Award className="w-4 h-4" />
              <span>Honors & Speaking</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-[#351827]">
              Selected Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {settings.achievements.map((ach, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-2"
              >
                {ach.year && (
                  <span className="text-xs font-mono font-bold text-[#BE185D]">
                    {ach.year}
                  </span>
                )}
                <h3 className="font-serif font-bold text-base text-[#351827]">
                  {ach.title}
                </h3>
                <p className="text-xs text-[#795B6B] leading-relaxed">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
