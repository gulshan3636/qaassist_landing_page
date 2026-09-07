import { useEffect, useRef } from "react";
import { trackPostViewServerFn } from "@/lib/blog";

export function BlogViewTracker({ slug }: { slug: string }) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!slug || trackedRef.current) return;
    trackedRef.current = true;

    // Fire-and-forget view count increment via server function
    trackPostViewServerFn({ data: slug }).catch(() => {
      // Ignore view ping failures
    });
  }, [slug]);

  return null;
}
