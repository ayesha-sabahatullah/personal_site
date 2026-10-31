import { z } from 'zod';

export const ResourceTypeEnum = z.enum([
  'Notes',
  'PDF',
  'Presentation',
  'Worksheet',
  'Exercise',
  'Code',
  'Tutorial',
  'External Article',
  'Video',
  'Reference',
]);

export const ResourceSchema = z.object({
  id: z.string().min(1, 'Resource ID is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be URL-safe (lowercase alphanumeric with dashes)'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  resourceType: ResourceTypeEnum,
  subject: z.string().min(1, 'Subject is required'),
  topics: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'All Levels']).default('All Levels'),
  courseId: z.string().optional().default(''),
  moduleId: z.string().optional().default(''),
  lessonId: z.string().optional().default(''),
  projectId: z.string().optional().default(''),
  downloadUrl: z.string().optional().default(''),
  fileSize: z.string().optional().default(''),
  externalUrl: z.string().optional().default(''),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}/, 'createdAt must be an ISO date string (YYYY-MM-DD)'),
  updatedAt: z.string().optional(),
});

export const ResourcesListSchema = z.array(ResourceSchema);

export type Resource = z.infer<typeof ResourceSchema>;
export type ResourceType = z.infer<typeof ResourceTypeEnum>;
