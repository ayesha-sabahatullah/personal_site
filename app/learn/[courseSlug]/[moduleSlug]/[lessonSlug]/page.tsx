import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllCourses,
  getCourseBySlug,
  getModuleBySlug,
  getLessonBySlug,
  getLessonsByModule,
  getResourcesByIds,
  getCourseOutline,
} from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { MarkdownViewer } from '@/components/shared/MarkdownViewer';
import { LessonToc } from '@/components/learning/LessonToc';
import { ProgressToggle } from '@/components/shared/ProgressToggle';
import {
  BookOpen,
  Clock,
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
  Layers,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface LessonDetailPageProps {
  params: Promise<{
    courseSlug: string;
    moduleSlug: string;
    lessonSlug: string;
  }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  const params: Array<{
    courseSlug: string;
    moduleSlug: string;
    lessonSlug: string;
  }> = [];

  for (const course of courses) {
    const outline = getCourseOutline(course.slug);
    if (!outline) continue;

    for (const modItem of outline.modules) {
      for (const lesson of modItem.lessons) {
        params.push({
          courseSlug: course.slug,
          moduleSlug: modItem.module.slug,
          lessonSlug: lesson.slug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: LessonDetailPageProps): Promise<Metadata> {
  const { courseSlug, moduleSlug, lessonSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const mod = getModuleBySlug(courseSlug, moduleSlug);
  const lesson = getLessonBySlug(courseSlug, moduleSlug, lessonSlug);

  if (!course || !mod || !lesson) {
    return constructMetadata({ title: 'Lesson Not Found' });
  }

  return constructMetadata({
    title: `${lesson.title} | ${course.title}`,
    description: lesson.summary,
    canonical: `/learn/${course.slug}/${mod.slug}/${lesson.slug}`,
  });
}

export default async function LessonDetailPage({
  params,
}: LessonDetailPageProps) {
  const { courseSlug, moduleSlug, lessonSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const mod = getModuleBySlug(courseSlug, moduleSlug);
  const lesson = getLessonBySlug(courseSlug, moduleSlug, lessonSlug);

  if (!course || !mod || !lesson) {
    notFound();
  }

  const moduleLessons = getLessonsByModule(mod.id);
  const currentIndex = moduleLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < moduleLessons.length - 1
      ? moduleLessons[currentIndex + 1]
      : null;

  const resources = getResourcesByIds(lesson.resourceIds || []);
  const outline = getCourseOutline(course.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Learning Hub', href: '/learn' },
          { label: course.title, href: `/learn/${course.slug}` },
          { label: mod.title, href: `/learn/${course.slug}/${mod.slug}` },
          { label: lesson.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Main Lesson Content Column */}
        <article className="lg:col-span-8 space-y-8">
          {/* Header */}
          <header className="p-8 sm:p-10 rounded-3xl bg-white border border-[#F1D5E0] shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#FFF0F5] text-[#BE185D]">
                  Lesson {currentIndex + 1} of {moduleLessons.length}
                </span>
                <span className="text-xs font-mono text-[#795B6B] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#E75480]" />
                  {lesson.readingTime}
                </span>
              </div>

              {/* Lesson Progress Toggle */}
              <ProgressToggle lessonId={lesson.id} />
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-medium text-[#351827] leading-tight">
              {lesson.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#795B6B] leading-relaxed border-l-2 border-[#E75480] pl-3 italic">
              {lesson.summary}
            </p>
          </header>

          {/* Formatted Markdown Content */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#F1D5E0] shadow-sm">
            <MarkdownViewer content={lesson.content} />
          </div>

          {/* Downloadable Lesson Resources */}
          {resources.length > 0 && (
            <section className="p-6 sm:p-8 rounded-3xl bg-[#FFF0F5] border border-[#F1D5E0] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
                <FileText className="w-4 h-4" />
                <span>Lesson Downloads & Attachments</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resources.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-2xl bg-white border border-[#F1D5E0] shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#FFF8FB] text-[#BE185D] border border-[#F1D5E0] mb-1.5">
                        {res.resourceType}
                      </div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#351827]">
                        {res.title}
                      </h4>
                      <p className="text-[11px] text-[#795B6B] line-clamp-2 mt-1">
                        {res.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      {res.downloadUrl ? (
                        <a
                          href={res.downloadUrl}
                          download
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BE185D] hover:underline"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download {res.fileSize || 'File'}</span>
                        </a>
                      ) : res.externalUrl ? (
                        <a
                          href={res.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BE185D] hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Resource</span>
                        </a>
                      ) : null}

                      <Link
                        href={`/resources/${res.slug}`}
                        className="text-[11px] text-[#795B6B] hover:text-[#BE185D]"
                      >
                        Details &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prev & Next Lesson Nav */}
          <nav
            aria-label="Lesson navigation"
            className="pt-8 border-t border-[#F1D5E0] grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {prevLesson ? (
              <Link
                href={`/learn/${course.slug}/${mod.slug}/${prevLesson.slug}`}
                className="p-4 rounded-2xl bg-white border border-[#F1D5E0] hover:bg-[#FFF0F5] transition-colors group flex items-center gap-3"
              >
                <ArrowLeft className="w-4 h-4 text-[#BE185D] group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono text-[#795B6B]">
                    Previous Lesson
                  </span>
                  <div className="text-xs font-bold text-[#351827] line-clamp-1">
                    {prevLesson.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson && (
              <Link
                href={`/learn/${course.slug}/${mod.slug}/${nextLesson.slug}`}
                className="p-4 rounded-2xl bg-white border border-[#F1D5E0] hover:bg-[#FFF0F5] transition-colors group flex items-center justify-between text-right sm:col-start-2"
              >
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-[#795B6B]">
                    Next Lesson
                  </span>
                  <div className="text-xs font-bold text-[#351827] line-clamp-1">
                    {nextLesson.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#BE185D] group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </nav>
        </article>

        {/* Sidebar Column: TOC & Course Outline */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Table of contents */}
          <LessonToc content={lesson.content} />

          {/* Collapsible / Accordion Course Outline */}
          {outline && (
            <div className="p-5 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-3">
              <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-[11px] font-bold text-[#BE185D] border-b border-[#FFF0F5] pb-2">
                <Layers className="w-4 h-4" />
                <span>Course Navigation</span>
              </div>

              <div className="text-xs font-serif font-bold text-[#351827]">
                <Link href={`/learn/${course.slug}`} className="hover:underline">
                  {course.title}
                </Link>
              </div>

              <div className="space-y-4 pt-2 max-h-[380px] overflow-y-auto pr-1">
                {outline.modules.map(({ module: m, lessons: ls }) => {
                  const isCurrentModule = m.id === mod.id;
                  return (
                    <div key={m.id} className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#795B6B]">
                        <ChevronRight className="w-3.5 h-3.5 text-[#E75480]" />
                        <Link
                          href={`/learn/${course.slug}/${m.slug}`}
                          className={isCurrentModule ? 'text-[#BE185D]' : 'hover:underline'}
                        >
                          {m.title}
                        </Link>
                      </div>

                      {/* Lesson items under module */}
                      <ul className="pl-5 space-y-1 text-xs">
                        {ls.map((l) => {
                          const isCurrent = l.id === lesson.id;
                          return (
                            <li key={l.id}>
                              <Link
                                href={`/learn/${course.slug}/${m.slug}/${l.slug}`}
                                className={`block py-0.5 truncate transition-colors ${
                                  isCurrent
                                    ? 'text-[#BE185D] font-bold'
                                    : 'text-[#795B6B] hover:text-[#351827]'
                                }`}
                              >
                                {isCurrent ? '• ' : ''}{l.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
