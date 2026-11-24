import { CalendarCheck, Wallet, FileDown, CheckCircle2 } from 'lucide-react'
import { Section, ToothIcon } from './ui.jsx'
import { gs } from '../config.js'

const POINTS = [
  [CalendarCheck, 'Sus turnos', 'Ve sus próximas citas sin tener que llamar al consultorio.'],
  [Wallet, 'Su saldo', 'Sabe cuánto pagó y cuánto le queda, cuota por cuota.'],
  [ToothIcon, 'Su odontograma', 'Entiende mejor su tratamiento viendo su propia boca.'],
  [FileDown, 'Recetas y recibos', 'Descarga sus recetas, indicaciones y recibos en PDF.'],
]

function Phone() {
  return (
    <div className="relative mx-auto w-[17rem]" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-sky/30 to-royal/30 blur-2xl" />
      <div className="relative rounded-[2.5rem] border-[10px] border-navy bg-white p-4 shadow-2xl dark:border-neutral-700">
        <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-slate-200" />
        <p className="text-xs text-slate-500">Hola,</p>
        <p className="text-lg font-bold text-slate-900">Laura Benítez</p>

        <div className="mt-4 rounded-2xl bg-teal p-4 text-white">
          <p className="text-[11px] font-medium opacity-90">Próximo turno</p>
          <p className="mt-1 text-base font-bold">Jueves 26/03/2026 · 09:30</p>
          <p className="text-xs opacity-90">Control · Dra. Ramírez</p>
          <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
            <CheckCircle2 className="h-3 w-3" /> Confirmado
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-slate-200 p-3">
            <p className="text-[10px] text-slate-500">Saldo</p>
            <p className="text-sm font-bold text-slate-900">{gs(450000)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3">
            <p className="text-[10px] text-slate-500">Cuotas</p>
            <p className="text-sm font-bold text-slate-900">3 de 4</p>
          </div>
        </div>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Documentos</p>
        {[
          ['Receta', '10/02/2026'],
          ['Recibo de pago', '10/02/2026'],
          ['Indicaciones', '18/08/2025'],
        ].map(([n, d]) => (
          <div key={n} className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
            <div>
              <p className="text-xs font-semibold text-slate-800">{n}</p>
              <p className="text-[10px] text-slate-500">{d}</p>
            </div>
            <span className="rounded-md bg-diag/10 px-1.5 py-0.5 text-[9px] font-bold text-diag">PDF</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Portal() {
  return (
    <Section id="portal" tone="soft">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Phone />
          <p className="mt-6 text-center text-xs text-slate-400 dark:text-neutral-500">Vista ilustrativa con datos ficticios</p>
        </div>
        <div className="order-1 lg:order-2">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Portal del paciente</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Tus pacientes, informados sin llamar al consultorio
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-neutral-400">
            Cada paciente tiene su propio acceso para consultar lo suyo. Menos consultas por teléfono para la
            recepción y pacientes que entienden mejor su tratamiento.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {POINTS.map(([Icon, t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-neutral-400">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
