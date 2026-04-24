import { createAPIFileRoute } from "@tanstack/react-start/api";

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

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const APIRoute = createAPIFileRoute("/api/submit-lead")({
  POST: async ({ request }) => {
    const apiKey = process.env.LEADCONNECTOR_API_KEY;
    const locationId = process.env.LEADCONNECTOR_LOCATION_ID;

    if (!apiKey || !locationId) {
      return json(500, { error: "LeadConnector credentials are missing on the server." });
    }

    let body: LeadPayload = {};
    try {
      body = await request.json();
    } catch {
      return json(400, { error: "Invalid JSON payload." });
    }

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const company = (body.company || "").trim();
    const teamSize = (body.teamSize || "").trim();
    const pageSource = (body.pageSource || "").trim() || "unknown";

    if (!name || !email || !phone) {
      return json(400, { error: "name, email, and phone are required." });
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
      return json(response.status, {
        error: `LeadConnector request failed with ${response.status}${details ? `: ${details}` : ""}`,
      });
    }

    return json(200, { ok: true });
  },
});
