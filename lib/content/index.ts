import fs from 'fs';
import path from 'path';
import {
  SiteSettings,
  SiteSettingsSchema,
  Project,
  ProjectsListSchema,
  Prompt,
  PromptsListSchema,
  Course,
  CoursesListSchema,
  Module,
  ModulesListSchema,
  Lesson,
  LessonsListSchema,
  Resource,
  ResourcesListSchema,
} from '@/schemas';

function loadJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'content', filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

// Site Settings
export function getSiteSettings(): SiteSettings {
  const data = loadJson<SiteSettings>('site-settings.json');
  return SiteSettingsSchema.parse(data);
}

// Projects
export function getAllProjects(options: { includeDrafts?: boolean } = {}): Project[] {
  const data = loadJson<Project[]>('projects.json');
  const valid = ProjectsListSchema.parse(data);
  if (options.includeDrafts) return valid;
  return valid.filter((p) => p.status === 'published');
}

export function getFeaturedProjects(): Project[] {
  const settings = getSiteSettings();
  const all = getAllProjects();
  if (settings.featuredProjectIds && settings.featuredProjectIds.length > 0) {
    const map = new Map(all.map((p) => [p.id, p]));
    const featured = settings.featuredProjectIds
      .map((id) => map.get(id))
      .filter((p): p is Project => Boolean(p && p.status === 'published'));
    if (featured.length > 0) return featured;
  }
  return all.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const all = getAllProjects();
  return all.find((p) => p.slug === slug);
}

// Prompts
export function getAllPrompts(options: { includeDrafts?: boolean } = {}): Prompt[] {
  const data = loadJson<Prompt[]>('prompts.json');
  const valid = PromptsListSchema.parse(data);
  if (options.includeDrafts) return valid;
  return valid.filter((p) => p.status === 'published');
}

export function getFeaturedPrompts(): Prompt[] {
  const settings = getSiteSettings();
  const all = getAllPrompts();
  if (settings.featuredPromptIds && settings.featuredPromptIds.length > 0) {
    const map = new Map(all.map((p) => [p.id, p]));
    const featured = settings.featuredPromptIds
      .map((id) => map.get(id))
      .filter((p): p is Prompt => Boolean(p && p.status === 'published'));
    if (featured.length > 0) return featured;
  }
  return all.filter((p) => p.featured);
}

export function getPromptBySlug(slug: string): Prompt | undefined {
  const all = getAllPrompts();
  return all.find((p) => p.slug === slug);
}

// Courses
export function getAllCourses(options: { includeDrafts?: boolean } = {}): Course[] {
  const data = loadJson<Course[]>('courses.json');
  const valid = CoursesListSchema.parse(data);
  const filtered = options.includeDrafts ? valid : valid.filter((c) => c.status === 'published');
  return filtered.sort((a, b) => a.order - b.order);
}

export function getFeaturedCourses(): Course[] {
  const settings = getSiteSettings();
  const all = getAllCourses();
  if (settings.featuredCourseIds && settings.featuredCourseIds.length > 0) {
    const map = new Map(all.map((c) => [c.id, c]));
    const featured = settings.featuredCourseIds
      .map((id) => map.get(id))
      .filter((c): c is Course => Boolean(c && c.status === 'published'));
    if (featured.length > 0) return featured;
  }
  return all.filter((c) => c.featured);
}

export function getCourseBySlug(slug: string): Course | undefined {
  const all = getAllCourses();
  return all.find((c) => c.slug === slug);
}

// Modules
export function getAllModules(options: { includeDrafts?: boolean } = {}): Module[] {
  const data = loadJson<Module[]>('modules.json');
  const valid = ModulesListSchema.parse(data);
  if (options.includeDrafts) return valid.sort((a, b) => a.order - b.order);
  
  // Only published modules belonging to published courses
  const publishedCourses = new Set(getAllCourses().map((c) => c.id));
  return valid
    .filter((m) => m.status === 'published' && publishedCourses.has(m.courseId))
    .sort((a, b) => a.order - b.order);
}

