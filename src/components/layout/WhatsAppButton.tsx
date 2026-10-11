import { MessageCircle } from "lucide-react";
import { getWhatsAppHref } from "@/lib/social";

export function WhatsAppButton() {
  const href = getWhatsAppHref();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message ZAIMEX on WhatsApp"
      className="group fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-black/10 transition-transform hover:scale-105 md:bottom-8 md:right-8"
    >
      <MessageCircle size={24} strokeWidth={1.75} />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
