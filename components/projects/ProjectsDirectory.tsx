'use client';

import { useState, useMemo } from 'react';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from '../shared/EmptyState';
import { Pagination } from '../shared/Pagination';
import { Search, Filter, X, Sparkles } from 'lucide-react';
import type { Project } from '@/schemas';

interface ProjectsDirectoryProps {
  initialProjects: Project[];
}

const ITEMS_PER_PAGE = 6;

export function ProjectsDirectory({ initialProjects }: ProjectsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'featured'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories & tools
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => set.add(p.category));
    return ['all', ...Array.from(set)];
  }, [initialProjects]);

  const tools = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => p.tools.forEach((t) => set.add(t)));
    return ['all', ...Array.from(set)];
  }, [initialProjects]);

  // Filter & sort
  const filteredProjects = useMemo(() => {
    let result = initialProjects.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));
        const matchesTools = p.tools.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesTags && !matchesTools) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Tool
      if (selectedTool !== 'all' && !p.tools.includes(selectedTool)) {
        return false;
      }

      return true;
    });

    if (sortBy === 'featured') {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else {
      result = [...result].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [initialProjects, searchQuery, selectedCategory, selectedTool, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTool('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedTool !== 'all' ||
    sortBy !== 'newest';

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="p-6 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#795B6B]" />
          <input
            type="text"
            placeholder="Search projects by title, category, tools, or tags..."
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

        {/* Filters and Sorting row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 font-semibold text-[#351827]">
              <Filter className="w-3.5 h-3.5 text-[#BE185D]" />
              Filter:
            </span>

            {/* Category dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-[#F1D5E0] bg-[#FFF8FB] text-[#351827] font-medium focus:outline-hidden focus:border-[#BE185D]"
            >
              <option value="all">All Categories</option>
              {categories
                .filter((c) => c !== 'all')
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>

            {/* AI Tool dropdown */}
            <select
              value={selectedTool}
              onChange={(e) => {
                setSelectedTool(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-[#F1D5E0] bg-[#FFF8FB] text-[#351827] font-medium focus:outline-hidden focus:border-[#BE185D]"
            >
              <option value="all">All AI Tools</option>
              {tools
                .filter((t) => t !== 'all')
                .map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
            </select>
          </div>

          {/* Sort By & Clear */}
          <div className="flex items-center gap-2 ml-auto">
            <label className="flex items-center gap-1.5 text-[#795B6B] font-medium">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as 'newest' | 'featured');
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-lg border border-[#F1D5E0] bg-[#FFF8FB] text-[#351827] font-medium focus:outline-hidden"
              >
                <option value="newest">Newest First</option>
                <option value="featured">Featured First</option>
              </select>
            </label>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#BE185D] hover:bg-[#FCE4EC] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Results summary chip */}
        <div className="flex items-center justify-between text-[11px] text-[#795B6B] pt-1 border-t border-[#FFF0F5]">
          <span>
            Showing <strong className="text-[#351827]">{filteredProjects.length}</strong> published creative projects
          </span>
          {sortBy === 'featured' && (
            <span className="flex items-center gap-1 text-[#BE185D] font-medium">
              <Sparkles className="w-3 h-3" />
              Prioritizing featured works
            </span>
          )}
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {paginatedProjects.length === 0 ? (
        <EmptyState
          title="No projects match your filters"
          description="We couldn't find any creative projects matching your search term and filters. Try clearing your filters."
          onAction={resetFilters}
          actionLabel="Clear all filters"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} priority={idx < 3} />
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
