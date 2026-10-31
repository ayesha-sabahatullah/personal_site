import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Layers, Clock, Award, Youtube } from 'lucide-react';
import type { Course } from '@/schemas';

interface CourseCardProps {
  course: Course;
  moduleCount: number;
  lessonCount: number;
  priority?: boolean;
}

export function CourseCard({
  course,
  moduleCount,
  lessonCount,
  priority = false,
}: CourseCardProps) {
  const hasThumbnail = Boolean(course.thumbnail && course.thumbnail.trim().length > 0);

  return (
    <article className="group flex flex-col rounded-3xl bg-white border border-[#F1D5E0] overflow-hidden shadow-xs hover:shadow-md hover:border-[#E75480] transition-all duration-300">
      {/* Course Banner: Image or Stylized Editorial Header (No pictures required) */}
      {hasThumbnail ? (
        <Link
          href={`/learn/${course.slug}`}
          className="relative block aspect-video w-full overflow-hidden bg-[#FFF0F5]"
          tabIndex={-1}
        >
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/95 backdrop-blur-xs text-[#BE185D] shadow-xs">
            {course.subject}
          </div>

          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#351827]/85 backdrop-blur-xs text-white shadow-xs flex items-center gap-1">
            <Award className="w-3 h-3 text-[#E75480]" />
            <span>{course.level}</span>
          </div>
        </Link>
      ) : (
        <div className="p-6 pb-2 bg-gradient-to-r from-[#FFF0F5] to-[#FCE4EC] border-b border-[#F1D5E0]">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white text-[#BE185D] shadow-2xs border border-[#F1D5E0]">
              <Youtube className="w-3.5 h-3.5 text-[#BE185D]" />
              <span>{course.subject}</span>
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#351827] text-white">
              <Award className="w-3 h-3 text-[#E75480]" />
              <span>{course.level}</span>
            </div>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-7">
        {/* Meta Stats calculated from published records */}
        <div className="flex items-center gap-3 text-xs text-[#795B6B] mb-3">
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#BE185D]" />
            <strong>{moduleCount}</strong> {moduleCount === 1 ? 'Module' : 'Modules'}
          </span>
          <span className="text-[#F1D5E0]">•</span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[#E75480]" />
            <strong>{lessonCount}</strong> {lessonCount === 1 ? 'Lesson' : 'Lessons'}
          </span>
          {course.duration && (
            <>
              <span className="text-[#F1D5E0]">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#795B6B]" />
                {course.duration}
              </span>
            </>
          )}
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#351827] group-hover:text-[#BE185D] transition-colors line-clamp-2 mb-2">
          <Link href={`/learn/${course.slug}`} className="hover:underline">
            {course.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-[#795B6B] line-clamp-3 mb-6 flex-1 leading-relaxed">
          {course.description}
        </p>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#FFF0F5] mt-auto">
          <Link
            href={`/learn/${course.slug}`}
            className="w-full inline-flex items-center justify-between px-5 py-3 text-xs font-semibold rounded-xl bg-[#FFF0F5] hover:bg-[#FCE4EC] text-[#BE185D] transition-colors group-hover:border-[#BE185D]"
          >
            <span>Start Learning Course</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
