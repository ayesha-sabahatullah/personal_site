import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  getAllProjects,
  getProjectBySlug,
  getRelatedPromptsForProject,
} from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PromptCard } from '@/components/prompts/PromptCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import {
  Calendar,
  Wrench,
  Sparkles,
  ExternalLink,
  Film,
  Layers,
  Award,
} from 'lucide-react';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return constructMetadata({ title: 'Project Not Found' });
  }

  return constructMetadata({
    title: project.title,
    description: project.description,
    image: project.thumbnail,
    canonical: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedPrompts = getRelatedPromptsForProject(project.promptIds || []);
  const allProjects = getAllProjects();
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Creative Work', href: '/projects' },
          { label: project.title },
        ]}
      />

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#FFF0F5] text-[#BE185D] border border-[#F1D5E0]">
            {project.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-[#795B6B]">
            <Calendar className="w-3.5 h-3.5 text-[#E75480]" />
            {project.createdAt}
          </span>
          {project.featured && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCE4EC] text-[#BE185D] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured Project
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#351827] leading-tight">
          {project.title}
        </h1>

        <p className="text-sm sm:text-lg text-[#795B6B] leading-relaxed">
          {project.description}
        </p>

        {/* Tools badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white text-[#351827] border border-[#F1D5E0] shadow-2xs"
            >
              <Wrench className="w-3.5 h-3.5 text-[#BE185D]" />
              {tool}
            </span>
          ))}
        </div>
      </header>

      {/* Video Embed or Cover Image */}
      <div className="relative rounded-3xl overflow-hidden border border-[#F1D5E0] bg-black shadow-lg">
        {project.embedUrl ? (
          <div className="relative aspect-video w-full">
            <iframe
              src={project.embedUrl}
              title={project.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full bg-[#FFF0F5]">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            {project.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs">
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-[#BE185D] font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all"
                >
                  <Film className="w-4 h-4" />
                  <span>Watch on External Player</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Background & Creative Process */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 space-y-8">
          {project.background && (
            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-medium text-[#351827] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#BE185D]" />
                <span>Project Background & Concept</span>
              </h2>
              <div className="text-xs sm:text-sm text-[#4A2D3C] leading-relaxed whitespace-pre-line bg-white p-6 rounded-2xl border border-[#F1D5E0]">
                {project.background}
              </div>
            </section>
          )}

          {project.creativeProcess && (
            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-medium text-[#351827] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#BE185D]" />
                <span>Creative & Technical Pipeline</span>
              </h2>
              <div className="text-xs sm:text-sm text-[#4A2D3C] leading-relaxed whitespace-pre-line bg-white p-6 rounded-2xl border border-[#F1D5E0]">
                {project.creativeProcess}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Credits & Tags */}
        <aside className="lg:col-span-4 space-y-6">
          {project.credits && project.credits.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-3">
              <h3 className="font-serif font-bold text-sm text-[#351827] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#BE185D]" />
                <span>Project Credits</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#795B6B]">
                {project.credits.map((credit, idx) => (
                  <li key={idx} className="pb-1.5 border-b border-[#FFF0F5] last:border-b-0">
                    {credit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#351827] font-bold">
                Tags & Descriptors
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#FFF8FB] text-[#795B6B] border border-[#F1D5E0]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Associated AI Prompts */}
      {relatedPrompts.length > 0 && (
        <section className="pt-8 border-t border-[#F1D5E0] space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Prompt Architecture</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#351827]">
              AI Prompts Used in this Project
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="pt-8 border-t border-[#F1D5E0] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-medium text-[#351827]">
              More in {project.category}
            </h2>
            <Link
              href="/projects"
              className="text-xs font-semibold text-[#BE185D] hover:underline"
            >
              View all works &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
