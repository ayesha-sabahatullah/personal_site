import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { ProjectsDirectory } from '@/components/projects/ProjectsDirectory';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Film } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Creative Work & AI Video Projects',
  description:
    'Explore cinematic AI films, commercial concepts, and virtual cinematography experiments directed with generative tools.',
  canonical: '/projects',
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Creative Work' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
          <Film className="w-4 h-4" />
          <span>Cinematic Portfolio</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#351827]">
          Creative Work & AI Video Projects
        </h1>
        <p className="text-sm sm:text-base text-[#795B6B] max-w-2xl leading-relaxed">
          A showcase of narrative shorts, virtual fashion pieces, and worldbuilding studies produced using state-of-the-art synthetic video generation pipelines.
        </p>
      </div>

      <ProjectsDirectory initialProjects={projects} />
    </div>
  );
}
