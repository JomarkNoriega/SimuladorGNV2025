import React from 'react'
import { Calculator } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'

const TARIFF: Record<string, Record<number, Record<string, number>>> = {
  "INFORMAL": {
    24: {"SIN SEGURO":202,"CON SEGURO VIDA":207.1,"SEGURO VIDA + RUTA":212.1,"SEGURO VIDA + RUT + SOLIDARIO":228,"% RECAUDO":0.5,"MONTO_BASE":2500},
    23: {"SIN SEGURO":206,"CON SEGURO VIDA":211.1,"SEGURO VIDA + RUTA":216.2,"SEGURO VIDA + RUT + SOLIDARIO":231.7,"% RECAUDO":0.5,"MONTO_BASE":2500},
    22: {"SIN SEGURO":211,"CON SEGURO VIDA":215.5,"SEGURO VIDA + RUTA":215.5,"SEGURO VIDA + RUT + SOLIDARIO":230.7,"% RECAUDO":0.5,"MONTO_BASE":2500},
    21: {"SIN SEGURO":216,"CON SEGURO VIDA":220.5,"SEGURO VIDA + RUTA":225.8,"SEGURO VIDA + RUT + SOLIDARIO":240.6,"% RECAUDO":0.55,"MONTO_BASE":2500},
    20: {"SIN SEGURO":221,"CON SEGURO VIDA":226,"SEGURO VIDA + RUTA":231.4,"SEGURO VIDA + RUT + SOLIDARIO":245.9,"% RECAUDO":0.55,"MONTO_BASE":2500},
    19: {"SIN SEGURO":227,"CON SEGURO VIDA":232.1,"SEGURO VIDA + RUTA":237.7,"SEGURO VIDA + RUT + SOLIDARIO":251.8,"% RECAUDO":0.55,"MONTO_BASE":2500},
    18: {"SIN SEGURO":235,"CON SEGURO VIDA":239,"SEGURO VIDA + RUTA":244.8,"SEGURO VIDA + RUT + SOLIDARIO":258.5,"% RECAUDO":0.55,"MONTO_BASE":2500},
    17: {"SIN SEGURO":242,"CON SEGURO VIDA":246.9,"SEGURO VIDA + RUTA":252.8,"SEGURO VIDA + RUT + SOLIDARIO":266.2,"% RECAUDO":0.6,"MONTO_BASE":2500},
    16: {"SIN SEGURO":252,"CON SEGURO VIDA":255.8,"SEGURO VIDA + RUTA":261.9,"SEGURO VIDA + RUT + SOLIDARIO":275,"% RECAUDO":0.6,"MONTO_BASE":2500},
    15: {"SIN SEGURO":262,"CON SEGURO VIDA":266,"SEGURO VIDA + RUTA":272.4,"SEGURO VIDA + RUT + SOLIDARIO":283,"% RECAUDO":0.75,"MONTO_BASE":2500},
    14: {"SIN SEGURO":272,"CON SEGURO VIDA":277.8,"SEGURO VIDA + RUTA":284.5,"SEGURO VIDA + RUT + SOLIDARIO":296.9,"% RECAUDO":0.75,"MONTO_BASE":2500},
    13: {"SIN SEGURO":262,"CON SEGURO VIDA":266,"SEGURO VIDA + RUTA":272.4,"SEGURO VIDA + RUT + SOLIDARIO":308.8,"% RECAUDO":0.75,"MONTO_BASE":2500},
    12: {"SIN SEGURO":315,"CON SEGURO VIDA":319.65,"SEGURO VIDA + RUTA":324.96,"SEGURO VIDA + RUT + SOLIDARIO":340.76,"% RECAUDO":0.75,"MONTO_BASE":2500}
  },
  "FORMAL/APP": {
    30: {"SIN SEGURO":325,"CON SEGURO VIDA":336.3,"SEGURO VIDA + RUTA":340.8,"SEGURO VIDA + RUT + SOLIDARIO":358.7,"% RECAUDO":0.5,"MONTO_BASE":4500},
    29: {"SIN SEGURO":330,"CON SEGURO VIDA":340.4,"SEGURO VIDA + RUTA":345,"SEGURO VIDA + RUT + SOLIDARIO":362.5,"% RECAUDO":0.5,"MONTO_BASE":4500},
    28: {"SIN SEGURO":334,"CON SEGURO VIDA":344.9,"SEGURO VIDA + RUTA":349.5,"SEGURO VIDA + RUT + SOLIDARIO":366.7,"% RECAUDO":0.5,"MONTO_BASE":4500},
    27: {"SIN SEGURO":340,"CON SEGURO VIDA":349.9,"SEGURO VIDA + RUTA":354.5,"SEGURO VIDA + RUT + SOLIDARIO":371.3,"% RECAUDO":0.5,"MONTO_BASE":4500},
    26: {"SIN SEGURO":345,"CON SEGURO VIDA":355.3,"SEGURO VIDA + RUTA":360.1,"SEGURO VIDA + RUT + SOLIDARIO":376.5,"% RECAUDO":0.5,"MONTO_BASE":4500},
    25: {"SIN SEGURO":351,"CON SEGURO VIDA":361.3,"SEGURO VIDA + RUTA":366.1,"SEGURO VIDA + RUT + SOLIDARIO":382.5,"% RECAUDO":0.5,"MONTO_BASE":4500},
    24: {"SIN SEGURO":358,"CON SEGURO VIDA":367.8,"SEGURO VIDA + RUTA":372.7,"SEGURO VIDA + RUT + SOLIDARIO":388.4,"% RECAUDO":0.5,"MONTO_BASE":4500},
    23: {"SIN SEGURO":366,"CON SEGURO VIDA":375,"SEGURO VIDA + RUTA":380,"SEGURO VIDA + RUT + SOLIDARIO":395.4,"% RECAUDO":0.5,"MONTO_BASE":4500},
    22: {"SIN SEGURO":374,"CON SEGURO VIDA":383,"SEGURO VIDA + RUTA":388.2,"SEGURO VIDA + RUT + SOLIDARIO":403.2,"% RECAUDO":0.5,"MONTO_BASE":4500},
    21: {"SIN SEGURO":383,"CON SEGURO VIDA":392,"SEGURO VIDA + RUTA":397.2,"SEGURO VIDA + RUT + SOLIDARIO":411,"% RECAUDO":0.5,"MONTO_BASE":4500},
    20: {"SIN SEGURO":393,"CON SEGURO VIDA":402,"SEGURO VIDA + RUTA":407,"SEGURO VIDA + RUT + SOLIDARIO":421.6,"% RECAUDO":0.55,"MONTO_BASE":4500},
    19: {"SIN SEGURO":404,"CON SEGURO VIDA":413,"SEGURO VIDA + RUTA":418.5,"SEGURO VIDA + RUT + SOLIDARIO":432.5,"% RECAUDO":0.55,"MONTO_BASE":4500},
    18: {"SIN SEGURO":417,"CON SEGURO VIDA":425.6,"SEGURO VIDA + RUTA":431.2,"SEGURO VIDA + RUT + SOLIDARIO":444.9,"% RECAUDO":0.55,"MONTO_BASE":4500},
    17: {"SIN SEGURO":431,"CON SEGURO VIDA":439.7,"SEGURO VIDA + RUTA":445.5,"SEGURO VIDA + RUT + SOLIDARIO":458.8,"% RECAUDO":0.55,"MONTO_BASE":4500},
    16: {"SIN SEGURO":448,"CON SEGURO VIDA":455.8,"SEGURO VIDA + RUTA":461.9,"SEGURO VIDA + RUT + SOLIDARIO":474.8,"% RECAUDO":0.6,"MONTO_BASE":4500},
    15: {"SIN SEGURO":466,"CON SEGURO VIDA":474.2,"SEGURO VIDA + RUTA":480.5,"SEGURO VIDA + RUT + SOLIDARIO":493.2,"% RECAUDO":0.6,"MONTO_BASE":4500},
    14: {"SIN SEGURO":488,"CON SEGURO VIDA":495.5,"SEGURO VIDA + RUTA":502.1,"SEGURO VIDA + RUT + SOLIDARIO":514.4,"% RECAUDO":0.65,"MONTO_BASE":4500},
    13: {"SIN SEGURO":532,"CON SEGURO VIDA":541.21,"SEGURO VIDA + RUTA":537.29,"SEGURO VIDA + RUT + SOLIDARIO":552.14,"% RECAUDO":0.7,"MONTO_BASE":4500},
    12: {"SIN SEGURO":562,"CON SEGURO VIDA":571.21,"SEGURO VIDA + RUTA":576.5,"SEGURO VIDA + RUT + SOLIDARIO":591.36,"% RECAUDO":0.7,"MONTO_BASE":4500}
  }
};

