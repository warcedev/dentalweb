import {
  CalendarDays,
  ClipboardList,
  Activity,
  Stethoscope,
  Wallet,
  FolderOpen,
  PenLine,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'
import { Section, IconBadge, ToothIcon } from './ui.jsx'

const GROUPS = [
  {
    name: 'Atención',
    items: [
      {
        icon: CalendarDays,
        title: 'Agenda',
        text: 'Turnos por profesional y consultorio, sin superposiciones.',
        bullets: ['Lista de espera', 'Confirmaciones y ausencias'],
      },
      {
        icon: ClipboardList,
        title: 'Pacientes e historia clínica',
        text: 'Ficha completa con antecedentes, alergias y condiciones de riesgo siempre visibles.',
        bullets: ['La historia nunca se sobrescribe: queda registro de cada cambio'],
      },
      {
        icon: Stethoscope,
        title: 'Consultas',
        text: 'Notas clínicas cifradas y procedimientos realizados en cada visita.',
        bullets: ['Alerta de alergias antes de aplicar anestesia o recetar'],
      },
    ],
  },
  {
    name: 'Clínica',
    items: [
      {
        icon: ToothIcon,
        title: 'Odontograma',
        text: 'Dientes dibujados de forma anatómica (sistema FDI), con colores por estado.',
        bullets: ['Línea de tiempo para ver la boca del paciente en cualquier fecha pasada'],
        href: '#odontograma',
      },
      {
        icon: Activity,
        title: 'Periodontograma',
        text: 'Registro de sangrado, placa y movilidad de cada pieza.',
        bullets: ['Gráficos de evolución entre controles'],
      },
      {
        icon: FolderOpen,
        title: 'Documentos',
        text: 'Radiografías y fotos ordenadas por paciente.',
        bullets: ['Órdenes al laboratorio con aviso de atraso', 'Recetas e indicaciones en PDF'],
      },
      {
        icon: PenLine,
        title: 'Consentimientos informados',
        text: 'El paciente firma directamente en la pantalla y el consentimiento queda guardado en su ficha.',
      },
    ],
  },
  {
    name: 'Gestión',
    items: [
      {
        icon: Wallet,
        title: 'Tratamientos y cobros',
        text: 'Presupuestos, planes de cuotas y pagos con recibo en PDF.',
        bullets: ['Saldo de cada paciente calculado automáticamente', 'Control de garantías'],
      },
      {
        icon: TrendingUp,
        title: 'Reportes',
        text: 'Pacientes atendidos, ingresos por profesional y por forma de pago, ausentismo y pacientes sin control.',
        bullets: ['Exportación a PDF y Excel'],
      },
      {
        icon: ShieldCheck,
        title: 'Seguridad',
        text: 'Usuarios con roles, auditoría de todo lo que se hace, datos clínicos cifrados y respaldos.',
        href: '#seguridad',
      },
    ],
  },
]

function FeatureCard({ icon, title, text, bullets, href }) {
  const body = (
    <>
      <IconBadge icon={icon} />
      <h4 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h4>
      <p className="mt-2 leading-relaxed text-slate-600 dark:text-neutral-400">{text}</p>
      {bullets && (
        <ul className="mt-3 space-y-1.5">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm text-slate-700 dark:text-neutral-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {href && <span className="mt-4 inline-block text-sm font-semibold text-primary">Ver más →</span>}
    </>
  )
  const cls =
    'block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-neutral-800 dark:bg-neutral-900'
  return href ? (
    <a href={href} className={`${cls} hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  )
}

export default function Features() {
  return (
    <Section
      id="funciones"
      tone="soft"
      eyebrow="Funciones"
      title="Todo lo que pasa en el consultorio, en un mismo sistema"
      intro="Desde que el paciente pide un turno hasta que paga la última cuota."
    >
      <div className="space-y-14">
        {GROUPS.map((g) => (
          <div key={g.name}>
            <h3 className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
              {g.name}
              <span className="h-px flex-1 bg-slate-200 dark:bg-neutral-800" aria-hidden="true" />
            </h3>
            <div className={`grid gap-5 sm:grid-cols-2 [&>*]:min-w-0 ${g.items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
              {g.items.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
