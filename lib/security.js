import crypto from "crypto";

const SCRYPT_KEYLEN = 64;
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function toBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedValue) {
  if (!storedValue || !storedValue.includes(":")) return false;

  const [salt, storedHash] = storedValue.split(":");
  if (!salt || !storedHash) return false;

  try {
    const calculated = crypto.scryptSync(password, salt, SCRYPT_KEYLEN);
    const expected = Buffer.from(storedHash, "hex");
    return calculated.length === expected.length && crypto.timingSafeEqual(calculated, expected);
  } catch {
    return false;
  }
}

export function validatePasswordPolicy(password) {
  const value = String(password || "");
  if (value.length < 8 || value.length > 64) {
    return "La nueva clave debe tener entre 8 y 64 caracteres.";
  }
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
    return "La nueva clave debe incluir al menos una mayúscula, una minúscula y un número.";
  }
  return "";
}

function getSessionSecret() {
  return process.env.GNV_SESSION_SECRET || process.env.GNV_SHARED_SECRET || "";
}

export function createSessionToken(dni) {
  const secret = getSessionSecret();
  if (!secret) throw new Error("La clave de sesión no está configurada.");

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    dni: String(dni),
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
    nonce: crypto.randomBytes(12).toString("hex"),
  };

  const encoded = toBase64Url(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token) {
  const secret = getSessionSecret();
  if (!secret || !token || !String(token).includes(".")) return null;

  const [encoded, signature] = String(token).split(".");
  if (!encoded || !signature) return null;

  const expected = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(fromBase64Url(encoded));
    const now = Math.floor(Date.now() / 1000);
    if (!payload.dni || !payload.exp || payload.exp < now) return null;
    return payload;
  } catch {
    return null;
  }
}

export function safeCompareText(a, b) {
  const hashA = crypto.createHash("sha256").update(String(a || "")).digest();
  const hashB = crypto.createHash("sha256").update(String(b || "")).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}
