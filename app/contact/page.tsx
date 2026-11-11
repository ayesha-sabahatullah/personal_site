import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Mail, MapPin, MessageSquare, ArrowUpRight, Phone } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Contact',
  description:
    'Contact ZekoMind for AI video production, prompt engineering, YouTube automation collaborations, and speaking inquiries.',
  canonical: '/contact',
});

export default function ContactPage() {
  const settings = getSiteSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
          <MessageSquare className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#351827]">
          Contact Information
        </h1>
        <p className="text-sm sm:text-base text-[#795B6B] max-w-2xl leading-relaxed">
          For collaborations, AI video production, workshops, or general questions, reach out through
          email or any of the social platforms below.
        </p>
      </header>

      {/* Contact Details */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white border border-[#F1D5E0] shadow-sm space-y-6">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#351827]">
          Direct Contact
        </h2>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <dt className="text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
              Email
            </dt>
            <dd>
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#351827] hover:text-[#BE185D] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#E75480] shrink-0" />
                <span>{settings.email}</span>
              </a>
            </dd>
          </div>

          {settings.phone && (
            <div className="space-y-1">
              <dt className="text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
                Phone
              </dt>
              <dd>
                <a
                  href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#351827] hover:text-[#BE185D] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E75480] shrink-0" />
                  <span>{settings.phone}</span>
                </a>
              </dd>
            </div>
          )}

          {settings.location && (
            <div className="space-y-1">
              <dt className="text-xs font-mono uppercase tracking-wider text-[#BE185D] font-bold">
                Location
              </dt>
              <dd className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#351827]">
                <MapPin className="w-4 h-4 text-[#E75480] shrink-0" />
                <span>{settings.location}</span>
              </dd>
            </div>
          )}
        </dl>

        {settings.availableForCollab && (
          <p className="text-xs text-[#795B6B] pt-2 border-t border-[#FFF0F5]">
            Currently available for new collaborations and speaking engagements.
          </p>
        )}
      </section>

      {/* Social Profiles */}
      {settings.socialLinks && settings.socialLinks.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#351827]">
            Social & Community Profiles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {settings.socialLinks.map((soc) => (
              <a
                key={soc.platform}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white border border-[#F1D5E0] shadow-2xs hover:border-[#BE185D] hover:bg-[#FFF0F5] transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#351827]">{soc.platform}</div>
                  <div className="text-[11px] text-[#795B6B]">{soc.label}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#BE185D]" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
