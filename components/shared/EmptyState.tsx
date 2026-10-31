import { SearchX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = 'No items found',
  description = 'Try adjusting your search criteria or resetting filters.',
  actionLabel = 'Reset Filters',
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-[#F1D5E0] bg-[#FFF8FB]/80 my-8',
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-[#FFF0F5] border border-[#F1D5E0] flex items-center justify-center text-[#BE185D] mb-4 shadow-xs">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-serif font-medium text-[#351827] mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#795B6B] max-w-md mb-5 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg bg-[#E75480] text-white hover:bg-[#BE185D] transition-colors shadow-xs cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
