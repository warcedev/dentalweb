import { CalendarX2, FileStack, Calculator, FileSearch, ArrowRight } from 'lucide-react'
import { Section } from './ui.jsx'

const ITEMS = [
  {
    icon: CalendarX2,
    pain: 'Turnos superpuestos y anotados en varios lugares',
    fix: 'Una sola agenda por profesional y consultorio que no deja cargar dos turnos a la misma hora.',
  },
  {
    icon: FileStack,
    pain: 'Fichas en papel difíciles de encontrar',
    fix: 'La historia clínica completa a un clic, con alergias y riesgos siempre a la vista.',
  },
  {
    icon: Calculator,
    pain: 'No saber al instante cuánto debe cada paciente',
    fix: 'Presupuestos, cuotas y pagos en el mismo lugar, con el saldo calculado solo.',
  },
  {
    icon: FileSearch,
    pain: 'No saber qué pacientes faltan o hace tiempo que no vuelven',
    fix: 'Reportes de ausentismo y de pacientes sin control, para saber a quién llamar.',
  },
]

export default function Problems() {
  return (
    <Section
      id="problemas"
      eyebrow="Lo que resuelve"
      title="Menos papeles, menos llamadas, más tiempo para tus pacientes"
      intro="Las tareas de todos los días del consultorio, sin planillas sueltas ni cuadernos."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {ITEMS.map(({ icon: Icon, pain, fix }) => (
          <div
            key={pain}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-slate-500 line-through decoration-slate-300 dark:text-neutral-500 dark:decoration-neutral-600">
                {pain}
              </p>
              <p className="mt-2 flex gap-2 leading-relaxed text-slate-800 dark:text-neutral-200">
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {fix}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
