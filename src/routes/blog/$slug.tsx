import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { fetchPostBySlugServerFn, fetchRelatedPostsServerFn, type BlogPost } from "@/lib/blog";
import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { FaqAccordion } from "@/components/blog/FaqAccordion";
import { PostCard } from "@/components/blog/PostCard";
import { BlogViewTracker } from "@/components/blog/BlogViewTracker";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { useState } from "react";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { slug } = params;
    const post = await fetchPostBySlugServerFn({ data: slug });

    if (!post) {
      throw notFound();
    }

    const relatedPosts = await fetchRelatedPostsServerFn({ data: slug });

    return {
      post,
      relatedPosts: relatedPosts || [],
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) {
      return {
        meta: [{ title: "Post Not Found — QA Assist" }],
      };
    }

    const { post } = loaderData;
    const og = post.ogTags || {};
    const twitter = post.twitterCards || {};

    const meta: Array<{ name?: string; property?: string; content?: string }> = [
      { title: post.metaTitle || post.title },
      { name: "description", content: post.description || post.excerpt || "" },
      { property: "og:title", content: og.title || post.metaTitle || post.title },
      { property: "og:description", content: og.description || post.description || "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: og.url || post.url || post.canonicalUrl },
    ];

    if (og.siteName) meta.push({ property: "og:site_name", content: og.siteName });
    if (og.locale) meta.push({ property: "og:locale", content: og.locale });
    if (og.image) meta.push({ property: "og:image", content: og.image });
    if (post.publishedAt) meta.push({ property: "article:published_time", content: post.publishedAt });
    if (post.updatedAt) meta.push({ property: "article:modified_time", content: post.updatedAt });

    meta.push({ name: "twitter:card", content: twitter.card || "summary_large_image" });
    meta.push({ name: "twitter:title", content: twitter.title || post.metaTitle || post.title });
    meta.push({ name: "twitter:description", content: twitter.description || post.description || "" });
    if (twitter.image) meta.push({ name: "twitter:image", content: twitter.image });

    if (post.noindex) {
      meta.push({ name: "robots", content: "noindex, follow" });
    }

    const links: Array<{ rel: string; href: string }> = [];
    if (post.canonicalUrl) {
      links.push({ rel: "canonical", href: post.canonicalUrl });
    }

    const scripts: Array<{ type: string; children: string }> = [];
    if (post.jsonLd) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(post.jsonLd),
      });
    }

    return {
      meta,
      links,
      scripts,
    };
  },
  component: BlogPostDetailPage,
  notFoundComponent: PostNotFound,
});

function PostNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-display text-foreground">Post not found</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function BlogPostDetailPage() {
  const { post, relatedPosts } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const categoryName = typeof post.category === "object" && post.category ? post.category.name : post.category || "";
  const authorName = typeof post.author === "object" && post.author ? post.author.name : post.author || "QA Assist Team";
  const authorAvatar = typeof post.author === "object" && post.author ? post.author.avatar : undefined;
  const authorRole = typeof post.author === "object" && post.author ? post.author.role : "Product & Engineering";

  let formattedPublishedDate = "";
  if (post.publishedAt) {
    try {
      formattedPublishedDate = format(parseISO(post.publishedAt), "MMMM d, yyyy");
    } catch {
      formattedPublishedDate = post.publishedAt;
    }
  }

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      <SiteNav />

      {/* JSON-LD Script tag injection as specified in requirement 2 */}
      {post.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.jsonLd) }}
        />
      )}

      {/* Fire-and-forget view tracker */}
      <BlogViewTracker slug={post.slug} />

      <main className="flex-1 pt-24 pb-20">
        <article className="mx-auto max-w-[1140px] px-5 sm:px-8">
          {/* Top Breadcrumbs & Back button */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px] sm:max-w-md">
                {post.title}
              </span>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full border hairline bg-card/60 hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to all articles
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b hairline">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
              {categoryName && (
                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary dark:text-foreground">
                  {categoryName}
                </span>
              )}
              {formattedPublishedDate && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formattedPublishedDate}
                </span>
              )}
              {post.readingTime && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime} min read
                </span>
              )}
              {post.wordCount ? (
                <span>· {post.wordCount} words</span>
              ) : null}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-foreground font-display leading-[1.18] mb-5">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Author info & Quick share bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-6 border-t hairline">
              <div className="flex items-center gap-3">
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="h-10 w-10 rounded-full object-cover border hairline"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-secondary border hairline flex items-center justify-center text-sm font-semibold text-foreground">
                    {authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-foreground">{authorName}</div>
                  <div className="text-xs text-muted-foreground">{authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy article link"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border hairline bg-card/60 hover:bg-secondary text-foreground transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy Link"}</span>
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.canonicalUrl || post.url || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full border hairline bg-card/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Share on X"
                >
                  <Share2 className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </header>

          {/* Main Grid: LEFT Table of Contents Sidebar + RIGHT Article Body */}
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
            {/* LEFT Sticky Sidebar (Table of Contents + Author + Actions) */}
            <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24 self-start space-y-5">
              {/* Mobile Table of Contents Dropdown */}
              {post.headings && post.headings.length > 0 && (
                <div className="lg:hidden w-full">
                  <button
                    type="button"
                    onClick={() => setMobileTocOpen(!mobileTocOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border hairline bg-card/80 text-xs font-semibold uppercase tracking-wider text-foreground"
                  >
                    <span>Table of Contents ({post.headings.length})</span>
                    <span>{mobileTocOpen ? "Hide ↑" : "Show ↓"}</span>
                  </button>
                  {mobileTocOpen && (
                    <div className="mt-2">
                      <TableOfContents headings={post.headings} />
                    </div>
                  )}
                </div>
              )}

              {/* Desktop Sticky Table of Contents */}
              {post.headings && post.headings.length > 0 && (
                <div className="hidden lg:block">
                  <TableOfContents headings={post.headings} />
                </div>
              )}


              {/* Sidebar Quick Action Card */}
              <div className="hidden lg:block rounded-2xl border hairline bg-card/60 p-5 backdrop-blur-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Share this guide
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border hairline bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Link Copied" : "Copy Link"}</span>
                  </button>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.canonicalUrl || post.url || "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-9 w-9 rounded-xl border hairline bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
                    aria-label="Share on X"
                  >
                    <Share2 className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>

            {/* RIGHT Main Content Column */}
            <div className="flex-1 min-w-0 max-w-4xl">
              {/* Featured Image */}
              {post.featuredImage?.url && (
                <div className="mb-10 overflow-hidden rounded-2xl sm:rounded-3xl border hairline bg-secondary/20 backdrop-blur-sm p-2 sm:p-4 flex items-center justify-center">
                  <img
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    className="w-full h-auto max-h-[560px] object-contain rounded-xl sm:rounded-2xl shadow-sm"
                    loading="eager"
                  />
                </div>
              )}

              {/* Quick Answer / Summary (AI Engine Box) */}
              {post.answerSummary && (
                <div className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-card/90 p-5 sm:p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary dark:text-foreground mb-2">
                    <Sparkles className="h-4 w-4" />
                    Quick Answer / Summary
                  </div>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    {post.answerSummary}
                  </p>
                </div>
              )}

              {/* Key Takeaways Box */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="mb-10 rounded-2xl border hairline bg-secondary/30 p-5 sm:p-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-tertiary mb-3">
                    Key Takeaways
                  </div>
                  <ul className="space-y-2.5">
                    {post.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90 leading-snug">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-neutral dark:prose-invert max-w-none text-[16px] sm:text-[17px] leading-[1.85] text-foreground/90
                  [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:font-display [&>h2]:scroll-mt-24
                  [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-semibold [&>h3]:tracking-tight [&>h3]:mt-10 [&>h3]:mb-3 [&>h3]:font-display [&>h3]:scroll-mt-24
                  [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:mt-8 [&>h4]:mb-2 [&>h4]:scroll-mt-24
                  [&>p]:mb-6 [&>p]:leading-relaxed
                  [&>ul]:my-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2.5
                  [&>ol]:my-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-2.5
                  [&>blockquote]:border-l-2 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-muted-foreground
                  [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:bg-secondary/80 [&>pre]:border [&>pre]:hairline [&>pre]:overflow-x-auto [&>pre]:my-6
                  [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded-md [&>code]:bg-secondary [&>code]:font-mono [&>code]:text-xs
                  [&>img]:rounded-2xl [&>img]:border [&>img]:hairline [&>img]:my-8 [&>img]:w-full [&>img]:max-h-[540px] [&>img]:object-contain [&>img]:bg-secondary/20"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-8 mt-12 border-t hairline">
                  <span className="text-xs text-muted-foreground mr-1">Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary/80 px-3 py-1 text-xs text-muted-foreground border hairline"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* FAQs Section */}
              {post.faqs && post.faqs.length > 0 && (
                <FaqAccordion faqs={post.faqs} />
              )}

              {/* CTA Box */}
              <div className="my-14 rounded-3xl border hairline bg-gradient-to-br from-card via-card/70 to-secondary/30 p-6 sm:p-8 backdrop-blur">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground mb-2">
                  Ship bug-free features faster with QA Assist
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Join engineering and QA teams who have streamlined test management, sprint coordination, and reporting.
                </p>
                <a
                  href="/#getearlyaccess"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  Get Early Access Free <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Full Width Related Articles Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 pt-12 border-t hairline">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
                    Related Articles
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Continue reading top guides and articles
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  View all posts <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.slice(0, 3).map((related) => (
                  <PostCard key={related.slug || related.id} post={related} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}

