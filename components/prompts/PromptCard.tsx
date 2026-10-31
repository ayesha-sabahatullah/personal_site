import Link from 'next/link';
import { CopyButton } from '../shared/CopyButton';
import { ArrowUpRight, Cpu, Tag, Terminal, Sparkles } from 'lucide-react';
import type { Prompt } from '@/schemas';

interface PromptCardProps {
  prompt: Prompt;
  priority?: boolean;
}

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl bg-white border border-[#F1D5E0] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#E75480] transition-all duration-300">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FFF0F5] text-[#BE185D] border border-[#F1D5E0]">
            {prompt.category}
          </span>
          {prompt.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FFF8FB] text-[#795B6B] border border-[#F1D5E0]"
            >
              <Cpu className="w-2.5 h-2.5 text-[#E75480]" />
              {tool}
            </span>
          ))}
        </div>

        {prompt.featured && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FCE4EC] text-[#BE185D] flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3 text-[#E75480]" />
            Featured
          </span>
        )}
      </div>

      {/* Prompt Title */}
      <h3 className="font-serif text-lg font-medium text-[#351827] group-hover:text-[#BE185D] transition-colors line-clamp-1 mb-2">
        <Link href={`/prompts/${prompt.slug}`} className="hover:underline">
          {prompt.title}
        </Link>
      </h3>

      {/* Description */}
      <p className="text-xs text-[#795B6B] line-clamp-2 mb-4 leading-relaxed">
        {prompt.description}
      </p>

      {/* Prominent Prompt Text Container (No thumbnail needed) */}
      <div className="relative p-3.5 rounded-xl bg-[#FFF8FB] border border-[#F1D5E0] mb-4 flex-1">
        <div className="flex items-center gap-1 text-[10px] font-mono text-[#BE185D] uppercase tracking-wider mb-1 font-bold">
          <Terminal className="w-3 h-3" />
          <span>Prompt Formula</span>
        </div>
        <p className="text-xs font-mono text-[#351827] line-clamp-4 leading-relaxed selection:bg-[#FCE4EC]">
          {prompt.prompt}
        </p>
      </div>

      {/* Tags */}
      {prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {prompt.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 text-[10px] text-[#795B6B] bg-[#FFF0F5]/50 px-2 py-0.5 rounded-md border border-[#F1D5E0]/60"
            >
              <Tag className="w-2.5 h-2.5 text-[#E75480]" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-[#FFF0F5] mt-auto">
        <CopyButton
          textToCopy={prompt.prompt}
          label="Copy Full Prompt"
          className="text-xs"
        />

        <Link
          href={`/prompts/${prompt.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#BE185D] hover:text-[#351827] transition-colors ml-3"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
