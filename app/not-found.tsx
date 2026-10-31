import Link from 'next/link';
import { Sparkles, Home, BookOpen, Terminal, Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#FFF0F5] border border-[#F1D5E0] mx-auto flex items-center justify-center text-[#BE185D] shadow-xs">
          <Sparkles className="w-8 h-8 text-[#E75480]" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#BE185D] font-bold">
            404 &bull; Page Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#351827]">
            Lost in the Latent Space
          </h1>
          <p className="text-xs sm:text-sm text-[#795B6B] leading-relaxed">
            The page, prompt, or course you are looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#F1D5E0] space-y-2.5 text-xs text-left shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#795B6B] font-bold block mb-1">
            Explore Popular Destinations:
          </span>
          <Link
            href="/"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFF8FB] text-[#351827] hover:text-[#BE185D] transition-colors"
          >
            <Home className="w-4 h-4 text-[#E75480]" />
            <span>Return to Portfolio Homepage</span>
          </Link>
          <Link
            href="/prompts"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFF8FB] text-[#351827] hover:text-[#BE185D] transition-colors"
          >
            <Terminal className="w-4 h-4 text-[#E75480]" />
            <span>Browse AI Prompt Library</span>
          </Link>
          <Link
            href="/learn"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFF8FB] text-[#351827] hover:text-[#BE185D] transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#E75480]" />
            <span>Discover Courses in Learning Hub</span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFF8FB] text-[#351827] hover:text-[#BE185D] transition-colors"
          >
            <Film className="w-4 h-4 text-[#E75480]" />
            <span>View Creative Video Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
