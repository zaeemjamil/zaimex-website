"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FAQ({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 pr-14 text-left md:pr-0"
            >
              <span className="text-base font-medium text-foreground">{item.question}</span>
              <Plus
                size={18}
                strokeWidth={1.75}
                className={cn(
                  "shrink-0 text-foreground/60 transition-transform duration-200",
                  isOpen && "rotate-45 text-accent-text",
                )}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0">
                <p className="max-w-2xl text-sm leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
