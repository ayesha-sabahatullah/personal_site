import type { Metadata } from 'next';
import { getAllPrompts } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { PromptsDirectory } from '@/components/prompts/PromptsDirectory';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Terminal } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'AI Video Prompt Library',
  description:
    'Discover production-ready AI video prompts, generation parameter settings, and camera motion formulas for Runway Gen-3, Kling AI, Luma Dream Machine, and Midjourney.',
  canonical: '/prompts',
});

export const dynamic = 'force-dynamic';

export default function PromptsPage() {
  const prompts = getAllPrompts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'AI Prompts' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
          <Terminal className="w-4 h-4" />
          <span>Generative Prompt Library</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#351827]">
          AI Video Prompt Library
        </h1>
        <p className="text-sm sm:text-base text-[#795B6B] max-w-2xl leading-relaxed">
          Production-tested prompt formulas with camera vectors, lighting coordinates, and generation settings. Click any prompt to copy the complete text or view full parameters.
        </p>
      </div>

      <PromptsDirectory initialPrompts={prompts} />
    </div>
  );
}
