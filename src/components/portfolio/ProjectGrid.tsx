"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioCategories, getProjectOfferingTitle, type Project, type PortfolioCategory } from "@/config/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { cn } from "@/lib/utils";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<PortfolioCategory>("All");

  const filtered = active === "All" ? projects : projects.filter((project) => getProjectOfferingTitle(project) === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter portfolio by category">
        {portfolioCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === category
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-foreground/75 hover:border-foreground/40",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 ? <p className="mt-10 text-sm text-muted">No projects in this category yet.</p> : null}
    </div>
  );
}
