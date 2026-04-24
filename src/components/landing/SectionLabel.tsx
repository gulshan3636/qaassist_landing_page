export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-tertiary mb-5 flex items-center gap-2">
      <span className="text-tertiary/70">{index}</span>
      <span className="h-px w-6 bg-hairline" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
