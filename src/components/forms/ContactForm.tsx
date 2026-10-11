"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/config/services";

// Drawn from the same services config as /services and the homepage, so this
// list can't drift out of sync with the real service names (it previously
// listed both "Digital Solutions" and "Digital Strategy" as separate options
// for what is actually one service).
const SERVICE_OPTIONS = [...services.map((service) => service.shortTitle), "Other"];

const BUDGET_OPTIONS = ["Under $100", "$100–$300", "$300–$500", "$500–$1,000", "$1,000+", "Not sure yet"];

const TIMELINE_OPTIONS = ["ASAP", "1–2 weeks", "2–4 weeks", "1–3 months", "Flexible"];

type FormState = {
  fullName: string;
  email: string;
  company: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
  website: string; // honeypot
};

const initialState: FormState = {
  fullName: "",
  email: "",
  company: "",
  service: "",
  description: "",
  budget: "",
  timeline: "",
  website: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldClass(hasError: boolean) {
  return `w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:ring-2 focus:ring-accent/40 ${
    hasError ? "border-red-600 dark:border-red-400" : "border-field-border focus:border-accent"
  }`;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!values.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!values.email.trim() || !EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.service) nextErrors.service = "Please select a service.";
    if (!values.description.trim() || values.description.trim().length < 10) {
      nextErrors.description = "Please describe the project in a bit more detail.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        if (data?.errors) setErrors(data.errors);
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initialState);
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-3 rounded-xl border border-border bg-surface p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent-text">
          <CheckCircle2 size={22} strokeWidth={1.75} />
        </span>
        <h3 className="text-h3 text-foreground">Request received.</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Thanks for reaching out — we&apos;ll review what you&apos;ve shared and get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-accent-text transition-opacity hover:opacity-80"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot field — visually hidden, real users never fill this in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            className={`mt-2 ${fieldClass(Boolean(errors.fullName))}`}
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName ? (
            <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`mt-2 ${fieldClass(Boolean(errors.email))}`}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="text-sm font-medium text-foreground">
            Company <span className="text-muted">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            className={`mt-2 ${fieldClass(false)}`}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="service" className="text-sm font-medium text-foreground">
            Service
          </label>
          <select
            id="service"
            className={`mt-2 ${fieldClass(Boolean(errors.service))}`}
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p id="service-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {errors.service}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Project Description
        </label>
        <textarea
          id="description"
          rows={5}
          className={`mt-2 ${fieldClass(Boolean(errors.description))}`}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        {errors.description ? (
          <p id="description-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
            {errors.description}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="text-sm font-medium text-foreground">
            Budget <span className="text-muted">(optional)</span>
          </label>
          <select
            id="budget"
            className={`mt-2 ${fieldClass(false)}`}
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="text-sm font-medium text-foreground">
            Timeline <span className="text-muted">(optional)</span>
          </label>
          <select
            id="timeline"
            className={`mt-2 ${fieldClass(false)}`}
            value={values.timeline}
            onChange={(e) => update("timeline", e.target.value)}
          >
            <option value="">Select a timeline</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-red-500/40 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          <AlertCircle size={16} strokeWidth={2} className="mt-0.5 shrink-0" />
          <p>
            {Object.keys(errors).length > 0
              ? "Please check the highlighted fields and try again."
              : "Something went wrong sending your request. Please try again, or reach us directly by email or WhatsApp."}
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : null}
        Send Project Request
      </button>
    </form>
  );
}
