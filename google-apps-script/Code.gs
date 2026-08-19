const SHEET_CONSULTAS = "Consultas";
const SHEET_USUARIOS = "Usuarios";
const SHEET_PARAMETROS = "Parametros";
const SHEET_CONTROL = "ControlDiario";
const TIMEZONE = "America/Lima";

const CONSULTAS_HEADERS = [
  "IDConsulta","FechaHora","DNIUsuario","DNICliente","OrigenConsulta","SegmentoCliente",
  "MarcaVehiculo","AnioModelo","Antiguedad","SegmentoVehiculo","Placa","MontoMaximo",
  "PlazoMaximo","FactorMaximo","MontoSolicitado","Plazo","SeguroObligatorio",
  "SeguroVoluntario","Cuota","FactorRecaudoSeleccionado","FactorCalculado","ResultadoOferta",
  "DeviceID","IP","UserAgent","VersionAplicacion","EstadoProceso"
];

const USUARIOS_HEADERS = [
  "DNI","ClaveHash","Activo","LimiteDiario","ForzarCambioClave","FechaCambioClave",
  "FechaExpiracionClave","UltimoAcceso","IntentosFallidos","Bloqueado"
];

const PARAMETROS_HEADERS = ["Parametro","Valor","Descripcion"];
const CONTROL_HEADERS = ["Fecha","DNIUsuario","Consultas"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    validateSecret_(data.secret);

    switch (data.action) {
      case "obtenerUsuario":
        return jsonResponse_(obtenerUsuario_(data.dni));
      case "actualizarClave":
        return jsonResponse_(actualizarClave_(data.dni, data.claveHash));
      case "registrarIntentoFallido":
        return jsonResponse_(registrarIntentoFallido_(data.dni));
      case "reiniciarIntentosFallidos":
        return jsonResponse_(reiniciarIntentosFallidos_(data.dni));
      case "registrarConsulta":
        return jsonResponse_(registrarConsulta_(data));
      default:
        return jsonResponse_({ ok: false, statusCode: 400, message: "Acción no válida." });
    }
  } catch (error) {
    return jsonResponse_({
      ok: false,
      statusCode: error.statusCode || 500,
      code: error.code || "APP_SCRIPT_ERROR",
      message: error.message || "Error en Apps Script."
    });
  }
}

function configurarHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureConsultasSchema_(ss);
  ensureSheet_(ss, SHEET_USUARIOS, USUARIOS_HEADERS);
  const parametros = ensureSheet_(ss, SHEET_PARAMETROS, PARAMETROS_HEADERS);
  ensureSheet_(ss, SHEET_CONTROL, CONTROL_HEADERS);

  const existing = parametros.getDataRange().getValues();
  const configured = {};
  for (let i = 1; i < existing.length; i++) {
    configured[String(existing[i][0] || "")] = true;
  }

  const defaults = [
    ["DiasVigenciaClave", 90, "Días de vigencia de la clave antes de exigir cambio."],
    ["LimiteDiarioDefault", 500, "Máximo diario si el usuario no tiene límite individual."],
    ["MaxIntentosFallidos", 5, "Intentos fallidos antes de bloquear al usuario."],
    ["ForzarCambioClaveInicial", "SI", "Los usuarios sin clave propia deben cambiar la clave inicial."]
  ];

  defaults.forEach(function(row) {
    if (!configured[row[0]]) parametros.appendRow(row);
  });
}

function validateSecret_(provided) {
  const expected = PropertiesService.getScriptProperties().getProperty("GNV_SHARED_SECRET");
  if (!expected || provided !== expected) {
    const error = new Error("No autorizado.");
    error.statusCode = 401;
    throw error;
  }
}

function ensureConsultasSchema_(ss) {
  let sheet = ss.getSheetByName(SHEET_CONSULTAS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_CONSULTAS);
    sheet.getRange(1, 1, 1, CONSULTAS_HEADERS.length).setValues([CONSULTAS_HEADERS]);
    return sheet;
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, CONSULTAS_HEADERS.length).setValues([CONSULTAS_HEADERS]);
    return sheet;
  }

  const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  if (currentHeaders.indexOf("OrigenConsulta") < 0) {
    sheet.insertColumnAfter(4);
    sheet.getRange(1, 5).setValue("OrigenConsulta");
  }
  return sheet;
}

function ensureSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}

function getRequiredSheet_(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) {
    const error = new Error(`No existe la hoja ${name}. Ejecute configurarHojas().`);
    error.statusCode = 500;
    throw error;
  }
  return sheet;
}

function headersMap_(sheet) {
  const lastColumn = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const map = {};
  headers.forEach(function(value, index) {
    map[String(value).trim()] = index;
  });
  return map;
}

function findUser_(dni) {
  const sheet = getRequiredSheet_(SHEET_USUARIOS);
  const values = sheet.getDataRange().getValues();
  const map = headersMap_(sheet);
  const dniIndex = map["DNI"];

  for (let i = 1; i < values.length; i++) {
    const current = String(values[i][dniIndex] || "").padStart(8, "0");
    if (current === String(dni || "")) {
      return { sheet: sheet, rowNumber: i + 1, row: values[i], map: map };
    }
  }
  return null;
}

function getValue_(record, columnName) {
  const index = record.map[columnName];
  return index === undefined ? "" : record.row[index];
}

function setValue_(record, columnName, value) {
  const index = record.map[columnName];
  if (index === undefined) return;
  record.sheet.getRange(record.rowNumber, index + 1).setValue(value);
}

function getParameter_(name, defaultValue) {
  const sheet = getRequiredSheet_(SHEET_PARAMETROS);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return defaultValue;
  const map = headersMap_(sheet);

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][map["Parametro"]] || "").trim() === name) {
      const value = values[i][map["Valor"]];
      return value === "" || value === null ? defaultValue : value;
    }
  }
  return defaultValue;
}

function getDailyLimit_(record) {
  const individual = Number(getValue_(record, "LimiteDiario"));
  if (Number.isFinite(individual) && individual > 0) return Math.floor(individual);
  const defaultLimit = Number(getParameter_("LimiteDiarioDefault", 500));
  return Number.isFinite(defaultLimit) && defaultLimit > 0 ? Math.floor(defaultLimit) : 500;
}

function todayKey_() {
  return Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd");
}

function findDailyControl_(dni) {
  const sheet = getRequiredSheet_(SHEET_CONTROL);
  const values = sheet.getDataRange().getValues();
  const map = headersMap_(sheet);
  const today = todayKey_();

  for (let i = 1; i < values.length; i++) {
    const rowDate = values[i][map["Fecha"]];
    const dateKey = rowDate instanceof Date
      ? Utilities.formatDate(rowDate, TIMEZONE, "yyyy-MM-dd")
      : String(rowDate || "").slice(0, 10);
    const rowDni = String(values[i][map["DNIUsuario"]] || "").padStart(8, "0");

    if (dateKey === today && rowDni === String(dni)) {
      return {
        sheet: sheet,
        rowNumber: i + 1,
        map: map,
        count: Number(values[i][map["Consultas"]]) || 0
      };
    }
  }

  return { sheet: sheet, rowNumber: null, map: map, count: 0 };
}

function obtenerUsuario_(dni) {
  const record = findUser_(dni);
  if (!record) {
    return { ok: false, statusCode: 403, message: "El usuario no está autorizado." };
  }

  const limit = getDailyLimit_(record);
  const control = findDailyControl_(dni);
  const expiration = getValue_(record, "FechaExpiracionClave");
  const expirationDate = expiration instanceof Date ? expiration : expiration ? new Date(expiration) : null;
  const claveVencida = Boolean(expirationDate && !isNaN(expirationDate.getTime()) && expirationDate.getTime() <= Date.now());

  return {
    ok: true,
    usuario: {
      dni: String(getValue_(record, "DNI") || "").padStart(8, "0"),
      claveHash: String(getValue_(record, "ClaveHash") || ""),
      activo: String(getValue_(record, "Activo") || "NO"),
      limiteDiario: limit,
      consultasHoy: control.count,
      consultasRestantes: Math.max(0, limit - control.count),
      forzarCambioClave: String(getValue_(record, "ForzarCambioClave") || "NO"),
      fechaCambioClave: getValue_(record, "FechaCambioClave") || "",
      fechaExpiracionClave: expiration || "",
      claveVencida: claveVencida,
      intentosFallidos: Number(getValue_(record, "IntentosFallidos")) || 0,
      bloqueado: String(getValue_(record, "Bloqueado") || "NO")
    }
  };
}

