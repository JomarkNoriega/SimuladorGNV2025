import { callAppsScript } from "../lib/sheets.js";
import {
  createSessionToken,
  safeCompareText,
  verifyPassword,
} from "../lib/security.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido." });
  }

  const dni = String(req.body?.dni || "").trim();
  const clave = String(req.body?.clave || "");

  if (!/^\d{8}$/.test(dni)) {
    return res.status(400).json({
      message: "El DNI del usuario debe contener exactamente 8 dígitos.",
    });
  }

  if (!clave) {
    return res.status(400).json({ message: "Ingrese la clave del usuario." });
  }

  try {
    const userData = await callAppsScript("obtenerUsuario", { dni });
    const user = userData.usuario;

    if (!user || String(user.activo).toUpperCase() !== "SI") {
      return res.status(403).json({ message: "El usuario no está autorizado." });
    }

    if (String(user.bloqueado).toUpperCase() === "SI") {
      return res.status(423).json({
        message: "El usuario se encuentra bloqueado. Solicite el desbloqueo al administrador.",
      });
    }

    let passwordOk = false;
    let initialPassword = false;

    if (user.claveHash) {
      passwordOk = verifyPassword(clave, user.claveHash);
    } else {
      const configuredInitialPassword = process.env.GNV_INITIAL_PASSWORD || "";
      if (!configuredInitialPassword) {
        return res.status(503).json({
          message: "La clave inicial de usuarios aún no está configurada.",
        });
      }
      passwordOk = safeCompareText(clave, configuredInitialPassword);
      initialPassword = passwordOk;
    }

    if (!passwordOk) {
      await callAppsScript("registrarIntentoFallido", { dni }).catch(() => null);
      return res.status(401).json({ message: "DNI o clave incorrectos." });
    }

    await callAppsScript("reiniciarIntentosFallidos", { dni }).catch(() => null);

    const forceChange =
      initialPassword ||
      String(user.forzarCambioClave).toUpperCase() === "SI" ||
      Boolean(user.claveVencida);

    if (forceChange) {
      return res.status(200).json({
        valid: true,
        forceChange: true,
        reason: initialPassword ? "INITIAL" : user.claveVencida ? "EXPIRED" : "FORCED",
        consultasRestantes: user.consultasRestantes,
      });
    }

    const limitReached =
      Number.isFinite(Number(user.limiteDiario)) &&
      Number(user.consultasHoy) >= Number(user.limiteDiario);

    if (limitReached) {
      return res.status(429).json({
        message: "Ha alcanzado el máximo de consultas permitidas para hoy.",
      });
    }

    const token = createSessionToken(dni);
    return res.status(200).json({
      valid: true,
      forceChange: false,
      token,
      consultasRestantes: user.consultasRestantes,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "No fue posible validar al usuario.",
    });
  }
}
