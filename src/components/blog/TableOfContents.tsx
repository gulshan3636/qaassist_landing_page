import { useEffect, useState } from "react";
import type { PostHeading } from "@/lib/blog";
import { List } from "lucide-react";

export function TableOfContents({ headings }: { headings: PostHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let currentActive = "";

      for (const h of headings) {
        if (!h.id) continue;
        const el = document.getElementById(h.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPosition) {
            currentActive = h.id;
          }
        }
      }

      if (currentActive) {
        setActiveId(currentActive);
      } else if (headings[0]?.id) {
        setActiveId(headings[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav className="rounded-2xl border hairline bg-card/80 p-5 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 pb-2 border-b hairline">
        <List className="h-4 w-4 text-primary" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-1 text-sm max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
        {headings.map((h, i) => {
          const isNested = h.level > 2;
          const isActive = activeId === h.id;

          return (
            <li
              key={`${h.id}-${i}`}
              className={isNested ? "pl-3 ml-1 border-l hairline" : ""}
            >
              <button
                type="button"
                onClick={() => scrollToHeading(h.id)}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg text-[13px] leading-snug transition-all ${
                  isActive
                    ? "font-medium text-foreground bg-secondary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {h.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

