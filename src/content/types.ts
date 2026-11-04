export type SocialPlatform = "GitHub" | "LinkedIn" | "Twitter" | "Instagram";

export interface SocialLink {
  title: SocialPlatform | string;
  url: string;
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  galleryImages: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Type de projet affiché au-dessus du titre (ex. « Site e-commerce »). */
  kind?: string;
  /** production | development | done — déduit de liveUrl si absent. */
  status?: string;
  techStack: Skill[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  shortDesc: string;
  bulletPoints: string[];
}

export interface Certification {
  title: string;
  image: string;
  url: string;
}

export interface Profile {
  name: string;
  title: string;
  avatar: string;
  email: string;
  location: string;
  description: string;
  socialLinks: SocialLink[];
  experienceIntro: string;
  ctaTitle: string;
  ctaText: string;
  githubUsername: string;
  githubTitle: string;
  socialStats: {
    twitter: { followers: number; following: number };
    instagram: { followers: number; following: number };
  };
}

export interface SiteContent {
  profile: Profile;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}
