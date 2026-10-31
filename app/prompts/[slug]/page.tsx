import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllPrompts,
  getPromptBySlug,
  getRelatedProjectsForPrompt,
} from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { CopyButton } from '@/components/shared/CopyButton';
import { PromptCard } from '@/components/prompts/PromptCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import {
  Terminal,
  Cpu,
  Calendar,
  Sparkles,
  Sliders,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  Film,
} from 'lucide-react';

interface PromptDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const prompts = getAllPrompts();
  return prompts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PromptDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    return constructMetadata({ title: 'Prompt Not Found' });
  }

  return constructMetadata({
    title: prompt.title,
    description: prompt.description,
    canonical: `/prompts/${prompt.slug}`,
  });
}

export default async function PromptDetailPage({
  params,
}: PromptDetailPageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  const relatedProjects = getRelatedProjectsForPrompt(prompt.projectIds || []);
  const allPrompts = getAllPrompts();
  const relatedPrompts = allPrompts
    .filter((p) => p.id !== prompt.id && p.category === prompt.category)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: 'AI Prompts', href: '/prompts' },
            { label: prompt.title },
          ]}
        />
        <Link
          href="/prompts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#795B6B] hover:text-[#BE185D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Library</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#FFF0F5] text-[#BE185D] border border-[#F1D5E0]">
            {prompt.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-[#795B6B]">
            <Calendar className="w-3.5 h-3.5 text-[#E75480]" />
            {prompt.createdAt}
          </span>
          {prompt.featured && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCE4EC] text-[#BE185D] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E75480]" />
              Featured Prompt
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#351827] leading-tight">
          {prompt.title}
        </h1>

        <p className="text-sm sm:text-base text-[#795B6B] leading-relaxed">
          {prompt.description}
        </p>

        {/* Tools badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {prompt.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white text-[#BE185D] border border-[#F1D5E0] shadow-2xs"
            >
              <Cpu className="w-3.5 h-3.5 text-[#E75480]" />
              {tool}
            </span>
          ))}

          {prompt.videoUrl && (
            <a
              href={prompt.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#FFF0F5] text-[#351827] hover:text-[#BE185D] border border-[#F1D5E0] transition-colors"
            >
              <Film className="w-3.5 h-3.5 text-[#E75480]" />
              <span>Watch Video Demo</span>
            </a>
          )}
        </div>
      </header>

      {/* Main Full Prompt Box (No thumbnail image required) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F1D5E0] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#FFF0F5]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[#BE185D]">
            <Terminal className="w-4 h-4" />
            <span>Full Generation Prompt</span>
          </div>
          <CopyButton
            textToCopy={prompt.prompt}
            label="Copy Prompt"
            className="text-xs"
          />
        </div>

        <div className="p-5 rounded-2xl bg-[#FFF8FB] border border-[#F1D5E0] text-xs sm:text-sm font-mono text-[#351827] leading-relaxed selection:bg-[#FCE4EC] selection:text-[#BE185D] whitespace-pre-wrap">
          {prompt.prompt}
        </div>
      </section>

      {/* Negative Prompt (Optional) */}
      {prompt.negativePrompt && (
        <section className="p-6 rounded-3xl bg-white border border-[#F1D5E0] shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#FFF0F5]">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-rose-700">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Negative Prompt / Exclusions</span>
            </div>
            <CopyButton
              textToCopy={prompt.negativePrompt}
              label="Copy Negative"
              className="text-xs"
            />
          </div>

          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 text-xs font-mono text-rose-900 leading-relaxed whitespace-pre-wrap">
            {prompt.negativePrompt}
          </div>
        </section>
      )}

      {/* Generation Settings & Creation Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompt.generationSettings &&
          Object.keys(prompt.generationSettings).length > 0 && (
            <div className="p-6 rounded-3xl bg-white border border-[#F1D5E0] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#351827] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#BE185D]" />
                <span>Model Parameters</span>
              </h3>

              <dl className="grid grid-cols-2 gap-3 text-xs">
                {Object.entries(prompt.generationSettings).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-[#FFF8FB] border border-[#F1D5E0]"
                  >
                    <dt className="text-[10px] font-mono uppercase text-[#795B6B] mb-0.5">
                      {key}
                    </dt>
                    <dd className="font-semibold text-[#351827] truncate" title={val}>
                      {val}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

        {prompt.creationNotes && (
          <div className="p-6 rounded-3xl bg-[#FFF0F5] border border-[#F1D5E0] shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-base text-[#351827] flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#BE185D]" />
              <span>Director&apos;s Iteration Notes</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#4A2D3C] leading-relaxed">
              {prompt.creationNotes}
            </p>
          </div>
        )}
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="pt-8 border-t border-[#F1D5E0] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-medium text-[#351827]">
              Films Featuring this Prompt
            </h2>
            <Link
              href="/projects"
              className="text-xs font-semibold text-[#BE185D] hover:underline"
            >
              All creative projects &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </section>
      )}

      {/* Related Prompts */}
      {relatedPrompts.length > 0 && (
        <section className="pt-8 border-t border-[#F1D5E0] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-medium text-[#351827]">
              Related {prompt.category} Prompts
            </h2>
            <Link
              href="/prompts"
              className="text-xs font-semibold text-[#BE185D] hover:underline"
            >
              Explore all prompts &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPrompts.map((p) => (
              <PromptCard key={p.id} prompt={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
