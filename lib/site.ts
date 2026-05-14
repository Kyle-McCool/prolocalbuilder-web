/**
 * Site-wide constants. Change these in one place.
 */
export const site = {
  name: "ProLocalBuilder",
  domain: "prolocalbuilder.com",
  tagline: "Websites for local businesses. $895 flat",
  description:
    "Affordable website design for local businesses. One-time flat fee from $895 — no monthly payments, no contracts. Done in a week. Serving Wisconsin, the Bay Area, and Las Vegas.",
  contact: {
    phone: "(408) 908-9940",
    phoneHref: "tel:+14089089940",
    email: "hello@prolocalbuilder.com",
    emailHref:
      "mailto:hello@prolocalbuilder.com?subject=Free%20quote%20for%20my%20business&body=Hi%2C%0A%0AMy%20business%3A%20%0AWhat%20I%20do%3A%20%0AMy%20current%20website%20(if%20any)%3A%20%0ATier%20I%27m%20interested%20in%3A%20%0A%0AThanks%2C",
  },
  serviceArea: "Wisconsin, Bay Area, and Las Vegas",
} as const;

export type TeamMember = {
  slug: "kyle" | "cesar" | "zac";
  firstName: string;
  title: string;
  location: string;
  metro: "appleton" | "san-jose" | "vegas";
  /** Set to "/team/<slug>.jpg" once the photo file is dropped into public/team/. */
  photoUrl: string | null;
  /**
   * Per-image CSS object-position value. Override when a source photo's
   * default-center crop chops the face — e.g. for a full-body shot,
   * "center top" anchors the head at the top of the square.
   */
  photoFocus?: string;
  /**
   * Scale factor applied to the image inside its square crop. >1 zooms
   * in (head bigger), <1 zooms out (head smaller). Used to normalize
   * head size across portraits with different source framing.
   */
  photoZoom?: number;
};

export const team: TeamMember[] = [
  {
    slug: "kyle",
    firstName: "Kyle",
    title: "Co-founder",
    location: "Appleton, WI",
    metro: "appleton",
    photoUrl: "https://api.makko.ai/storage/v1/object/public/collection-node-images/6f1edf47-be71-4c38-9203-26202e227b0a/087e818a-9fb7-4e49-b4d3-c02ac60305ea/1778560690568_Kyles_Headshot.png",
    // Shift focal point down slightly so the face sits lower in the square.
    photoFocus: "center 40%",
  },
  {
    slug: "cesar",
    firstName: "Cesar",
    title: "Co-founder",
    location: "San Jose, CA",
    metro: "san-jose",
    photoUrl: "https://api.makko.ai/storage/v1/object/public/collection-node-images/6f1edf47-be71-4c38-9203-26202e227b0a/087e818a-9fb7-4e49-b4d3-c02ac60305ea/1778553048255_Cesar_Headshot.png",
    // Full-body source — anchor at the top so the square crops to a
    // head-and-shoulders portrait instead of legs-and-torso.
    // Full-body source — zoom way in and anchor on the face (~25% from top).
    photoFocus: "center 12%",
    photoZoom: 2.03,
  },
  {
    slug: "zac",
    firstName: "Zac",
    title: "Co-founder",
    location: "Las Vegas, NV",
    metro: "vegas",
    photoUrl: "https://api.makko.ai/storage/v1/object/public/collection-node-images/6f1edf47-be71-4c38-9203-26202e227b0a/087e818a-9fb7-4e49-b4d3-c02ac60305ea/1778553904719_Zac_logo.png",
    // Default center works — already balanced head-and-shoulders.
  },
];

export function teamMemberByMetro(
  metro: "appleton" | "san-jose" | "vegas"
): TeamMember {
  const m = team.find((t) => t.metro === metro);
  if (!m) throw new Error(`No team member for metro: ${metro}`);
  return m;
}


