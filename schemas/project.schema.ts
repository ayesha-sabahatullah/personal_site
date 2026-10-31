import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string().min(1, 'Project ID is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be URL-safe (lowercase alphanumeric with dashes)'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  tools: z.array(z.string()).min(1, 'At least one tool is required'),
  tags: z.array(z.string()).default([]),
  thumbnail: z.string().optional().default(''),
  videoUrl: z.string().optional().default(''),
  embedUrl: z.string().optional().default(''),
  background: z.string().optional().default(''),
  creativeProcess: z.string().optional().default(''),
  promptIds: z.array(z.string()).default([]),
  credits: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}/, 'createdAt must be an ISO date string (YYYY-MM-DD)'),
  updatedAt: z.string().optional(),
});

export const ProjectsListSchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;
