import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllCourses,
  getCourseBySlug,
  getModulesByCourse,
  getModuleBySlug,
  getLessonsByModule,
} from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import {
  Layers,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  PlayCircle,
} from 'lucide-react';

interface ModuleDetailPageProps {
  params: Promise<{ courseSlug: string; moduleSlug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  const params: Array<{ courseSlug: string; moduleSlug: string }> = [];

  for (const course of courses) {
    const modules = getModulesByCourse(course.id);
    for (const mod of modules) {
      params.push({
        courseSlug: course.slug,
        moduleSlug: mod.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ModuleDetailPageProps): Promise<Metadata> {
  const { courseSlug, moduleSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const mod = getModuleBySlug(courseSlug, moduleSlug);

  if (!course || !mod) {
    return constructMetadata({ title: 'Module Not Found' });
  }

  return constructMetadata({
    title: `${mod.title} | ${course.title}`,
    description: mod.description,
    canonical: `/learn/${course.slug}/${mod.slug}`,
  });
}

export default async function ModuleDetailPage({
  params,
}: ModuleDetailPageProps) {
  const { courseSlug, moduleSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const mod = getModuleBySlug(courseSlug, moduleSlug);

  if (!course || !mod) {
    notFound();
  }

  const allModules = getModulesByCourse(course.id);
  const currentIndex = allModules.findIndex((m) => m.id === mod.id);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  const lessons = getLessonsByModule(mod.id);
  const firstLesson = lessons[0];
  const firstLessonUrl = firstLesson
    ? `/learn/${course.slug}/${mod.slug}/${firstLesson.slug}`
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Learning Hub', href: '/learn' },
          { label: course.title, href: `/learn/${course.slug}` },
          { label: mod.title },
        ]}
      />

      {/* Header */}
      <header className="p-8 sm:p-10 rounded-3xl bg-white border border-[#F1D5E0] shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[#FFF0F5] text-[#BE185D] font-mono text-xs font-bold flex items-center justify-center border border-[#F1D5E0]">
            0{currentIndex + 1}
          </span>
          <span className="text-xs font-mono text-[#BE185D] uppercase tracking-wider font-bold">
            Module {currentIndex + 1} of {allModules.length} &bull; {course.title}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-medium text-[#351827] leading-tight">
          {mod.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#795B6B] leading-relaxed">
          {mod.description}
        </p>

        {firstLessonUrl && (
          <div className="pt-2">
            <Link
              href={firstLessonUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E75480] to-[#BE185D] text-white text-xs font-semibold shadow-xs hover:scale-[1.02] transition-all"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Begin Module (First Lesson)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </header>

      {/* Objectives */}
      {mod.learningObjectives && mod.learningObjectives.length > 0 && (
        <section className="p-6 rounded-2xl bg-[#FFF8FB] border border-[#F1D5E0] space-y-3">
          <h2 className="font-serif font-bold text-sm text-[#351827] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#BE185D]" />
            <span>Module Key Outcomes</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-[#4A2D3C]">
            {mod.learningObjectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E75480] shrink-0 mt-2" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Lessons List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#351827] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#BE185D]" />
            <span>Lessons in this Module</span>
          </h2>
          <span className="text-xs font-mono text-[#795B6B]">
            {lessons.length} {lessons.length === 1 ? 'Lesson' : 'Lessons'}
          </span>
        </div>

        <div className="space-y-3">
          {lessons.map((lesson, idx) => (
            <Link
              key={lesson.id}
              href={`/learn/${course.slug}/${mod.slug}/${lesson.slug}`}
              className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white hover:bg-[#FFF0F5] border border-[#F1D5E0] shadow-2xs hover:border-[#BE185D] transition-all group"
            >
              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-md bg-[#FFF8FB] text-[#795B6B] font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-[#F1D5E0] group-hover:bg-[#BE185D] group-hover:text-white transition-colors">
                  {idx + 1}
                </span>

                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#351827] group-hover:text-[#BE185D] transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-[#795B6B] leading-relaxed">
                    {lesson.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs text-[#795B6B] ml-4">
                <span className="hidden sm:inline font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lesson.readingTime}
                </span>
                <ArrowRight className="w-4 h-4 text-[#BE185D] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Prev & Next Module Navigation */}
      <nav
        aria-label="Module navigation"
        className="pt-8 border-t border-[#F1D5E0] grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {prevModule ? (
          <Link
            href={`/learn/${course.slug}/${prevModule.slug}`}
            className="p-4 rounded-2xl bg-white border border-[#F1D5E0] hover:bg-[#FFF0F5] transition-colors group flex items-center gap-3"
          >
            <ArrowLeft className="w-4 h-4 text-[#BE185D] group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono text-[#795B6B]">
                Previous Module
              </span>
              <div className="text-xs font-bold text-[#351827] line-clamp-1">
                {prevModule.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextModule && (
          <Link
            href={`/learn/${course.slug}/${nextModule.slug}`}
            className="p-4 rounded-2xl bg-white border border-[#F1D5E0] hover:bg-[#FFF0F5] transition-colors group flex items-center justify-between text-right sm:col-start-2"
          >
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-[#795B6B]">
                Next Module
              </span>
              <div className="text-xs font-bold text-[#351827] line-clamp-1">
                {nextModule.title}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#BE185D] group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </nav>
    </div>
  );
}
