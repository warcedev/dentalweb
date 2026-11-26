import { useId, useState } from 'react'
import { History, Activity } from 'lucide-react'
import { Section } from './ui.jsx'

/* ───────────────────────── Odontograma ───────────────────────── */

export const STATES = {
  diag: { label: 'Diagnosticado', color: '#DC2626' },
  trat: { label: 'En tratamiento', color: '#EA580C' },
  done: { label: 'Tratado', color: '#2563EB' },
  fail: { label: 'Fallido', color: '#7C3AED' },
  follow: { label: 'En seguimiento', color: '#D97706' },
}

// Historia de ejemplo de un paciente ficticio: estado de cada pieza (FDI) en cada fecha.
const SNAPSHOTS = [
  { date: '12/03/2025', note: 'Primera consulta', teeth: { 16: 'diag', 24: 'diag', 36: 'diag', 46: 'done', 11: 'follow' } },
  { date: '18/08/2025', note: 'Durante el tratamiento', teeth: { 16: 'trat', 24: 'done', 36: 'trat', 46: 'done', 11: 'follow', 47: 'diag' } },
  { date: '10/02/2026', note: 'Último control', teeth: { 16: 'done', 24: 'done', 36: 'done', 46: 'done', 11: 'follow', 47: 'trat', 25: 'fail' } },
]

const UPPER = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
const LOWER = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

const kind = (n) => {
  const d = n % 10
  if (d <= 2) return 'incisor'
  if (d === 3) return 'canine'
  if (d <= 5) return 'premolar'
  return 'molar'
}
const WIDTH = { incisor: 26, canine: 28, premolar: 30, molar: 36 }
const CROWN_Y = 38

// Silueta anatómica simplificada (raíz arriba, corona abajo) dentro de una caja de ancho w y alto ~74.
function toothPath(type, w) {
  const p = (f) => (w * f).toFixed(1)
  switch (type) {
    case 'incisor':
      return `M${p(0.3)} 38 C${p(0.3)} 22 ${p(0.42)} 4 ${p(0.5)} 2 C${p(0.58)} 4 ${p(0.7)} 22 ${p(0.7)} 38 L${p(0.86)} 62 C${p(0.86)} 70 ${p(0.7)} 72 ${p(0.5)} 72 C${p(0.3)} 72 ${p(0.14)} 70 ${p(0.14)} 62 Z`
    case 'canine':
      return `M${p(0.3)} 38 C${p(0.28)} 20 ${p(0.42)} 2 ${p(0.5)} 0 C${p(0.58)} 2 ${p(0.72)} 20 ${p(0.7)} 38 L${p(0.88)} 58 Q${p(0.72)} 72 ${p(0.5)} 74 Q${p(0.28)} 72 ${p(0.12)} 58 Z`
    case 'premolar':
      return `M${p(0.24)} 38 C${p(0.22)} 22 ${p(0.38)} 6 ${p(0.5)} 4 C${p(0.62)} 6 ${p(0.78)} 22 ${p(0.76)} 38 L${p(0.92)} 60 C${p(0.92)} 70 ${p(0.74)} 72 ${p(0.5)} 72 C${p(0.26)} 72 ${p(0.08)} 70 ${p(0.08)} 60 Z`
    default:
      return `M${p(0.14)} 38 C${p(0.12)} 22 ${p(0.18)} 6 ${p(0.28)} 4 C${p(0.36)} 8 ${p(0.4)} 20 ${p(0.5)} 28 C${p(0.6)} 20 ${p(0.64)} 8 ${p(0.72)} 4 C${p(0.82)} 6 ${p(0.88)} 22 ${p(0.86)} 38 L${p(0.95)} 58 C${p(0.96)} 70 ${p(0.8)} 72 ${p(0.5)} 72 C${p(0.2)} 72 ${p(0.04)} 70 ${p(0.05)} 58 Z`
  }
}

