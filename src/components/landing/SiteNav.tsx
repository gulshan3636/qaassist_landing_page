import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const links = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "Workflow" },
  { href: "#roles", label: "Roles" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b hairline"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <img
            src="/logo-icon.png"
            alt="QA Assist logo"
            className="h-8 w-8 object-contain"
          />
          <span className="font-display text-[17px] tracking-tight font-medium">
            QA Assist
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1 rounded-full border hairline bg-elevated/60 backdrop-blur px-1.5 py-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-muted-foreground hover:text-foreground hover:bg-secondary px-3 py-1.5 rounded-full transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-9 w-9 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="https://app.qaassist.in"
            className="hidden sm:inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium text-foreground border hairline bg-elevated/60 backdrop-blur hover:bg-secondary transition-colors"
          >
            Login
          </a>
          <a
            href="#getearlyaccess"
            className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-primary-foreground bg-foreground hover:opacity-90 transition-opacity shadow-[var(--shadow-soft)]"
          >
            Get early access
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t hairline bg-background/95 backdrop-blur-md">
          <nav className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#getearlyaccess"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-info-foreground"
            >
              Get early access →
            </a>
            <a
              href="https://app.qaassist.in"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-foreground"
            >
              Login
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
