import { Resend } from "@convex-dev/resend"
import { components } from "./_generated/api"
import type { Doc } from "./_generated/dataModel"
import type { MutationCtx } from "./_generated/server"

export const resend: Resend = new Resend(components.resend, { testMode: false })

const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:14px 0;border-top:1px solid #dedfe2;width:160px;vertical-align:top;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8b8e96">${label}</td>
    <td style="padding:14px 0;border-top:1px solid #dedfe2;vertical-align:top;font-size:15px;line-height:1.6;color:#0d132d;white-space:pre-wrap">${value ? escape(value) : "&mdash;"}</td>
  </tr>`

/**
 * Queue a notification for a new contact submission. Recipients come from the
 * deployment's CONTACT_NOTIFY_EMAILS, so dev and prod can notify different inboxes.
 */
export async function sendContactNotification(ctx: MutationCtx, contact: Doc<"contacts">) {
  const to = (process.env.CONTACT_NOTIFY_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean)

  if (!to.length || !process.env.RESEND_API_KEY) {
    console.warn("Contact notification skipped: set RESEND_API_KEY and CONTACT_NOTIFY_EMAILS.")
    return
  }

  const name = `${contact.firstName} ${contact.lastName}`.trim()
  const siteUrl = (process.env.SITE_URL ?? "https://www.harkcon.com").replace(/\/$/, "")

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f4f3f0;font-family:Helvetica,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff">
      <tr>
        <td style="padding:28px 32px;background:#0d132d;color:#ffffff">
          <p style="margin:0;font-size:11px;letter-spacing:0.19em;text-transform:uppercase;color:#ffb612">New inquiry</p>
          <h1 style="margin:10px 0 0;font-size:22px;line-height:1.25;font-weight:600">${escape(name)}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 32px 32px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Email", contact.email)}
            ${row("Organization", contact.organization)}
            ${row("Topics", contact.interests.join(", "))}
            ${row("Heard via", contact.referral)}
            ${row("Message", contact.message)}
          </table>
          <p style="margin:28px 0 0">
            <a href="${siteUrl}/admin" style="display:inline-block;padding:11px 20px;background:#0d132d;color:#ffffff;font-size:14px;text-decoration:none">Open in admin</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`

  const text = [
    `New inquiry from ${name}`,
    "",
    `Email: ${contact.email}`,
    `Organization: ${contact.organization || "-"}`,
    `Topics: ${contact.interests.join(", ") || "-"}`,
    `Heard via: ${contact.referral || "-"}`,
    "",
    contact.message,
    "",
    `${siteUrl}/admin`,
  ].join("\n")

  await resend.sendEmail(ctx, {
    from: process.env.CONTACT_FROM_EMAIL ?? "Harkcon Website <onboarding@resend.dev>",
    to,
    replyTo: [contact.email],
    subject: `New inquiry from ${name}${contact.organization ? `, ${contact.organization}` : ""}`,
    html,
    text,
    idempotencyKey: `contact:${contact._id}`,
  })
}
