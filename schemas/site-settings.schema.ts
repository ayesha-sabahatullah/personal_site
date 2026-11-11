import { z } from 'zod';

export const SiteSettingsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  displayRole: z.string().min(1, 'Display role is required'),
  brandName: z.string().min(1, 'Brand name is required'),
  shortBio: z.string().min(10, 'Short bio must be at least 10 characters'),
  fullBio: z.string().min(20, 'Full bio must be at least 20 characters'),
  profileImage: z.string().min(1, 'Profile image path is required'),
  logoText: z.string().default('STUDIO'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  availableForCollab: z.boolean().default(true),
  siteUrl: z.string().url('Site URL must be a valid URL'),
  socialLinks: z.array(
    z.object({
      platform: z.string(),
      url: z.string(),
      label: z.string(),
    })
  ),
  navigation: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    })
  ),
  hero: z.object({
    badge: z.string(),
    headline: z.string(),
    subheadline: z.string(),
    ctaPrimary: z.object({
      label: z.string(),
      href: z.string(),
    }),
    ctaSecondary: z.object({
      label: z.string(),
      href: z.string(),
    }),
  }),
  featuredProjectIds: z.array(z.string()).default([]),
  featuredPromptIds: z.array(z.string()).default([]),
  featuredCourseIds: z.array(z.string()).default([]),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      period: z.string(),
      description: z.string().optional(),
    })
  ).default([]),
  experience: z.array(
    z.object({
      role: z.string(),
      organization: z.string(),
      period: z.string(),
      description: z.string(),
      highlights: z.array(z.string()).optional(),
    })
  ).default([]),
  skills: z.array(
    z.object({
      category: z.string(),
      items: z.array(z.string()),
    })
  ).default([]),
  aiTools: z.array(
    z.object({
      name: z.string(),
      category: z.string(),
      proficiency: z.string().optional(),
    })
  ).default([]),
  achievements: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      year: z.string().optional(),
    })
  ).default([]),
  teachingPhilosophy: z.string().default(''),
  seo: z.object({
    defaultTitle: z.string(),
    titleTemplate: z.string(),
    defaultDescription: z.string(),
    ogImage: z.string().optional(),
  }),
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
