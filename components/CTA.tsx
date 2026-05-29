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
          {submitted ? (
            <div className="text-center">
              <span className="label">Request received</span>
              <h2 className="text-h2-sm md:text-h2 text-ink-900">
                Thanks — we&apos;ve got your details.
              </h2>
              <p className="mt-3 text-body-lg text-ink-700">
                We&apos;ll look over what you sent and get back to you the same
                day, usually within a few hours.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3 rounded-md border border-green-200 bg-green-50 p-6 text-left">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-6 w-6 flex-none text-green-600"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.79 6.8-6.79a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-body font-semibold text-green-800">
                  Your request was sent. Can&apos;t wait to talk?{" "}
                  <a
                    href={site.contact.phoneHref}
                    className="text-orange-600 underline-offset-2 hover:underline"
                  >
                    Call {site.contact.phone}
                  </a>
                </p>
              </div>
            </div>
          ) : (
          <>
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
          </>
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
