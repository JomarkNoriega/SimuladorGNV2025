export async function callAppsScript(action, payload = {}) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GNV_SHARED_SECRET;

  if (!scriptUrl || !secret) {
    const error = new Error("La integración con Google Sheets aún no está configurada.");
    error.statusCode = 503;
    throw error;
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload, secret }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.ok === false) {
    const error = new Error(data.message || "Google Sheets rechazó la operación.");
    error.statusCode = data.statusCode || 502;
    error.code = data.code || "SHEETS_ERROR";
    throw error;
  }

  return data;
}
