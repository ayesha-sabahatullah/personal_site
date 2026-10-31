import { z } from 'zod';

export const PromptSchema = z.object({
  id: z.string().min(1, 'Prompt ID is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be URL-safe (lowercase alphanumeric with dashes)'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  prompt: z.string().min(5, 'Full prompt text must be provided'),
  negativePrompt: z.string().optional().default(''),
  category: z.string().min(1, 'Category is required'),
  tools: z.array(z.string()).min(1, 'At least one tool is required'),
  tags: z.array(z.string()).default([]),
  thumbnail: z.string().optional().default(''),
  videoUrl: z.string().optional().default(''),
  generationSettings: z.record(z.string(), z.string()).optional().default({}),
  creationNotes: z.string().optional().default(''),
  projectIds: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}/, 'createdAt must be an ISO date string (YYYY-MM-DD)'),
  updatedAt: z.string().optional(),
});

export const PromptsListSchema = z.array(PromptSchema);

export type Prompt = z.infer<typeof PromptSchema>;
