import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "QA Assist" },
      { name: "description", content: "QA Assist gives startup engineering teams one place to write test cases, run sprints, log bugs, and ship reports. Built lean, hosted in India, priced for teams" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "QA Assist" },
      { property: "og:description", content: "QA Assist gives startup engineering teams one place to write test cases, run sprints, log bugs, and ship reports. Built lean, hosted in India, priced for teams" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "QA Assist" },
      { name: "twitter:description", content: "QA Assist gives startup engineering teams one place to write test cases, run sprints, log bugs, and ship reports. Built lean, hosted in India, priced for teams" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e112ffe9-281c-4c6a-9030-7de23ffd031f/id-preview-e90b161d--28452dc6-f3ba-43e8-948e-ce6f403a400b.lovable.app-1777030458416.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e112ffe9-281c-4c6a-9030-7de23ffd031f/id-preview-e90b161d--28452dc6-f3ba-43e8-948e-ce6f403a400b.lovable.app-1777030458416.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
