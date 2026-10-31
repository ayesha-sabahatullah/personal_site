import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-xs font-medium text-[#795B6B] overflow-x-auto py-1', className)}
    >
      <ol className="flex items-center space-x-1.5 whitespace-nowrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#BE185D] transition-colors"
            title="Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1.5">
              <ChevronRight className="w-3 h-3 text-[#F1D5E0] flex-shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#BE185D] transition-colors truncate max-w-[200px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'truncate max-w-[240px]',
                    isLast ? 'text-[#351827] font-semibold' : ''
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
