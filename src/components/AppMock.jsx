import { CalendarDays, Users, Wallet, FolderOpen, TrendingUp, AlertTriangle, Search } from 'lucide-react'
import { ToothIcon } from './ui.jsx'
import { gs } from '../config.js'

const NAV = [
  [CalendarDays, 'Agenda', true],
  [Users, 'Pacientes'],
  [ToothIcon, 'Odontograma'],
  [Wallet, 'Cobros'],
  [FolderOpen, 'Documentos'],
  [TrendingUp, 'Reportes'],
]

const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00']

// Turnos de ejemplo (pacientes ficticios)
const APPTS = [
  { col: 0, start: 0, len: 1, name: 'Laura Benítez', what: 'Limpieza semestral', state: 'Confirmado', tone: 'teal' },
  { col: 0, start: 1.5, len: 1.5, name: 'Carlos Ortiz', what: 'Endodoncia · pieza 36', state: 'En sala', tone: 'orange' },
  { col: 0, start: 3.5, len: 1, name: 'Sofía Duarte', what: 'Control', state: 'Pendiente', tone: 'slate' },
  { col: 1, start: 0.5, len: 1, name: 'Miguel Rojas', what: 'Presupuesto', state: 'Confirmado', tone: 'teal' },
  { col: 1, start: 2, len: 2, name: 'Ana Giménez', what: 'Restauración · 14, 15', state: 'Confirmado', tone: 'blue' },
]

const TONES = {
  teal: 'border-l-teal bg-teal/10',
  orange: 'border-l-trat bg-trat/10',
  blue: 'border-l-done bg-done/10',
  slate: 'border-l-slate-400 bg-slate-100',
}

export default function AppMock() {
  const ROW = 44
  return (
    <figure className="relative" aria-label="Vista de ejemplo de la agenda de DentalWeb">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky/40 to-royal/40 opacity-40 blur-2xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl ring-1 ring-white/20" aria-hidden="true">
        {/* barra de ventana */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-xs font-semibold text-slate-500">
            Dental<span className="text-brand">Web</span>
          </span>
          <span className="ml-auto hidden items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-400 sm:flex">
            <Search className="h-3 w-3" /> Buscar paciente…
          </span>
        </div>

        <div className="flex">
          {/* barra lateral */}
          <div className="hidden w-36 shrink-0 border-r border-slate-200 bg-slate-50/60 p-2 sm:block">
            {NAV.map(([Icon, label, active]) => (
              <div
                key={label}
                className={`mb-0.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium ${
                  active ? 'bg-teal text-white' : 'text-slate-600'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
            ))}
          </div>

          {/* agenda */}
          <div className="min-w-0 flex-1 p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-slate-900">Agenda</p>
                <p className="text-[11px] text-slate-500">Lunes 16/03/2026</p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                <CalendarDays className="h-3 w-3" /> 5 turnos hoy
              </span>
            </div>

            <div className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-2 text-[10px] font-semibold text-slate-500">
              <span />
              <span className="truncate">Dra. Ramírez · Cons. 1</span>
              <span className="truncate">Dr. Acosta · Cons. 2</span>
            </div>

            <div className="relative mt-1.5 grid grid-cols-[2.5rem_1fr_1fr] gap-x-2" style={{ height: ROW * HOURS.length }}>
              {HOURS.map((h, i) => (
                <div
                  key={h}
                  className="col-span-3 border-t border-dashed border-slate-200 text-[10px] text-slate-400"
                  style={{ position: 'absolute', top: i * ROW, left: 0, right: 0 }}
                >
                  {h}
                </div>
              ))}
              {APPTS.map((a, i) => (
                <div
                  key={i}
                  className={`absolute overflow-hidden rounded-md border-l-[3px] px-1.5 py-1 ${TONES[a.tone]}`}
                  style={{
                    top: a.start * ROW + 2,
                    height: a.len * ROW - 4,
                    left: `calc(2.5rem + 0.5rem + ${a.col} * ((100% - 3.5rem) / 2 + 0.5rem))`,
                    width: 'calc((100% - 3.5rem) / 2)',
                  }}
                >
                  <p className="truncate text-[11px] font-semibold text-slate-900">{a.name}</p>
                  <p className="truncate text-[10px] text-slate-600">{a.what}</p>
                  {a.len > 1 && <p className="mt-0.5 truncate text-[9px] font-medium text-slate-500">{a.state}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* ficha rápida */}
          <div className="hidden w-44 shrink-0 border-l border-slate-200 p-3 md:block">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Paciente</p>
            <p className="mt-1 text-sm font-bold text-slate-900">Carlos Ortiz</p>
            <p className="text-[10px] text-slate-500">Nac. 04/07/1985</p>
            <div className="mt-2 flex items-start gap-1.5 rounded-md bg-diag/10 px-2 py-1.5 text-[10px] font-semibold text-diag">
              <AlertTriangle className="mt-px h-3 w-3 shrink-0" />
              Alergia: penicilina
            </div>
            <div className="mt-1.5 rounded-md bg-follow/10 px-2 py-1.5 text-[10px] font-semibold text-[#92400E]">
              Hipertensión
            </div>
            <div className="mt-3 border-t border-slate-100 pt-2">
              <p className="text-[10px] text-slate-500">Saldo</p>
              <p className="text-sm font-bold text-slate-900">{gs(850000)}</p>
              <p className="mt-1 text-[10px] text-slate-500">Cuota 2 de 4 · vence 20/03/2026</p>
            </div>
            <div className="mt-3 flex gap-1">
              {['#DC2626', '#EA580C', '#2563EB', '#2563EB', '#D97706'].map((c, i) => (
                <span key={i} className="h-5 flex-1 rounded-sm" style={{ background: c, opacity: 0.85 }} />
              ))}
            </div>
            <p className="mt-1 text-[9px] text-slate-400">Odontograma resumido</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-slate-400">Vista ilustrativa con datos ficticios</figcaption>
    </figure>
  )
}
