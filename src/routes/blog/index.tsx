import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchPostsServerFn } from "@/lib/blog";
import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { PostCard } from "@/components/blog/PostCard";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { z } from "zod";

const blogSearchSchema = z.object({
  page: z.number().optional().default(1),
  category: z.string().optional(),
});

export const Route = createFileRoute("/blog/")({
  validateSearch: (search) => {
    return {
      page: search.page ? Number(search.page) : 1,
      category: typeof search.category === "string" ? search.category : undefined,
    };
  },
  loaderDeps: ({ search }) => ({ page: search.page, category: search.category }),
  loader: async ({ deps }) => {
    const data = await fetchPostsServerFn({
      data: {
        page: deps.page || 1,
        category: deps.category,
        limit: 9,
      },
    });
    return data;
  },
  head: () => ({
    meta: [
      { title: "Blog — QA Assist | Software QA, Testing Strategies & Engineering Insights" },
      {
        name: "description",
        content:
          "Practical insights, test case strategies, and lean QA practices for startup engineering teams shipping fast with high confidence.",
      },
      { property: "og:title", content: "Blog — QA Assist" },
      {
        property: "og:description",
        content:
          "Practical insights, test case strategies, and lean QA practices for startup engineering teams shipping fast with high confidence.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://qaassist.in/blog" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog — QA Assist" },
      {
        name: "twitter:description",
        content:
          "Practical insights, test case strategies, and lean QA practices for startup engineering teams shipping fast with high confidence.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://qaassist.in/blog",
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const data = Route.useLoaderData();
  const { page = 1, category } = Route.useSearch();

  const posts = data?.posts || [];
  const pagination = data?.pagination;
  const categories = data?.categories || [];

  const totalPages = pagination?.totalPages || (posts.length > 0 ? 1 : 0);
  const hasNextPage = pagination?.hasNext ?? (totalPages > page);
  const hasPrevPage = pagination?.hasPrev ?? (page > 1);

  const featuredPost = page === 1 && !category && posts.length > 0 ? posts[0] : null;
  const standardPosts = featuredPost ? posts.slice(1) : posts;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      <SiteNav />

      <main className="flex-1 pt-28 pb-20">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
          {/* Header section */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border hairline bg-secondary/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur mb-4">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span>QA Assist Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground font-display mb-4">
              Engineering & QA Insights
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Actionable guides, testing workflows, and best practices for high-velocity startup engineering teams.
            </p>
          </div>

          {/* Category tabs */}
          {categories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
              <Link
                to="/blog"
                search={{ page: 1 }}
                className={`text-xs font-medium px-4 py-2 rounded-full border hairline transition-all whitespace-nowrap ${
                  !category
                    ? "bg-foreground text-background border-foreground font-semibold"
                    : "bg-card/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                All Posts
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/blog"
                  search={{ page: 1, category: cat.slug }}
                  className={`text-xs font-medium px-4 py-2 rounded-full border hairline transition-all whitespace-nowrap ${
                    category === cat.slug
                      ? "bg-foreground text-background border-foreground font-semibold"
                      : "bg-card/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <PostCard post={featuredPost} featured={true} />
            </div>
          )}

          {/* Posts Grid */}
          {standardPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {standardPosts.map((post) => (
                <PostCard key={post.slug || post.id} post={post} />
              ))}
            </div>
          ) : !featuredPost ? (
            <div className="rounded-3xl border hairline bg-card/40 p-12 text-center max-w-lg mx-auto my-12">
              <Sparkles className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {category
                  ? `There are no posts published under the "${category}" category yet.`
                  : "We're currently writing fresh guides and articles. Check back soon!"}
              </p>
              {category && (
                <Link
                  to="/blog"
                  search={{ page: 1 }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <ArrowLeft className="h-3 w-3" /> View all posts
                </Link>
              )}
            </div>
          ) : null}

          {/* Pagination */}
          {(hasPrevPage || hasNextPage) && (
            <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t hairline">
              {hasPrevPage ? (
                <Link
                  to="/blog"
                  search={{ page: page - 1, category }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border hairline bg-card/60 hover:bg-secondary text-foreground transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border hairline bg-card/20 text-muted-foreground/40 cursor-not-allowed">
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </span>
              )}

              <span className="text-xs text-muted-foreground font-mono">
                Page {page} {totalPages > 1 ? `of ${totalPages}` : ""}
              </span>

              {hasNextPage ? (
                <Link
                  to="/blog"
                  search={{ page: page + 1, category }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border hairline bg-card/60 hover:bg-secondary text-foreground transition-colors"
                >
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border hairline bg-card/20 text-muted-foreground/40 cursor-not-allowed">
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          )}

          {/* Bottom CTA Banner */}
          <div className="mt-20 rounded-3xl border hairline bg-gradient-to-br from-card/80 via-card/50 to-secondary/30 p-8 sm:p-12 relative overflow-hidden backdrop-blur-md">
            <div className="max-w-2xl relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-display mb-3">
                Catch bugs before your users do
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                QA Assist gives startup teams one intuitive place to write test cases, coordinate sprints, and ship bug-free software faster.
              </p>
              <a
                href="/#getearlyaccess"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Get Early Access Free <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
