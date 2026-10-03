import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

type ContactPayload = {
  fullName: string;
  email: string;
  company?: string;
  service: string;
  description: string;
  budget?: string;
  timeline?: string;
  /** Honeypot field — real users never fill this in */
  website?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SHORT = 200;
const MAX_LONG = 4000;

function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

/** Escapes user-supplied text before it's interpolated into the HTML email body,
 * so a submission can never inject markup/links into the notification email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Submission = {
  fullName: string;
  email: string;
  company: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
  receivedAt: string;
};

function buildPlainTextEmail(s: Submission): string {
  return [
    `New project request from the ${siteConfig.name} website`,
    "",
    `Name: ${s.fullName}`,
    `Email: ${s.email}`,
    s.company ? `Company: ${s.company}` : null,
    `Service: ${s.service}`,
    s.budget ? `Budget: ${s.budget}` : null,
    s.timeline ? `Timeline: ${s.timeline}` : null,
    "",
    "Project description:",
    s.description,
    "",
    `Received: ${s.receivedAt}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function buildHtmlEmail(s: Submission): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:4px 12px 4px 0;color:#565d66;white-space:nowrap;vertical-align:top;">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;color:#0a0d12;">${escapeHtml(value)}</td></tr>`
      : "";

  return `<div style="font-family:-apple-system,Segoe UI,Inter,Arial,sans-serif;color:#0a0d12;max-width:560px;">
    <h2 style="margin:0 0 16px;font-size:18px;">New project request — ${escapeHtml(siteConfig.name)}</h2>
    <table style="border-collapse:collapse;font-size:14px;margin-bottom:16px;">
      ${row("Name", s.fullName)}
      ${row("Email", s.email)}
      ${row("Company", s.company)}
      ${row("Service", s.service)}
      ${row("Budget", s.budget)}
      ${row("Timeline", s.timeline)}
    </table>
    <p style="font-size:14px;color:#565d66;margin:0 0 4px;">Project description</p>
    <p style="font-size:14px;white-space:pre-wrap;border-left:2px solid #e3e4e1;padding-left:12px;margin:0 0 16px;">${escapeHtml(
      s.description,
    )}</p>
    <p style="font-size:12px;color:#8a92a0;">Received ${escapeHtml(s.receivedAt)}</p>
  </div>`;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — silently accept but do nothing further, so bots get a convincing
  // "success" response and never learn the field is a trap.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const fullName = sanitize(body.fullName, MAX_SHORT);
  const email = sanitize(body.email, MAX_SHORT);
  const company = sanitize(body.company, MAX_SHORT);
  const service = sanitize(body.service, MAX_SHORT);
  const description = sanitize(body.description, MAX_LONG);
  const budget = sanitize(body.budget, MAX_SHORT);
  const timeline = sanitize(body.timeline, MAX_SHORT);

  const errors: Record<string, string> = {};
  if (!fullName) errors.fullName = "Full name is required.";
  if (!email || !EMAIL_PATTERN.test(email)) errors.email = "A valid email is required.";
  if (!service) errors.service = "Please select a service.";
  if (!description || description.length < 10) errors.description = "Please describe the project (at least 10 characters).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const submission: Submission = {
    fullName,
    email,
    company,
    service,
    description,
    budget,
    timeline,
    receivedAt: new Date().toISOString(),
  };

  // RESEND_API_KEY and CONTACT_FROM_EMAIL are read directly from process.env here,
  // server-side only — they are never imported into a "use client" component and
  // have no NEXT_PUBLIC_ prefix, so Next.js never inlines them into the browser bundle.
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX_EMAIL;

  if (!apiKey || !inbox) {
    // No email provider configured yet. Log server-side so nothing submitted during
    // development is silently lost, but be honest with the client about what
    // actually happened rather than claiming an email was sent.
    console.log("[contact] RESEND_API_KEY / CONTACT_INBOX_EMAIL not set — submission logged only:", submission);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const fromAddress = process.env.CONTACT_FROM_EMAIL || "ZAIMEX Website <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: inbox,
      replyTo: email,
      subject: `New project request from ${fullName}`,
      text: buildPlainTextEmail(submission),
      html: buildHtmlEmail(submission),
    });

    if (error) {
      console.error("[contact] Resend rejected the email:", error);
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't send your request right now. Please try again, or reach us directly by email or WhatsApp.",
        },
        { status: 502 },
      );
    }
  } catch (err) {
    // Network failure, invalid key, Resend outage, etc. — never let this bubble up
    // as an unhandled 500, and never report success for a message that didn't send.
    console.error("[contact] Unexpected error sending email via Resend:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't send your request right now. Please try again, or reach us directly by email or WhatsApp.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
