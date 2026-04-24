import { CheckCircle2, Circle, AlertCircle, Sparkles } from "lucide-react";

/**
 * Polished QA Assist product UI mockup for the hero.
 * Pure presentational — no data, no logic.
 */
export function ProductMockup() {
  return (
    <div className="relative">
      {/* Decorative glow behind */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-2xl"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--info) 35%, transparent), color-mix(in oklab, var(--violet) 30%, transparent))",
        }}
      />

      <div className="rounded-2xl border hairline bg-elevated shadow-[var(--shadow-elevated)] overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 h-9 border-b hairline bg-secondary/50">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="font-mono text-[10.5px] text-tertiary">
              app.qaassist.io / sprints / sprint-24
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-[140px_1fr] min-h-[320px]">
          {/* Sidebar */}
          <aside className="border-r hairline bg-secondary/30 p-3 hidden sm:block">
            <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-tertiary mb-2 px-1">
              Workspace
            </div>
            <ul className="space-y-0.5 text-[12px]">
              <SideItem label="Dashboard" />
              <SideItem label="Test cases" count="248" />
              <SideItem label="Sprints" active />
              <SideItem label="Bugs" count="17" />
              <SideItem label="Reports" />
            </ul>
            <div className="mt-5 text-[10px] font-medium uppercase tracking-[0.12em] text-tertiary mb-2 px-1">
              Team
            </div>
            <div className="flex -space-x-1.5 px-1">
              <Avatar initial="A" tone="info" />
              <Avatar initial="P" tone="violet" />
              <Avatar initial="K" tone="success" />
              <Avatar initial="+2" tone="muted" />
            </div>
          </aside>

          {/* Main */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-tertiary">
                  Sprint 24 · Checkout flow
                </div>
                <div className="text-[14px] font-medium text-foreground mt-0.5">
                  Pre-release regression
                </div>
              </div>
              <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-full bg-info-muted text-info-foreground border hairline border-info/20">
                Running
              </span>
            </div>

            {/* Progress */}
            <div className="rounded-lg border hairline p-3 bg-card mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-muted-foreground">Pass rate</span>
                <span className="text-[12px] font-medium text-foreground tabular-nums">
                  84% · 42 / 50
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden flex">
                <div className="h-full bg-success" style={{ width: "76%" }} />
                <div className="h-full bg-danger" style={{ width: "10%" }} />
                <div className="h-full bg-warn" style={{ width: "6%" }} />
              </div>
              <div className="flex gap-3 mt-2 text-[10.5px] text-tertiary">
                <Legend color="success" label="38 pass" />
                <Legend color="danger" label="5 fail" />
                <Legend color="warn" label="3 blocked" />
              </div>
            </div>

            {/* Test rows */}
            <div className="space-y-1.5">
              <TestRow status="pass" id="TC-104" title="Apply promo code at checkout" owner="A" />
              <TestRow status="pass" id="TC-105" title="Tax calculation EU/US" owner="P" />
              <TestRow
                status="fail"
                id="TC-106"
                title="Stripe 3DS challenge fallback"
                owner="K"
                badge="AI: critical"
              />
              <TestRow status="blocked" id="TC-107" title="Apple Pay sheet on iOS 17" owner="P" />
              <TestRow status="pass" id="TC-108" title="Cart persistence after logout" owner="A" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI badge */}
      <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 hidden sm:flex items-center gap-1.5 rounded-full bg-elevated border hairline shadow-[var(--shadow-soft)] px-3 py-1.5">
        <Sparkles className="h-3.5 w-3.5 text-violet" />
        <span className="text-[11.5px] font-medium text-foreground">
          AI auto-tagged 5 bugs
        </span>
      </div>
    </div>
  );
}

function SideItem({
  label,
  count,
  active,
}: {
  label: string;
  count?: string;
  active?: boolean;
}) {
  return (
    <li
      className={`flex items-center justify-between px-2 py-1.5 rounded-md ${
        active
          ? "bg-elevated text-foreground border hairline shadow-[var(--shadow-soft)]"
          : "text-muted-foreground"
      }`}
    >
      <span>{label}</span>
      {count && <span className="text-[10px] text-tertiary tabular-nums">{count}</span>}
    </li>
  );
}

function Avatar({ initial, tone }: { initial: string; tone: "info" | "violet" | "success" | "muted" }) {
  const tones: Record<typeof tone, string> = {
    info: "bg-info-muted text-info-foreground",
    violet: "bg-violet-muted text-violet-foreground",
    success: "bg-success-muted text-success-foreground",
    muted: "bg-secondary text-muted-foreground",
  };
  return (
    <span
      className={`h-6 w-6 rounded-full border hairline border-background flex items-center justify-center text-[10px] font-medium ${tones[tone]}`}
    >
      {initial}
    </span>
  );
}

function Legend({ color, label }: { color: "success" | "danger" | "warn"; label: string }) {
  const map: Record<typeof color, string> = {
    success: "bg-success",
    danger: "bg-danger",
    warn: "bg-warn",
  };
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`h-1.5 w-1.5 rounded-full ${map[color]}`} />
      {label}
    </span>
  );
}

function TestRow({
  status,
  id,
  title,
  owner,
  badge,
}: {
  status: "pass" | "fail" | "blocked";
  id: string;
  title: string;
  owner: string;
  badge?: string;
}) {
  const icon =
    status === "pass" ? (
      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
    ) : status === "fail" ? (
      <AlertCircle className="h-3.5 w-3.5 text-danger" />
    ) : (
      <Circle className="h-3.5 w-3.5 text-warn" />
    );
  return (
    <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md hover:bg-secondary/60 transition-colors">
      {icon}
      <span className="font-mono text-[10.5px] text-tertiary w-12 shrink-0">{id}</span>
      <span className="text-[12px] text-foreground truncate flex-1">{title}</span>
      {badge && (
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-violet-muted text-violet-foreground">
          {badge}
        </span>
      )}
      <Avatar initial={owner} tone={status === "pass" ? "success" : status === "fail" ? "info" : "violet"} />
    </div>
  );
}
