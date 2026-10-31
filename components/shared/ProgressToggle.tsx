'use client';

import { useSyncExternalStore } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressToggleProps {
  lessonId: string;
  className?: string;
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function ProgressToggle({ lessonId, className }: ProgressToggleProps) {
  const isCompleted = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(`lesson_completed_${lessonId}`) === 'true';
      } catch {
        return false;
      }
    },
    () => false
  );

  const toggle = () => {
    try {
      if (isCompleted) {
        localStorage.removeItem(`lesson_completed_${lessonId}`);
      } else {
        localStorage.setItem(`lesson_completed_${lessonId}`, 'true');
      }
      window.dispatchEvent(new Event('storage'));
    } catch {
      // ignore storage errors
    }
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <button
        type="button"
        onClick={toggle}
        className={cn(
          'inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border',
          isCompleted
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            : 'bg-[#FFF8FB] text-[#795B6B] border-[#F1D5E0] hover:bg-[#FFF0F5] hover:text-[#BE185D]'
        )}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
            <span>Marked as Completed</span>
          </>
        ) : (
          <>
            <Circle className="w-4 h-4 text-[#795B6B]" />
            <span>Mark Lesson Completed</span>
          </>
        )}
      </button>
      <span className="text-[10px] text-[#795B6B] italic">
        Progress is stored locally in this browser.
      </span>
    </div>
  );
}