export function getModulesByCourse(courseId: string, options: { includeDrafts?: boolean } = {}): Module[] {
  return getAllModules(options).filter((m) => m.courseId === courseId);
}

export function getModuleBySlug(courseSlug: string, moduleSlug: string): Module | undefined {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;
  const modules = getModulesByCourse(course.id);
  return modules.find((m) => m.slug === moduleSlug);
}

// Lessons
export function getAllLessons(options: { includeDrafts?: boolean } = {}): Lesson[] {
  const data = loadJson<Lesson[]>('lessons.json');
  const valid = LessonsListSchema.parse(data);
  if (options.includeDrafts) return valid.sort((a, b) => a.order - b.order);

  // Only published lessons belonging to published modules and courses
  const publishedCourses = new Set(getAllCourses().map((c) => c.id));
  const publishedModules = new Set(getAllModules().map((m) => m.id));

  return valid
    .filter(
      (l) =>
        l.status === 'published' &&
        publishedCourses.has(l.courseId) &&
        publishedModules.has(l.moduleId)
    )
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByModule(moduleId: string, options: { includeDrafts?: boolean } = {}): Lesson[] {
  return getAllLessons(options).filter((l) => l.moduleId === moduleId);
}

export function getLessonsByCourse(courseId: string, options: { includeDrafts?: boolean } = {}): Lesson[] {
  return getAllLessons(options).filter((l) => l.courseId === courseId);
}

export function getLessonBySlug(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
): Lesson | undefined {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;
  const mod = getModuleBySlug(courseSlug, moduleSlug);
  if (!mod) return undefined;
  const lessons = getLessonsByModule(mod.id);
  return lessons.find((l) => l.slug === lessonSlug);
}

// Resources
export function getAllResources(options: { includeDrafts?: boolean } = {}): Resource[] {
  const data = loadJson<Resource[]>('resources.json');
  const valid = ResourcesListSchema.parse(data);
  if (options.includeDrafts) return valid;
  return valid.filter((r) => r.status === 'published');
}

export function getFeaturedResources(): Resource[] {
  return getAllResources().filter((r) => r.featured);
}

export function getResourceBySlug(slug: string): Resource | undefined {
  const all = getAllResources();
  return all.find((r) => r.slug === slug);
}

export function getResourcesByIds(ids: string[]): Resource[] {
  const all = getAllResources();
  const map = new Map(all.map((r) => [r.id, r]));
  return ids.map((id) => map.get(id)).filter((r): r is Resource => Boolean(r));
}

// Course Outline Structure
export interface CourseOutlineItem {
  course: Course;
  modules: Array<{
    module: Module;
    lessons: Lesson[];
  }>;
  totalLessons: number;
}

export function getCourseOutline(courseSlug: string): CourseOutlineItem | undefined {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;

  const modules = getModulesByCourse(course.id);
  const structuredModules = modules.map((mod) => {
    const lessons = getLessonsByModule(mod.id);
    return {
      module: mod,
      lessons,
    };
  });

  const totalLessons = structuredModules.reduce((acc, curr) => acc + curr.lessons.length, 0);

  return {
    course,
    modules: structuredModules,
    totalLessons,
  };
}

// Relationship Resolvers
export function getRelatedPromptsForProject(promptIds: string[]): Prompt[] {
  if (!promptIds || promptIds.length === 0) return [];
  const allPrompts = getAllPrompts();
  const map = new Map(allPrompts.map((p) => [p.id, p]));
  return promptIds.map((id) => map.get(id)).filter((p): p is Prompt => Boolean(p));
}

export function getRelatedProjectsForPrompt(projectIds: string[]): Project[] {
  if (!projectIds || projectIds.length === 0) return [];
  const allProjects = getAllProjects();
  const map = new Map(allProjects.map((p) => [p.id, p]));
  return projectIds.map((id) => map.get(id)).filter((p): p is Project => Boolean(p));
}
