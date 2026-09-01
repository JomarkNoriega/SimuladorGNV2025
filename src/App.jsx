import React, { useMemo, useState } from "react";

// Lógica tomada de la hoja "Simulador _Segmento"
// del archivo Simulador_no clientes GNV.Vs.Segmento.xlsx.

const TEA_TABLE = [
  { monto: 500, tea: 96.99 },
  { monto: 1000, tea: 96.99 },
  { monto: 1100, tea: 96.99 },
  { monto: 1200, tea: 96.99 },
  { monto: 1300, tea: 96.99 },
  { monto: 1400, tea: 96.99 },
  { monto: 1500, tea: 96.99 },
  { monto: 1600, tea: 96.99 },
  { monto: 1700, tea: 96.99 },
  { monto: 1800, tea: 96.99 },
  { monto: 1900, tea: 96.99 },
  { monto: 2000, tea: 95.99 },
  { monto: 2100, tea: 95.99 },
  { monto: 2200, tea: 95.99 },
  { monto: 2300, tea: 95.99 },
  { monto: 2400, tea: 95.99 },
  { monto: 2500, tea: 95.99 },
  { monto: 2600, tea: 95.99 },
  { monto: 2700, tea: 95.99 },
  { monto: 2800, tea: 95.99 },
  { monto: 2900, tea: 95.99 },
  { monto: 3000, tea: 93.99 },
  { monto: 3100, tea: 93.99 },
  { monto: 3200, tea: 93.99 },
  { monto: 3300, tea: 93.99 },
  { monto: 3400, tea: 93.99 },
  { monto: 3500, tea: 93.99 },
  { monto: 3600, tea: 93.99 },
  { monto: 3700, tea: 93.99 },
  { monto: 3800, tea: 93.99 },
  { monto: 3900, tea: 93.99 },
  { monto: 4000, tea: 92.99 },
  { monto: 4100, tea: 92.99 },
  { monto: 4200, tea: 92.99 },
  { monto: 4300, tea: 92.99 },
  { monto: 4400, tea: 92.99 },
  { monto: 4500, tea: 92.99 },
  { monto: 4600, tea: 92.99 },
  { monto: 4700, tea: 92.99 },
  { monto: 4800, tea: 92.99 },
  { monto: 4900, tea: 92.99 },
  { monto: 5000, tea: 92.99 },
  { monto: 5100, tea: 92.99 },
  { monto: 5200, tea: 92.99 },
  { monto: 5300, tea: 92.99 },
  { monto: 5400, tea: 92.99 },
  { monto: 5500, tea: 92.99 },
  { monto: 5600, tea: 92.99 },
  { monto: 5700, tea: 92.99 },
  { monto: 5800, tea: 92.99 },
  { monto: 5900, tea: 92.99 },
  { monto: 6000, tea: 92.99 },
  { monto: 6100, tea: 92.99 },
  { monto: 6200, tea: 92.99 },
  { monto: 6300, tea: 92.99 },
  { monto: 6400, tea: 92.99 },
  { monto: 6500, tea: 92.99 },
  { monto: 6600, tea: 92.99 },
  { monto: 6700, tea: 92.99 },
  { monto: 6800, tea: 92.99 },
  { monto: 6900, tea: 92.99 },
  { monto: 7000, tea: 92.99 },
];

// La columna AG es el umbral de cuota y la columna AH es el factor retornado.
const FACTOR_TABLES = {
  VIP: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 350, factor: 0.55 },
    { cuotaMin: 385, factor: 0.6 },
    { cuotaMin: 420, factor: 0.65 },
    { cuotaMin: 455, factor: 0.7 },
    { cuotaMin: 490, factor: 0.75 },
    { cuotaMin: 525, factor: 0.8 },
    { cuotaMin: 560, factor: 0.85 },
    { cuotaMin: 595, factor: ">85%" },
  ],
  PREFERENTE: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 350, factor: 0.55 },
    { cuotaMin: 385, factor: 0.6 },
    { cuotaMin: 420, factor: 0.65 },
    { cuotaMin: 455, factor: 0.7 },
    { cuotaMin: 490, factor: 0.75 },
    { cuotaMin: 525, factor: 0.8 },
    { cuotaMin: 560, factor: 0.85 },
    { cuotaMin: 595, factor: ">85%" },
  ],
  NORMAL: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 350, factor: 0.55 },
    { cuotaMin: 385, factor: 0.6 },
    { cuotaMin: 420, factor: 0.65 },
    { cuotaMin: 455, factor: 0.7 },
    { cuotaMin: 490, factor: 0.75 },
    { cuotaMin: 525, factor: 0.8 },
    { cuotaMin: 560, factor: 0.85 },
    { cuotaMin: 595, factor: ">85%" },
  ],
  EVALUACION: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 125, factor: 0.55 },
    { cuotaMin: 137.50000000000003, factor: 0.6 },
    { cuotaMin: 150, factor: 0.65 },
    { cuotaMin: 162.5, factor: 0.7 },
    { cuotaMin: 175, factor: 0.75 },
    { cuotaMin: 187.5, factor: 0.8 },
    { cuotaMin: 200, factor: 0.85 },
    { cuotaMin: 212.5, factor: ">85%" },
  ],
  INCLUSION: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 160, factor: 0.55 },
    { cuotaMin: 176, factor: 0.6 },
    { cuotaMin: 192, factor: 0.65 },
    { cuotaMin: 208, factor: 0.7 },
    { cuotaMin: 224, factor: 0.75 },
    { cuotaMin: 240, factor: 0.8 },
    { cuotaMin: 256, factor: 0.85 },
    { cuotaMin: 272, factor: ">85%" },
  ],
  NA: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 125, factor: ">50%" },
  ],
};

