import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/lib/blog";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { format, parseISO } from "date-fns";

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const categoryName = typeof post.category === "object" && post.category ? post.category.name : post.category || "";
  const authorName = typeof post.author === "object" && post.author ? post.author.name : post.author || "QA Assist Team";
  const authorAvatar = typeof post.author === "object" && post.author ? post.author.avatar : undefined;

  let formattedDate = "";
  if (post.publishedAt) {
    try {
      formattedDate = format(parseISO(post.publishedAt), "MMM d, yyyy");
    } catch {
      formattedDate = post.publishedAt;
    }
  }

  if (featured) {
    return (
      <article className="group relative rounded-3xl border hairline bg-card/70 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:border-border hover:shadow-elevated">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {post.featuredImage?.url && (
            <div className="lg:col-span-7 overflow-hidden rounded-2xl border hairline bg-muted/40 aspect-[16/9]">
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
            </div>
          )}
          <div className={post.featuredImage?.url ? "lg:col-span-5 flex flex-col justify-center" : "lg:col-span-12"}>
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground mb-3">
              {categoryName && (
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary dark:text-foreground">
                  {categoryName}
                </span>
              )}
              {formattedDate && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formattedDate}
                </span>
              )}
              {post.readingTime && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime} min read
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors font-display mb-3">
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:underline focus:outline-none">
                {post.title}
              </Link>
            </h2>

            {post.excerpt && (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between pt-4 border-t hairline mt-auto">
              <div className="flex items-center gap-2.5">
                {authorAvatar ? (
                  <img src={authorAvatar} alt={authorName} className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-foreground">
                    {authorName.charAt(0)}
                  </div>
                )}
                <span className="text-xs font-medium text-foreground">{authorName}</span>
              </div>

              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
              >
                Read article
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col rounded-2xl border hairline bg-card/60 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-border hover:shadow-soft hover:-translate-y-0.5">
      {post.featuredImage?.url && (
        <div className="overflow-hidden rounded-xl border hairline bg-muted/40 aspect-[16/9] mb-4">
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2.5">
        {categoryName && (
          <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium text-foreground text-[11px]">
            {categoryName}
          </span>
        )}
        {formattedDate && <span>{formattedDate}</span>}
        {post.readingTime && (
          <>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </>
        )}
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors font-display line-clamp-2 mb-2">
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:underline focus:outline-none">
          {post.title}
        </Link>
      </h3>

      {post.excerpt && (
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
          {post.excerpt}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t hairline mt-auto">
        <div className="flex items-center gap-2">
          {authorAvatar ? (
            <img src={authorAvatar} alt={authorName} className="h-6 w-6 rounded-full object-cover" />
          ) : (
            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-semibold text-foreground">
              {authorName.charAt(0)}
            </div>
          )}
          <span className="text-xs text-muted-foreground">{authorName}</span>
        </div>

        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:opacity-80 transition-opacity"
        >
          Read <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  );
}
