import fs from 'fs';
import path from 'path';
import {
  SiteSettingsSchema,
  ProjectsListSchema,
  PromptsListSchema,
  CoursesListSchema,
  ModulesListSchema,
  LessonsListSchema,
  ResourcesListSchema,
  Project,
  Prompt,
  Course,
  Module,
  Lesson,
  Resource,
} from '../schemas';

interface ValidationError {
  file: string;
  idOrSlug?: string;
  field?: string;
  message: string;
}

const errors: ValidationError[] = [];

function readJsonFile<T>(filename: string): T | null {
  const filePath = path.join(process.cwd(), 'content', filename);
  try {
    if (!fs.existsSync(filePath)) {
      errors.push({
        file: filename,
        message: `Content file does not exist at ${filePath}`,
      });
      return null;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    errors.push({
      file: filename,
      message: `Failed to parse JSON: ${err instanceof Error ? err.message : String(err)}`,
    });
    return null;
  }
}

function checkUniqueIdsAndSlugs(
  items: Array<{ id: string; slug: string }>,
  filename: string
) {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const item of items) {
    if (ids.has(item.id)) {
      errors.push({
        file: filename,
        idOrSlug: item.id,
        field: 'id',
        message: `Duplicate ID detected: "${item.id}"`,
      });
    } else {
      ids.add(item.id);
    }

    if (slugs.has(item.slug)) {
      errors.push({
        file: filename,
        idOrSlug: item.slug,
        field: 'slug',
        message: `Duplicate slug detected: "${item.slug}"`,
      });
    } else {
      slugs.add(item.slug);
    }
  }
}

