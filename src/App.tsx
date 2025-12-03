\
import React from 'react'

type TariffRow = Record<string, number>

const TARIFF: Record<string, Record<number, TariffRow>> = {
  "INFORMAL": {
    24: {"SIN SEGURO":202, "CON SEGURO VIDA":207.10, "SEGURO VIDA + RUTA":212.10, "SEGURO VIDA + RUT + SOLIDARIO":228.00, "% RECAUDO":0.50, "MONTO_BASE":2500},
    23: {"SIN SEGURO":206, "CON SEGURO VIDA":211.10, "SEGURO VIDA + RUTA":216.20, "SEGURO VIDA + RUT + SOLIDARIO":231.70, "% RECAUDO":0.50, "MONTO_BASE":2500},
    22: {"SIN SEGURO":211, "CON SEGURO VIDA":215.50, "SEGURO VIDA + RUTA":215.50, "SEGURO VIDA + RUT + SOLIDARIO":230.70, "% RECAUDO":0.50, "MONTO_BASE":2500},
    21: {"SIN SEGURO":216, "CON SEGURO VIDA":220.50, "SEGURO VIDA + RUTA":225.80, "SEGURO VIDA + RUT + SOLIDARIO":240.60, "% RECAUDO":0.55, "MONTO_BASE":2500},
    20: {"SIN SEGURO":221, "CON SEGURO VIDA":226.00, "SEGURO VIDA + RUTA":231.40, "SEGURO VIDA + RUT + SOLIDARIO":245.90, "% RECAUDO":0.55, "MONTO_BASE":2500},
    19: {"SIN SEGURO":227, "CON SEGURO VIDA":232.10, "SEGURO VIDA + RUTA":237.70, "SEGURO VIDA + RUT + SOLIDARIO":251.80, "% RECAUDO":0.55, "MONTO_BASE":2500},
    18: {"SIN SEGURO":235, "CON SEGURO VIDA":239.00, "SEGURO VIDA + RUTA":244.80, "SEGURO VIDA + RUT + SOLIDARIO":258.50, "% RECAUDO":0.55, "MONTO_BASE":2500},
    17: {"SIN SEGURO":242, "CON SEGURO VIDA":246.90, "SEGURO VIDA + RUTA":252.80, "SEGURO VIDA + RUT + SOLIDARIO":266.20, "% RECAUDO":0.60, "MONTO_BASE":2500},
    16: {"SIN SEGURO":252, "CON SEGURO VIDA":255.80, "SEGURO VIDA + RUTA":261.90, "SEGURO VIDA + RUT + SOLIDARIO":275.00, "% RECAUDO":0.60, "MONTO_BASE":2500},
    15: {"SIN SEGURO":262, "CON SEGURO VIDA":266.00, "SEGURO VIDA + RUTA":272.40, "SEGURO VIDA + RUT + SOLIDARIO":285.00, "% RECAUDO":0.80, "MONTO_BASE":2500},
    14: {"SIN SEGURO":272, "CON SEGURO VIDA":277.80, "SEGURO VIDA + RUTA":284.50, "SEGURO VIDA + RUT + SOLIDARIO":296.90, "% RECAUDO":0.85, "MONTO_BASE":2500},
    13: {"SIN SEGURO":262, "CON SEGURO VIDA":266.00, "SEGURO VIDA + RUTA":272.40, "SEGURO VIDA + RUT + SOLIDARIO":310.00, "% RECAUDO":0.85, "MONTO_BASE":2500},
    12: {"SIN SEGURO":315, "CON SEGURO VIDA":319.65, "SEGURO VIDA + RUTA":324.96, "SEGURO VIDA + RUT + SOLIDARIO":341.03, "% RECAUDO":0.85, "MONTO_BASE":2500}
  },
  "FORMAL/APP": {
    30: {"SIN SEGURO":325, "CON SEGURO VIDA":336.30, "SEGURO VIDA + RUTA":340.80, "SEGURO VIDA + RUT + SOLIDARIO":358.70, "% RECAUDO":0.50, "MONTO_BASE":4500},
    29: {"SIN SEGURO":330, "CON SEGURO VIDA":340.40, "SEGURO VIDA + RUTA":345.00, "SEGURO VIDA + RUT + SOLIDARIO":362.50, "% RECAUDO":0.50, "MONTO_BASE":4500},
    28: {"SIN SEGURO":334, "CON SEGURO VIDA":344.90, "SEGURO VIDA + RUTA":349.50, "SEGURO VIDA + RUT + SOLIDARIO":366.70, "% RECAUDO":0.50, "MONTO_BASE":4500},
    27: {"SIN SEGURO":340, "CON SEGURO VIDA":349.90, "SEGURO VIDA + RUTA":354.50, "SEGURO VIDA + RUT + SOLIDARIO":371.30, "% RECAUDO":0.50, "MONTO_BASE":4500},
    26: {"SIN SEGURO":345, "CON SEGURO VIDA":355.30, "SEGURO VIDA + RUTA":360.10, "SEGURO VIDA + RUT + SOLIDARIO":376.50, "% RECAUDO":0.50, "MONTO_BASE":4500},
    25: {"SIN SEGURO":351, "CON SEGURO VIDA":361.30, "SEGURO VIDA + RUTA":366.10, "SEGURO VIDA + RUT + SOLIDARIO":382.50, "% RECAUDO":0.50, "MONTO_BASE":4500},
    24: {"SIN SEGURO":358, "CON SEGURO VIDA":367.80, "SEGURO VIDA + RUTA":372.70, "SEGURO VIDA + RUT + SOLIDARIO":388.40, "% RECAUDO":0.50, "MONTO_BASE":4500},
    23: {"SIN SEGURO":366, "CON SEGURO VIDA":375.00, "SEGURO VIDA + RUTA":380.00, "SEGURO VIDA + RUT + SOLIDARIO":395.40, "% RECAUDO":0.50, "MONTO_BASE":4500},
    22: {"SIN SEGURO":374, "CON SEGURO VIDA":383.00, "SEGURO VIDA + RUTA":388.20, "SEGURO VIDA + RUT + SOLIDARIO":403.20, "% RECAUDO":0.50, "MONTO_BASE":4500},
    21: {"SIN SEGURO":383, "CON SEGURO VIDA":392.00, "SEGURO VIDA + RUTA":397.20, "SEGURO VIDA + RUT + SOLIDARIO":411.00, "% RECAUDO":0.50, "MONTO_BASE":4500},
    20: {"SIN SEGURO":393, "CON SEGURO VIDA":402.00, "SEGURO VIDA + RUTA":407.00, "SEGURO VIDA + RUT + SOLIDARIO":421.60, "% RECAUDO":0.55, "MONTO_BASE":4500},
    19: {"SIN SEGURO":404, "CON SEGURO VIDA":413.00, "SEGURO VIDA + RUTA":418.50, "SEGURO VIDA + RUT + SOLIDARIO":432.50, "% RECAUDO":0.55, "MONTO_BASE":4500},
    18: {"SIN SEGURO":417, "CON SEGURO VIDA":425.60, "SEGURO VIDA + RUTA":431.20, "SEGURO VIDA + RUT + SOLIDARIO":444.90, "% RECAUDO":0.80, "MONTO_BASE":4500},
    17: {"SIN SEGURO":431, "CON SEGURO VIDA":439.70, "SEGURO VIDA + RUTA":445.50, "SEGURO VIDA + RUT + SOLIDARIO":458.80, "% RECAUDO":0.85, "MONTO_BASE":4500},
    16: {"SIN SEGURO":448, "CON SEGURO VIDA":455.80, "SEGURO VIDA + RUTA":461.90, "SEGURO VIDA + RUT + SOLIDARIO":474.80, "% RECAUDO":0.85, "MONTO_BASE":4500},
    15: {"SIN SEGURO":466, "CON SEGURO VIDA":474.20, "SEGURO VIDA + RUTA":480.50, "SEGURO VIDA + RUT + SOLIDARIO":493.20, "% RECAUDO":0.85, "MONTO_BASE":4500},
    14: {"SIN SEGURO":488, "CON SEGURO VIDA":495.50, "SEGURO VIDA + RUTA":502.10, "SEGURO VIDA + RUT + SOLIDARIO":514.40, "% RECAUDO":0.85, "MONTO_BASE":4500},
    13: {"SIN SEGURO":532, "CON SEGURO VIDA":541.21, "SEGURO VIDA + RUTA":537.29, "SEGURO VIDA + RUT + SOLIDARIO":552.14, "% RECAUDO":0.85, "MONTO_BASE":4500},
    12: {"SIN SEGURO":562, "CON SEGURO VIDA":571.21, "SEGURO VIDA + RUTA":576.50, "SEGURO VIDA + RUT + SOLIDARIO":591.36, "% RECAUDO":0.85, "MONTO_BASE":4500}
  }
}

