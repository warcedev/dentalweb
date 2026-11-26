import { UserCog, History, Lock, DatabaseBackup } from 'lucide-react'
import { Section } from './ui.jsx'

const ROLES = ['Administrador', 'Odontólogo', 'Recepción']

const ITEMS = [
  [UserCog, 'Usuarios con roles', 'Cada persona ve y hace solo lo que le corresponde.'],
  [History, 'Auditoría de todo', 'Queda registrado quién hizo cada cosa y cuándo.'],
  [Lock, 'Datos clínicos cifrados', 'Las notas clínicas se guardan cifradas.'],
  [DatabaseBackup, 'Respaldos', 'Copias de seguridad para no perder la información.'],
]

export default function Security() {
  return (
    <Section
      id="seguridad"
      tone="soft"
      eyebrow="Seguridad"
      title="La información de tus pacientes, cuidada"
      intro="Datos sensibles merecen cuidado. DentalWeb controla quién accede a qué y deja registro de cada acción."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(([Icon, t, d]) => (
          <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-sky dark:bg-navy-2">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-neutral-400">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center sm:flex-row dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-medium text-slate-700 dark:text-neutral-300">Cada usuario entra con su cuenta y uno de estos roles:</p>
        <ul className="flex flex-wrap justify-center gap-2">
          {ROLES.map((r) => (
            <li key={r} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {r}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
