import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/config/projects";
import { getProjectLabel, getProjectOfferingTitle } from "@/config/projects";
import { ArtifactFrame } from "@/components/visuals/ArtifactFrame";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-foreground/25"
    >
      <div className="relative border-b border-border">
        <ArtifactFrame
          kind={project.kind}
          media={project.media}
          label={`Outline of ${project.title}`}
          className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="text-data absolute left-3 top-3 rounded-full border border-border bg-surface/90 px-2.5 py-1 text-[0.6875rem] text-muted backdrop-blur-sm">
          {getProjectLabel(project)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-label text-muted">{getProjectOfferingTitle(project)}</span>
        <h3 className="text-h3 mt-2.5 text-foreground">{project.title}</h3>
        <p className="mt-1 text-sm text-muted">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 2).map((tag) => (
            <span key={tag} className="text-data rounded-full border border-border px-2.5 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent-text">
          View case study
          <ArrowUpRight
            size={15}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