const SEGMENT_RULES = {
  VIP: { maxFactor: 0.85, maxLabel: "85%" },
  PREFERENTE: { maxFactor: 0.85, maxLabel: "85%" },
  NORMAL: { maxFactor: 0.85, maxLabel: "85%" },
  INCLUSION: { maxFactor: 0.85, maxLabel: "85%" },
  EVALUACION: { maxFactor: 0.65, maxLabel: "65%" },
  NA: { maxFactor: 0.5, maxLabel: "50%" },
};

const LIMITS = {
  montoMin: 500,
  montoMax: 7000,
  plazoMin: 1,
  plazoMax: 60,
};

function vlookupApprox(x, rows, key) {
  let best = rows[0];
  for (const row of rows) {
    if (row[key] <= x) best = row;
    else break;
  }
  return best;
}

function teaFromTotal(total) {
  return vlookupApprox(total, TEA_TABLE, "monto").tea;
}

function monthlyRateFromTEA(teaPercent) {
  return Math.pow(1 + teaPercent / 100, 1 / 12) - 1;
}

function pmt(rate, nper, pv) {
  if (!Number.isFinite(rate) || !Number.isFinite(nper) || !Number.isFinite(pv) || nper <= 0) {
    return NaN;
  }
  if (rate === 0) return pv / nper;
  const factor = Math.pow(1 + rate, nper);
  return (rate * pv * factor) / (factor - 1);
}

function factorFromCuota(segmento, cuota) {
  const table = FACTOR_TABLES[segmento] ?? FACTOR_TABLES.NORMAL;
  return vlookupApprox(cuota, table, "cuotaMin").factor;
}

function formatPEN(value) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatFactor(value) {
  if (typeof value === "string") return value;
  if (!Number.isFinite(value)) return "—";
  return `${(value * 100).toFixed(2)}%`;
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}


const VEHICLE_BRAND_GROUP = {
  "PEUGEOT": "Grupo 1",
  "VOLVO": "Grupo 1",
  "MAZDA": "Grupo 1",
  "ISUZU": "Grupo 1",
  "LIFAN": "Grupo 2",
  "SHINERAY": "Grupo 2",
  "JAC": "Grupo 2",
  "HYUNDAI": "Grupo 1",
  "HONDA": "Grupo 1",
  "SSANGYONG": "Grupo 1",
  "NISSAN": "Grupo 1",
  "ZXAUTO": "Grupo 2",
  "SUZUKI": "Grupo 1",
  "FORD": "Grupo 1",
  "TOYOTA": "Grupo 1",
  "CHANGAN": "Grupo 2",
  "VOLKSWAGEN": "Grupo 1",
  "DAIHATSU": "Grupo 1",
  "FIAT": "Grupo 1",
  "CHERY": "Grupo 2",
  "MITSUBISHI": "Grupo 1",
  "CITROEN": "Grupo 1",
  "KIA": "Grupo 1",
  "PUMA TAT": "Grupo 1",
  "SOUEAST": "Grupo 2",
  "DFSK": "Grupo 2",
  "SMA": "Grupo 2",
  "FAW": "Grupo 2",
  "TIANJIN FAW": "Grupo 2",
  "DODGE": "Grupo 1",
  "RENAULT": "Grupo 1",
  "IVECO": "Grupo 1",
  "CHANGHE": "Grupo 2",
  "JEEP": "Grupo 1",
  "CHEVROLET": "Grupo 1",
  "DAEWOO": "Grupo 1",
  "GEELY": "Grupo 2",
  "GREAT WALL": "Grupo 2",
  "SEM": "Grupo 2",
  "DONGFENG": "Grupo 2",
  "YEMA AUTO": "Grupo 2",
  "BYD": "Grupo 2",
  "SKODA": "Grupo 1",
  "HAIMA": "Grupo 2",
  "WUZHOULONG": "Grupo 2",
  "XINKAI": "Grupo 2",
  "KEYTON": "Grupo 2",
  "JUPITER T6": "Grupo 1",
  "SUBARU": "Grupo 1",
  "BRILLIANCE": "Grupo 2",
  "HAVAL": "Grupo 2",
  "ZOTYE": "Grupo 2",
  "GONOW": "Grupo 2",
  "YAXING": "Grupo 2",
  "HAFEI": "Grupo 2",
  "LANDWIND": "Grupo 2",
  "KARRY": "Grupo 2",
  "KING LONG": "Grupo 2",
  "HIGER": "Grupo 2",
  "CHANGFENG": "Grupo 2",
  "GOLDEN DRAGON": "Grupo 2",
  "PONTIAC": "Grupo 1",
  "DATSUN": "Grupo 1",
  "CHENGLONG": "Grupo 2",
  "MG": "Grupo 2",
  "FOTON": "Grupo 2",
  "HILLMAN": "Grupo 1",
  "DIM": "Grupo 1",
  "MODASA": "Grupo 1",
  "KYC": "Grupo 2",
  "YUEJIN": "Grupo 2",
  "ZNA": "Grupo 2",
  "CADILLAC": "Grupo 1",
  "CHANGE": "Grupo 2",
  "CHRYSLER": "Grupo 1",
  "ENRANGER": "Grupo 2",
  "JETOUR": "Grupo 2",
  "JINBEI": "Grupo 2",
  "JOYLONG": "Grupo 2",
  "KENBO": "Grupo 2",
  "LADA": "Grupo 1",
  "LAND ROVER": "Grupo 1",
  "LEXUS": "Grupo 1",
  "MERCEDES-BENZ": "Grupo 1",
  "MINI": "Grupo 1",
  "MUDAN": "Grupo 2",
  "OPEL": "Grupo 1",
  "PORSCHE": "Grupo 1",
  "RAM": "Grupo 1",
  "SAIC WULING": "Grupo 2",
  "SWM": "Grupo 2",
  "VICTORY": "Grupo 2",
  "YUTONG": "Grupo 2",
  "BAIC YINXIANG": "Grupo 2",
  "BMW": "Grupo 1",
  "AUDI": "Grupo 1",
  "BAIC": "Grupo 2",
  "AGRALE": "Grupo 1",
  "ASIA MOTORS": "Grupo 1",
  "AUTOCRAFT": "Grupo 1"
};

