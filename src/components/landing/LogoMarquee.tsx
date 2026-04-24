/**
 * Animated logo marquee — pure CSS scrolling row of "trusted by" names.
 */
const logos = [
  "Vercel",
  "Linear",
  "Supabase",
  "Resend",
  "Cal.com",
  "Raycast",
  "Stripe",
  "Plausible",
  "Vercel",
  "Linear",
  "Supabase",
  "Resend",
  "Cal.com",
  "Raycast",
  "Stripe",
  "Plausible",
];

export function LogoMarquee() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
        style={{
          background: "linear-gradient(to right, var(--background), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
        style={{
          background: "linear-gradient(to left, var(--background), transparent)",
        }}
      />
      <div className="flex w-max animate-marquee gap-8 sm:gap-12 py-2">
        {logos.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-[15px] sm:text-[18px] font-medium text-tertiary/80 whitespace-nowrap tracking-tight"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
