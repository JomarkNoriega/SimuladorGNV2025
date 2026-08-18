import { callAppsScript } from "../lib/sheets.js";
import {
  createSessionToken,
  hashPassword,
  safeCompareText,
  validatePasswordPolicy,
  verifyPassword,
} from "../lib/security.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido." });
  }

  const dni = String(req.body?.dni || "").trim();
  const claveActual = String(req.body?.claveActual || "");
  const nuevaClave = String(req.body?.nuevaClave || "");

  if (!/^\d{8}$/.test(dni)) {
    return res.status(400).json({ message: "DNI de usuario inválido." });
  }

  const policyError = validatePasswordPolicy(nuevaClave);
  if (policyError) return res.status(400).json({ message: policyError });

  if (claveActual === nuevaClave) {
    return res.status(400).json({
      message: "La nueva clave debe ser diferente de la clave actual.",
    });
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

    let currentOk = false;
    if (user.claveHash) {
      currentOk = verifyPassword(claveActual, user.claveHash);
    } else {
      const configuredInitialPassword = process.env.GNV_INITIAL_PASSWORD || "";
      currentOk = configuredInitialPassword
        ? safeCompareText(claveActual, configuredInitialPassword)
        : false;
    }

    if (!currentOk) {
      await callAppsScript("registrarIntentoFallido", { dni }).catch(() => null);
      return res.status(401).json({ message: "La clave actual es incorrecta." });
    }

    const claveHash = hashPassword(nuevaClave);
    await callAppsScript("actualizarClave", { dni, claveHash });

    const token = createSessionToken(dni);
    return res.status(200).json({
      ok: true,
      token,
      message: "Clave actualizada correctamente.",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "No fue posible actualizar la clave.",
    });
  }
}
