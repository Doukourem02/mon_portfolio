import type { Skill } from "@/content/types";
import { getSkillIcon } from "@/lib/icons";

/** Étiquette d'une technologie : icône à sa couleur + nom. */
export function TechBadge({ tech, size = "md" }: { tech: Skill; size?: "sm" | "md" }) {
  const Icon = getSkillIcon(tech.icon);
  const sm = size === "sm";
  return (
    <span
      className={`inline-flex items-center rounded-full border border-gray-700/70 bg-gray-900/70 text-gray-200 shadow-sm shadow-black/20 transition-colors duration-300 hover:border-blue-400/50 hover:bg-gray-800/80 ${
        sm ? "gap-1.5 px-2.5 py-1 text-xs" : "gap-2 px-3 py-1.5 text-sm"
      }`}
    >
      <Icon className={`${sm ? "h-3.5 w-3.5" : "h-4 w-4"} shrink-0 ${tech.color}`} aria-hidden />
      <span className="whitespace-nowrap">{tech.name}</span>
    </span>
  );
}
