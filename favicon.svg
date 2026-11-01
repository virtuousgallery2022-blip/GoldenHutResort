const crypto = require("node:crypto");

const json = (statusCode, body) => ({
  statusCode,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  body: JSON.stringify(body)
});

const clean = (value, max) => typeof value === "string" ? value.trim().replace(/[<>]/g, "").slice(0, max) : "";
const allowed = (value, values) => values.includes(value) ? value : null;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { ok: false, error: "Method not allowed." });

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RATE_LIMIT_SALT } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !RATE_LIMIT_SALT) return json(500, { ok: false, error: "The enquiry service is not configured yet." });

  let input;
  try { input = JSON.parse(event.body || "{}"); } catch { return json(400, { ok: false, error: "Please send a valid form." }); }

  // Honeypot: silently accept obvious bot submissions without storing them.
  if (clean(input.website, 80)) return json(200, { ok: true });

  const name = clean(input.name, 100);
  const phone = clean(input.phone, 30);
  const email = clean(input.email, 160) || null;
  const message = clean(input.message, 2000) || null;
  const arrivalDate = clean(input.arrival, 10) || null;
  const nights = allowed(clean(input.nights, 20), ["1 night", "2 nights", "3 nights", "4+ nights"]);
  const guests = allowed(clean(input.guests, 20), ["1 guest", "2 guests", "3–4 guests", "5+ guests"]);
  const tripType = allowed(clean(input.trip, 40), ["Wildlife safari", "Family vacation", "Pool retreat", "Celebration or group stay"]);
  if (name.length < 2 || phone.length < 7 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || (arrivalDate && !/^\d{4}-\d{2}-\d{2}$/.test(arrivalDate))) return json(400, { ok: false, error: "Please check your name, phone, email and date." });

  const ip = (event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  const ipHash = crypto.createHash("sha256").update(`${RATE_LIMIT_SALT}:${ip}`).digest("hex");
  const windowMinutes = Math.max(1, Number(process.env.RATE_LIMIT_WINDOW_MINUTES || 60));
  const maxRequests = Math.max(1, Number(process.env.RATE_LIMIT_MAX || 5));
  const since = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();
  const base = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/contact_inquiries`;
  const headers = { apikey: SUPABASE_SERVICE_ROLE_KEY, authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` };

  const recentResponse = await fetch(`${base}?select=id&ip_hash=eq.${encodeURIComponent(ipHash)}&created_at=gte.${encodeURIComponent(since)}`, { headers });
  if (!recentResponse.ok) return json(500, { ok: false, error: "We could not check the enquiry limit. Please call the resort." });
  const recent = await recentResponse.json();
  if (Array.isArray(recent) && recent.length >= maxRequests) return json(429, { ok: false, error: "Please wait a little before sending another enquiry." });

  const insertResponse = await fetch(base, {
    method: "POST",
    headers: { ...headers, "content-type": "application/json", prefer: "return=minimal" },
    body: JSON.stringify({ name, phone, email, arrival_date: arrivalDate, nights, guests, trip_type: tripType, message, ip_hash: ipHash, user_agent: clean(event.headers["user-agent"], 300) || null })
  });
  if (!insertResponse.ok) return json(500, { ok: false, error: "We could not save your enquiry. Please call or WhatsApp the resort." });
  return json(201, { ok: true, message: "Thank you. Your enquiry has been sent." });
};
