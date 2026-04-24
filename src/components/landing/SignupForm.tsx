import { useState } from "react";
import { Check } from "lucide-react";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border hairline bg-success-muted/40 px-5 py-6 text-center">
        <div className="mx-auto h-9 w-9 rounded-full bg-success/15 flex items-center justify-center mb-3">
          <Check className="h-4 w-4 text-success-foreground" />
        </div>
        <div className="text-[15px] font-medium text-foreground mb-1">You're on the list.</div>
        <div className="text-[13px] text-muted-foreground">
          We'll send your invite to <span className="text-foreground">{email}</span> shortly.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="signup-email" className="sr-only">
          Work email
        </label>
        <input
          id="signup-email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          className="flex-1 h-10 rounded-md border hairline bg-background px-3.5 text-[14px] text-foreground placeholder:text-tertiary focus:outline-none focus:border-info/40 focus:ring-2 focus:ring-info/15 transition-colors"
        />
        <button
          type="submit"
          className="h-10 px-5 rounded-md bg-info-muted text-info-foreground border hairline border-info/20 text-[14px] font-medium hover:bg-info/15 transition-colors"
        >
          Start free
        </button>
      </div>
      {error ? (
        <p className="text-[12px] text-destructive pl-1">{error}</p>
      ) : (
        <p className="text-[12px] text-tertiary pl-1">
          No credit card. No setup call.
        </p>
      )}
    </form>
  );
}