const VEHICLE_BRANDS = Object.keys(VEHICLE_BRAND_GROUP).sort((a, b) =>
  a.localeCompare(b, "es")
);

function vehicleSegmentFromRules(segmentoCliente, marca, antiguedad) {
  const grupoMarca = VEHICLE_BRAND_GROUP[marca];

  if (!grupoMarca) return "—";

  if (
    ["VIP", "PREFERENTE"].includes(segmentoCliente) &&
    antiguedad >= 0 &&
    antiguedad <= 20
  ) {
    return grupoMarca;
  }

  if (
    segmentoCliente === "NORMAL" &&
    antiguedad >= 0 &&
    antiguedad <= 10
  ) {
    return grupoMarca;
  }

  return "TODOS";
}


const OFFER_RULES = [
  { segmentos: ["VIP", "PREFERENTE"], edadMin: 0, edadMax: 13, grupos: ["Grupo 1"], montoMin: 1000, montoMax: 5500, plazoMin: 12, plazoMax: 30, factorOferta: 0.65, factorMaximo: 0.85 },
  { segmentos: ["VIP", "PREFERENTE"], edadMin: 0, edadMax: 13, grupos: ["Grupo 2"], montoMin: 1000, montoMax: 5000, plazoMin: 12, plazoMax: 30, factorOferta: 0.60, factorMaximo: 0.85 },
  { segmentos: ["VIP", "PREFERENTE"], edadMin: 14, edadMax: 20, grupos: ["Grupo 1"], montoMin: 1000, montoMax: 4500, plazoMin: 12, plazoMax: 30, factorOferta: 0.55, factorMaximo: 0.85 },
  { segmentos: ["VIP", "PREFERENTE"], edadMin: 14, edadMax: 20, grupos: ["Grupo 2"], montoMin: 1000, montoMax: 3500, plazoMin: 12, plazoMax: 30, factorOferta: 0.50, factorMaximo: 0.85 },
  { segmentos: ["VIP", "PREFERENTE"], edadMin: 21, edadMax: 25, grupos: ["Grupo 1", "Grupo 2"], montoMin: 1000, montoMax: 1000, plazoMin: 12, plazoMax: 30, factorOferta: 0.50, factorMaximo: 0.85 },

  { segmentos: ["NORMAL"], edadMin: 0, edadMax: 10, grupos: ["Grupo 1"], montoMin: 1000, montoMax: 4000, plazoMin: 12, plazoMax: 30, factorOferta: 0.50, factorMaximo: 0.85 },
  { segmentos: ["NORMAL"], edadMin: 0, edadMax: 10, grupos: ["Grupo 2"], montoMin: 1000, montoMax: 3500, plazoMin: 12, plazoMax: 30, factorOferta: 0.50, factorMaximo: 0.85 },
  { segmentos: ["NORMAL"], edadMin: 11, edadMax: 20, grupos: ["Grupo 1", "Grupo 2", "TODOS"], montoMin: 1000, montoMax: 2500, plazoMin: 12, plazoMax: 24, factorOferta: 0.50, factorMaximo: 0.85 },
  { segmentos: ["NORMAL"], edadMin: 21, edadMax: 25, grupos: ["Grupo 1", "Grupo 2", "TODOS"], montoMin: 1000, montoMax: 1000, plazoMin: 12, plazoMax: 24, factorOferta: 0.50, factorMaximo: 0.85 },

  { segmentos: ["INCLUSION"], edadMin: 0, edadMax: 20, grupos: ["Grupo 1", "Grupo 2", "TODOS"], montoMin: 1000, montoMax: 2000, plazoMin: 12, plazoMax: 24, factorOferta: 0.60, factorMaximo: 0.85 },
  { segmentos: ["INCLUSION"], edadMin: 21, edadMax: 25, grupos: ["Grupo 1", "Grupo 2", "TODOS"], montoMin: 1000, montoMax: 1000, plazoMin: 12, plazoMax: 24, factorOferta: 0.60, factorMaximo: 0.85 },

  { segmentos: ["EVALUACION"], edadMin: 0, edadMax: 20, grupos: ["Grupo 1", "Grupo 2", "TODOS"], montoMin: 1000, montoMax: 1500, plazoMin: 12, plazoMax: 24, factorOferta: 0.60, factorMaximo: 0.85 },
  { segmentos: ["EVALUACION"], edadMin: 21, edadMax: 25, grupos: ["Grupo 1", "Grupo 2", "TODOS"], montoMin: 1000, montoMax: 1000, plazoMin: 12, plazoMax: 24, factorOferta: 0.60, factorMaximo: 0.85 },

  { segmentos: ["NA"], edadMin: 0, edadMax: 20, grupos: ["Grupo 1", "Grupo 2", "TODOS"], montoMin: 500, montoMax: 500, plazoMin: 6, plazoMax: 6, factorOferta: 0.50, factorMaximo: 0.50 },
  { segmentos: ["NA"], edadMin: 21, edadMax: 25, grupos: ["Grupo 1", "Grupo 2", "TODOS"], montoMin: 500, montoMax: 500, plazoMin: 6, plazoMax: 6, factorOferta: 0.50, factorMaximo: 0.50 },
];

const APP_VERSION = "2026.08.31.v2";

const DNI_WEIGHTS = [3, 2, 7, 6, 5, 4, 3, 2];
const DNI_NUMBER_MAP = "67890123456";
const DNI_LETTER_MAP = "KABCDEFGHIJ";