export type Tier = {
  id: "starter" | "professional" | "premium";
  name: string;
  flatPrice: number;
  monthlyPrice: number;
  monthlyTerm: number;
  blurb: string;
  bestFor: string;
  features: string[];
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    flatPrice: 895,
    monthlyPrice: 69,
    monthlyTerm: 12,
    blurb: "flat fee · one-time",
    bestFor:
      "lawn care, cleaning, handymen, towing, restaurants, salons",
    features: [
      "5 pages: Home, About, Services, Reviews, Contact",
      "Tap-to-call button (one tap dials your phone)",
      "A short message form so people can reach you",
      "We keep your site online for a year",
      "Ready in 5–7 days",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    flatPrice: 1795,
    monthlyPrice: 139,
    monthlyTerm: 12,
    blurb: "flat fee · one-time",
    bestFor:
      "plumbers, electricians, chiropractors, vets, accountants, auto body",
    features: [
      "10 pages — a separate page for each service you offer",
      "Photo gallery (or before / after) so people see your work",
      "Tap-to-call and tap-to-text buttons",
      "A booking form people can fill out at midnight",
      "Show up when people search “[your job] near me”",
      "We keep your site online for a year",
      "Ready in 7–10 days",
    ],
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    flatPrice: 2995,
    monthlyPrice: 229,
    monthlyTerm: 12,
    blurb: "flat fee · one-time",
    bestFor:
      "dentists, lawyers, med spas, contractors with multiple locations",
    features: [
      "15 pages — including a page for each city or neighborhood you serve",
      "Booking form with date and time picker",
      "Reviews page that pulls together what customers say",
      "Full “near me” search setup — we handle Google Business Profile for you",
      "3 hours of free edits in your first year (phone change, new photo, etc.)",
      "We keep your site online for a year",
      "Ready in 10–14 days",
    ],
  },
];

export const faqs = [
  {
    q: "Do I own the site after?",
    a: "Yes. After the flat fee is paid, the site, the domain, and the code are yours. If you ever want to take it to another developer, you can.",
  },
  {
    q: "What if I already have a domain?",
    a: "No problem. We can use your existing domain. If you don't have one, we'll register it for you (cost passed through, usually $12–20/yr).",
  },
  {
    q: "What about hosting after year 1?",
    a: "$25/mo gets you hosting + small edits (changing a phone number, swapping a photo, etc.). Or you can self-host on Cloudflare Pages or GitHub Pages for free. We'll show you how.",
  },
  {
    q: "Can you redo my existing site?",
    a: "Yes. Most of our work is replacing 10-year-old WordPress sites that nobody can edit. Send us your current site URL with the quote request and we'll quote a redesign.",
  },
  {
    q: "Do you do e-commerce / online stores?",
    a: "Not yet. We focus on local service businesses where the website's job is to make the phone ring. If you need to sell products online, Shopify or Squarespace will serve you better.",
  },
  {
    q: "What if I don't like the result?",
    a: "You only paid 50% upfront. If you genuinely hate it, you walk away. You don't pay the second half. I keep the deposit for the work done. This has not happened yet, but the option is there.",
  },
  {
    q: "Are you using AI to build these?",
    a: "Sort of. I use modern AI tools to write code faster, the same way most developers do in 2026. But every site is reviewed, customized, and finished by hand. The end result is a real, hand-tuned site, not a template that AI spat out.",
  },
  {
    q: "Where are you based?",
    a: "Three of us across three metros: Appleton, WI (Fox Valley region — Appleton, Green Bay, Oshkosh, Sheboygan), San Jose, CA (San Francisco Bay Area), and Las Vegas, NV (Henderson, Summerlin, the broader valley). If you're somewhere else and like the look of this site, reach out anyway. We work remotely.",
  },
];

export const processSteps = [
  {
    num: "01",
    title: "Free quote",
    body:
      "You tell me about your business. I confirm the tier and quote you a fixed price. No hourly rates. No surprises.",
  },
  {
    num: "02",
    title: "50% deposit",
    body:
      "I start once you pay half. The other half is due at launch. If you hate the result, you don't pay the second half.",
  },
  {
    num: "03",
    title: "Build + review",
    body:
      "I build the site. You get a preview link. We do up to 2 rounds of revisions to get it right.",
  },
  {
    num: "04",
    title: "Launch",
    body:
      "Site goes live on your domain. I hand you the keys. You own it. Done.",
  },
];

export function formatPrice(n: number): string {
  return n.toLocaleString("en-US");
}
