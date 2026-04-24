import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ListChecks,
  PlayCircle,
  Bug,
  Sparkles,
  FileBarChart2,
  FileSpreadsheet,
  ShieldCheck,
  Clock,
  MapPin,
  Users,
  Pencil,
  UsersRound,
  CircleCheck,
  Send,
  Star,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SignupForm } from "@/components/landing/SignupForm";
import { ProductMockup } from "@/components/landing/ProductMockup";
import { LogoMarquee } from "@/components/landing/LogoMarquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QA Assist — Lean QA for startup engineering teams" },
      {
        name: "description",
        content:
          "Write test cases, run sprints, log bugs, and ship reports. QA Assist gives lean engineering teams one place to catch bugs before production.",
      },
      { property: "og:title", content: "QA Assist — Lean QA for startup engineering teams" },
      {
        property: "og:description",
        content:
          "One place to write test cases, run sprints, log bugs, and ship reports. Built lean. Priced for teams that move fast.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: ListChecks,
    tone: "info" as const,
    title: "Test case management",
    body: "Write once. Assign by module, tester, or environment. Filter by status in seconds.",
  },
  {
    icon: PlayCircle,
    tone: "violet" as const,
    title: "Sprint runs",
    body: "Group cases into sprints. Track live pass/fail. Close the sprint when every case is verified.",
  },
  {
    icon: Bug,
    tone: "danger" as const,
    title: "Bug tracker",
    body: "Log defects with severity, steps to reproduce, and evidence. Assign to a dev. Track to resolution.",
  },
  {
    icon: Sparkles,
    tone: "violet" as const,
    title: "AI bug analysis",
    body: "Paste a bug. Get severity, category, and priority auto-tagged. No more guessing or manual sorting.",
    badge: "AI",
  },
  {
    icon: FileBarChart2,
    tone: "success" as const,
    title: "Reports in one click",
    body: "Pass rate, open bugs, sprint coverage. Export as PDF or CSV. Send it before standup.",
  },
  {
    icon: FileSpreadsheet,
    tone: "warn" as const,
    title: "Excel bulk import",
    body: "Already have test cases? Import from Excel. Apply status and priority across hundreds at once.",
  },
];

const steps = [
  {
    icon: Pencil,
    num: "01",
    label: "Create",
    title: "Write or generate test cases",
    desc: "Type manually or let AI generate descriptions from your requirements in seconds.",
  },
  {
    icon: UsersRound,
    num: "02",
    label: "Assign",
    title: "Set priority and ownership",
    desc: "Assign testers, set environment, group cases into a sprint run.",
  },
  {
    icon: CircleCheck,
    num: "03",
    label: "Execute",
    title: "Run and mark results",
    desc: "Testers mark each case Pass, Fail, or Blocked directly in the app.",
  },
  {
    icon: Send,
    num: "04",
    label: "Ship",
    title: "Report and close",
    desc: "Bugs auto-created on failure. Full audit trail. Report exported as PDF or CSV.",
  },
];

const roles = [
  {
    name: "Admin",
    initial: "A",
    tone: "info" as const,
    desc: "Full platform control. Manages users, roles, and custom fields.",
    perms: ["Manage users", "Custom fields", "Billing"],
  },
  {
    name: "Manager",
    initial: "M",
    tone: "violet" as const,
    desc: "View all projects, bugs, and reports. Read-only oversight.",
    perms: ["All projects", "All reports", "Read-only"],
  },
  {
    name: "QA Engineer",
    initial: "Q",
    tone: "success" as const,
    desc: "Creates and runs tests. Logs bugs. Manages sprints.",
    perms: ["Run sprints", "Log bugs", "Edit cases"],
  },
  {
    name: "Developer",
    initial: "D",
    tone: "warn" as const,
    desc: "Sees assigned bugs only. Posts updates. Gets @mention alerts.",
    perms: ["Assigned bugs", "Comment & resolve", "Mentions"],
  },
];

