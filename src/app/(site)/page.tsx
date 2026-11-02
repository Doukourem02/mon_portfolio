import {
  CallToAction,
  Certifications,
  FadeInUp,
  HeroSection,
  Projects,
  TechnicalSkills,
  WorkExperience,
  ContributionGraph,
} from "@/components";
import { getContent } from "@/content/getContent";

// Le contenu vient de Sanity : la page est régénérée au plus tard toutes les 60 s,
// et immédiatement à chaque publication grâce au webhook (/api/revalidate).
export const revalidate = 60;

export default async function Portfolio() {
  const { profile, experiences, skills, projects, certifications } = await getContent();

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
