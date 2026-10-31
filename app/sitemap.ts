import { MetadataRoute } from 'next';
import {
  getSiteSettings,
  getAllProjects,
  getAllPrompts,
  getAllCourses,
  getCourseOutline,
} from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const settings = getSiteSettings();
  const baseUrl = settings.siteUrl;

  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/prompts`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/learn`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Published Projects
  for (const project of getAllProjects()) {
    routes.push({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt || project.createdAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Published Prompts
  for (const prompt of getAllPrompts()) {
    routes.push({
      url: `${baseUrl}/prompts/${prompt.slug}`,
      lastModified: new Date(prompt.updatedAt || prompt.createdAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Published Courses, Modules, Lessons
  for (const course of getAllCourses()) {
    routes.push({
      url: `${baseUrl}/learn/${course.slug}`,
      lastModified: new Date(course.updatedAt || course.createdAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    const outline = getCourseOutline(course.slug);
    if (outline) {
      for (const modItem of outline.modules) {
        routes.push({
          url: `${baseUrl}/learn/${course.slug}/${modItem.module.slug}`,
          lastModified: new Date(modItem.module.updatedAt || modItem.module.createdAt),
          changeFrequency: 'weekly',
          priority: 0.7,
        });

        for (const lesson of modItem.lessons) {
          routes.push({
            url: `${baseUrl}/learn/${course.slug}/${modItem.module.slug}/${lesson.slug}`,
            lastModified: new Date(lesson.updatedAt || lesson.createdAt),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }
    }
  }

  return routes;
}
