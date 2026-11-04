import { defineQuery } from "next-sanity";

const skillFields = `name, icon, color, category`;

export const siteContentQuery = defineQuery(`{
  "profile": *[_type == "profile" && _id == "profile"][0]{
    name, title, titleEn, avatar, email, location, description, descriptionEn,
    "socialLinks": socialLinks[]{ "title": platform, url },
    experienceIntro, experienceIntroEn, ctaTitle, ctaTitleEn, ctaText, ctaTextEn,
    githubUsername, githubTitle, githubTitleEn,
    socialStats
  },
  "experiences": *[_type == "experience"] | order(order asc, _createdAt asc){
    company, position, positionEn, period, periodEn, shortDesc, shortDescEn,
    "bulletPoints": coalesce(bulletPoints, []), bulletPointsEn
  },
  "skills": *[_type == "skill"] | order(order asc, _createdAt asc){ ${skillFields} },
  "projects": *[_type == "project"] | order(order asc, _createdAt asc){
    title, description, descriptionEn, mainImage, "gallery": coalesce(gallery, []), liveUrl, githubUrl, kind, kindEn, status,
    "techStack": coalesce(technologies[]->{ ${skillFields} }, [])
  },
  "certifications": *[_type == "certification"] | order(order asc, _createdAt asc){
    title, image, url
  }
}`);
