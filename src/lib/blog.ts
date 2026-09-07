import { createServerFn } from "@tanstack/react-start";

export interface PostHeading {
  level: number;
  text: string;
  id: string;
}

export interface PostFaq {
  question: string;
  answer: string;
}

export interface PostImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface PostAuthor {
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
}

export interface PostCategory {
  id?: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  metaTitle?: string;
  excerpt?: string;
  content: string;
  description: string;
  url: string;
  canonicalUrl: string;
  jsonLd: any;
  ogTags?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    image?: string;
    locale?: string;
  };
  twitterCards?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  headings?: PostHeading[];
  wordCount?: number;
  readingTime?: number | string;
  faqs?: PostFaq[];
  keyTakeaways?: string[];
  answerSummary?: string;
  featuredImage?: PostImage;
  category?: PostCategory | string;
  tags?: string[];
  author?: PostAuthor | string;
  publishedAt?: string;
  updatedAt?: string;
  noindex?: boolean;
  views?: number;
  featured?: boolean;
}

export interface PostsResponse {
  posts: BlogPost[];
  pagination?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
  categories?: PostCategory[];
}

function getBaseUrl(): string {
  return process.env.BLOG_API_URL || "https://bdablogs.vercel.app";
}

function getApiKey(): string {
  return process.env.BLOG_API_KEY || "";
}

export async function api<T = any>(
  path: string,
  options: { method?: string; body?: any; revalidate?: number } = {},
): Promise<T | null> {
  const base = getBaseUrl();
  const key = getApiKey();

  try {
    const res = await fetch(`${base}${path}`, {
      method: options.method || "GET",
      headers: {
        ...(key ? { Authorization: `Bearer ${key}` } : {}),
        "Content-Type": "application/json",
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      console.warn(`[Blog API] ${options.method || "GET"} ${path} failed with status ${res.status}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error(`[Blog API] Error fetching ${path}:`, err);
    return null;
  }
}

export function enrichPost(post: any): BlogPost {
  if (!post) return post;

  const title = post.title || "";
  const metaTitle = post.metaTitle || title;
  const description = post.description || post.metaDescription || post.excerpt || "";
  const canonicalUrl = post.canonicalUrl || post.url || `https://qaassist.in/blog/${post.slug || ""}`;

  // Parse headings and inject id attributes if missing
  let content = post.content || "";
  let headings = post.headings || [];

  if (!headings || headings.length === 0) {
    headings = [];
    const headingRegex = /<h([2-4])([^>]*)>(.*?)<\/h\1>/gi;
    let match;
    const ids = new Set<string>();

    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1], 10);
      const attrs = match[2];
      const rawText = match[3].replace(/<[^>]+>/g, "").trim();

      const idMatch = attrs.match(/id=["']([^"']+)["']/i);
      let id = idMatch ? idMatch[1] : "";

      if (!id) {
        id = rawText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        if (!id) id = `heading-${headings.length + 1}`;
      }

      let uniqueId = id;
      let counter = 1;
      while (ids.has(uniqueId)) {
        uniqueId = `${id}-${counter++}`;
      }
      ids.add(uniqueId);

      headings.push({ level, text: rawText, id: uniqueId });
    }

    // Inject missing IDs into content
    let headingIdx = 0;
    content = content.replace(/<h([2-4])([^>]*)>(.*?)<\/h\1>/gi, (fullMatch: string, tag: string, attrs: string, innerText: string) => {
      const h = headings[headingIdx++];
      if (!h) return fullMatch;
      if (/id=["'][^"']+["']/i.test(attrs)) {
        return fullMatch;
      }
      return `<h${tag} id="${h.id}"${attrs}>${innerText}</h${tag}>`;
    });
  }

  const jsonLd = post.jsonLd || {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: title,
        description,
        image: post.featuredImage?.url ? [post.featuredImage.url] : [],
        datePublished: post.publishedAt || post.createdAt,
        dateModified: post.updatedAt || post.publishedAt || post.createdAt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        author: {
          "@type": "Organization",
          name: "QA Assist",
          url: "https://qaassist.in",
        },
        publisher: {
          "@type": "Organization",
          name: "QA Assist",
          url: "https://qaassist.in",
          logo: {
            "@type": "ImageObject",
            url: "https://qaassist.in/logo-icon.png",
          },
        },
      },
    ],
  };

  const ogTags = post.ogTags || {
    title: metaTitle,
    description,
    url: canonicalUrl,
    siteName: "QA Assist",
    image: post.featuredImage?.url,
    locale: "en_US",
  };

  const twitterCards = post.twitterCards || {
    card: "summary_large_image",
    title: metaTitle,
    description,
    image: post.featuredImage?.url,
  };

  // Format author if it is a Mongo ObjectId string
  let author = post.author;
  if (typeof author === "string" && (/^[a-f\d]{24}$/i.test(author) || !author.trim())) {
    author = { name: "QA Assist Team", role: "Engineering & QA" };
  }

  return {
    ...post,
    title,
    metaTitle,
    description,
    canonicalUrl,
    content,
    headings,
    jsonLd,
    ogTags,
    twitterCards,
    author,
  };
}

