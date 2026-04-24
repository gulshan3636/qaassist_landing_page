## QA Assist — Landing Page

A minimal, editorial landing page that mirrors the tone of your brief: narrow content column, small uppercase section labels, restrained type, generous whitespace, and a single blue accent. Light theme by default with a dark mode toggle in the header.

### Page structure (top to bottom)

1. **Sticky top nav** — QA Assist wordmark on the left; section links (Features, Workflow, Roles, FAQ) and a "Start free" button on the right; theme toggle (sun/moon). Slight blur + hairline border on scroll.

2. **Hero** — "Your bugs ship faster than your team can catch them." Subhead, primary CTA "Start free — no card needed" (scrolls to signup form), secondary "See a 2-min demo" (scrolls to workflow). Status tags below: Live v1.0.3 · React + Node.js + Supabase · Hosted in India.

3. **Problem / Who it's for** — "Built for teams of 3 to 30 who can't afford QA chaos." Three inline proof stats (4 roles · 1 platform · 0 manual tags).

4. **Features** — "Everything a lean QA team actually uses." Six cards in a responsive grid: Test case management, Sprint runs, Bug tracker, AI bug analysis, Reports in one click, Excel bulk import.

5. **Workflow** — "Four steps from test plan to shipped sprint." Numbered steps: Create → Assign → Execute → Ship.

6. **Access control** — "Right access for every person on the team." Four role cards: Admin, Manager, QA Engineer, Developer.

7. **Objection handling / FAQ** — Four Q&As with arrow markers: pricing, setup time, data location, team size.

8. **Signup form (new — replaces final CTA's button row target)** — "Stop shipping bugs you could have caught." Single-field email capture with a "Start free" button. Inline success state on submit (no backend yet — submission is captured in component state and shows a confirmation message). Helper note: "No credit card. No setup call."

9. **Footer** — Wordmark + tagline, three link columns (Product, Company, Legal), copyright row. Links are non-functional placeholders.

### Design system

- **Layout**: ~680px content column centered, with full-bleed background only on the final CTA card. Hairline (0.5px) dividers between sections.
- **Type**: Inter (or system sans). Headlines 26–32px medium weight. Body 15px. Small uppercase eyebrow labels at 11px with wide letter-spacing.
- **Color**: Light mode — near-white background, near-black text, single blue accent for highlighted headline phrases and the primary button. Dark mode — deep slate background, off-white text, same blue accent (slightly brighter for contrast). Tokens defined in the global stylesheet so the toggle flips everything cleanly.
- **Buttons**: Primary = soft blue fill, blue text, hairline blue border. Secondary = transparent with hairline neutral border.
- **Tags**: Small pill badges (success green for "Live v1.0.3", neutral gray for tech stack).
- **Motion**: Subtle fade-in on scroll for each section (no flashy animation), smooth scroll for in-page anchors.

### Behavior

- Theme toggle persists choice in localStorage and respects the user's OS preference on first visit.
- Nav links and all CTAs scroll smoothly to their target sections.
- Signup form validates a basic email format and shows a confirmation state on submit (no data is sent anywhere yet — easy to wire up later).
- Fully responsive: nav collapses to a hamburger menu under ~720px; card/step/role grids reflow to single column on mobile.

### Out of scope

- No real auth or backend (signup is visual + local state only).
- No demo video — the "See a 2-min demo" button scrolls to the Workflow section as a stand-in.
- No separate routes (single landing page, as requested).