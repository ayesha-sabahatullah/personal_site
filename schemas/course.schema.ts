import { z } from 'zod';

export const CourseSchema = z.object({
  id: z.string().min(1, 'Course ID is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be URL-safe (lowercase alphanumeric with dashes)'),
  title: z.string().min(1, 'Course title is required'),
  description: z.string().min(10, 'Course description must be at least 10 characters'),
  subject: z.string().min(1, 'Subject is required'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'All Levels']),
  duration: z.string().optional().default('Self-paced'),
  learningObjectives: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  thumbnail: z.string().optional().default(''),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}/, 'createdAt must be an ISO date string (YYYY-MM-DD)'),
  updatedAt: z.string().optional(),
  order: z.number().int().default(0),
});

export const CoursesListSchema = z.array(CourseSchema);

export type Course = z.infer<typeof CourseSchema>;
