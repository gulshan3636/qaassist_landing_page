const TEAM_SIZE_CUSTOM_FIELD_ID = "8jurtMJ3WzhKMfMftjcV";
const PAGE_SOURCE_CUSTOM_FIELD_ID = "VJ9oawyN8N2I8D8vNRRb";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  teamSize?: string;
  pageSource?: string;
};

function json(res: any, status: number, body: unknown) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(body));
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method Not Allowed" });
  }

  const apiKey = process.env.LEADCONNECTOR_API_KEY;
  const locationId = process.env.LEADCONNECTOR_LOCATION_ID;

  if (!apiKey || !locationId) {
    return json(res, 500, { error: "LeadConnector credentials are missing on the server." });
  }

  let body: LeadPayload = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return json(res, 400, { error: "Invalid JSON payload." });
  }
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const company = (body.company || "").trim();
  const teamSize = (body.teamSize || "").trim();
  const pageSource = (body.pageSource || "").trim() || "unknown";

  if (!name || !email || !phone) {
    return json(res, 400, { error: "name, email, and phone are required." });
  }

  const [firstName = "", ...restName] = name.split(/\s+/);
  const lastName = restName.join(" ");

  const customFields: Array<{ id: string; value: string }> = [
    { id: PAGE_SOURCE_CUSTOM_FIELD_ID, value: pageSource },
  ];

  if (teamSize) {
    customFields.push({ id: TEAM_SIZE_CUSTOM_FIELD_ID, value: teamSize });
  }

  const response = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify({
      locationId,
      name,
      firstName,
      lastName,
      email,
      phone,
      companyName: company,
      source: "QA Assist Landing Page",
      tags: ["qa-assist"],
      customFields,
    }),
  });

  if (!response.ok) {
    const details = (await response.text()).slice(0, 300);
    return json(res, response.status, {
      error: `LeadConnector request failed with ${response.status}${details ? `: ${details}` : ""}`,
    });
  }

  return json(res, 200, { ok: true });
}