export async function getPosts(params: Record<string, string | number | boolean | undefined> = {}): Promise<PostsResponse | null> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      searchParams.set(key, String(val));
    }
  });

  const qs = searchParams.toString();
  const data = await api<PostsResponse>(`/api/v1/posts${qs ? `?${qs}` : ""}`);
  if (!data) return null;

  return {
    ...data,
    posts: (data.posts || []).map(enrichPost),
  };
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!slug) return null;

  // 1. Try single post endpoint
  const data = await api<{ post?: BlogPost }>(`/api/v1/posts/${encodeURIComponent(slug)}`);
  if (data?.post) {
    return enrichPost(data.post);
  }

  // 2. Fallback to query by slug
  const queryData = await api<{ posts?: BlogPost[] }>(`/api/v1/posts?slug=${encodeURIComponent(slug)}`);
  if (queryData?.posts && queryData.posts.length > 0) {
    return enrichPost(queryData.posts[0]);
  }

  return null;
}

export async function getRelated(slug: string): Promise<BlogPost[]> {
  if (!slug) return [];
  const data = await api<{ posts?: BlogPost[] }>(`/api/v1/posts/${encodeURIComponent(slug)}/related`);
  if (data?.posts && data.posts.length > 0) {
    return data.posts.map(enrichPost);
  }

  // Fallback: fetch recent posts excluding current slug
  const recent = await getPosts({ limit: 4 });
  if (recent?.posts) {
    return recent.posts.filter((p) => p.slug !== slug).slice(0, 3);
  }

  return [];
}


export async function getCategories(): Promise<PostCategory[]> {
  const data = await api<{ categories?: PostCategory[] }>("/api/v1/categories");
  return data?.categories ?? [];
}

export async function getActiveRedirects(): Promise<Array<{ source: string; destination: string; permanent?: boolean }>> {
  const data = await api<{ redirects?: Array<{ source: string; destination: string; permanent?: boolean }> }>("/api/redirects/active");
  return data?.redirects ?? [];
}

export async function getRaw(path: string): Promise<string> {
  const base = getBaseUrl();
  const key = getApiKey();

  try {
    const res = await fetch(`${base}${path}`, {
      headers: key ? { Authorization: `Bearer ${key}` } : {},
    });
    return res.ok ? await res.text() : "";
  } catch (err) {
    console.error(`[Blog API] Error fetching raw ${path}:`, err);
    return "";
  }
}

export async function incrementPostViews(slug: string): Promise<boolean> {
  if (!slug) return false;
  const base = getBaseUrl();
  const key = getApiKey();

  try {
    const res = await fetch(`${base}/api/v1/posts/${encodeURIComponent(slug)}`, {
      method: "POST",
      headers: {
        ...(key ? { Authorization: `Bearer ${key}` } : {}),
        "Content-Type": "application/json",
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* =========================================================
   TanStack Start Server Functions for Secure SSR / Client RPC
   ========================================================= */

export const fetchPostsServerFn = createServerFn({ method: "GET" })
  .inputValidator((d?: { page?: number; limit?: number; category?: string; tag?: string; featured?: boolean }) => d || {})
  .handler(async ({ data }) => {
    return await getPosts(data);
  });

export const fetchPostBySlugServerFn = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return await getPost(slug);
  });

export const fetchRelatedPostsServerFn = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return await getRelated(slug);
  });

export const trackPostViewServerFn = createServerFn({ method: "POST" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return await incrementPostViews(slug);
  });

