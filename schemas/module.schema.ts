import { z } from 'zod';

export const ModuleSchema = z.object({
  id: z.string().min(1, 'Module ID is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be URL-safe (lowercase alphanumeric with dashes)'),
  courseId: z.string().min(1, 'Course ID reference is required'),
  title: z.string().min(1, 'Module title is required'),
  description: z.string().min(10, 'Module description must be at least 10 characters'),
  learningObjectives: z.array(z.string()).default([]),
  order: z.number().int().default(0),
  status: z.enum(['draft', 'published']),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}/, 'createdAt must be an ISO date string (YYYY-MM-DD)'),
  updatedAt: z.string().optional(),
});

export const ModulesListSchema = z.array(ModuleSchema);

export type Module = z.infer<typeof ModuleSchema>;
