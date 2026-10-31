import {
  getSiteSettings,
  getFeaturedProjects,
  getFeaturedPrompts,
  getFeaturedCourses,
  getModulesByCourse,
  getLessonsByCourse,
} from '@/lib/content';
import { HeroSection } from '@/components/home/HeroSection';
import { HomeSections } from '@/components/home/HomeSections';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const settings = getSiteSettings();
  const featuredProjects = getFeaturedProjects();
  const featuredPrompts = getFeaturedPrompts();
  const featuredCoursesRaw = getFeaturedCourses();

  // Calculate actual published module and lesson counts dynamically
  const featuredCourses = featuredCoursesRaw.map((course) => {
    const modules = getModulesByCourse(course.id);
    const lessons = getLessonsByCourse(course.id);
    return {
      course,
      moduleCount: modules.length,
      lessonCount: lessons.length,
    };
  });

  return (
    <div>
      <HeroSection settings={settings} />
      <HomeSections
        settings={settings}
        featuredProjects={featuredProjects}
        featuredPrompts={featuredPrompts}
        featuredCourses={featuredCourses}
      />
    </div>
  );
}
