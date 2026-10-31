'use client';

import { useState, useMemo } from 'react';
import { PromptCard } from './PromptCard';
import { EmptyState } from '../shared/EmptyState';
import { Pagination } from '../shared/Pagination';
import { Search, Filter, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import type { Prompt } from '@/schemas';

interface PromptsDirectoryProps {
  initialPrompts: Prompt[];
}

const ITEMS_PER_PAGE = 6;

export function PromptsDirectory({ initialPrompts }: PromptsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'featured'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories, tools, and tags
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialPrompts.forEach((p) => set.add(p.category));
    return ['all', ...Array.from(set)];
  }, [initialPrompts]);

  const tools = useMemo(() => {
    const set = new Set<string>();
    initialPrompts.forEach((p) => p.tools.forEach((t) => set.add(t)));
    return ['all', ...Array.from(set)];
  }, [initialPrompts]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    initialPrompts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ['all', ...Array.from(set).slice(0, 8)];
  }, [initialPrompts]);

  // Filter & sort
  const filteredPrompts = useMemo(() => {
    let result = initialPrompts.filter((p) => {
      // Search matches title, description, prompt text, tools, categories, tags
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesPromptText = p.prompt.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesTools = p.tools.some((t) => t.toLowerCase().includes(q));
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));

        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesPromptText &&
          !matchesCat &&
          !matchesTools &&
          !matchesTags
        ) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Tool filter
      if (selectedTool !== 'all' && !p.tools.includes(selectedTool)) {
        return false;
      }

      // Tag filter
      if (selectedTag !== 'all' && !p.tags.includes(selectedTag)) {
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
  }, [initialPrompts, searchQuery, selectedCategory, selectedTool, selectedTag, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE);
  const paginatedPrompts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPrompts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPrompts, currentPage]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTool('all');
    setSelectedTag('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedTool !== 'all' ||
    selectedTag !== 'all' ||
    sortBy !== 'newest';

  return (
    <div className="space-y-8">
      {/* Search & Filter Header */}
      <div className="p-6 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#795B6B]" />
          <input
            type="text"
            placeholder="Search prompts by prompt text, camera directions, tools, categories, or keywords..."
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

        {/* Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 font-semibold text-[#351827]">
              <Filter className="w-3.5 h-3.5 text-[#BE185D]" />
              Filter:
            </span>

            {/* Category Select */}
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

            {/* Tool Select */}
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

          {/* Sort By & Reset */}
          <div className="flex items-center gap-2 ml-auto">
            <label className="flex items-center gap-1.5 text-[#795B6B] font-medium">
              <SlidersHorizontal className="w-3 h-3 text-[#BE185D]" />
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

        {/* Popular Tag Quick-Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#FFF0F5] text-xs">
          <span className="text-[11px] font-mono text-[#795B6B]">Quick Tags:</span>
          {tags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSelectedTag(isSelected ? 'all' : tag);
                  setCurrentPage(1);
                }}
                className={`px-2 py-0.5 rounded-md text-[11px] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#BE185D] text-white font-semibold shadow-2xs'
                    : 'bg-[#FFF8FB] text-[#795B6B] hover:bg-[#FCE4EC] hover:text-[#BE185D] border border-[#F1D5E0]'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>

        {/* Results summary chip */}
        <div className="flex items-center justify-between text-[11px] text-[#795B6B] pt-1">
          <span>
            Showing <strong className="text-[#351827]">{filteredPrompts.length}</strong> production prompts
          </span>
          {sortBy === 'featured' && (
            <span className="flex items-center gap-1 text-[#BE185D] font-medium">
              <Sparkles className="w-3 h-3" />
              Prioritizing featured prompts
            </span>
          )}
        </div>
      </div>

      {/* Prompts Grid */}
      {paginatedPrompts.length === 0 ? (
        <EmptyState
          title="No prompts found"
          description="We couldn't find any AI prompts matching your search and filter settings. Try clearing your filters or searching for different terms like 'cinematic', 'lighting', or 'anamorphic'."
          onAction={resetFilters}
          actionLabel="Clear all filters"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedPrompts.map((prompt, idx) => (
              <PromptCard key={prompt.id} prompt={prompt} priority={idx < 3} />
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
