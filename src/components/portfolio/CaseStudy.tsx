import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/config/projects";
import { getProjectLabel, getProjectOfferingTitle } from "@/config/projects";
import { ctaContent } from "@/config/cta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/ui/CTASection";
import { ArtifactFrame } from "@/components/visuals/ArtifactFrame";

export function CaseStudy({ project }: { project: Project }) {
  const hasScreenshots = (project.screenshots?.length ?? 0) > 0;

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-10">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Work", href: "/portfolio" },
              { name: project.title, href: `/portfolio/${project.slug}` },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-label text-muted">{getProjectOfferingTitle(project)}</span>
            <span className="text-data rounded-full border border-border px-2.5 py-1 text-[0.6875rem] text-muted">
              {getProjectLabel(project)}
            </span>
          </div>
          <h1 className="text-h1 mt-4 max-w-2xl text-foreground">{project.title}</h1>
          <p className="text-lead mt-4 max-w-xl">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-data rounded-full border border-border px-3 py-1.5 text-xs text-muted">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page py-16 md:py-20">
          <ArtifactFrame
            kind={project.kind}
            media={project.media}
            label={`Outline of ${project.title}`}
            className="aspect-[21/9] w-full rounded-2xl border border-border"
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-h3 text-foreground">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">{project.caseStudy.overview}</p>
          </div>
          <div>
            <h2 className="text-h3 text-foreground">Problem</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">{project.caseStudy.problem}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-h3 text-foreground">Approach</h2>
            <ol className="mt-5 flex flex-col gap-3">
              {project.caseStudy.approach.map((step, index) => (
                <li key={step} className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
                  <span className="text-data text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-foreground/85">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-h3 text-foreground">What we built</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">{project.caseStudy.built}</p>
            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {project.caseStudy.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-background p-3.5 text-sm leading-relaxed text-foreground/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {hasScreenshots ? (
        <section className="border-b border-border">
          <div className="container-page py-16 md:py-20">
            <h2 className="text-h3 text-foreground">Project views</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.screenshots!.map((screenshot) => (
                <ArtifactFrame
                  key={screenshot.src}
                  kind={project.kind}
                  media={screenshot}
                  className="aspect-[16/10] rounded-xl border border-border"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-b border-border">
        <div className="container-page py-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent-text"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            Back to work
          </Link>
        </div>
      </section>

      <CTASection {...ctaContent.work} />
    </>
  );
}
