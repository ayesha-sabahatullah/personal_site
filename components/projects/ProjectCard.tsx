import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowUpRight, Wrench } from 'lucide-react';
import type { Project } from '@/schemas';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col rounded-2xl bg-white border border-[#F1D5E0] overflow-hidden shadow-xs hover:shadow-md hover:border-[#E75480] transition-all duration-300">
      {/* Thumbnail */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-video w-full overflow-hidden bg-[#FFF0F5]"
        tabIndex={-1}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Video / Play Overlay Indicator */}
        {project.videoUrl && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white shadow-xs group-hover:bg-[#BE185D] transition-colors">
            <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-[#BE185D] shadow-xs">
          {project.category}
        </div>
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-[#795B6B]">
            {project.createdAt}
          </span>
          {project.featured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FCE4EC] text-[#BE185D]">
              Featured
            </span>
          )}
        </div>

        <h3 className="font-serif text-lg sm:text-xl font-medium text-[#351827] group-hover:text-[#BE185D] transition-colors line-clamp-2 mb-2">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-[#795B6B] line-clamp-3 mb-4 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#FFF0F5] mt-auto">
          {project.tools.slice(0, 3).map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#FFF8FB] text-[#795B6B] border border-[#F1D5E0]"
            >
              <Wrench className="w-2.5 h-2.5 text-[#E75480]" />
              {tool}
            </span>
          ))}
          {project.tools.length > 3 && (
            <span className="px-1.5 py-0.5 text-[10px] text-[#795B6B]">
              +{project.tools.length - 3} more
            </span>
          )}
        </div>

        {/* Link Footer */}
        <div className="pt-4 mt-3 flex items-center justify-between text-xs font-semibold text-[#BE185D] group-hover:translate-x-0.5 transition-transform">
          <span>View Project Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
}
