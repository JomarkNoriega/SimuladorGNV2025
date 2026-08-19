import { verifySessionToken } from "../lib/security.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido." });
  }

  const token = String(req.body?.sessionToken || "");
  const session = verifySessionToken(token);

  if (!session) {
    return res.status(401).json({
      ok: false,
      message: "La sesión expiró o no es válida.",
    });
  }

  return res.status(200).json({
    ok: true,
    dni: session.dni,
    exp: session.exp,
  });
}