const objections = [
  {
    icon: Star,
    q: "Is it free to start?",
    a: "Yes. No credit card required. Upgrade only when your team or volume grows.",
  },
  {
    icon: Clock,
    q: "How long does setup take?",
    a: "Under an afternoon. Import existing test cases from Excel and your first sprint can run today.",
  },
  {
    icon: ShieldCheck,
    q: "Where is our data stored?",
    a: "India. Supabase PostgreSQL. Cloudinary for files. JWT + 2FA on every login. Full audit trail on every action.",
  },
  {
    icon: Users,
    q: "Do we need a dedicated QA team?",
    a: "No. QA Assist works whether you have one QA engineer or a full team. Roles scale with you.",
  },
];

function Index() {
  useReveal();

  return (
    <div id="top" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />

      {/* ============== HERO ============== */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
        <div aria-hidden className="absolute inset-0 -z-10 hero-glow" />

        <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 rounded-full border hairline bg-elevated/70 backdrop-blur px-3 py-1 text-[12px] text-muted-foreground mb-6">
                <span className="live-dot text-success-foreground font-medium">
                  Live 
                </span>
                <span className="h-3 w-px bg-hairline" />
                <span>Built in India - Hosted in India </span>
              </div>

              <h1 className="font-display text-[40px] sm:text-[52px] lg:text-[58px] leading-[1.02] tracking-[-0.02em] font-medium text-balance">
                Your bugs ship faster than{" "}
                <span className="text-gradient italic">your team can catch them.</span>
              </h1>

              <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.6] text-muted-foreground max-w-[540px]">
                QA Assist gives startup engineering teams one place to write test
                cases, run sprints, log bugs, and ship reports. Built lean,
                priced for teams that move fast.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#signup"
                  className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-[14px] font-medium text-primary-foreground bg-foreground hover:opacity-90 transition-opacity shadow-[var(--shadow-elevated)]"
                >
                  Start free - no card needed
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#workflow"
                  className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium text-foreground border hairline bg-elevated/60 backdrop-blur hover:bg-secondary transition-colors"
                >
                  <PlayCircle className="h-4 w-4" />
                  See a 2-min demo
                </a>
              </div>

              <div className="mt-6 flex items-center gap-4 text-[12px] text-tertiary">
                <div className="flex -space-x-1.5">
                  {["A", "P", "K", "M"].map((i, idx) => (
                    <span
                      key={i}
                      className={`h-6 w-6 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-medium text-foreground ${
                        ["bg-info-muted", "bg-violet-muted", "bg-success-muted", "bg-warn-muted"][idx]
                      }`}
                    >
                      {i}
                    </span>
                  ))}
                </div>
                <span>Trusted by 200+ engineering teams</span>
              </div>
            </div>

            <div className="reveal">
              <ProductMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ============== LOGO MARQUEE ============== */}
      <section className="border-y hairline bg-secondary/30">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8 py-7">
          <div className="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-tertiary mb-4">
            TECHNOLOGIES USED WHICH IS LOVED BY TEAMS
          </div>
          <LogoMarquee />
        </div>
      </section>

      {/* ============== PROBLEM / STATS ============== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="reveal">
              <Eyebrow>{"\n"}</Eyebrow>
              <h2 className="font-display text-[34px] sm:text-[42px] leading-[1.05] tracking-[-0.02em] font-medium text-balance">
                Built for teams of 3 to 30 who can't afford{" "}
                <span className="text-gradient italic">QA chaos.</span>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.65] text-muted-foreground max-w-[520px]">
                Spreadsheets break at scale. Jira is overkill for a 10-person
                team. QA Assist is the middle ground — structured enough to ship
                with confidence, simple enough to set up in an afternoon.
              </p>
            </div>

            <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatCard num="4" unit="roles" label="Admin · Manager · QA · Dev" tone="info" />
              <StatCard num="1" unit="platform" label="Tests · Bugs · Sprints · Reports" tone="violet" />
              <StatCard num="0" unit="manual tags" label="AI classifies bugs automatically" tone="success" />
            </div>
          </div>
        </div>
      </section>

      {/* ============== FEATURES ============== */}
      <section id="features" className="py-20 sm:py-28 scroll-mt-20 border-t hairline bg-secondary/20">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
          <div className="max-w-[680px] mb-12 reveal">
            <Eyebrow>{"\n"}</Eyebrow>
            <h2 className="font-display text-[34px] sm:text-[44px] leading-[1.05] tracking-[-0.02em] font-medium text-balance">
              Everything a lean QA team{" "}
              <span className="text-gradient italic">actually uses.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-muted-foreground">
              No bloat. No features you'll never touch. Just the core workflow
              that gets bugs caught before production.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
            {features.map((f) => (
              <div
                key={f.title}
                className="card-hover relative rounded-xl border hairline bg-elevated p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <ToneIcon icon={f.icon} tone={f.tone} />
                  {f.badge && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-muted text-violet-foreground">
                      {f.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-[15px] font-medium text-foreground mb-1.5">
                  {f.title}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== WORKFLOW ============== */}
      <section id="workflow" className="py-20 sm:py-28 scroll-mt-20 border-t hairline">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
          <div className="max-w-[680px] mb-14 reveal">
            <Eyebrow>​</Eyebrow>
            <h2 className="font-display text-[34px] sm:text-[44px] leading-[1.05] tracking-[-0.02em] font-medium text-balance">
              Four steps from test plan to{" "}
              <span className="text-gradient italic">shipped sprint.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-muted-foreground">
              Each stage feeds the next. Nothing falls through the cracks.
            </p>
          </div>

          <div className="relative reveal">
            {/* Connecting line on desktop */}
            <div
              aria-hidden
              className="hidden lg:block absolute top-7 left-[6%] right-[6%] h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--hairline) 10%, var(--hairline) 90%, transparent)",
              }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s) => (
                <div key={s.num} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative z-10 h-14 w-14 rounded-full border hairline bg-elevated flex items-center justify-center shadow-[var(--shadow-soft)]">
                      <s.icon className="h-5 w-5 text-info" />
                    </div>
                    <div>
                      <div className="font-mono text-[10.5px] text-tertiary tracking-wider">
                        STEP {s.num}
                      </div>
                      <div className="text-[12px] font-medium text-info-foreground uppercase tracking-wider">
                        {s.label}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-[15px] font-medium text-foreground mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.6] text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== ROLES ============== */}
      <section id="roles" className="py-20 sm:py-28 scroll-mt-20 border-t hairline bg-secondary/20">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
          <div className="max-w-[680px] mb-12 reveal">
            <Eyebrow>​</Eyebrow>
            <h2 className="font-display text-[34px] sm:text-[44px] leading-[1.05] tracking-[-0.02em] font-medium text-balance">
              Right access for{" "}
              <span className="text-gradient italic">every person on the team.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-muted-foreground">
              No one sees more than they need. No one is blocked from what they do.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal">
            {roles.map((r) => (
              <div
                key={r.name}
                className="card-hover rounded-xl border hairline bg-elevated p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ToneAvatar initial={r.initial} tone={r.tone} />
                  <div>
                    <div className="text-[14px] font-medium text-foreground">
                      {r.name}
                    </div>
                    <div className="text-[11px] text-tertiary uppercase tracking-wider">
                      Role
                    </div>
                  </div>
                </div>
                <p className="text-[12.5px] leading-[1.6] text-muted-foreground mb-4">
                  {r.desc}
                </p>
                <ul className="space-y-1.5">
                  {r.perms.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-[12px] text-foreground"
                    >
                      <CircleCheck className="h-3.5 w-3.5 text-success shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section id="faq" className="py-20 sm:py-28 scroll-mt-20 border-t hairline">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
            <div className="reveal">
              <Eyebrow>​</Eyebrow>
              <h2 className="font-display text-[34px] sm:text-[42px] leading-[1.05] tracking-[-0.02em] font-medium text-balance">
                Answers to the questions{" "}
                <span className="text-gradient italic">your team will ask.</span>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.65] text-muted-foreground">
                Still curious? Email{" "}
                <a
                  href="mailto:hello@qaassist.in"
                  className="text-foreground underline underline-offset-4 decoration-info/40 hover:decoration-info"
                >
                  hello@qaassist.in
                </a>
                {" "}— we usually reply within an hour.
              </p>
            </div>

            <div className="reveal divide-y divide-[var(--hairline)] border-y hairline">
              {objections.map((o) => (
                <div key={o.q} className="py-5 flex gap-4 items-start">
                  <div className="h-9 w-9 rounded-lg bg-info-muted text-info-foreground flex items-center justify-center shrink-0">
                    <o.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[15px] font-medium text-foreground mb-1.5">
                      {o.q}
                    </div>
                    <div className="text-[13.5px] leading-[1.6] text-muted-foreground">
                      {o.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA / SIGNUP ============== */}
      <section id="signup" className="py-20 sm:py-28 scroll-mt-20 relative">
        <div aria-hidden className="absolute inset-0 -z-10 hero-glow opacity-70" />
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
          <div className="reveal relative overflow-hidden rounded-3xl border hairline bg-elevated shadow-[var(--shadow-elevated)] p-8 sm:p-14">
            <div
              aria-hidden
              className="absolute -top-32 -right-32 h-80 w-80 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--violet) 40%, transparent), transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--info) 40%, transparent), transparent 70%)",
              }}
            />

            <div className="relative max-w-[560px] mx-auto text-center">
              <Eyebrow center>​</Eyebrow>
              <h2 className="font-display text-[34px] sm:text-[44px] leading-[1.05] tracking-[-0.02em] font-medium text-balance">
                Stop shipping bugs you{" "}
                <span className="text-gradient italic">could have caught.</span>
              </h2>
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-muted-foreground">
                Join engineering teams using QA Assist to run tighter sprints
                and ship with more confidence.
              </p>
              <div className="mt-8 max-w-[440px] mx-auto">
                <SignupForm />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-tertiary">
                <span className="inline-flex items-center gap-1.5">
                  <CircleCheck className="h-3.5 w-3.5 text-success" />
                  No credit card
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CircleCheck className="h-3.5 w-3.5 text-success" />
                  Setup in an afternoon
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-info" />
                  Hosted in India
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Eyebrow({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`text-[11px] font-medium uppercase tracking-[0.16em] text-tertiary mb-4 flex items-center gap-2 ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-6 bg-hairline" aria-hidden />
      <span>{children}</span>
      <span className="h-px w-6 bg-hairline" aria-hidden />
    </div>
  );
}

function ToneIcon({
  icon: Icon,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "info" | "violet" | "success" | "danger" | "warn";
}) {
  const map: Record<typeof tone, string> = {
    info: "bg-info-muted text-info-foreground",
    violet: "bg-violet-muted text-violet-foreground",
    success: "bg-success-muted text-success-foreground",
    danger: "bg-danger-muted text-danger-foreground",
    warn: "bg-warn-muted text-warn-foreground",
  };
  return (
    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${map[tone]}`}>
      <Icon className="h-4.5 w-4.5" />
    </div>
  );
}

function ToneAvatar({
  initial,
  tone,
}: {
  initial: string;
  tone: "info" | "violet" | "success" | "warn";
}) {
  const map: Record<typeof tone, string> = {
    info: "bg-info-muted text-info-foreground",
    violet: "bg-violet-muted text-violet-foreground",
    success: "bg-success-muted text-success-foreground",
    warn: "bg-warn-muted text-warn-foreground",
  };
  return (
    <div
      className={`h-11 w-11 rounded-xl flex items-center justify-center font-display text-[18px] font-medium ${map[tone]}`}
    >
      {initial}
    </div>
  );
}

function StatCard({
  num,
  unit,
  label,
  tone,
}: {
  num: string;
  unit: string;
  label: string;
  tone: "info" | "violet" | "success";
}) {
  const map: Record<typeof tone, string> = {
    info: "from-info/10 to-transparent",
    violet: "from-violet/10 to-transparent",
    success: "from-success/10 to-transparent",
  };
  return (
    <div className={`rounded-xl border hairline bg-gradient-to-br ${map[tone]} p-5`}>
      <div className="flex items-baseline gap-1.5 mb-2">
        <div className="font-display text-[42px] font-medium text-foreground tracking-[-0.02em] leading-none">
          {num}
        </div>
        <div className="text-[13px] text-muted-foreground">{unit}</div>
      </div>
      <div className="text-[12px] text-muted-foreground leading-[1.5]">{label}</div>
    </div>
  );
}
