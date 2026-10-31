import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination Navigation"
      className={cn('flex items-center justify-center gap-1.5 my-8 select-none', className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous Page"
        className="inline-flex items-center justify-center p-2 rounded-lg border border-[#F1D5E0] bg-white text-[#795B6B] hover:bg-[#FFF0F5] hover:text-[#BE185D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'min-w-9 h-9 px-3 flex items-center justify-center rounded-lg text-xs font-semibold transition-all',
              isActive
                ? 'bg-[#E75480] text-white shadow-xs'
                : 'border border-[#F1D5E0] bg-white text-[#795B6B] hover:bg-[#FFF0F5] hover:text-[#BE185D]'
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next Page"
        className="inline-flex items-center justify-center p-2 rounded-lg border border-[#F1D5E0] bg-white text-[#795B6B] hover:bg-[#FFF0F5] hover:text-[#BE185D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
