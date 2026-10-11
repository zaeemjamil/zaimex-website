import Image from "next/image";
import type { Person } from "@/config/home";

/**
 * Renders nothing until real people are added to `aboutContent.people`
 * (config/home.ts) — no placeholder "team coming soon" card. When a person
 * has no photo yet, their initials stand in rather than a stock avatar.
 */
export function PeopleGrid({ people }: { people: Person[] }) {
  if (people.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {people.map((person) => {
        const initials = person.name
          .split(" ")
          .map((part) => part[0])
          .slice(0, 2)
          .join("");

        return (
          <div key={person.name} className="flex items-start gap-4">
            {person.photo ? (
              <Image
                src={person.photo.src}
                alt={person.photo.alt}
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border text-sm font-semibold text-muted"
                aria-hidden="true"
              >
                {initials}
              </span>
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">{person.name}</p>
              <p className="text-xs text-muted">{person.role}</p>
              {person.bio ? <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{person.bio}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