function calculatePeruvianDniCheckDigit(dni, returnType = "NUMERO") {
  if (!/^\d{8}$/.test(dni)) return null;

  const sum = dni
    .split("")
    .reduce(
      (total, digit, index) =>
        total + Number(digit) * DNI_WEIGHTS[index],
      0
    );

  // Equivalente a SQL:
  // posicion = 11 - (suma % 11)
  // SUBSTRING usa base 1; charAt usa base 0.
  const position = 11 - (sum % 11);
  const index = position - 1;

  const map =
    returnType.toUpperCase() === "LETRA"
      ? DNI_LETTER_MAP
      : DNI_NUMBER_MAP;

  return map.charAt(index);
}

function isValidPeruvianDniCheckDigit(dni, checkDigit) {
  const calculated = calculatePeruvianDniCheckDigit(dni, "NUMERO");

  return (
    calculated !== null &&
    calculated === String(checkDigit).trim()
  );
}

function onlyDigits(value, maxLength = 8) {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

function normalizePlate(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
}

function getOfferRule(segmentoCliente, grupoMarca, antiguedad) {
  return OFFER_RULES.find(
    (rule) =>
      rule.segmentos.includes(segmentoCliente) &&
      antiguedad >= rule.edadMin &&
      antiguedad <= rule.edadMax &&
      rule.grupos.includes(grupoMarca)
  );
}

function factorLimitForSegment(segmento) {
  return SEGMENT_RULES[segmento] ?? SEGMENT_RULES.NORMAL;
}

function formatNumber(value) {
  return new Intl.NumberFormat("es-PE", {
    maximumFractionDigits: 0,
  }).format(value);
}

function getDeviceId() {
  const key = "qapaq_gnv_device_id";
  let id = localStorage.getItem(key);

  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(key, id);
  }

  return id;
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "No fue posible completar la operación.");
  }

  return data;
}

