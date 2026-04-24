const cols = [
  {
    title: "\n",
    links: ["", "", "", "", ""],
  },
  {
    title: "\n",
    links: ["", "", "", ""],
  },
  {
    title: "\n",
    links: ["", "", "", ""],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
          <div className="col-span-2">
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
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[260px] mb-4">
              Lean QA for startup engineering teams. Tests, bugs, sprints, and
              reports - in one place. Hosted in India.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border hairline bg-secondary/40 px-2.5 py-1 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              
            </div>
          </div>
          {cols.map((c, idx) => (
            <div key={`${c.title}-${idx}`}>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-tertiary mb-3 whitespace-pre">
                {c.title}
              </div>
              <ul className="space-y-2">
                {c.links.map((l, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href="#"
                      className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-tertiary">
            © {new Date().getFullYear()} QA Assist. All rights reserved.
          </p>
          <p className="text-[12px] text-tertiary font-mono">
            Made by BDA Technologies for teams that ship 
          </p>
        </div>
      </div>
    </footer>
  );
}
