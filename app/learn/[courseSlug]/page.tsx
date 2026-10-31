import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  getAllCourses,
  getCourseOutline,
  getModulesByCourse,
  getLessonsByCourse,
} from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { CourseCard } from '@/components/learning/CourseCard';
import {
  BookOpen,
  Layers,
  Clock,
  Award,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  PlayCircle,
} from 'lucide-react';

interface CourseDetailPageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((c) => ({
    courseSlug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const outline = getCourseOutline(courseSlug);

  if (!outline) {
    return constructMetadata({ title: 'Course Not Found' });
  }

  return constructMetadata({
    title: outline.course.title,
    description: outline.course.description,
    image: outline.course.thumbnail,
    canonical: `/learn/${outline.course.slug}`,
  });
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { courseSlug } = await params;
  const outline = getCourseOutline(courseSlug);

  if (!outline) {
    notFound();
  }

  const { course, modules, totalLessons } = outline;

  // Find first lesson of first module to power "Start Course" CTA
  const firstModule = modules[0];
  const firstLesson = firstModule?.lessons[0];
  const firstLessonUrl = firstLesson
    ? `/learn/${course.slug}/${firstModule.module.slug}/${firstLesson.slug}`
    : null;

  // Other courses
  const allCourses = getAllCourses();
  const otherCourses = allCourses
    .filter((c) => c.id !== course.id)
    .slice(0, 2)
    .map((c) => {
      const mods = getModulesByCourse(c.id);
      const les = getLessonsByCourse(c.id);
      return {
        course: c,
        moduleCount: mods.length,
        lessonCount: les.length,
      };
    });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Learning Hub', href: '/learn' },
          { label: course.title },
        ]}
      />

      {/* Course Header Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-[#F1D5E0] shadow-sm">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#FFF0F5] text-[#BE185D] border border-[#F1D5E0]">
              {course.subject}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#FFF8FB] text-[#795B6B] border border-[#F1D5E0] flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#E75480]" />
              {course.level}
            </span>
            {course.duration && (
              <span className="flex items-center gap-1 text-xs text-[#795B6B] font-mono">
                <Clock className="w-3.5 h-3.5 text-[#E75480]" />
                {course.duration}
              </span>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-medium text-[#351827] leading-tight">
            {course.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#795B6B] leading-relaxed">
            {course.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {firstLessonUrl && (
              <Link
                href={firstLessonUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E75480] to-[#BE185D] text-white text-xs sm:text-sm font-semibold shadow-md hover:scale-[1.02] transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Learning Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <div className="text-xs text-[#795B6B] font-mono">
              <strong>{modules.length}</strong> modules &bull; <strong>{totalLessons}</strong> published lessons
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          {course.thumbnail ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#F1D5E0] shadow-md bg-[#FFF0F5]">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#FCE4EC] border border-[#F1D5E0] text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-xs mx-auto flex items-center justify-center text-[#BE185D]">
                <BookOpen className="w-8 h-8 text-[#BE185D]" />
              </div>
              <div className="font-serif font-bold text-lg text-[#351827]">
                {course.title}
              </div>
              <p className="text-xs text-[#795B6B]">
                Curriculum, video prompts, and lessons ready to explore.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Objectives & Prerequisites */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Objectives */}
        <div className="p-6 rounded-2xl bg-[#FFF8FB] border border-[#F1D5E0] space-y-4">
          <h2 className="font-serif font-bold text-base text-[#351827] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#BE185D]" />
            <span>What You Will Master</span>
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A2D3C]">
            {course.learningObjectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E75480] shrink-0 mt-2" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites */}
        <div className="p-6 rounded-2xl bg-[#FFF8FB] border border-[#F1D5E0] space-y-4">
          <h2 className="font-serif font-bold text-base text-[#351827] flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#BE185D]" />
            <span>Course Prerequisites</span>
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A2D3C]">
            {course.prerequisites.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE185D] shrink-0 mt-2" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Course Curriculum & Modules Breakdown */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold mb-1">
            <Layers className="w-4 h-4" />
            <span>Structured Curriculum</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#351827]">
            Course Modules & Lessons
          </h2>
        </div>

        <div className="space-y-6">
          {modules.map(({ module: mod, lessons }, modIdx) => (
            <div
              key={mod.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#FFF0F5]">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#FFF0F5] text-[#BE185D] font-mono text-xs font-bold flex items-center justify-center border border-[#F1D5E0]">
                    0{modIdx + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#351827]">
                      <Link
                        href={`/learn/${course.slug}/${mod.slug}`}
                        className="hover:text-[#BE185D] transition-colors"
                      >
                        {mod.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#795B6B]">{mod.description}</p>
                  </div>
                </div>

                <Link
                  href={`/learn/${course.slug}/${mod.slug}`}
                  className="text-xs font-semibold text-[#BE185D] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Module Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Lessons List in Module */}
              <div className="space-y-2 pt-2">
                {lessons.map((lesson, lessonIdx) => (
                  <Link
                    key={lesson.id}
                    href={`/learn/${course.slug}/${mod.slug}/${lesson.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FFF8FB] hover:bg-[#FFF0F5] border border-[#F1D5E0] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#795B6B]">
                        {modIdx + 1}.{lessonIdx + 1}
                      </span>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-[#351827] group-hover:text-[#BE185D] transition-colors">
                          {lesson.title}
                        </div>
                        <div className="text-[11px] text-[#795B6B] line-clamp-1">
                          {lesson.summary}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-xs text-[#795B6B]">
                      <span className="hidden sm:inline font-mono text-[11px]">
                        {lesson.readingTime}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#BE185D] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Courses */}
      {otherCourses.length > 0 && (
        <section className="pt-8 border-t border-[#F1D5E0] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-medium text-[#351827]">
              Other Available Courses
            </h2>
            <Link
              href="/learn"
              className="text-xs font-semibold text-[#BE185D] hover:underline"
            >
              All courses &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherCourses.map(({ course: c, moduleCount, lessonCount }) => (
              <CourseCard
                key={c.id}
                course={c}
                moduleCount={moduleCount}
                lessonCount={lessonCount}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
