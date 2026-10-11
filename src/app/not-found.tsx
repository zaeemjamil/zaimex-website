import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-data text-sm text-accent-text">404</p>
      <h1 className="text-h1 mt-4 text-foreground">Page not found.</h1>
      <p className="text-lead mt-4 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent-text"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back to homepage
      </Link>
    </section>
  );
}
