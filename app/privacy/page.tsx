import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ShieldCheck, HardDrive, Cookie, Lock } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy & Data Policy',
  description:
    'Learn how visitor data and local learning progress are handled in our frontend-only architecture.',
  canonical: '/privacy',
});

export default function PrivacyPage() {
  const settings = getSiteSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Transparency Notice</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#351827]">
          Privacy Policy & Local Storage
        </h1>
        <p className="text-sm sm:text-base text-[#795B6B] leading-relaxed">
          This personal portfolio and educational hub is designed with privacy-first principles. We do not operate tracking databases, telemetry brokers, or intrusive cookies.
        </p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-[#4A2D3C] leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-3">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#351827] flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#BE185D]" />
            <span>1. Local Browser Storage</span>
          </h2>
          <p>
            When you mark lessons as completed in the Learning Hub, your progress is recorded strictly within your browser&apos;s local storage (<code className="px-1.5 py-0.5 rounded-sm bg-[#FFF0F5] text-[#BE185D] font-mono text-xs">localStorage</code>).
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#795B6B]">
            <li>This data never leaves your device.</li>
            <li>No remote server, database, or analytics platform tracks your course completion.</li>
            <li>Clearing your browser cache or storage resets these completion checkmarks.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-3">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#351827] flex items-center gap-2">
            <Cookie className="w-4 h-4 text-[#BE185D]" />
            <span>2. Cookies & Telemetry</span>
          </h2>
          <p>
            We do not use advertising cookies, marketing pixels, or third-party behavioral profiling trackers. All video and resource previews are hosted or embedded with privacy-conscious options enabled.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#F1D5E0] shadow-xs space-y-3">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#351827] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#BE185D]" />
            <span>3. Direct Correspondence</span>
          </h2>
          <p>
            When you click to contact the creator via <code className="px-1.5 py-0.5 rounded-sm bg-[#FFF0F5] text-[#BE185D] font-mono text-xs">{settings.email}</code>, communications occur directly via standard email protocols between your email provider and ours. No contact forms store your emails in an intermediary database.
          </p>
        </section>
      </div>
    </div>
  );
}