const modalidades = ["SIN SEGURO","CON SEGURO VIDA","SEGURO VIDA + RUTA","SEGURO VIDA + RUT + SOLIDARIO"] as const

export default function App() {
  const [actividad, setActividad] = React.useState<keyof typeof TARIFF>("INFORMAL")
  const [plazo, setPlazo] = React.useState<number>(12)
  const [modalidad, setModalidad] = React.useState<typeof modalidades[number]>("SIN SEGURO")

  const plazos = React.useMemo(()=>Object.keys(TARIFF[actividad]).map(Number).sort((a,b)=>a-b),[actividad])

  React.useEffect(()=>{
    const first = Object.keys(TARIFF[actividad]).map(Number).sort((a,b)=>a-b)[0]
    setPlazo(first)
    setModalidad("SIN SEGURO")
  },[actividad])

  const dataRow = (TARIFF[actividad] ?? {})[plazo] ?? {}
  const cuota = Number(dataRow[modalidad] ?? 0)
  const recaudo = Number(dataRow["% RECAUDO"] ?? 0)
  const monto = Number(dataRow["MONTO_BASE"] ?? (actividad==="INFORMAL"?2500:4500))

  return (
    <div className="container">
      <div className="title">🔢 Simulador GNV – Cotizador</div>
      <div className="card grid grid-2" style={{marginTop:'12px'}}>
        <div>
          <label>Actividad</label>
          <select value={actividad} onChange={e=>setActividad(e.target.value as any)}>
            <option>INFORMAL</option>
            <option>FORMAL/APP</option>
          </select>
        </div>
        <div>
          <label>Plazo (meses)</label>
          <select value={plazo} onChange={e=>setPlazo(Number(e.target.value))}>
            {plazos.map(p=>(<option key={p} value={p}>{p}</option>))}
          </select>
        </div>
        <div style={{gridColumn:'1 / -1'}}>
          <label>Modalidad</label>
          <select value={modalidad} onChange={e=>setModalidad(e.target.value as any)}>
            {modalidades.map(m => (<option key={m} value={m}>{m}</option>))}
          </select>
        </div>
      </div>

      <div className="grid grid-4" style={{marginTop:'12px'}}>
        <div className="pill">
          <div style={{fontSize:12,color:'#475569'}}>Actividad</div>
          <div style={{fontWeight:600}}>{actividad}</div>
        </div>
        <div className="pill">
          <div style={{fontSize:12,color:'#475569'}}>Monto préstamo</div>
          <div style={{fontWeight:600}}>S/ {monto.toFixed(2)}</div>
        </div>
        <div className="pill">
          <div style={{fontSize:12,color:'#475569'}}>Cuota</div>
          <div style={{fontWeight:600}}>S/ {cuota.toFixed(2)}</div>
        </div>
        <div className="pill">
          <div style={{fontSize:12,color:'#475569'}}>% Recaudo</div>
          <div style={{fontWeight:600}}>{(recaudo*100).toFixed(0)}%</div>
        </div>
      </div>
    </div>
  )
}
