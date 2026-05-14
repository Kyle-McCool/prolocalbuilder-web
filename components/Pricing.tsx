import Link from "next/link";
import { tiers, formatPrice, type Tier } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Pricing() {
  return (
    <section id="pricing" className="section bg-white">
      <div className="container-page">
        <div className="mx-auto mb-12 max-w-[720px] text-center md:mb-16">
          <span className="label">Pricing</span>
          <h2 className="text-h2-sm md:text-h2 text-ink-900">
            One-time price. Yours forever.
          </h2>
          <p className="mt-3 text-body-lg text-ink-700">
            Pick the tier that fits your business. Pay once, own the site.
            Optional $25/mo if you want us to host and handle small updates.
          </p>
          <p className="mt-3 text-body-sm text-ink-700">
            Every site works perfectly on phones. That's the baseline — not a
            feature we charge extra for.
          </p>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.id} delay={i * 80} className="h-full">
              <PricingCard tier={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={[
        "relative flex h-full flex-col rounded-lg border bg-white p-9 transition-shadow duration-200",
        tier.featured
          ? "border-2 border-orange-500 shadow-featured hover:shadow-[0_8px_20px_rgba(242,107,31,0.18)]"
          : "border-ink-200 shadow-card hover:shadow-card-hover hover:border-ink-300",
      ].join(" ")}
    >
      {tier.featured && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 rounded-t-md bg-orange-500"
          />
          <span className="absolute -top-3.5 left-8 rounded-sm bg-orange-500 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-white">
            Most popular
          </span>
        </>
      )}

      <div
        className={[
          "text-label uppercase",
          tier.featured ? "text-orange-500" : "text-navy-800",
        ].join(" ")}
      >
        {tier.name}
      </div>

      <div className="mt-3 flex items-baseline gap-1 font-mono leading-none">
        <span className="text-[36px] font-semibold text-navy-800">$</span>
        <span className="text-price-lg font-bold text-navy-800">
          {formatPrice(tier.flatPrice)}
        </span>
      </div>
      <div className="mt-1.5 text-body-sm text-ink-700">{tier.blurb}</div>

      <ul className="mt-6 mb-5 flex-1 list-none">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2.5 border-b border-ink-100 py-2 text-body-sm text-ink-700 last:border-b-0"
          >
            <span
              className="text-success font-bold flex-shrink-0"
              aria-hidden="true"
            >
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      <p className="mb-5 text-body-sm leading-snug text-ink-700">
        <span className="font-semibold">Best for:</span> {tier.bestFor}
      </p>

      <div className="mt-auto">
        <Link
          href="/#quote"
          className={[
            "btn btn-block",
            tier.featured ? "btn-primary" : "btn-secondary",
          ].join(" ")}
        >
          Get a {tier.name} quote
        </Link>

        <p className="mt-4 border-t border-ink-100 pt-4 text-center text-body-sm text-ink-700">
          or{" "}
          <span className="font-mono font-semibold text-ink-900">
            ${tier.monthlyPrice}/mo
          </span>{" "}
          · {tier.monthlyTerm} months · then it's yours
        </p>
      </div>
    </div>
  );
}
