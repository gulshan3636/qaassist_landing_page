import { useState } from "react";
import { Check } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  teamSize: string;
};

export function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    teamSize: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (error) setError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone } = formData;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    const hasRequiredFields = trimmedName && trimmedEmail && trimmedPhone;
    const isNameValid = /^[A-Za-z][A-Za-z\s'.-]{1,49}$/.test(trimmedName);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    const isPhoneFormatValid = /^[+]?[\d\s()-]{7,20}$/.test(trimmedPhone);
    const phoneDigits = trimmedPhone.replace(/\D/g, "");
    const isPhoneDigitsValid = phoneDigits.length >= 10 && phoneDigits.length <= 15;

    if (!hasRequiredFields) {
      setError("Please fill out Full Name, Email, and Contact Number.");
      return;
    }

    if (!isNameValid) {
      setError("Please enter a valid full name.");
      return;
    }

    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isPhoneFormatValid || !isPhoneDigitsValid) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          company: formData.company,
          teamSize: formData.teamSize,
          pageSource: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!response.ok) {
        throw new Error("Lead submission failed.");
      }

      setSubmitted(true);
    } catch {
      setError("Could not submit right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border hairline bg-success-muted/40 px-5 py-6 text-center">
        <div className="mx-auto h-9 w-9 rounded-full bg-success/15 flex items-center justify-center mb-3">
          <Check className="h-4 w-4 text-success-foreground" />
        </div>
        <div className="text-[15px] font-medium text-foreground mb-1">You're on the list.</div>
        <div className="text-[13px] text-muted-foreground">
          We'll send your invite to <span className="text-foreground">{formData.email}</span> shortly.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label htmlFor="signup-name" className="block text-[13px] font-medium text-foreground">
            Full Name
          </label>
          <input
            id="signup-name"
            type="text"
            required
            minLength={2}
            maxLength={50}
            pattern="[A-Za-z][A-Za-z\s'.-]{1,49}"
            title="Enter a valid full name (letters and spaces only)."
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full h-10 rounded-md border hairline bg-background px-3.5 text-[14px] text-foreground placeholder:text-tertiary focus:outline-none focus:border-info/40 focus:ring-2 focus:ring-info/15 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="signup-email" className="block text-[13px] font-medium text-foreground">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            required
            maxLength={100}
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full h-10 rounded-md border hairline bg-background px-3.5 text-[14px] text-foreground placeholder:text-tertiary focus:outline-none focus:border-info/40 focus:ring-2 focus:ring-info/15 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="signup-phone" className="block text-[13px] font-medium text-foreground">
            Contact Number
          </label>
          <input
            id="signup-phone"
            type="tel"
            required
            inputMode="tel"
            minLength={7}
            maxLength={20}
            pattern="[0-9+()\s-]{7,20}"
            title="Enter a valid contact number."
            placeholder="Enter contact number"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full h-10 rounded-md border hairline bg-background px-3.5 text-[14px] text-foreground placeholder:text-tertiary focus:outline-none focus:border-info/40 focus:ring-2 focus:ring-info/15 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="signup-company" className="block text-[13px] font-medium text-foreground">
            Company
          </label>
          <input
            id="signup-company"
            type="text"
            placeholder="Enter company name"
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            className="w-full h-10 rounded-md border hairline bg-background px-3.5 text-[14px] text-foreground placeholder:text-tertiary focus:outline-none focus:border-info/40 focus:ring-2 focus:ring-info/15 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="signup-team-size" className="block text-[13px] font-medium text-foreground">
            Team Size
          </label>
          <select
            id="signup-team-size"
            value={formData.teamSize}
            onChange={(e) => updateField("teamSize", e.target.value)}
            className="w-full h-10 rounded-md border hairline bg-background px-3.5 text-[14px] text-foreground focus:outline-none focus:border-info/40 focus:ring-2 focus:ring-info/15 transition-colors"
          >
            <option value="" disabled>
              Select team size
            </option>
            <option value="1-5">1-5</option>
            <option value="6-20">6-20</option>
            <option value="21-50">21-50</option>
            <option value="51-200">51-200</option>
            <option value="200+">200+</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 px-5 rounded-md bg-info-muted text-info-foreground border hairline border-info/20 text-[14px] font-medium hover:bg-info/15 transition-colors"
      >
        {isSubmitting ? "Submitting..." : "Get early access"}
      </button>

      {error ? (
        <p className="text-[12px] text-destructive pl-1">{error}</p>
      ) : (
        <p className="text-[12px] text-tertiary"></p>
      )}
    </form>
  );
}
