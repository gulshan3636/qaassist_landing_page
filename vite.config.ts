// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

const cmsProxyDevPlugin = (): Plugin => ({
  name: "cms-proxy-dev",
  configureServer(server) {
    const PROXY_MAP: Record<string, { path: string; contentType: string }> = {
      "/sitemap.xml": { path: "/api/v1/sitemap.xml", contentType: "application/xml; charset=utf-8" },
      "/robots.txt": { path: "/api/v1/robots.txt", contentType: "text/plain; charset=utf-8" },
      "/rss.xml": { path: "/api/v1/rss.xml", contentType: "application/rss+xml; charset=utf-8" },
      "/llms.txt": { path: "/api/v1/llms.txt", contentType: "text/markdown; charset=utf-8" },
      "/llms-full.txt": { path: "/api/v1/llms-full.txt", contentType: "text/markdown; charset=utf-8" },
    };

    server.middlewares.use(async (req, res, next) => {
      const url = req.url ? new URL(req.url, "http://localhost").pathname : "";
      const match = PROXY_MAP[url];
      if (match && (req.method === "GET" || req.method === "HEAD")) {
        const base = process.env.BLOG_API_URL || "https://bdablogs.vercel.app";
        const key = process.env.BLOG_API_KEY || "";
        try {
          const cmsRes = await fetch(`${base}${match.path}`, {
            headers: key ? { Authorization: `Bearer ${key}` } : {},
          });
          if (cmsRes.ok) {
            const body = await cmsRes.text();
            res.statusCode = 200;
            res.setHeader("Content-Type", match.contentType);
            res.end(body);
            return;
          }
        } catch (err) {
          console.error(`[Dev CMS Proxy] Failed to fetch ${url}:`, err);
        }
      }
      next();
    });
  },
});

export default defineConfig({
  cloudflare: false,
  vite: {
    plugins: [cmsProxyDevPlugin()],
  },
});

