import {
  certifications,
  githubSection,
  personalInfo,
  projects,
  sectionTexts,
  socialLinks,
  socialStats,
  techStack,
  workExperience,
} from "@/config/data";
import type { SiteContent, Skill } from "./types";

const skills: Skill[] = techStack.map(({ name, icon, color, type }) => ({
  name,
  icon,
  color,
  category: type,
}));

/** Contenu local (src/config/data.ts) au même format que celui de Sanity. */
export const fallbackContent: SiteContent = {
  profile: {
    ...personalInfo,
    ...sectionTexts,
    socialLinks: [...socialLinks]
      .sort((a, b) => a.priority - b.priority)
      .map(({ title, url }) => ({ title, url })),
    githubUsername: githubSection.username,
    githubTitle: githubSection.title,
    socialStats,
  },
  experiences: workExperience,
  skills,
  projects: projects.map(({ technologies, ...project }) => ({
    ...project,
    galleryImages: project.galleryImages ?? [],
    techStack: skills.filter((skill) => technologies.includes(skill.name)),
  })),
  certifications,
};
