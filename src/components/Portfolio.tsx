"use client";

import type { LocalizedContent } from "@/content/getContent";
import { useLocale } from "@/i18n/LocaleProvider";
import { CallToAction } from "./CallToAction";
import { Certifications } from "./Certifications";
import ContributionGraph from "./ContributionGraph";
import { HeroSection } from "./HeroSection";
import { Projects } from "./Projects";
import { TechnicalSkills } from "./TechnicalSkills";
import { WorkExperience } from "./WorkExperience";
import { FadeInUp } from "./ui";

/** Page d'accueil : affiche le contenu dans la langue choisie par le visiteur. */
export function Portfolio({ content }: { content: LocalizedContent }) {
  const { locale } = useLocale();
  const { profile, experiences, skills, projects, certifications } = content[locale];

  return (
    <main className="max-w-4xl mx-auto p-6 lg:p-8 bg-background text-foreground">
      <FadeInUp delay={0.1}>
        <HeroSection profile={profile} />
      </FadeInUp>

      <FadeInUp delay={0.2}>
        <WorkExperience intro={profile.experienceIntro} experiences={experiences} />
      </FadeInUp>

      <FadeInUp delay={0.3}>
        <TechnicalSkills skills={skills} />
      </FadeInUp>

      <FadeInUp delay={0.4}>
        <Projects projects={projects} />
      </FadeInUp>

      <FadeInUp delay={0.5}>
        <Certifications certifications={certifications} />
      </FadeInUp>

      <FadeInUp delay={0.55}>
        <ContributionGraph
          username={profile.githubUsername}
          title={profile.githubTitle}
          socialStats={profile.socialStats}
        />
      </FadeInUp>

      <FadeInUp delay={0.6}>
        <CallToAction email={profile.email} title={profile.ctaTitle} text={profile.ctaText} />
      </FadeInUp>
    </main>
  );
}
