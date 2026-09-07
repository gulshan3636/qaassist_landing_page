import { useState } from "react";
import type { PostFaq } from "@/lib/blog";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqAccordion({ faqs }: { faqs: PostFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-12 pt-8 border-t hairline">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <HelpCircle className="h-4 w-4" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground font-display">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-xl border hairline bg-card/60 backdrop-blur-sm overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-medium text-foreground hover:bg-secondary/40 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-[15px] font-medium leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-[14px] leading-relaxed text-muted-foreground border-t hairline bg-secondary/10">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
