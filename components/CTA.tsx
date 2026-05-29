"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Free-quote section. Posts to our /api/quote route, which emails the lead
 * to our inbox via Resend (see app/api/quote/route.ts).
 * Honeypot field for basic spam protection.
 */
export function CTA() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: hidden field that humans never fill but bots do.
    if (data.get("company_url")) {
      setSubmitting(true);
      setTimeout(() => setSubmitting(false), 1500);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setError("Something went wrong. Please try again or call us.");
      }
    } catch {
      setError("Network error. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="quote"
      className="bg-white py-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24"
    >
      <div className="container-narrow">
        <div className="rounded-lg border border-ink-200 bg-white p-8 shadow-card-hover sm:p-10 md:p-12">
          <span className="label">Free quote</span>
          <h2 className="text-h2-sm md:text-h2 text-ink-900">
            Tell us about your business.
          </h2>
          <p className="mt-3 text-body-lg text-ink-700">
            Send us the basics and we'll come back the same day with a quote
            and a few questions. Prefer phone?{" "}
            <a
              href={site.contact.phoneHref}
              aria-label={`Call ${site.contact.phone}`}
              className="font-semibold text-orange-500 underline-offset-2 hover:underline"
            >
              Call {site.contact.phone}
            </a>
            .
          </p>

          {submitted ? (
            <div className="mt-8 rounded-md border border-green-200 bg-green-50 p-6 text-center">
              <p className="text-lg font-semibold text-green-800">
                Got it — we&apos;ll be in touch soon.
              </p>
              <p className="mt-2 text-body text-green-700">
                Most quotes go out the same day. Can&apos;t wait?{" "}
                <a
                  href={site.contact.phoneHref}
                  className="font-semibold text-orange-500 underline-offset-2 hover:underline"
                >
                  Call {site.contact.phone}
                </a>
              </p>
            </div>
          ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-5 text-left sm:grid-cols-2"
          >
            {/* Honeypot: bots fill every field, humans never see this. */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              style={{ position: "absolute" }}
            >
              <label htmlFor="company_url">
                Don&apos;t fill this in if you&apos;re human
              </label>
              <input
                id="company_url"
                name="company_url"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <Field
              id="quote-name"
              name="name"
              label="Your name"
              required
              autoComplete="name"
            />
            <Field
              id="quote-email"
              name="email"
              label="Email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
            <Field
              id="quote-business"
              name="business"
              label="Business name"
              required
              autoComplete="organization"
            />
            <Field
              id="quote-city"
              name="city"
              label="City"
              required
              autoComplete="address-level2"
              placeholder="e.g. Appleton, WI"
            />
            <Field
              id="quote-phone"
              name="phone"
              label="Phone"
              type="tel"
              autoComplete="tel"
              placeholder="optional"
            />
            <div className="sm:col-span-2">
              <label
                htmlFor="quote-details"
                className="mb-1.5 block text-body-sm font-semibold text-ink-900"
              >
                What kind of site do you need?
              </label>
              <textarea
                id="quote-details"
                name="details"
                rows={4}
                placeholder="A few sentences. Industry, what you do, anything specific."
                className="w-full rounded-md border border-ink-200 bg-white px-4 py-3 text-body text-ink-900 placeholder:text-ink-400 transition-colors duration-200 focus-visible:border-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg btn-block disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send my quote request"}
              </button>
              {error && (
                <p className="mt-3 text-body-sm font-medium text-red-600">
                  {error}
                </p>
              )}
              <p className="mt-3 text-body-sm text-ink-700">
                Most quotes go out the same day. Prefer phone?{" "}
                <a
                  href={site.contact.phoneHref}
                  aria-label={`Call ${site.contact.phone}`}
                  className="font-semibold text-orange-500 underline-offset-2 hover:underline"
                >
                  Call {site.contact.phone}
                </a>
              </p>
            </div>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
};

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-body-sm font-semibold text-ink-900"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-orange-500">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required || undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-md border border-ink-200 bg-white px-4 py-3 text-body text-ink-900 placeholder:text-ink-400 transition-colors duration-200 focus-visible:border-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
      />
    </div>
  );
}
