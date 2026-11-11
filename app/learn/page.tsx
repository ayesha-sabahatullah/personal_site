import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllCourses,
  getModulesByCourse,
  getLessonsByCourse,
} from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { CoursesDirectory } from '@/components/learning/CoursesDirectory';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { BookOpen, FolderDown } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Learning Hub & Courses',
  description:
    'Master synthetic cinematography, token prompt architecture, and AI post-production with structured courses, modules, and lessons.',
  canonical: '/learn',
});

export const dynamic = 'force-dynamic';

export default function LearnPage() {
  const coursesRaw = getAllCourses();

  // Calculate actual published module and lesson counts
  const courses = coursesRaw.map((course) => {
    const modules = getModulesByCourse(course.id);
    const lessons = getLessonsByCourse(course.id);
    return {
      course,
      moduleCount: modules.length,
      lessonCount: lessons.length,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Learning Hub' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
          <BookOpen className="w-4 h-4" />
          <span>Curriculum & Syllabi</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#351827]">
          ZekoMind Learning Hub
        </h1>
        <p className="text-sm sm:text-base text-[#795B6B] max-w-2xl leading-relaxed">
          Master end-to-end YouTube automation with structured modules, script architectures, and visual generation workflows.
        </p>
      </div>

      <CoursesDirectory initialCourses={courses} />
    </div>
  );
}
