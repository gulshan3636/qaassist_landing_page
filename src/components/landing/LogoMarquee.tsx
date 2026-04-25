/**
 * Animated logo marquee — pure CSS scrolling row of trusted company logos.
 */
const logoSet = [
  { name: "Vercel", src: "https://cdn.simpleicons.org/vercel" },
  { name: "Linear", src: "https://cdn.simpleicons.org/linear" },
  { name: "Supabase", src: "https://cdn.simpleicons.org/supabase" },
  { name: "Stripe", src: "https://cdn.simpleicons.org/stripe" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github" },
  { name: "Figma", src: "https://cdn.simpleicons.org/figma" },
  // { name: "Slack", src: "https://cdn.simpleicons.org/slack" },
  { name: "Notion", src: "https://cdn.simpleicons.org/notion" },
];

const logos = [...logoSet, ...logoSet];

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
      <div className="flex w-max animate-marquee items-center gap-10 sm:gap-14 py-2">
        {logos.map((logo, i) => (
          <img
            key={`${logo.name}-${i}`}
            src={logo.src}
            alt={logo.name}
            loading="eager"
            decoding="async"
            className="h-6 sm:h-7 w-auto opacity-75 grayscale contrast-125 dark:invert dark:opacity-85"
          />
        ))}
      </div>
    </div>
  );
}