function actualizarClave_(dni, claveHash) {
  if (!claveHash || String(claveHash).indexOf(":") < 0) {
    return { ok: false, statusCode: 400, message: "Hash de clave inválido." };
  }

  const record = findUser_(dni);
  if (!record) return { ok: false, statusCode: 403, message: "El usuario no está autorizado." };

  const now = new Date();
  const days = Number(getParameter_("DiasVigenciaClave", 90)) || 90;
  const expiration = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  setValue_(record, "ClaveHash", claveHash);
  setValue_(record, "ForzarCambioClave", "NO");
  setValue_(record, "FechaCambioClave", now);
  setValue_(record, "FechaExpiracionClave", expiration);
  setValue_(record, "IntentosFallidos", 0);
  setValue_(record, "Bloqueado", "NO");
  setValue_(record, "UltimoAcceso", now);

  return { ok: true };
}

function registrarIntentoFallido_(dni) {
  const record = findUser_(dni);
  if (!record) return { ok: true };

  const current = Number(getValue_(record, "IntentosFallidos")) || 0;
  const next = current + 1;
  const maxAttempts = Number(getParameter_("MaxIntentosFallidos", 5)) || 5;

  setValue_(record, "IntentosFallidos", next);
  if (next >= maxAttempts) setValue_(record, "Bloqueado", "SI");

  return { ok: true, intentosFallidos: next, bloqueado: next >= maxAttempts };
}

function reiniciarIntentosFallidos_(dni) {
  const record = findUser_(dni);
  if (!record) return { ok: true };
  setValue_(record, "IntentosFallidos", 0);
  setValue_(record, "UltimoAcceso", new Date());
  return { ok: true };
}

function registrarConsulta_(data) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const record = findUser_(data.dniUsuario);
    if (!record || String(getValue_(record, "Activo")).toUpperCase() !== "SI") {
      return { ok: false, statusCode: 403, message: "El usuario no está autorizado." };
    }
    if (String(getValue_(record, "Bloqueado")).toUpperCase() === "SI") {
      return { ok: false, statusCode: 423, message: "El usuario se encuentra bloqueado." };
    }

    const limit = getDailyLimit_(record);
    const control = findDailyControl_(data.dniUsuario);
    if (control.count >= limit) {
      return {
        ok: false,
        statusCode: 429,
        code: "DAILY_LIMIT",
        message: "Ha alcanzado el máximo de consultas permitidas para hoy."
      };
    }

    const sheet = getRequiredSheet_(SHEET_CONSULTAS);
    sheet.appendRow([
      data.idConsulta,
      data.fechaHora,
      data.dniUsuario,
      data.dniCliente,
      data.origenConsulta,
      data.segmentoCliente,
      data.marcaVehiculo,
      data.anioModelo,
      data.antiguedad,
      data.segmentoVehiculo,
      data.placa,
      data.montoMaximo,
      data.plazoMaximo,
      data.factorMaximo,
      data.montoSolicitado,
      data.plazo,
      data.seguroObligatorio,
      data.seguroVoluntario,
      data.cuota,
      data.factorRecaudoSeleccionado,
      data.factorCalculado,
      data.resultadoOferta,
      data.deviceId,
      data.ip,
      data.userAgent,
      data.versionAplicacion,
      "PENDIENTE"
    ]);

    const nextCount = control.count + 1;
    if (control.rowNumber) {
      control.sheet.getRange(control.rowNumber, control.map["Consultas"] + 1).setValue(nextCount);
    } else {
      control.sheet.appendRow([todayKey_(), data.dniUsuario, nextCount]);
    }

    setValue_(record, "UltimoAcceso", new Date());

    return {
      ok: true,
      consultasHoy: nextCount,
      consultasRestantes: Math.max(0, limit - nextCount)
    };
  } finally {
    lock.releaseLock();
  }
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