export function validateAllContent(): boolean {
  console.log('🔍 Starting comprehensive JSON content validation...');

  // 1. Site Settings
  const siteSettings = readJsonFile('site-settings.json');
  if (siteSettings) {
    const parseResult = SiteSettingsSchema.safeParse(siteSettings);
    if (!parseResult.success) {
      for (const issue of parseResult.error.issues) {
        errors.push({
          file: 'site-settings.json',
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    }
  }

  // 2. Projects
  const rawProjects = readJsonFile<unknown[]>('projects.json');
  let projects: Project[] = [];
  if (rawProjects) {
    const parseResult = ProjectsListSchema.safeParse(rawProjects);
    if (!parseResult.success) {
      for (const issue of parseResult.error.issues) {
        errors.push({
          file: 'projects.json',
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    } else {
      projects = parseResult.data;
      checkUniqueIdsAndSlugs(projects, 'projects.json');
    }
  }

  // 3. Prompts
  const rawPrompts = readJsonFile<unknown[]>('prompts.json');
  let prompts: Prompt[] = [];
  if (rawPrompts) {
    const parseResult = PromptsListSchema.safeParse(rawPrompts);
    if (!parseResult.success) {
      for (const issue of parseResult.error.issues) {
        errors.push({
          file: 'prompts.json',
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    } else {
      prompts = parseResult.data;
      checkUniqueIdsAndSlugs(prompts, 'prompts.json');
    }
  }

  // 4. Courses
  const rawCourses = readJsonFile<unknown[]>('courses.json');
  let courses: Course[] = [];
  if (rawCourses) {
    const parseResult = CoursesListSchema.safeParse(rawCourses);
    if (!parseResult.success) {
      for (const issue of parseResult.error.issues) {
        errors.push({
          file: 'courses.json',
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    } else {
      courses = parseResult.data;
      checkUniqueIdsAndSlugs(courses, 'courses.json');
    }
  }

  // 5. Modules
  const rawModules = readJsonFile<unknown[]>('modules.json');
  let modules: Module[] = [];
  if (rawModules) {
    const parseResult = ModulesListSchema.safeParse(rawModules);
    if (!parseResult.success) {
      for (const issue of parseResult.error.issues) {
        errors.push({
          file: 'modules.json',
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    } else {
      modules = parseResult.data;
      checkUniqueIdsAndSlugs(modules, 'modules.json');
    }
  }

  // 6. Lessons
  const rawLessons = readJsonFile<unknown[]>('lessons.json');
  let lessons: Lesson[] = [];
  if (rawLessons) {
    const parseResult = LessonsListSchema.safeParse(rawLessons);
    if (!parseResult.success) {
      for (const issue of parseResult.error.issues) {
        errors.push({
          file: 'lessons.json',
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    } else {
      lessons = parseResult.data;
      checkUniqueIdsAndSlugs(lessons, 'lessons.json');
    }
  }

  // 7. Resources
  const rawResources = readJsonFile<unknown[]>('resources.json');
  let resources: Resource[] = [];
  if (rawResources) {
    const parseResult = ResourcesListSchema.safeParse(rawResources);
    if (!parseResult.success) {
      for (const issue of parseResult.error.issues) {
        errors.push({
          file: 'resources.json',
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    } else {
      resources = parseResult.data;
      checkUniqueIdsAndSlugs(resources, 'resources.json');
    }
  }

  // Cross-reference relational integrity validation
  const courseIds = new Set(courses.map((c) => c.id));
  const courseMap = new Map(courses.map((c) => [c.id, c]));
  const moduleIds = new Set(modules.map((m) => m.id));
  const moduleMap = new Map(modules.map((m) => [m.id, m]));
  const projectIds = new Set(projects.map((p) => p.id));
  const promptIds = new Set(prompts.map((p) => p.id));
  const resourceIds = new Set(resources.map((r) => r.id));

  // Check module references course
  for (const mod of modules) {
    if (!courseIds.has(mod.courseId)) {
      errors.push({
        file: 'modules.json',
        idOrSlug: mod.id,
        field: 'courseId',
        message: `Module "${mod.title}" references non-existent courseId "${mod.courseId}"`,
      });
    } else {
      const parentCourse = courseMap.get(mod.courseId);
      if (mod.status === 'published' && parentCourse && parentCourse.status === 'draft') {
        errors.push({
          file: 'modules.json',
          idOrSlug: mod.id,
          field: 'status',
          message: `Published module "${mod.title}" belongs to draft course "${parentCourse.id}"`,
        });
      }
    }
  }

  // Check lesson references course and module
  for (const lesson of lessons) {
    if (!courseIds.has(lesson.courseId)) {
      errors.push({
        file: 'lessons.json',
        idOrSlug: lesson.id,
        field: 'courseId',
        message: `Lesson "${lesson.title}" references non-existent courseId "${lesson.courseId}"`,
      });
    }
    if (!moduleIds.has(lesson.moduleId)) {
      errors.push({
        file: 'lessons.json',
        idOrSlug: lesson.id,
        field: 'moduleId',
        message: `Lesson "${lesson.title}" references non-existent moduleId "${lesson.moduleId}"`,
      });
    } else {
      const parentModule = moduleMap.get(lesson.moduleId);
      if (parentModule && parentModule.courseId !== lesson.courseId) {
        errors.push({
          file: 'lessons.json',
          idOrSlug: lesson.id,
          field: 'moduleId',
          message: `Lesson "${lesson.title}" courseId "${lesson.courseId}" does not match its module's courseId "${parentModule.courseId}"`,
        });
      }
      if (lesson.status === 'published' && parentModule && parentModule.status === 'draft') {
        errors.push({
          file: 'lessons.json',
          idOrSlug: lesson.id,
          field: 'status',
          message: `Published lesson "${lesson.title}" belongs to draft module "${parentModule.id}"`,
        });
      }
    }

    // Check lesson resourceIds
    if (lesson.resourceIds) {
      for (const resId of lesson.resourceIds) {
        if (!resourceIds.has(resId)) {
          errors.push({
            file: 'lessons.json',
            idOrSlug: lesson.id,
            field: 'resourceIds',
            message: `Lesson "${lesson.title}" references non-existent resourceId "${resId}"`,
          });
        }
      }
    }
  }

  // Check project promptIds
  for (const proj of projects) {
    if (proj.promptIds) {
      for (const pId of proj.promptIds) {
        if (!promptIds.has(pId)) {
          errors.push({
            file: 'projects.json',
            idOrSlug: proj.id,
            field: 'promptIds',
            message: `Project "${proj.slug}" references non-existent promptId "${pId}"`,
          });
        }
      }
    }
  }

  // Check prompt projectIds
  for (const prompt of prompts) {
    if (prompt.projectIds) {
      for (const prId of prompt.projectIds) {
        if (!projectIds.has(prId)) {
          errors.push({
            file: 'prompts.json',
            idOrSlug: prompt.id,
            field: 'projectIds',
            message: `Prompt "${prompt.slug}" references non-existent projectId "${prId}"`,
          });
        }
      }
    }
  }

  // Check resources references
  for (const res of resources) {
    if (res.courseId && !courseIds.has(res.courseId)) {
      errors.push({
        file: 'resources.json',
        idOrSlug: res.id,
        field: 'courseId',
        message: `Resource "${res.title}" references non-existent courseId "${res.courseId}"`,
      });
    }
    if (res.moduleId && !moduleIds.has(res.moduleId)) {
      errors.push({
        file: 'resources.json',
        idOrSlug: res.id,
        field: 'moduleId',
        message: `Resource "${res.title}" references non-existent moduleId "${res.moduleId}"`,
      });
    }
    if (res.projectId && !projectIds.has(res.projectId)) {
      errors.push({
        file: 'resources.json',
        idOrSlug: res.id,
        field: 'projectId',
        message: `Resource "${res.title}" references non-existent projectId "${res.projectId}"`,
      });
    }
  }

  if (errors.length > 0) {
    console.error(`\n❌ Content validation failed with ${errors.length} error(s):\n`);
    for (const err of errors) {
      const loc = [
        `File: ${err.file}`,
        err.idOrSlug ? `[ID/Slug: ${err.idOrSlug}]` : '',
        err.field ? `[Field: ${err.field}]` : '',
      ]
        .filter(Boolean)
        .join(' ');
      console.error(`  - ${loc} -> ${err.message}`);
    }
    return false;
  }

  console.log(`✅ All JSON content validated successfully!`);
  console.log(`   - Projects: ${projects.length}`);
  console.log(`   - Prompts: ${prompts.length}`);
  console.log(`   - Courses: ${courses.length}`);
  console.log(`   - Modules: ${modules.length}`);
  console.log(`   - Lessons: ${lessons.length}`);
  console.log(`   - Resources: ${resources.length}`);
  return true;
}

if (require.main === module || process.argv[1]?.endsWith('validate-content.ts')) {
  const success = validateAllContent();
  if (!success) {
    process.exit(1);
  }
}
