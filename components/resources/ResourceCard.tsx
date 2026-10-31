import Link from 'next/link';
import {
  FileText,
  FileCode,
  Presentation,
  Download,
  ExternalLink,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import type { Resource } from '@/schemas';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
      case 'Worksheet':
      case 'Notes':
        return <FileText className="w-4 h-4 text-[#BE185D]" />;
      case 'Code':
        return <FileCode className="w-4 h-4 text-[#BE185D]" />;
      case 'Presentation':
        return <Presentation className="w-4 h-4 text-[#BE185D]" />;
      default:
        return <Layers className="w-4 h-4 text-[#BE185D]" />;
    }
  };

  return (
    <article className="group flex flex-col rounded-2xl bg-white border border-[#F1D5E0] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#E75480] transition-all duration-300">
      {/* Top Meta */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FFF0F5] text-[#BE185D] border border-[#F1D5E0]">
          {getTypeIcon(resource.resourceType)}
          <span>{resource.resourceType}</span>
        </div>

        <span className="text-[11px] font-mono text-[#795B6B]">
          {resource.level}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-lg font-medium text-[#351827] group-hover:text-[#BE185D] transition-colors line-clamp-2 mb-2">
        <Link href={`/resources/${resource.slug}`} className="hover:underline">
          {resource.title}
        </Link>
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-[#795B6B] line-clamp-2 mb-4 flex-1 leading-relaxed">
        {resource.description}
      </p>

      {/* Topics / Tags */}
      {resource.tags && resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-md bg-[#FFF8FB] text-[#795B6B] border border-[#F1D5E0]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#FFF0F5] mt-auto text-xs">
        {resource.downloadUrl ? (
          <a
            href={resource.downloadUrl}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFF0F5] hover:bg-[#FCE4EC] text-[#BE185D] font-semibold transition-colors border border-[#F1D5E0]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {resource.fileSize ? `(${resource.fileSize})` : ''}</span>
          </a>
        ) : resource.externalUrl ? (
          <a
            href={resource.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFF0F5] hover:bg-[#FCE4EC] text-[#BE185D] font-semibold transition-colors border border-[#F1D5E0]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>External Link</span>
          </a>
        ) : null}

        <Link
          href={`/resources/${resource.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-[#795B6B] hover:text-[#BE185D] transition-colors ml-auto"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
