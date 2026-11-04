"use client";
import { useT } from "@/i18n/LocaleProvider";

import type { Project } from "@/content/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowUpRight, FiCode, FiExternalLink, FiGithub } from "react-icons/fi";
import { ProjectDetail } from "./ProjectDetail";
import { TechBadge } from "./TechBadge";

/** Nombre de technologies affichées sur une carte (les autres : « +N », toutes dans la fiche). */
const CARD_TECH_LIMIT = 6;
import { useState } from "react";

export function Projects({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useT();

  const handleProjectKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenIndex(index);
    }
  };

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30"
          >
            <FiCode className="w-6 h-6 text-blue-400" />
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
            {t.sections.projects}
          </h2>
        </div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => {
          // « +1 » n'a pas d'intérêt : on affiche alors la dernière technologie.
          const limit = project.techStack.length === CARD_TECH_LIMIT + 1 ? CARD_TECH_LIMIT + 1 : CARD_TECH_LIMIT;
          const shown = project.techStack.slice(0, limit);
          const hidden = project.techStack.length - shown.length;
          return (
            <motion.div
              key={project.title + index}
              role="button"
              tabIndex={0}
              aria-label={t.projects.viewProjectNamed(project.title)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              onClick={() => setOpenIndex(index)}
              onKeyDown={(e) => handleProjectKeyDown(index, e)}
              className="group flex flex-col rounded-2xl overflow-hidden border border-blue-500/30 bg-gray-950/40 cursor-pointer transition-[border-color,box-shadow] duration-500 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-950/40 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
            >
              <div className="relative aspect-video bg-gray-800 overflow-hidden">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                {project.kind && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
                    {project.kind}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
                <p className="mb-5 text-gray-300 leading-relaxed line-clamp-3">{project.description}</p>

                {project.techStack.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {shown.map((tech, techIndex) => (
                      <motion.span
                        key={tech.name}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: techIndex * 0.04, ease: "easeOut" }}
                        viewport={{ once: true }}
                      >
                        <TechBadge tech={tech} size="sm" />
                      </motion.span>
                    ))}
                    {hidden > 0 && (
                      <span
                        className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300"
                        title={project.techStack.slice(limit).map((x) => x.name).join(", ")}
                      >
                        +{hidden}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-800/80 pt-4 text-sm font-medium">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 whitespace-nowrap text-blue-400 transition-colors hover:text-blue-300"
                    >
                      <FiExternalLink className="h-4 w-4" />
                      {t.projects.liveDemo}
                    </a>
                  ) : (
                    <span
                      className="flex items-center gap-2 whitespace-nowrap text-gray-500 opacity-60 cursor-not-allowed"
                      title={t.projects.comingSoon}
                    >
                      <FiExternalLink className="h-4 w-4" />
                      {t.projects.liveDemo}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenIndex(index);
                    }}
                    className="flex items-center gap-2 whitespace-nowrap text-cyan-300 transition-colors hover:text-cyan-200"
                    title={t.projects.viewProjectHint}
                  >
                    <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {t.projects.viewProject}
                  </button>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 whitespace-nowrap text-gray-400 transition-colors hover:text-gray-200"
                    >
                      <FiGithub className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ProjectDetail
        projects={projects}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  );
}
