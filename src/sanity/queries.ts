import { defineQuery } from "next-sanity";

const skillFields = `name, icon, color, category`;

export const siteContentQuery = defineQuery(`{
  "profile": *[_type == "profile" && _id == "profile"][0]{
    name, title, avatar, email, location, description,
    "socialLinks": socialLinks[]{ "title": platform, url },
    experienceIntro, ctaTitle, ctaText,
    githubUsername, githubTitle,
    socialStats
  },
  "experiences": *[_type == "experience"] | order(order asc, _createdAt asc){
    company, position, period, shortDesc, "bulletPoints": coalesce(bulletPoints, [])
  },
  "skills": *[_type == "skill"] | order(order asc, _createdAt asc){ ${skillFields} },
  "projects": *[_type == "project"] | order(order asc, _createdAt asc){
    title, description, mainImage, "gallery": coalesce(gallery, []), liveUrl, githubUrl,
    "techStack": coalesce(technologies[]->{ ${skillFields} }, [])
  },
  "certifications": *[_type == "certification"] | order(order asc, _createdAt asc){
    title, image, url
  }
}`);
