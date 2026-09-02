import { callAppsScript } from "../lib/sheets.js";
import { verifySessionToken } from "../lib/security.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido." });
  }

  const token = String(req.body?.sessionToken || "");
  const session = verifySessionToken(token);

  if (!session) {
    return res.status(401).json({
      message: "La sesión expiró o no es válida. Vuelva a validar su usuario.",
    });
  }

  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : String(forwarded || req.socket?.remoteAddress || "").split(",")[0].trim();

  const payload = {
    ...req.body,
    dniUsuario: session.dni,
    sessionToken: undefined,
    idConsulta:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    fechaHora: new Date().toISOString(),
    ip,
    userAgent: req.headers["user-agent"] || "",
  };

  if (!["Campo", "Agencia", "Base", "Referido"].includes(String(payload.origenConsulta || ""))) {
    return res.status(400).json({ message: "Seleccione un origen de consulta válido." });
  }

  try {
    const data = await callAppsScript("registrarConsulta", payload);
    return res.status(200).json({
      ok: true,
      idConsulta: payload.idConsulta,
      consultasRestantes: data.consultasRestantes,
    });
  } catch (error) {
    if (error.code === "DAILY_LIMIT") {
      return res.status(429).json({
        message: "Ha alcanzado el máximo de consultas permitidas para hoy.",
      });
    }
    return res.status(error.statusCode || 502).json({
      message: error.message || "No fue posible registrar la consulta.",
    });
  }
}
