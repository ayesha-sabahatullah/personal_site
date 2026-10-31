'use client';

import { useState, useMemo } from 'react';
import { CourseCard } from './CourseCard';
import { EmptyState } from '../shared/EmptyState';
import { Search, Filter, X } from 'lucide-react';
import type { Course } from '@/schemas';

interface CourseWithCounts {
  course: Course;
  moduleCount: number;
  lessonCount: number;
}

interface CoursesDirectoryProps {
  initialCourses: CourseWithCounts[];
}

export function CoursesDirectory({ initialCourses }: CoursesDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const subjects = useMemo(() => {
    const set = new Set<string>();
    initialCourses.forEach((c) => set.add(c.course.subject));
    return ['all', ...Array.from(set)];
  }, [initialCourses]);

  const levels = useMemo(() => {
    const set = new Set<string>();
    initialCourses.forEach((c) => set.add(c.course.level));
    return ['all', ...Array.from(set)];
  }, [initialCourses]);

  const filteredCourses = useMemo(() => {
    return initialCourses.filter(({ course }) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesDesc = course.description.toLowerCase().includes(q);
        const matchesSubject = course.subject.toLowerCase().includes(q);
        const matchesObjectives = course.learningObjectives.some((o) =>
          o.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesDesc && !matchesSubject && !matchesObjectives) {
          return false;
        }
      }

      if (selectedSubject !== 'all' && course.subject !== selectedSubject) {
        return false;
      }

      if (selectedLevel !== 'all' && course.level !== selectedLevel) {
        return false;
      }

      return true;
    });
  }, [initialCourses, searchQuery, selectedSubject, selectedLevel]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('all');
    setSelectedLevel('all');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedSubject !== 'all' ||
    selectedLevel !== 'all';

  return (
    <div className="space-y-8">
      {/* Search & Filter Header */}
      <div className="p-6 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#795B6B]" />
          <input
            type="text"
            placeholder="Search courses by title, subject, or learning outcomes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-[#F1D5E0] bg-[#FFF8FB] focus:bg-white focus:outline-hidden focus:border-[#BE185D] focus:ring-2 focus:ring-[#BE185D]/10 transition-all text-[#351827] placeholder:text-[#795B6B]/60"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#795B6B] hover:text-[#BE185D]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 font-semibold text-[#351827]">
              <Filter className="w-3.5 h-3.5 text-[#BE185D]" />
              Filter:
            </span>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#F1D5E0] bg-[#FFF8FB] text-[#351827] font-medium focus:outline-hidden focus:border-[#BE185D]"
            >
              <option value="all">All Subjects</option>
              {subjects
                .filter((s) => s !== 'all')
                .map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#F1D5E0] bg-[#FFF8FB] text-[#351827] font-medium focus:outline-hidden focus:border-[#BE185D]"
            >
              <option value="all">All Difficulty Levels</option>
              {levels
                .filter((l) => l !== 'all')
                .map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#BE185D] hover:bg-[#FCE4EC] transition-colors ml-auto"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="We couldn't find any courses matching your current search criteria. Try resetting your search filters."
          onAction={resetFilters}
          actionLabel="Clear filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map(({ course, moduleCount, lessonCount }, idx) => (
            <CourseCard
              key={course.id}
              course={course}
              moduleCount={moduleCount}
              lessonCount={lessonCount}
              priority={idx < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}
