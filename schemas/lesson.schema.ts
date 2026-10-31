import { z } from 'zod';

export const LessonSchema = z.object({
  id: z.string().min(1, 'Lesson ID is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be URL-safe (lowercase alphanumeric with dashes)'),
  courseId: z.string().min(1, 'Course ID reference is required'),
  moduleId: z.string().min(1, 'Module ID reference is required'),
  title: z.string().min(1, 'Lesson title is required'),
  summary: z.string().min(10, 'Lesson summary must be at least 10 characters'),
  readingTime: z.string().default('5 min read'),
  order: z.number().int().default(0),
  content: z.string().min(20, 'Lesson content must contain substantial text or Markdown'),
  resourceIds: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published']),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}/, 'createdAt must be an ISO date string (YYYY-MM-DD)'),
  updatedAt: z.string().optional(),
});

export const LessonsListSchema = z.array(LessonSchema);

export type Lesson = z.infer<typeof LessonSchema>;
