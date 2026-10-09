import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/config/projects";
import { homeSections } from "@/config/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="border-b border-border bg-surface">
      <div className="container-page py-14 md:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={homeSections.work.title} description={homeSections.work.description} />
          <Link
            href="/portfolio"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent-text"
          >
            {homeSections.work.linkLabel}
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>

        {/* Grid width matches the item count so 2 featured projects don't leave
            an empty third column — this isn't locked to exactly 3 items. */}
        <div className={cn("mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2", projects.length >= 3 && "lg:grid-cols-3")}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