function Arch({ teeth, lower, states, y, uid }) {
  const GAP = 3
  let x = 0
  const items = teeth.map((n, i) => {
    const t = kind(n)
    const w = WIDTH[t]
    const item = { n, t, w, x }
    x += w + GAP + (i === 7 ? 8 : 0) // separación en la línea media
    return item
  })
  const total = x - GAP
  const offset = (600 - total) / 2

  return items.map(({ n, t, w, x }) => {
    const state = states[n]
    const d = toothPath(t, w)
    const clip = `${uid}-c${n}`
    const tx = offset + x
    const transform = lower ? `translate(${tx} ${y + 74}) scale(1 -1)` : `translate(${tx} ${y})`
    const label = state ? `Pieza ${n}: ${STATES[state].label}` : `Pieza ${n}: sana`
    return (
      <g key={n}>
        <g transform={transform}>
          <title>{label}</title>
          <clipPath id={clip}>
            <path d={d} />
          </clipPath>
          <path d={d} className="fill-slate-100 dark:fill-neutral-700" />
          <g clipPath={`url(#${clip})`}>
            <rect
              x="0"
              y={CROWN_Y}
              width={w}
              height="40"
              className={state ? '' : 'fill-white dark:fill-neutral-200'}
              style={state ? { fill: STATES[state].color, transition: 'fill .35s' } : { transition: 'fill .35s' }}
            />
            <ellipse cx={w * 0.38} cy="52" rx={w * 0.14} ry="8" fill="white" opacity={state ? 0.25 : 0.7} />
          </g>
          <path d={d} fill="none" strokeWidth="1.2" className="stroke-slate-400 dark:stroke-neutral-500" />
        </g>
        <text
          x={tx + w / 2}
          y={lower ? y - 8 : y + 92}
          textAnchor="middle"
          className={`text-[10px] font-semibold ${state ? 'fill-slate-800 dark:fill-white' : 'fill-slate-400 dark:fill-neutral-500'}`}
        >
          {n}
        </text>
      </g>
    )
  })
}

function Odontogram() {
  const [step, setStep] = useState(SNAPSHOTS.length - 1)
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const snap = SNAPSHOTS[step]

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Odontograma anatómico FDI</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-neutral-400">
            Mové la línea de tiempo para ver la boca del paciente en otra fecha.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">
          Paciente de ejemplo
        </span>
      </div>

      <svg
        viewBox="0 0 600 220"
        className="mt-6 w-full"
        role="img"
        aria-label={`Odontograma al ${snap.date}: ${Object.entries(snap.teeth)
          .map(([n, s]) => `pieza ${n} ${STATES[s].label.toLowerCase()}`)
          .join(', ')}`}
      >
        <Arch teeth={UPPER} states={snap.teeth} y={4} uid={uid} />
        <line x1="20" x2="580" y1="108" y2="108" strokeDasharray="4 4" className="stroke-slate-200 dark:stroke-neutral-700" />
        <Arch teeth={LOWER} states={snap.teeth} y={128} lower uid={uid} />
      </svg>

      {/* línea de tiempo */}
      <div className="mt-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-neutral-200">
          <History className="h-4 w-4 text-primary" aria-hidden="true" />
          Línea de tiempo
        </div>
        <input
          type="range"
          min="0"
          max={SNAPSHOTS.length - 1}
          step="1"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="mt-3 w-full accent-[var(--color-primary)]"
          aria-label="Fecha del odontograma"
          aria-valuetext={`${snap.date}, ${snap.note}`}
        />
        <div className="mt-1 grid grid-cols-3 text-xs">
          {SNAPSHOTS.map((s, i) => (
            <button
              key={s.date}
              type="button"
              onClick={() => setStep(i)}
              className={`rounded-md py-1 ${i === 0 ? 'text-left' : i === SNAPSHOTS.length - 1 ? 'text-right' : 'text-center'} ${
                i === step ? 'font-bold text-primary' : 'text-slate-500 dark:text-neutral-400'
              }`}
            >
              {s.date}
              <span className="block font-normal">{s.note}</span>
            </button>
          ))}
        </div>
      </div>

      {/* leyenda */}
      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-5 text-sm dark:border-neutral-800">
        {Object.entries(STATES).map(([k, s]) => (
          <li key={k} className="flex items-center gap-2 text-slate-700 dark:text-neutral-300">
            <span className="h-3.5 w-3.5 rounded" style={{ background: s.color }} aria-hidden="true" />
            {s.label}
          </li>
        ))}
        <li className="flex items-center gap-2 text-slate-700 dark:text-neutral-300">
          <span className="h-3.5 w-3.5 rounded border border-slate-300 bg-white dark:border-neutral-500 dark:bg-neutral-200" aria-hidden="true" />
          Sano
        </li>
      </ul>
    </div>
  )
}

export default function Clinical() {
  return (
    <Section
      id="odontograma"
      eyebrow="Odontograma"
      title="La boca del paciente, clara de un vistazo"
      intro="Dientes dibujados de forma anatómica, con un color para cada estado. Y una línea de tiempo para volver a cualquier fecha pasada."
    >
      <div className="mx-auto max-w-4xl">
        <Odontogram />
      </div>
      <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-slate-600 dark:text-neutral-400">
        <Activity className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        Cada cambio queda registrado con fecha: nada se pierde ni se sobrescribe.
      </p>
    </Section>
  )
}
