import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * Quote-request handler. Receives the form POST from <CTA />, validates it,
 * and emails the lead to our inbox via Resend.
 *
 * The Resend API key is server-only — it must never reach the browser, which
 * is exactly why this lives in a Route Handler and not in the client form.
 *
 * Required env var: RESEND_API_KEY
 * Optional env var: QUOTE_FROM_EMAIL (defaults below; must be on a Resend-
 *   verified domain). QUOTE_TO_EMAIL (defaults to site.contact.email).
 */

// "From" must be an address on a domain verified in Resend. The mailbox
// itself doesn't need to exist — Resend only checks the domain.
const FROM_EMAIL =
  process.env.QUOTE_FROM_EMAIL ?? "ProLocalBuilder <quotes@prolocalbuilder.com>";
const TO_EMAIL = process.env.QUOTE_TO_EMAIL ?? site.contact.email;

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Misconfiguration — log loudly server-side, tell the user to call.
    console.error("RESEND_API_KEY is not set; cannot send quote request.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // Honeypot: a hidden field humans never see. If it's filled, it's a bot —
  // pretend success so the bot moves on, but send nothing.
  if (form.get("company_url")) {
    return NextResponse.json({ ok: true });
  }

  const name = str(form.get("name"));
  const email = str(form.get("email"));
  const business = str(form.get("business"));
  const city = str(form.get("city"));
  const phone = str(form.get("phone"));
  const details = str(form.get("details"));

  // Mirror the form's required fields.
  if (!name || !email || !business || !city) {
    return NextResponse.json(
      { error: "Please fill in your name, email, business, and city." },
      { status: 400 }
    );
  }

  // Basic shape check — the browser validates type="email", but bots skip it.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  const subject = `New quote request — ${business} (${city})`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${business}`,
    `City: ${city}`,
    `Phone: ${phone || "—"}`,
    "",
    "What kind of site do they need?",
    details || "—",
  ];

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      // Replying in your inbox goes straight to the lead.
      replyTo: email,
      subject,
      text: lines.join("\n"),
      html: renderHtml({ name, email, business, city, phone, details }),
    });

    if (error) {
      console.error("Resend send failed:", error);
      return NextResponse.json(
        { error: "Could not send your request. Please call us." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending quote request:", err);
    return NextResponse.json(
      { error: "Could not send your request. Please call us." },
      { status: 500 }
    );
  }
}

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

function renderHtml(d: {
  name: string;
  email: string;
  business: string;
  city: string;
  phone: string;
  details: string;
}): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;font-weight:600;white-space:nowrap;">${esc(
      label
    )}</td><td style="padding:4px 0;color:#111827;">${esc(value || "—")}</td></tr>`;

  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#111827;">
  <h2 style="margin:0 0 16px;font-size:18px;">New quote request</h2>
  <table style="border-collapse:collapse;font-size:14px;">
    ${row("Name", d.name)}
    ${row("Email", d.email)}
    ${row("Business", d.business)}
    ${row("City", d.city)}
    ${row("Phone", d.phone)}
  </table>
  <p style="margin:16px 0 4px;color:#6b7280;font-weight:600;font-size:14px;">What kind of site do they need?</p>
  <p style="margin:0;font-size:14px;white-space:pre-wrap;">${esc(d.details || "—")}</p>
</div>`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
