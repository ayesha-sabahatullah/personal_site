'use client';

import { useState, useMemo } from 'react';
import { ResourceCard } from './ResourceCard';
import { EmptyState } from '../shared/EmptyState';
import { Pagination } from '../shared/Pagination';
import { Search, Filter, X } from 'lucide-react';
import type { Resource } from '@/schemas';

interface ResourcesDirectoryProps {
  initialResources: Resource[];
}

const ITEMS_PER_PAGE = 6;

export function ResourcesDirectory({ initialResources }: ResourcesDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const resourceTypes = useMemo(() => {
    const set = new Set<string>();
    initialResources.forEach((r) => set.add(r.resourceType));
    return ['all', ...Array.from(set)];
  }, [initialResources]);

  const subjects = useMemo(() => {
    const set = new Set<string>();
    initialResources.forEach((r) => set.add(r.subject));
    return ['all', ...Array.from(set)];
  }, [initialResources]);

  const filteredResources = useMemo(() => {
    return initialResources.filter((r) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q);
        const matchesSubject = r.subject.toLowerCase().includes(q);
        const matchesTopics = r.topics.some((t) => t.toLowerCase().includes(q));
        const matchesTags = r.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesSubject && !matchesTopics && !matchesTags) {
          return false;
        }
      }

      if (selectedType !== 'all' && r.resourceType !== selectedType) {
        return false;
      }

      if (selectedSubject !== 'all' && r.subject !== selectedSubject) {
        return false;
      }

      if (selectedLevel !== 'all' && r.level !== selectedLevel) {
        return false;
      }

      return true;
    });
  }, [initialResources, searchQuery, selectedType, selectedSubject, selectedLevel]);

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResources.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredResources, currentPage]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedSubject('all');
    setSelectedLevel('all');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedType !== 'all' ||
    selectedSubject !== 'all' ||
    selectedLevel !== 'all';

  return (
    <div className="space-y-8">
      {/* Search & Filters */}
      <div className="p-6 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#795B6B]" />
          <input
            type="text"
            placeholder="Search standalone resources, cheat sheets, presets, templates..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-[#F1D5E0] bg-[#FFF8FB] focus:bg-white focus:outline-hidden focus:border-[#BE185D] focus:ring-2 focus:ring-[#BE185D]/10 transition-all text-[#351827] placeholder:text-[#795B6B]/60"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
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
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-[#F1D5E0] bg-[#FFF8FB] text-[#351827] font-medium focus:outline-hidden focus:border-[#BE185D]"
            >
              <option value="all">All Resource Types</option>
              {resourceTypes
                .filter((t) => t !== 'all')
                .map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
            </select>

            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-[#F1D5E0] bg-[#FFF8FB] text-[#351827] font-medium focus:outline-hidden focus:border-[#BE185D]"
            >
              <option value="all">All Subjects</option>
              {subjects
                .filter((s) => s !== 'all')
                .map((s) => (
                  <option key={s} value={s}>
                    {s}
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
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {paginatedResources.length === 0 ? (
        <EmptyState
          title="No resources found"
          description="We couldn't find any learning materials matching your filter settings. Try clearing filters or searching for terms like 'cheat sheet' or 'presets'."
          onAction={resetFilters}
          actionLabel="Clear filters"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          />
        </>
      )}
    </div>
  );
}