export default function App() {
  const currentYear = new Date().getFullYear();
  const maxVehicleYear = Math.max(currentYear, 2027);

  const [dniUsuario, setDniUsuario] = useState("");
  const [claveUsuario, setClaveUsuario] = useState("");
  const [mostrarClaveUsuario, setMostrarClaveUsuario] = useState(false);
  const [origenConsulta, setOrigenConsulta] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [consultasRestantes, setConsultasRestantes] = useState(null);
  const [mostrarCambioClave, setMostrarCambioClave] = useState(false);
  const [claveActualCambio, setClaveActualCambio] = useState("");
  const [nuevaClave, setNuevaClave] = useState("");
  const [confirmarNuevaClave, setConfirmarNuevaClave] = useState("");
  const [mostrarClaveActualCambio, setMostrarClaveActualCambio] = useState(false);
  const [mostrarNuevaClave, setMostrarNuevaClave] = useState(false);
  const [mostrarConfirmarNuevaClave, setMostrarConfirmarNuevaClave] = useState(false);
  const [cambiandoClave, setCambiandoClave] = useState(false);
  const [avisoClave, setAvisoClave] = useState("");
  const [dniCliente, setDniCliente] = useState("");
  const [segmento, setSegmento] = useState("");
  const [marcaVehiculo, setMarcaVehiculo] = useState("TOYOTA");
  const [anioModelo, setAnioModelo] = useState("");
  const [placa, setPlaca] = useState("");

  const [ofertaConsultada, setOfertaConsultada] = useState(null);
  const [montoSolicitado, setMontoSolicitado] = useState(1000);
  const [plazo, setPlazo] = useState(12);
  const [factorRecaudo, setFactorRecaudo] = useState(85);
  const [seguroObliga, setSeguroObliga] = useState("Vida Integral/Desgravamen");
  const [seguroVol, setSeguroVol] = useState("Solidario");

  const [resultado, setResultado] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [consultando, setConsultando] = useState(false);
  const [calculando, setCalculando] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: 9,
    marginTop: 5,
    border: "1px solid #aaa",
    borderRadius: 4,
  };
  const labelStyle = { display: "block", marginTop: 11 };
  const stageStyle = {
    border: "1px solid #d7d7d7",
    borderRadius: 12,
    padding: 18,
    marginTop: 16,
    background: "#fff",
  };
  const buttonStyle = {
    marginTop: 16,
    padding: "11px 18px",
    border: 0,
    borderRadius: 7,
    background: "#0b5cab",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  };
  const resultRow = {
    display: "grid",
    gridTemplateColumns: "minmax(180px, 1fr) minmax(120px, 1fr)",
    gap: 12,
    padding: "9px 0",
    borderBottom: "1px solid #eee",
  };

  const showMessage = (type, text) => setMensaje({ type, text });

  const validateBasicData = () => {
    if (!/^\d{8}$/.test(dniUsuario)) {
      return "El DNI del usuario debe contener exactamente 8 dígitos numéricos.";
    }
    if (!claveUsuario) {
      return "Ingrese la clave del usuario.";
    }
    if (!["Campo/Agencia", "Base", "Referido"].includes(origenConsulta)) {
      return "Seleccione el origen de consulta.";
    }
    if (!/^\d{8}$/.test(dniCliente)) {
      return "El DNI del cliente debe contener exactamente 8 dígitos numéricos.";
    }
    if (!["VIP", "PREFERENTE", "NORMAL", "INCLUSION", "EVALUACION", "NA"].includes(segmento)) {
      return "Seleccione el segmento del cliente.";
    }
    if (!VEHICLE_BRAND_GROUP[marcaVehiculo]) {
      return "Seleccione una marca válida del catálogo.";
    }
    if (!Number.isInteger(anioModelo) || anioModelo < currentYear - 25 || anioModelo > maxVehicleYear) {
      return "Ingrese un año de vehículo válido.";
    }
    if (!/^[A-Z0-9]{6}$/.test(placa)) {
      return "La placa debe contener exactamente 6 caracteres alfanuméricos.";
    }
    return "";
  };

  const consultarOferta = async () => {
    setResultado(null);
    setOfertaConsultada(null);
    setMensaje(null);

    const basicError = validateBasicData();
    if (basicError) {
      showMessage("error", basicError);
      return;
    }

    setConsultando(true);

    try {
      let token = sessionToken;

      // Si ya existe una sesión, solo se valida localmente en el backend.
      // No se vuelve a consultar Google Sheets ni se reenvía la clave.
      if (token) {
        try {
          const sessionCheck = await postJson("/api/validar-sesion", {
            sessionToken: token,
          });

          if (!sessionCheck.ok) {
            token = "";
            setSessionToken("");
          }
        } catch {
          token = "";
          setSessionToken("");
        }
      }

      // Solo autenticar nuevamente contra Google Sheets cuando no exista
      // una sesión válida (primer ingreso, recarga de página o sesión vencida).
      if (!token) {
        const auth = await postJson("/api/validar-usuario", {
          dni: dniUsuario,
          clave: claveUsuario,
        });

        if (auth.forceChange) {
          setSessionToken("");
          setClaveActualCambio(claveUsuario);
          setMostrarCambioClave(true);
          showMessage(
            "warning",
            auth.reason === "EXPIRED"
              ? "Su clave ha vencido. Debe actualizarla antes de continuar."
              : "Debe cambiar su clave antes de continuar."
          );
          return;
        }

        token = auth.token || "";
        setSessionToken(token);
        setConsultasRestantes(
          Number.isFinite(Number(auth.consultasRestantes))
            ? Number(auth.consultasRestantes)
            : null
        );
      }

      const antiguedad = Math.max(0, currentYear - anioModelo);
      const grupoMarca = VEHICLE_BRAND_GROUP[marcaVehiculo];
      const rule = getOfferRule(segmento, grupoMarca, antiguedad);

      if (!rule) {
        showMessage(
          "error",
          "Oferta no corresponde al segmento, volver a calcular."
        );
        return;
      }

      const factorOferta = rule.factorOferta;
      const factorMaximo = rule.factorMaximo;

      const offer = {
        montoMin: rule.montoMin,
        montoMax: rule.montoMax,
        plazoMin: rule.plazoMin,
        plazoMax: rule.plazoMax,
        factorOferta,
        factorOfertaLabel: `${Math.round(factorOferta * 100)}%`,
        factorMaximo,
        factorMaximoLabel: `${Math.round(factorMaximo * 100)}%`,
        antiguedad,
        grupoMarca,
      };

      setOfertaConsultada(offer);
      setMontoSolicitado(
        Math.min(Math.max(montoSolicitado, rule.montoMin), rule.montoMax)
      );
      setPlazo(Math.min(Math.max(plazo, rule.plazoMin), rule.plazoMax));
      setFactorRecaudo(Math.round(factorOferta * 100));
      showMessage("success", "Oferta consultada correctamente.");
    } catch (error) {
      showMessage("error", error.message);
    } finally {
      setConsultando(false);
    }
  };


  const nuevaConsulta = () => {
    // Mantiene identidad y sesión del usuario; limpia los datos de la operación.
    setOrigenConsulta("");
    setDniCliente("");
    setSegmento("");
    setMarcaVehiculo("");
    setAnioModelo("");
    setPlaca("");
    setOfertaConsultada(null);
    setMontoSolicitado(1000);
    setPlazo(12);
    setFactorRecaudo(85);
    setSeguroObliga("Vida Integral/Desgravamen");
    setSeguroVol("Solidario");
    setResultado(null);
    setMensaje(null);
    setAvisoClave("");
  };

  const cambiarClave = async () => {
    setMensaje(null);
    setAvisoClave("");

    if (!/^\d{8}$/.test(dniUsuario)) {
      showMessage("error", "Ingrese un DNI de usuario válido.");
      return;
    }
    if (!claveActualCambio) {
      showMessage("error", "Ingrese la clave actual.");
      return;
    }
    if (!nuevaClave || nuevaClave !== confirmarNuevaClave) {
      showMessage("error", "La nueva clave y su confirmación deben coincidir.");
      return;
    }

    setCambiandoClave(true);
    try {
      const data = await postJson("/api/cambiar-clave", {
        dni: dniUsuario,
        claveActual: claveActualCambio,
        nuevaClave,
      });

      setClaveUsuario(nuevaClave);
      setSessionToken(data.token || "");
      setMostrarCambioClave(false);
      setClaveActualCambio("");
      setNuevaClave("");
      setConfirmarNuevaClave("");
      setAvisoClave("Clave actualizada correctamente. Ya puede continuar con la consulta.");
    } catch (error) {
      showMessage("error", error.message);
    } finally {
      setCambiandoClave(false);
    }
  };

  const calcularNegociacion = async () => {
    if (!ofertaConsultada) {
      showMessage("error", "Primero debe consultar la oferta.");
      return;
    }

    if (!sessionToken) {
      showMessage("error", "La sesión no es válida. Vuelva a consultar la oferta.");
      return;
    }

    if (
      montoSolicitado < ofertaConsultada.montoMin ||
      montoSolicitado > ofertaConsultada.montoMax
    ) {
      showMessage(
        "error",
        `El monto solicitado debe estar entre S/ ${formatNumber(
          ofertaConsultada.montoMin
        )} y S/ ${formatNumber(ofertaConsultada.montoMax)}.`
      );
      return;
    }

    if (
      plazo < ofertaConsultada.plazoMin ||
      plazo > ofertaConsultada.plazoMax
    ) {
      showMessage(
        "error",
        `El plazo debe estar entre ${ofertaConsultada.plazoMin} y ${ofertaConsultada.plazoMax} meses.`
      );
      return;
    }

    setCalculando(true);
    setMensaje(null);

    const costoObliga =
      seguroObliga === "Vida Integral/Desgravamen" ? montoSolicitado * 0.1 : 0;

    let costoVol = 0;
    if (seguroVol === "Solidario") costoVol = plazo * 8;
    else if (seguroVol === "Ruta") costoVol = 60;
    else if (seguroVol === "Solidario + Ruta") costoVol = plazo * 8 + 60;

    const totalFinanciado = montoSolicitado + costoObliga + costoVol;
    const tea = teaFromTotal(totalFinanciado);
    const tasaMensual = monthlyRateFromTEA(tea);
    const cuota = pmt(tasaMensual, plazo, totalFinanciado);
    const factorCalculado = factorFromCuota(segmento, cuota);
    const factorSeleccionado = ofertaConsultada.factorMaximo;
    const factorExcedido =
      typeof factorCalculado === "string" ||
      (typeof factorCalculado === "number" &&
        factorCalculado > factorSeleccionado);

    const calculation = {
      montoOferta: montoSolicitado,
      cuota,
      factor: factorCalculado,
      factorSeleccionado,
      factorExcedido,
      totalFinanciado,
      tea,
      tasaMensual,
      costoObliga,
      costoVol,
    };

    setResultado(calculation);

    const payload = {
      sessionToken,
      dniUsuario,
      dniCliente,
      origenConsulta,
      segmentoCliente: segmento,
      marcaVehiculo,
      anioModelo,
      antiguedad: ofertaConsultada.antiguedad,
      segmentoVehiculo: ofertaConsultada.grupoMarca,
      placa,
      montoMaximo: ofertaConsultada.montoMax,
      plazoMaximo: ofertaConsultada.plazoMax,
      factorMaximo: ofertaConsultada.factorMaximoLabel,
      montoSolicitado,
      plazo,
      seguroObligatorio: seguroObliga,
      seguroVoluntario: seguroVol,
      cuota,
      factorRecaudoSeleccionado: ofertaConsultada.factorOfertaLabel,
      factorCalculado: formatFactor(factorCalculado),
      resultadoOferta: factorExcedido ? "OBSERVADO" : "CONFORME",
      deviceId: getDeviceId(),
      versionAplicacion: APP_VERSION,
    };

    try {
      const registration = await postJson("/api/registrar-consulta", payload);
      if (Number.isFinite(Number(registration.consultasRestantes))) {
        setConsultasRestantes(Number(registration.consultasRestantes));
      }
      showMessage("success", "Simulación calculada correctamente.");
    } catch (error) {
      showMessage(
        "warning",
        `La simulación fue calculada, pero no pudo registrarse: ${error.message}`
      );
    } finally {
      setCalculando(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "system-ui",
        padding: 20,
        maxWidth: 1000,
        margin: "0 auto",
        background: "#fafafa",
      }}
    >
      <h2>Simulador GNV - Clientes Nuevos - {APP_VERSION}</h2>

      <section style={stageStyle}>
        <h3>I. Datos</h3>

        <div style={{ display: "grid", gap: 14 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            <label style={labelStyle}>
              DNI del usuario
              <input
                value={dniUsuario}
                inputMode="numeric"
                maxLength={8}
                onChange={(e) => {
                  setDniUsuario(onlyDigits(e.target.value));
                  setSessionToken("");
                  setOfertaConsultada(null);
                  setResultado(null);
                }}
                style={inputStyle}
                placeholder="8 dígitos"
              />
            </label>

            <label style={labelStyle}>
              Clave del usuario
              <div style={{ position: "relative" }}>
                <input
                  type={mostrarClaveUsuario ? "text" : "password"}
                  value={claveUsuario}
                  maxLength={64}
                  onChange={(e) => {
                    setClaveUsuario(e.target.value);
                    setSessionToken("");
                    setOfertaConsultada(null);
                    setResultado(null);
                  }}
                  style={{ ...inputStyle, paddingRight: 44 }}
                  placeholder="Ingrese su clave"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarClaveUsuario((value) => !value)}
                  aria-label={mostrarClaveUsuario ? "Ocultar clave" : "Mostrar clave"}
                  title={mostrarClaveUsuario ? "Ocultar clave" : "Mostrar clave"}
                  style={{
                    position: "absolute",
                    right: 9,
                    top: 14,
                    width: 30,
                    height: 30,
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                    padding: 3,
                    color: "#555",
                  }}
                >
                  {mostrarClaveUsuario ? (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 4.2A10.7 10.7 0 0112 4c5.5 0 9.5 5.2 9.5 5.2a15.6 15.6 0 01-3.1 3.5M6.6 6.6C4 8.2 2.5 10.2 2.5 10.2S6.5 16 12 16c1 0 2-.2 2.9-.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        d="M2.5 12S6.5 6 12 6s9.5 6 9.5 6-4 6-9.5 6-9.5-6-9.5-6z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setClaveActualCambio(claveUsuario);
                  setMostrarCambioClave(true);
                  setMensaje(null);
                  setAvisoClave("");
                }}
                style={{
                  marginTop: 7,
                  border: 0,
                  background: "transparent",
                  color: "#0b5cab",
                  padding: 0,
                  cursor: "pointer",
                  fontWeight: 650,
                }}
              >
                Cambiar clave
              </button>
            </label>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
              gap: 14,
            }}
          >
            <label style={labelStyle}>
              DNI del cliente
              <input
                value={dniCliente}
                inputMode="numeric"
                maxLength={8}
                onChange={(e) => setDniCliente(onlyDigits(e.target.value))}
                style={inputStyle}
                placeholder="8 dígitos"
              />
            </label>

            <label style={labelStyle}>
              Origen de consulta *
              <select
                value={origenConsulta}
                onChange={(e) => {
                  setOrigenConsulta(e.target.value);
                  setOfertaConsultada(null);
                  setResultado(null);
                }}
                style={inputStyle}
                required
              >
                <option value="">Seleccione...</option>
                <option value="Campo/Agencia">Campo/Agencia</option>
                <option value="Base">Base</option>
                <option value="Referido">Referido</option>
              </select>
            </label>

            <label style={labelStyle}>
              Segmento cliente
              <select
                value={segmento}
                onChange={(e) => setSegmento(e.target.value)}
                style={inputStyle}
              >
                <option value="">Seleccione...</option>
                {["VIP", "PREFERENTE", "NORMAL", "INCLUSION", "EVALUACION", "NA"].map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </label>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
              gap: 14,
            }}
          >
            <label style={labelStyle}>
              Placa
              <input
                value={placa}
                maxLength={6}
                onChange={(e) => setPlaca(normalizePlate(e.target.value))}
                style={inputStyle}
                placeholder="Ej. ATI219"
              />
            </label>

            <label style={labelStyle}>
              Marca
              <input
                type="text"
                list="vehicle-brand-catalog"
                value={marcaVehiculo}
                onChange={(e) => setMarcaVehiculo(e.target.value.toUpperCase())}
                onBlur={() => setMarcaVehiculo(marcaVehiculo.trim().toUpperCase())}
                style={inputStyle}
                placeholder="Buscar marca..."
              />
              <datalist id="vehicle-brand-catalog">
                {VEHICLE_BRANDS.map((marca) => (
                  <option key={marca} value={marca} />
                ))}
              </datalist>
            </label>

            <label style={labelStyle}>
              Año del vehículo
              <input
                type="number"
                min={currentYear - 25}
                max={maxVehicleYear}
                value={anioModelo}
                onChange={(e) => setAnioModelo(e.target.value === "" ? "" : Number(e.target.value))}
                style={inputStyle}
                placeholder="Seleccione año"
              />
            </label>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={consultarOferta}
            disabled={consultando}
            style={{
              ...buttonStyle,
              opacity: consultando ? 0.65 : 1,
            }}
          >
            {consultando ? "Consultando..." : "Consultar oferta"}
          </button>

          <button
            type="button"
            onClick={nuevaConsulta}
            disabled={consultando || calculando}
            style={{
              ...buttonStyle,
              background: "#666",
              opacity: consultando || calculando ? 0.65 : 1,
            }}
          >
            Nueva consulta
          </button>
        </div>
        {avisoClave && (
          <div
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 7,
              border: "1px solid #2e7d32",
              color: "#2e7d32",
              background: "#f3fff4",
              fontWeight: 650,
            }}
          >
            {avisoClave}
          </div>
        )}
      </section>

      {mostrarCambioClave && (
        <section
          style={{
            ...stageStyle,
            border: "1px solid #f0b429",
            background: "#fffaf0",
          }}
        >
          <h3>Cambio de clave</h3>
          <p style={{ marginTop: 0, color: "#555" }}>
            La clave debe tener entre 8 y 64 caracteres e incluir mayúscula, minúscula y número.
            Su vigencia será de 90 días.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            <label style={labelStyle}>
              Clave actual
              <div style={{ position: "relative" }}>
                <input
                  type={mostrarClaveActualCambio ? "text" : "password"}
                  value={claveActualCambio}
                  onChange={(e) => setClaveActualCambio(e.target.value)}
                  style={{ ...inputStyle, paddingRight: 44 }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarClaveActualCambio((value) => !value)}
                  aria-label={mostrarClaveActualCambio ? "Ocultar clave actual" : "Mostrar clave actual"}
                  title={mostrarClaveActualCambio ? "Ocultar clave actual" : "Mostrar clave actual"}
                  style={{
                    position: "absolute",
                    right: 9,
                    top: 14,
                    width: 30,
                    height: 30,
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                    padding: 3,
                    color: "#555",
                  }}
                >
                  {mostrarClaveActualCambio ? (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 4.2A10.7 10.7 0 0112 4c5.5 0 9.5 5.2 9.5 5.2a15.6 15.6 0 01-3.1 3.5M6.6 6.6C4 8.2 2.5 10.2 2.5 10.2S6.5 16 12 16c1 0 2-.2 2.9-.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        d="M2.5 12S6.5 6 12 6s9.5 6 9.5 6-4 6-9.5 6-9.5-6-9.5-6z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </label>
            <label style={labelStyle}>
              Nueva clave
              <div style={{ position: "relative" }}>
                <input
                  type={mostrarNuevaClave ? "text" : "password"}
                  value={nuevaClave}
                  onChange={(e) => setNuevaClave(e.target.value)}
                  style={{ ...inputStyle, paddingRight: 44 }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarNuevaClave((value) => !value)}
                  aria-label={mostrarNuevaClave ? "Ocultar nueva clave" : "Mostrar nueva clave"}
                  title={mostrarNuevaClave ? "Ocultar nueva clave" : "Mostrar nueva clave"}
                  style={{
                    position: "absolute",
                    right: 9,
                    top: 14,
                    width: 30,
                    height: 30,
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                    padding: 3,
                    color: "#555",
                  }}
                >
                  {mostrarNuevaClave ? (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 4.2A10.7 10.7 0 0112 4c5.5 0 9.5 5.2 9.5 5.2a15.6 15.6 0 01-3.1 3.5M6.6 6.6C4 8.2 2.5 10.2 2.5 10.2S6.5 16 12 16c1 0 2-.2 2.9-.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        d="M2.5 12S6.5 6 12 6s9.5 6 9.5 6-4 6-9.5 6-9.5-6-9.5-6z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </label>
            <label style={labelStyle}>
              Confirmar nueva clave
              <div style={{ position: "relative" }}>
                <input
                  type={mostrarConfirmarNuevaClave ? "text" : "password"}
                  value={confirmarNuevaClave}
                  onChange={(e) => setConfirmarNuevaClave(e.target.value)}
                  style={{ ...inputStyle, paddingRight: 44 }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmarNuevaClave((value) => !value)}
                  aria-label={mostrarConfirmarNuevaClave ? "Ocultar confirmación de clave" : "Mostrar confirmación de clave"}
                  title={mostrarConfirmarNuevaClave ? "Ocultar confirmación de clave" : "Mostrar confirmación de clave"}
                  style={{
                    position: "absolute",
                    right: 9,
                    top: 14,
                    width: 30,
                    height: 30,
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                    padding: 3,
                    color: "#555",
                  }}
                >
                  {mostrarConfirmarNuevaClave ? (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 4.2A10.7 10.7 0 0112 4c5.5 0 9.5 5.2 9.5 5.2a15.6 15.6 0 01-3.1 3.5M6.6 6.6C4 8.2 2.5 10.2 2.5 10.2S6.5 16 12 16c1 0 2-.2 2.9-.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        d="M2.5 12S6.5 6 12 6s9.5 6 9.5 6-4 6-9.5 6-9.5-6-9.5-6z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </label>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={cambiarClave}
              disabled={cambiandoClave}
              style={{ ...buttonStyle, opacity: cambiandoClave ? 0.65 : 1 }}
            >
              {cambiandoClave ? "Actualizando..." : "Actualizar clave"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMostrarCambioClave(false);
                setClaveActualCambio("");
                setNuevaClave("");
                setConfirmarNuevaClave("");
              }}
              style={{
                ...buttonStyle,
                background: "#666",
              }}
            >
              Cancelar
            </button>
          </div>
        </section>
      )}

      {ofertaConsultada && (
        <section style={stageStyle}>
          <h3>II. Oferta Pre Aprobada</h3>

          <div style={resultRow}>
            <span>Monto máximo</span>
            <strong>{formatPEN(ofertaConsultada.montoMax)}</strong>
          </div>
          <div style={resultRow}>
            <span>Plazo máximo</span>
            <strong>{ofertaConsultada.plazoMax} meses</strong>
          </div>
          <div style={resultRow}>
            <span>Factor de oferta</span>
            <strong>{ofertaConsultada.factorOfertaLabel}</strong>
          </div>
        </section>
      )}

      {ofertaConsultada && (
        <section style={stageStyle}>
          <h3>III. Simulación</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            <label style={labelStyle}>
              Monto solicitado
              <input
                type="number"
                min={ofertaConsultada.montoMin}
                max={ofertaConsultada.montoMax}
                step={100}
                value={montoSolicitado}
                onChange={(e) => setMontoSolicitado(Number(e.target.value))}
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              Plazo
              <input
                type="number"
                min={ofertaConsultada.plazoMin}
                max={ofertaConsultada.plazoMax}
                value={plazo}
                onChange={(e) => setPlazo(Number(e.target.value))}
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              Seguro obligatorio
              <select
                value={seguroObliga}
                onChange={(e) => setSeguroObliga(e.target.value)}
                style={inputStyle}
              >
                <option value="Vida Integral/Desgravamen">Vida Integral/Desgravamen</option>
                <option value="Ninguno">Ninguno</option>
              </select>
            </label>

            <label style={labelStyle}>
              Seguro voluntario
              <select
                value={seguroVol}
                onChange={(e) => setSeguroVol(e.target.value)}
                style={inputStyle}
              >
                <option value="Solidario">Solidario</option>
                <option value="Ruta">Ruta protegida</option>
                <option value="Solidario + Ruta">Solidario + Ruta</option>
                <option value="Ninguno">Ninguno</option>
              </select>
            </label>
          </div>

          

          <button
            type="button"
            onClick={calcularNegociacion}
            disabled={calculando}
            style={{
              ...buttonStyle,
              opacity: calculando ? 0.65 : 1,
            }}
          >
            {calculando ? "Calculando..." : "Calcular negociación"}
          </button>
        </section>
      )}

      {resultado && (
        <section style={stageStyle}>
          <h3>IV. Resultado de negociación</h3>

          <div style={resultRow}>
            <span>Monto de oferta</span>
            <strong>{formatPEN(resultado.montoOferta)}</strong>
          </div>
          <div style={resultRow}>
            <span>Cuota</span>
            <strong>{formatPEN(resultado.cuota)}</strong>
          </div>
          <div style={resultRow}>
            <span>Factor</span>
            <strong>{formatFactor(resultado.factor)}</strong>
          </div>

          {resultado.factorExcedido && (
            <div
              style={{
                marginTop: 16,
                padding: 13,
                border: "1px solid #d40000",
                borderRadius: 8,
                color: "#d40000",
                fontWeight: 700,
              }}
            >
              Alerta: el factor requerido por la cuota supera el límite permitido. DEBE VOLVER A GENERAR LA SIMULACIÓN.
            </div>
          )}
        </section>
      )}

      {mensaje && mensaje.type !== "success" && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 8,
            border:
              mensaje.type === "error"
                ? "1px solid #c62828"
                : "1px solid #ef6c00",
            color:
              mensaje.type === "error"
                ? "#c62828"
                : "#ef6c00",
            background:
              mensaje.type === "error"
                ? "#fff5f5"
                : "#fff8e1",
            fontWeight: 600,
          }}
        >
          {mensaje.text}
        </div>
      )}

      <footer
        style={{
          marginTop: 24,
          paddingTop: 14,
          borderTop: "1px solid #e5e5e5",
          textAlign: "center",
          fontSize: 13,
          color: "#555",
        }}
      >
        (c) QAPAQ S.A.
      </footer>
    </div>
  );
}
