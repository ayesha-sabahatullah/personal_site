'use client';

import { useMemo } from 'react';
import { ListTree } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonTocProps {
  content: string;
  className?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function LessonToc({ content, className }: LessonTocProps) {
  // Extract h2 and h3 markdown headings
  const tocItems = useMemo(() => {
    const lines = content.split('\n');
    const items: TocItem[] = [];

    for (const line of lines) {
      const match = /^(#{2,3})\s+(.*)$/.exec(line);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].trim();
        // slugify
        const id = rawText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');

        items.push({
          id,
          text: rawText,
          level,
        });
      }
    }

    return items;
  }, [content]);

  if (tocItems.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        'p-5 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs text-xs space-y-3',
        className
      )}
    >
      <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-[11px] font-bold text-[#BE185D] border-b border-[#FFF0F5] pb-2">
        <ListTree className="w-4 h-4" />
        <span>In This Lesson</span>
      </div>

      <ul className="space-y-2">
        {tocItems.map((item, idx) => (
          <li
            key={idx}
            className={cn(
              'leading-snug transition-colors',
              item.level === 3 ? 'pl-3 border-l border-[#F1D5E0]' : 'font-medium'
            )}
          >
            <a
              href={`#${item.id}`}
              className="text-[#795B6B] hover:text-[#BE185D] transition-colors block py-0.5"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
