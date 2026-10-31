'use client';

import { CopyButton } from './CopyButton';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'text',
  filename,
  className,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        'relative my-5 rounded-xl overflow-hidden border border-[#F1D5E0] bg-[#1E141D] text-pink-50 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-[#2D1B2A] border-b border-[#43253D] text-xs">
        <div className="flex items-center gap-2 font-mono text-pink-200">
          <Terminal className="w-3.5 h-3.5 text-[#E75480]" />
          <span>{filename || language.toUpperCase()}</span>
        </div>
        <CopyButton
          textToCopy={code.trim()}
          label="Copy Code"
          className="bg-[#43253D] hover:bg-[#5C2E52] text-pink-100 ring-0"
        />
      </div>
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed selection:bg-[#E75480] selection:text-white">
        <pre>
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
