/**
 * OWL Contact Form → Google Sheets + Gmail (Apps Script Web App)
 *
 * Setup:
 * 1) Create a Google Sheet (first row = headers).
 * 2) Extensions → Apps Script (bound to the sheet).
 * 3) Paste this file.
 * 4) Project Settings → Script Properties:
 *    - OWL_CONTACT_SECRET = <random long secret>
 *    - OWL_CONTACT_TO = info@owlintelligence.co.uk,beyzapolat@fwbm.com.tr,sayginalkurt@fwbm.com.tr
 * 5) Deploy → New deployment → Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone (or Anyone with link)
 * 6) Copy deployment URL into Railway env CONTACT_SHEETS_WEBAPP_URL
 *
 * Request:
 * - POST JSON body: { name, email, company, message, honeypot?, meta? }
 * - Header: X-OWL-Contact-Secret: <secret>
 */

const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_COMPANY = 200;
const MAX_MESSAGE = 4000;

function jsonResponse(code, payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getProp_(key) {
  return PropertiesService.getScriptProperties().getProperty(key) || "";
}

function normalize_(value) {
  return String(value || "").trim();
}

function validate_(payload) {
  const name = normalize_(payload.name);
  const email = normalize_(payload.email);
  const company = normalize_(payload.company);
  const message = normalize_(payload.message);

  if (!name || name.length > MAX_NAME) return { ok: false, error: "Invalid name" };
  if (!email || email.length > MAX_EMAIL || email.indexOf("@") === -1)
    return { ok: false, error: "Invalid email" };
  if (company.length > MAX_COMPANY) return { ok: false, error: "Invalid company" };
  if (!message || message.length > MAX_MESSAGE) return { ok: false, error: "Invalid message" };

  // Honeypot: if filled, treat as success but do nothing (spam)
  const honeypot = normalize_(payload.honeypot);
  if (honeypot) return { ok: true, spam: true, value: { name, email, company, message } };

  return { ok: true, spam: false, value: { name, email, company, message } };
}

function appendRow_(sheet, submission, meta) {
  const ts = new Date().toISOString();
  sheet.appendRow([
    ts,
    submission.name,
    submission.email,
    submission.company || "",
    submission.message,
    normalize_(meta && meta.userAgent),
    normalize_(meta && meta.ip),
    normalize_(meta && meta.locale),
  ]);
}

function sendEmail_(submission) {
  const to = getProp_("OWL_CONTACT_TO");
  if (!to) throw new Error("Missing OWL_CONTACT_TO script property");

  const subject = `New OWL contact enquiry from ${submission.name}`;
  const textBody =
    `New contact form submission\n\n` +
    `Name: ${submission.name}\n` +
    `Email: ${submission.email}\n` +
    `Institution / Company: ${submission.company || "Not provided"}\n\n` +
    `Message:\n${submission.message}\n`;

  MailApp.sendEmail({
    to,
    subject,
    body: textBody,
    replyTo: submission.email,
    name: "OWL Intelligence",
  });
}

function doPost(e) {
  try {
    const secretHeader =
      (e && e.parameter && e.parameter.secret) ||
      (e && e.headers && (e.headers["X-OWL-Contact-Secret"] || e.headers["x-owl-contact-secret"])) ||
      "";

    const expected = getProp_("OWL_CONTACT_SECRET");
    if (!expected) return jsonResponse(500, { error: "Server not configured" });
    if (String(secretHeader) !== String(expected))
      return jsonResponse(401, { error: "Unauthorized" });

    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const payload = JSON.parse(raw);

    const checked = validate_(payload);
    if (!checked.ok) return jsonResponse(400, { error: checked.error });
    if (checked.spam) return jsonResponse(200, { success: true });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];

    appendRow_(sheet, checked.value, payload.meta || {});
    sendEmail_(checked.value);

    return jsonResponse(200, { success: true });
  } catch (err) {
    return jsonResponse(500, { error: String(err && err.message ? err.message : err) });
  }
}