const modalidades = ["SIN SEGURO","CON SEGURO VIDA","SEGURO VIDA + RUTA","SEGURO VIDA + RUT + SOLIDARIO"] as const;
const defaultMonto: Record<string, number> = { "INFORMAL": 2500, "FORMAL/APP": 4500 }

export default function App(){
  const [actividad, setActividad] = React.useState<keyof typeof TARIFF>('INFORMAL')
  const plazos = React.useMemo(()=>Object.keys(TARIFF[actividad]).map(Number).sort((a,b)=>a-b),[actividad])
  const [plazo, setPlazo] = React.useState<number>(plazos[0] ?? 12)
  const [modalidad, setModalidad] = React.useState<typeof modalidades[number]>(modalidades[0])

  React.useEffect(()=>{
    const first = Object.keys(TARIFF[actividad]).map(Number).sort((a,b)=>a-b)[0]
    if(first) setPlazo(first)
    setModalidad(modalidades[0])
  },[actividad])

  const cuota = (TARIFF[actividad]?.[plazo] as any)?.[modalidad] ?? 0
  const recaudo = (TARIFF[actividad]?.[plazo] as any)?.["% RECAUDO"] ?? 0
  const monto = defaultMonto[actividad]

  return (
    <div className="container">
      <h1><Calculator size={24}/> Simulador GNV – Cotizador</h1>
      <div className="card grid grid-4">
        <div>
          <label>Actividad</label>
          <select value={actividad} onChange={e=>setActividad(e.target.value as any)}>
            <option value="INFORMAL">INFORMAL</option>
            <option value="FORMAL/APP">FORMAL/APP</option>
          </select>
          <p className="muted" style={{marginTop:6}}>Monto sugerido: <b>S/ {monto.toLocaleString('es-PE')}</b></p>
        </div>

        <div>
          <label>Plazo (meses)</label>
          <select value={String(plazo)} onChange={e=>setPlazo(Number(e.target.value))}>
            {plazos.map(p=> <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div>
          <label>Modalidad</label>
          <select value={modalidad} onChange={e=>setModalidad(e.target.value as any)}>
            {modalidades.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="grid grid-2" style={{gridColumn:'1 / -1'}}>
          <div className="kpi">
            <p className="muted">Actividad</p>
            <p><b>{actividad}</b></p>
          </div>
          <div className="kpi">
            <p className="muted">Monto préstamo</p>
            <p><b>S/ {monto.toLocaleString('es-PE')}</b></p>
          </div>
          <div className="kpi">
            <p className="muted">Cuota</p>
            <p><b>S/ {cuota.toFixed(2)}</b></p>
          </div>
          <div className="kpi">
            <p className="muted">% Recaudo</p>
            <p><b>{(recaudo*100).toFixed(0)}%</b></p>
          </div>
        </div>
      </div>

      <div style={{height: 300, marginTop:16}} className="card">
        <p className="muted" style={{marginBottom:8}}>Evolución de cuota por plazo ({actividad} – {modalidad})</p>
        <div style={{height: 240}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={plazos.map(p=>({plazo:p, cuota:(TARIFF[actividad] as any)[p][modalidad]}))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plazo" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cuota" name="Cuota" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
