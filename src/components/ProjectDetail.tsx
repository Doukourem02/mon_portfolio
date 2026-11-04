"use client";
import { useT } from "@/i18n/LocaleProvider";

import type { Project } from "@/content/types";
import type { Skill } from "@/content/types";
import { TechBadge } from "./TechBadge";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiGithub,
  FiMaximize2,
  FiX,
} from "react-icons/fi";
import { ProjectGallery } from "./ProjectGallery";

type Status = "production" | "development" | "done";

const STATUS_CLASS: Record<Status, string> = {
  production: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  development: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  done: "bg-blue-500/15 text-blue-300 border-blue-400/30",
};

/** Statut affiché : celui choisi dans Sanity, sinon déduit de la présence d'une démo. */
function statusOf(project: Project): Status {
  const s = project.status;
  return s === "production" || s === "development" || s === "done" ? s : project.liveUrl ? "production" : "development";
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Jusqu'à ce nombre de technologies, une simple liste suffit (pas de catégories). */
const FLAT_TECH_LIMIT = 8;

const CATEGORY_ORDER = ["Frontend", "Backend & Databases", "CMS", "Tools & DevOps", "Design"];

/** Regroupe les technologies par catégorie, dans l'ordre des compétences. */
function groupByCategory(techs: Skill[]): [string, Skill[]][] {
  const groups = new Map<string, Skill[]>();
  for (const tech of techs) {
    const key = tech.category || "Tools & DevOps";
    groups.set(key, [...(groups.get(key) ?? []), tech]);
  }
  const rank = (c: string) => (CATEGORY_ORDER.indexOf(c) + 1 || 99);
  return [...groups.entries()].sort(([a], [b]) => rank(a) - rank(b));
}

interface ProjectDetailProps {
  projects: Project[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}

export function ProjectDetail({ projects, index, onChange, onClose }: ProjectDetailProps) {
  const isOpen = index !== null;
  const project = index !== null ? projects[index] : null;
  const images = project ? (project.galleryImages.length ? project.galleryImages : project.image ? [project.image] : []) : [];

  const [imageIndex, setImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const t = useT();

  // Nouvelle fiche : on repart de la première image.
  useEffect(() => setImageIndex(0), [index]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const nextImage = useCallback(() => setImageIndex((i) => (images.length ? (i + 1) % images.length : 0)), [images.length]);
  const prevImage = useCallback(
    () => setImageIndex((i) => (images.length ? (i - 1 + images.length) % images.length : 0)),
    [images.length]
  );
  const goToProject = useCallback(
    (delta: number) => index !== null && onChange((index + delta + projects.length) % projects.length),
    [index, onChange, projects.length]
  );

  useEffect(() => {
    if (!isOpen || lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, lightboxOpen, onClose, nextImage, prevImage]);

  const status = project ? statusOf(project) : null;

  return (
    <>
      <AnimatePresence>
        {project && status && (
          <motion.div
            key="project-detail"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/95 backdrop-blur-md lg:overflow-hidden"
            onClick={onClose}
          >
            {/* Sur ordinateur, la fiche tient dans la hauteur de l'écran ; sur mobile, elle défile. */}
            <div
              className="mx-auto flex min-h-full max-w-7xl flex-col px-4 py-6 sm:px-8 lg:h-full lg:min-h-0 lg:py-6"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid flex-1 grid-cols-1 gap-6 lg:min-h-0 lg:grid-cols-[1.1fr_1fr] lg:gap-12"
                >
                  {/* Colonne gauche : le visuel + les miniatures */}
                  <div className="flex min-w-0 flex-col gap-3 lg:min-h-0 lg:justify-center">
                    <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-blue-500/20 bg-gray-900 shadow-2xl shadow-blue-950/40">
                      {images.length > 0 && (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={imageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={images[imageIndex]}
                              alt={`${project.title} – ${t.projects.image(imageIndex + 1)}`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 55vw"
                              quality={90}
                              priority
                              className="object-contain"
                            />
                          </motion.div>
                        </AnimatePresence>
                      )}

                      {images.length > 0 && (
                        <button
                          onClick={() => setLightboxOpen(true)}
                          className="absolute right-3 top-3 rounded-full bg-black/60 p-2.5 text-white opacity-80 backdrop-blur-sm transition hover:bg-black/80 hover:opacity-100"
                          aria-label={t.projects.enlargeImage}
                          title={t.projects.enlarge}
                        >
                          <FiMaximize2 className="h-4 w-4" />
                        </button>
                      )}

                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/80"
                            aria-label={t.projects.previousImage}
                          >
                            <FiChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/80"
                            aria-label={t.projects.nextImage}
                          >
                            <FiChevronRight className="h-5 w-5" />
                          </button>
                          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                            {imageIndex + 1} / {images.length}
                          </span>
                        </>
                      )}
                    </div>

                    {images.length > 1 && (
                      <div className="-mx-1 flex shrink-0 gap-2 overflow-x-auto px-1 py-1">
                        {images.map((img, i) => (
                          <button
                            key={img + i}
                            onClick={() => setImageIndex(i)}
                            className={`relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg border-2 transition sm:w-24 ${
                              i === imageIndex ? "border-blue-400" : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                            aria-label={t.projects.showImage(i + 1)}
                          >
                            <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Colonne droite : le texte */}
                  <div className="flex min-w-0 flex-col lg:min-h-0">
                    <div className="mb-4 flex shrink-0 flex-wrap items-center gap-2.5">
                      <button
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-300 transition hover:border-gray-500 hover:text-white"
                        aria-label={t.projects.close}
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-gray-950 transition hover:bg-blue-100"
                        >
                          {t.projects.discover} <FiArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 items-center gap-2 rounded-full border border-gray-700 px-5 text-sm font-medium text-gray-200 transition hover:border-gray-500 hover:text-white"
                        >
                          <FiGithub className="h-4 w-4" /> {t.projects.sourceCode}
                        </a>
                      )}
                    </div>

                    <div className="mb-4 shrink-0">
                      {project.kind && (
                        <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.18em] text-blue-300/80">{project.kind}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <h2 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
                          {project.title}
                          <span className="text-cyan-400">.</span>
                        </h2>
                        <span className={`rounded-md border px-2.5 py-0.5 text-xs ${STATUS_CLASS[status]}`}>
                          {t.projects.status[status]}
                        </span>
                      </div>
                    </div>

                    {/* La description ne défile elle-même que si l'écran est vraiment trop petit. */}
                    <div className="mb-5 space-y-2.5 text-[15px] leading-relaxed text-gray-300 lg:min-h-[5rem] lg:overflow-y-auto lg:pr-2">
                      {project.description.split(/\n\s*\n/).map((para, i) => (
                        <p key={i} className="whitespace-pre-line">
                          {para.trim()}
                        </p>
                      ))}
                    </div>

                    {project.techStack.length > 0 && (
                      <div className="shrink-0 space-y-2.5 rounded-2xl border border-gray-800/80 bg-gray-900/30 p-4">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">{t.projects.techStack}</p>
                        {project.techStack.length <= FLAT_TECH_LIMIT ? (
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map((tech) => (
                              <TechBadge key={tech.name} tech={tech} size="sm" />
                            ))}
                          </div>
                        ) : groupByCategory(project.techStack).map(([category, techs]) => (
                          <div key={category} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
                            <span className="w-28 shrink-0 pt-1 text-xs text-gray-400">
                              {t.skillCategories[category as keyof typeof t.skillCategories] ?? category}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {techs.map((tech) => (
                                <TechBadge key={tech.name} tech={tech} size="sm" />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation entre les projets */}
              {projects.length > 1 && (
                <nav className="mt-6 flex shrink-0 items-center justify-between gap-4 border-t border-gray-800 pt-4" aria-label={t.projects.otherProjects}>
                  <span className="hidden text-sm text-gray-500 sm:block">
                    {t.projects.projectCounter(pad(index! + 1), pad(projects.length))}
                  </span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => goToProject(-1)}
                      className="p-2 text-gray-400 transition hover:text-white"
                      aria-label={t.projects.previousProject}
                    >
                      <FiArrowLeft className="h-5 w-5" />
                    </button>
                    {projects.map((p, i) => (
                      <button
                        key={p.title + i}
                        onClick={() => onChange(i)}
                        title={p.title}
                        aria-current={i === index ? "true" : undefined}
                        className={`h-9 w-9 rounded-full text-sm transition ${
                          i === index ? "bg-white font-medium text-gray-950" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {pad(i + 1)}
                      </button>
                    ))}
                    <button
                      onClick={() => goToProject(1)}
                      className="p-2 text-gray-400 transition hover:text-white"
                      aria-label={t.projects.nextProject}
                    >
                      <FiArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </nav>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {project && (
        <ProjectGallery
          images={images}
          title={project.title}
          isOpen={lightboxOpen}
          startIndex={imageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
