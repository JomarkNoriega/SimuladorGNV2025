import React from "react";

type TariffRow = Record<string, number>;

const TARIFF: Record<string, Record<number, TariffRow>> = {
  INFORMAL: {
    24: { "SIN SEGURO": 202, "CON SEGURO VIDA": 207.1, "SEGURO VIDA + RUTA": 212.1, "SEGURO VIDA + RUT + SOLIDARIO": 228.0, "% RECAUDO": 0.5, MONTO_BASE: 2500 },
    23: { "SIN SEGURO": 206, "CON SEGURO VIDA": 211.1, "SEGURO VIDA + RUTA": 216.2, "SEGURO VIDA + RUT + SOLIDARIO": 231.7, "% RECAUDO": 0.5, MONTO_BASE: 2500 },
    22: { "SIN SEGURO": 211, "CON SEGURO VIDA": 215.5, "SEGURO VIDA + RUTA": 215.5, "SEGURO VIDA + RUT + SOLIDARIO": 230.7, "% RECAUDO": 0.5, MONTO_BASE: 2500 },
    21: { "SIN SEGURO": 216, "CON SEGURO VIDA": 220.5, "SEGURO VIDA + RUTA": 225.8, "SEGURO VIDA + RUT + SOLIDARIO": 240.6, "% RECAUDO": 0.55, MONTO_BASE: 2500 },
    20: { "SIN SEGURO": 221, "CON SEGURO VIDA": 226.0, "SEGURO VIDA + RUTA": 231.4, "SEGURO VIDA + RUT + SOLIDARIO": 245.9, "% RECAUDO": 0.55, MONTO_BASE: 2500 },
    19: { "SIN SEGURO": 227, "CON SEGURO VIDA": 232.1, "SEGURO VIDA + RUTA": 237.7, "SEGURO VIDA + RUT + SOLIDARIO": 251.8, "% RECAUDO": 0.55, MONTO_BASE: 2500 },
    18: { "SIN SEGURO": 235, "CON SEGURO VIDA": 239.0, "SEGURO VIDA + RUTA": 244.8, "SEGURO VIDA + RUT + SOLIDARIO": 258.5, "% RECAUDO": 0.55, MONTO_BASE: 2500 },
    17: { "SIN SEGURO": 242, "CON SEGURO VIDA": 246.9, "SEGURO VIDA + RUTA": 252.8, "SEGURO VIDA + RUT + SOLIDARIO": 266.2, "% RECAUDO": 0.6, MONTO_BASE: 2500 },
    16: { "SIN SEGURO": 252, "CON SEGURO VIDA": 255.8, "SEGURO VIDA + RUTA": 261.9, "SEGURO VIDA + RUT + SOLIDARIO": 275.0, "% RECAUDO": 0.6, MONTO_BASE: 2500 },
    15: { "SIN SEGURO": 262, "CON SEGURO VIDA": 266.0, "SEGURO VIDA + RUTA": 272.4, "SEGURO VIDA + RUT + SOLIDARIO": 285.0, "% RECAUDO": 0.8, MONTO_BASE: 2500 },
    14: { "SIN SEGURO": 272, "CON SEGURO VIDA": 277.8, "SEGURO VIDA + RUTA": 284.5, "SEGURO VIDA + RUT + SOLIDARIO": 296.9, "% RECAUDO": 0.85, MONTO_BASE: 2500 },
    13: { "SIN SEGURO": 262, "CON SEGURO VIDA": 266.0, "SEGURO VIDA + RUTA": 272.4, "SEGURO VIDA + RUT + SOLIDARIO": 310.0, "% RECAUDO": 0.85, MONTO_BASE: 2500 },
    12: { "SIN SEGURO": 315, "CON SEGURO VIDA": 319.65, "SEGURO VIDA + RUTA": 324.96, "SEGURO VIDA + RUT + SOLIDARIO": 341.03, "% RECAUDO": 0.85, MONTO_BASE: 2500 }
  },
  "FORMAL/APP": {
    30: { "SIN SEGURO": 325, "CON SEGURO VIDA": 336.3, "SEGURO VIDA + RUTA": 340.8, "SEGURO VIDA + RUT + SOLIDARIO": 358.7, "% RECAUDO": 0.5, MONTO_BASE: 4500 },
    29: { "SIN SEGURO": 330, "CON SEGURO VIDA": 340.4, "SEGURO VIDA + RUTA": 345.0, "SEGURO VIDA + RUT + SOLIDARIO": 362.5, "% RECAUDO": 0.5, MONTO_BASE: 4500 },
    28: { "SIN SEGURO": 334, "CON SEGURO VIDA": 344.9, "SEGURO VIDA + RUTA": 349.5, "SEGURO VIDA + RUT + SOLIDARIO": 366.7, "% RECAUDO": 0.5, MONTO_BASE: 4500 },
    27: { "SIN SEGURO": 340, "CON SEGURO VIDA": 349.9, "SEGURO VIDA + RUTA": 354.5, "SEGURO VIDA + RUT + SOLIDARIO": 371.3, "% RECAUDO": 0.5, MONTO_BASE: 4500 },
    26: { "SIN SEGURO": 345, "CON SEGURO VIDA": 355.3, "SEGURO VIDA + RUTA": 360.1, "SEGURO VIDA + RUT + SOLIDARIO": 376.5, "% RECAUDO": 0.5, MONTO_BASE: 4500 },
    25: { "SIN SEGURO": 351, "CON SEGURO VIDA": 361.3, "SEGURO VIDA + RUTA": 366.1, "SEGURO VIDA + RUT + SOLIDARIO": 382.5, "% RECAUDO": 0.5, MONTO_BASE: 4500 },
    24: { "SIN SEGURO": 358, "CON SEGURO VIDA": 367.8, "SEGURO VIDA + RUTA": 372.7, "SEGURO VIDA + RUT + SOLIDARIO": 388.4, "% RECAUDO": 0.5, MONTO_BASE: 4500 },
    23: { "SIN SEGURO": 366, "CON SEGURO VIDA": 375.0, "SEGURO VIDA + RUTA": 380.0, "SEGURO VIDA + RUT + SOLIDARIO": 395.4, "% RECAUDO": 0.5, MONTO_BASE: 4500 },
    22: { "SIN SEGURO": 374, "CON SEGURO VIDA": 383.0, "SEGURO VIDA + RUTA": 388.2, "SEGURO VIDA + RUT + SOLIDARIO": 403.2, "% RECAUDO": 0.5, MONTO_BASE: 4500 },
    21: { "SIN SEGURO": 383, "CON SEGURO VIDA": 392.0, "SEGURO VIDA + RUTA": 397.2, "SEGURO VIDA + RUT + SOLIDARIO": 411.0, "% RECAUDO": 0.5, MONTO_BASE: 4500 },
    20: { "SIN SEGURO": 393, "CON SEGURO VIDA": 402.0, "SEGURO VIDA + RUTA": 407.0, "SEGURO VIDA + RUT + SOLIDARIO": 421.6, "% RECAUDO": 0.55, MONTO_BASE: 4500 },
    19: { "SIN SEGURO": 404, "CON SEGURO VIDA": 413.0, "SEGURO VIDA + RUTA": 418.5, "SEGURO VIDA + RUT + SOLIDARIO": 432.5, "% RECAUDO": 0.55, MONTO_BASE: 4500 },
    18: { "SIN SEGURO": 417, "CON SEGURO VIDA": 425.6, "SEGURO VIDA + RUTA": 431.2, "SEGURO VIDA + RUT + SOLIDARIO": 444.9, "% RECAUDO": 0.8, MONTO_BASE: 4500 },
    17: { "SIN SEGURO": 431, "CON SEGURO VIDA": 439.7, "SEGURO VIDA + RUTA": 445.5, "SEGURO VIDA + RUT + SOLIDARIO": 458.8, "% RECAUDO": 0.85, MONTO_BASE: 4500 },
    16: { "SIN SEGURO": 448, "CON SEGURO VIDA": 455.8, "SEGURO VIDA + RUTA": 461.9, "SEGURO VIDA + RUT + SOLIDARIO": 474.8, "% RECAUDO": 0.85, MONTO_BASE: 4500 },
    15: { "SIN SEGURO": 466, "CON SEGURO VIDA": 474.2, "SEGURO VIDA + RUTA": 480.5, "SEGURO VIDA + RUT + SOLIDARIO": 493.2, "% RECAUDO": 0.85, MONTO_BASE": 4500 },
    14: { "SIN SEGURO": 488, "CON SEGURO VIDA": 495.5, "SEGURO VIDA + RUTA": 502.1, "SEGURO VIDA + RUT + SOLIDARIO": 514.4, "% RECAUDO": 0.85, MONTO_BASE: 4500 },
    13: { "SIN SEGURO": 532, "CON SEGURO VIDA": 541.21, "SEGURO VIDA + RUTA": 537.29, "SEGURO VIDA + RUT + SOLIDARIO": 552.14, "% RECAUDO": 0.85, MONTO_BASE: 4500 },
    12: { "SIN SEGURO": 562, "CON SEGURO VIDA": 571.21, "SEGURO VIDA + RUTA": 576.5, "SEGURO VIDA + RUT + SOLIDARIO": 591.36, "% RECAUDO": 0.85, MONTO_BASE: 4500 }
  }
};

const modalidades = ["SIN SEGURO", "CON SEGURO VIDA", "SEGURO VIDA + RUTA", "SEGURO VIDA + RUT + SOLIDARIO"] as const;

export default function App() {
  const [actividad, setActividad] = React.useState<keyof typeof TARIFF>("INFORMAL");
  const plazos = React.useMemo(() => Object.keys(TARIFF[actividad]).map(Number).sort((a, b) => a - b), [actividad]);
  const [plazo, setPlazo] = React.useState<number>(plazos[0] ?? 12);
  const [modalidad, setModalidad] = React.useState<typeof modalidades[number]>(modalidades[0]);

  React.useEffect(() => {
    const first = Object.keys(TARIFF[actividad]).map(Number).sort((a, b) => a - b)[0];
    setPlazo(first);
    setModalidad(modalidades[0]);
  }, [actividad]);

  const fila = (TARIFF[actividad] ?? {})[plazo] ?? {};
  const cuota = Number(fila[modalidad] ?? 0);
  const recaudo = Number(fila["% RECAUDO"] ?? 0);
  const montoBase = Number(fila["MONTO_BASE"] ?? (actividad === "INFORMAL" ? 2500 : 4500));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>🔢 Simulador GNV – Cotizador</h1>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
        <div>
          <label>Actividad</label>
          <select value={actividad} onChange={(e) => setActividad(e.target.value as any)} style={{ width: "100%", padding: 8 }}>
            <option>INFORMAL</option>
            <option>FORMAL/APP</option>
          </select>
        </div>
        <div>
          <label>Plazo (meses)</label>
          <select value={plazo} onChange={(e) => setPlazo(Number(e.target.value))} style={{ width: "100%", padding: 8 }}>
            {plazos.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label>Modalidad</label>
          <select value={modalidad} onChange={(e) => setModalidad(e.target.value as any)} style={{ width: "100%", padding: 8 }}>
            {modalidades.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(4, minmax(0,1fr))", marginTop: 12 }}>
        <div style={{ background: "#f1f5f9", padding: 12, borderRadius: 10 }}>
          <div style={{ color: "#475569", fontSize: 12 }}>Actividad</div>
          <div style={{ fontWeight: 600 }}>{actividad}</div>
        </div>
        <div style={{ background: "#f1f5f9", padding: 12, borderRadius: 10 }}>
          <div style={{ color: "#475569", fontSize: 12 }}>Monto préstamo</div>
          <div style={{ fontWeight: 600 }}>S/ {montoBase.toFixed(2)}</div>
        </div>
        <div style={{ background: "#f1f5f9", padding: 12, borderRadius: 10 }}>
          <div style={{ color: "#475569", fontSize: 12 }}>Cuota</div>
          <div style={{ fontWeight: 600 }}>S/ {cuota.toFixed(2)}</div>
        </div>
        <div style={{ background: "#f1f5f9", padding: 12, borderRadius: 10 }}>
          <div style={{ color: "#475569", fontSize: 12 }}>% Recaudo</div>
          <div style={{ fontWeight: 600 }}>{(recaudo * 100).toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
}
