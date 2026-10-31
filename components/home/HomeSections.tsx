import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Film,
  Terminal,
  Award,
  CheckCircle2,
  Mail,
  GraduationCap,
  Lightbulb,
} from 'lucide-react';
import { ProjectCard } from '../projects/ProjectCard';
import { PromptCard } from '../prompts/PromptCard';
import { CourseCard } from '../learning/CourseCard';
import type { SiteSettings, Project, Prompt, Course } from '@/schemas';

interface HomeSectionsProps {
  settings: SiteSettings;
  featuredProjects: Project[];
  featuredPrompts: Prompt[];
  featuredCourses: Array<{
    course: Course;
    moduleCount: number;
    lessonCount: number;
  }>;
}

export function HomeSections({
  settings,
  featuredProjects,
  featuredPrompts,
  featuredCourses,
}: HomeSectionsProps) {
  return (
    <div className="space-y-24 sm:space-y-32 py-12">
      {/* 1. About Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#F1D5E0] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FFF0F5] to-transparent rounded-bl-full pointer-events-none -z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>The Vision & Creative Journey</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#351827] leading-snug">
                Bridging Cinematic Directing with Machine Intelligence
              </h2>

              <p className="text-xs sm:text-base text-[#795B6B] leading-relaxed">
                {settings.fullBio}
              </p>

              {settings.teachingPhilosophy && (
                <div className="p-4 rounded-2xl bg-[#FFF8FB] border-l-4 border-[#E75480] text-xs sm:text-sm text-[#4A2D3C] italic leading-relaxed">
                  &ldquo;{settings.teachingPhilosophy}&rdquo;
                </div>
              )}

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#BE185D] hover:text-[#351827] transition-colors group"
                >
                  <span>Read Full Background, Experience & Education</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#FFF0F5] p-6 rounded-2xl border border-[#F1D5E0] space-y-4 text-xs">
              <h3 className="font-serif font-bold text-sm text-[#351827] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#BE185D]" />
                <span>Core Expertise</span>
              </h3>

              <ul className="space-y-2.5 text-[#795B6B]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                  <span>Cinematic AI Video Direction & Virtual Production</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                  <span>Prompt Grammar & Token Dissection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                  <span>Multi-Shot Temporal Continuity & Character Consistency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                  <span>Latent 4K Upscaling & Post-Production Pipelines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Creative Projects */}
      {featuredProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold mb-1">
                <Film className="w-4 h-4" />
                <span>Selected Portfolio</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#351827]">
                Featured Creative Work & AI Films
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BE185D] hover:text-[#351827] transition-colors group"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* 3. AI Prompt Library Preview */}
      {featuredPrompts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold mb-1">
                <Terminal className="w-4 h-4" />
                <span>Prompt Architecture</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#351827]">
                Curated AI Video Prompts
              </h2>
            </div>
            <Link
              href="/prompts"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BE185D] hover:text-[#351827] transition-colors group"
            >
              <span>Browse Full Prompt Library</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Learning Hub Preview */}
      {featuredCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Educational Platform</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#351827]">
                Featured Courses & Masterclasses
              </h2>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BE185D] hover:text-[#351827] transition-colors group"
            >
              <span>View All Courses & Syllabi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCourses.map(({ course, moduleCount, lessonCount }) => (
              <CourseCard
                key={course.id}
                course={course}
                moduleCount={moduleCount}
                lessonCount={lessonCount}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. Teaching & Tools Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFF0F5] border border-[#F1D5E0] space-y-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Technology & Tooling</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#351827]">
              Tools, Pipelines & Technical Mastery
            </h2>
            <p className="text-xs sm:text-sm text-[#795B6B] mt-2">
              Production stacks applied across commercial film shoots, experimental cinema, and curriculum workshops.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {settings.aiTools?.map((tool) => (
              <div
                key={tool.name}
                className="p-4 rounded-xl bg-white border border-[#F1D5E0] shadow-2xs hover:border-[#BE185D] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#795B6B] uppercase mb-1">
                    {tool.category}
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-[#351827]">
                    {tool.name}
                  </div>
                </div>
                {tool.proficiency && (
                  <div className="text-[10px] font-bold text-[#BE185D] pt-2 mt-2 border-t border-[#FFF0F5]">
                    {tool.proficiency}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Achievements & Honors (Optional section, hidden if empty) */}
      {settings.achievements && settings.achievements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold mb-1">
              <Award className="w-4 h-4" />
              <span>Milestones</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#351827]">
              Recognitions & Speaking Engagements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {settings.achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  {item.year && (
                    <span className="text-[11px] font-mono text-[#BE185D] font-bold block mb-1">
                      {item.year}
                    </span>
                  )}
                  <h3 className="font-serif font-bold text-base text-[#351827] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#795B6B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Contact Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-[#351827] to-[#5C2E52] p-8 sm:p-14 text-white overflow-hidden shadow-xl">
          {/* Decorative pink halo */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#E75480]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-medium text-pink-200">
              <Sparkles className="w-3.5 h-3.5 text-[#E75480]" />
              <span>Collaborations & Workshops</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-medium leading-tight">
              Have a Project, Workshop, or Speaking Invitation in Mind?
            </h2>

            <p className="text-xs sm:text-sm text-pink-100/80 leading-relaxed">
              I consult for creative production teams, direct generative AI campaigns, and lecture worldwide on synthetic visual storytelling.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={`mailto:${settings.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E75480] to-[#BE185D] text-white text-xs sm:text-sm font-semibold shadow-md hover:scale-[1.02] transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Send an Email</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all backdrop-blur-xs"
              >
                <span>View Contact Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
