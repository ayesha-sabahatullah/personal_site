'use client';

import React from 'react';
import Markdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';
import { cn } from '@/lib/utils';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <div
      className={cn(
        'prose max-w-none text-[#351827] leading-relaxed',
        'prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-[#351827]',
        'prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-[#F1D5E0] prose-h2:pb-2',
        'prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 text-[#BE185D]',
        'prose-p:mb-4 prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed text-[#4A2D3C]',
        'prose-ul:my-4 prose-ul:list-disc prose-ul:pl-5 text-[#4A2D3C]',
        'prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-5 text-[#4A2D3C]',
        'prose-li:my-1 text-sm sm:text-base',
        'prose-blockquote:border-l-4 prose-blockquote:border-[#E75480] prose-blockquote:bg-[#FFF0F5] prose-blockquote:px-4 prose-blockquote:py-3 prose-blockquote:rounded-r-xl prose-blockquote:my-5 prose-blockquote:text-sm prose-blockquote:text-[#795B6B] prose-blockquote:italic',
        'prose-hr:my-8 prose-hr:border-[#F1D5E0]',
        'prose-a:text-[#BE185D] prose-a:underline hover:prose-a:text-[#E75480] prose-a:font-medium',
        'prose-strong:text-[#351827] prose-strong:font-semibold',
        className
      )}
    >
      <Markdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');
            const codeString = String(children).replace(/\n$/, '');

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded-md bg-[#FCE4EC] text-[#BE185D] text-xs sm:text-sm font-mono border border-[#F1D5E0]"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock
                code={codeString}
                language={match ? match[1] : 'text'}
              />
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6 rounded-xl border border-[#F1D5E0] shadow-xs">
                <table className="min-w-full text-left text-xs sm:text-sm text-[#351827]">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-[#FFF0F5] border-b border-[#F1D5E0] font-semibold text-[#BE185D]">{children}</thead>;
          },
          th({ children }) {
            return <th className="px-4 py-3 font-semibold">{children}</th>;
          },
          td({ children }) {
            return <td className="px-4 py-3 border-b border-[#FCE4EC]">{children}</td>;
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
