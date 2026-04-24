const cols = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Workflow", href: "#workflow" },
      { label: "Roles", href: "#roles" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About QA Assist", href: "#top" },
      { label: "Pricing", href: "#getearlyaccess" },
      { label: "Get Early Access", href: "#getearlyaccess" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Email Us", href: "mailto:hello@qaassist.in" },
      { label: "Support", href: "mailto:support@qaassist.in" },
      { label: "Demo", href: "#getearlyaccess" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 gap-9 sm:gap-10 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-flex h-6 w-6 rounded-md items-center justify-center text-[11px] font-bold text-primary-foreground"
                style={{
                  background:
                    "linear-gradient(135deg, var(--info) 0%, var(--violet) 100%)",
                }}
                aria-hidden
              >
                Q
              </span>
              <span className="font-display text-[16px] font-medium">QA Assist</span>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[280px] mb-4">
              Lean QA for startup engineering teams. Tests, bugs, sprints, and
              reports - in one place. Hosted in India.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border hairline bg-secondary/40 px-2.5 py-1 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Public beta · India region
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-8 lg:col-span-3 lg:grid-cols-3">
            {cols.map((c, idx) => (
              <div key={`${c.title}-${idx}`} className="min-w-0">
                <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] text-tertiary mb-2 sm:mb-3">
                  {c.title}
                </div>
                <ul className="space-y-1.5 sm:space-y-2">
                  {c.links.map((l, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={l.href}
                        className="inline-block py-0.5 text-[11.5px] sm:text-[13px] leading-tight text-muted-foreground hover:text-foreground transition-colors break-words"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 sm:mt-10 pt-5 border-t hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          <p className="text-[12px] text-tertiary">
            © {new Date().getFullYear()} QA Assist. All rights reserved.
          </p>
          <p className="text-[12px] text-tertiary font-mono text-wrap">
            Made by BDA Technologies for teams that ship fast.
          </p>
        </div>
      </div>
    </footer>
  );
}
