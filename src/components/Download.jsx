import { useEffect, useState } from 'react'
import {
  Download as DownloadIcon,
  Monitor,
  Laptop,
  FlaskConical,
  WifiOff,
  HardDrive,
  MailX,
  Handshake,
  Info,
  Copy,
  Check,
  HelpCircle,
  ShieldAlert,
  PlayCircle,
  ExternalLink,
} from 'lucide-react'
import { Section, Accordion, MenuPath } from './ui.jsx'
import { DOWNLOADS, VERSION } from '../config.js'

function detectOS() {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent || ''
  const platform = navigator.userAgentData?.platform || navigator.platform || ''
  if (/iPhone|iPad|Android/i.test(ua)) return 'mobile'
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return 'windows'
  if (/Mac/i.test(platform) || /Macintosh/i.test(ua)) return 'mac'
  return null
}

const NOTICES = [
  [FlaskConical, 'Trae datos de ejemplo', 'Viene con pacientes ficticios. No la uses con pacientes reales.'],
  [WifiOff, 'Funciona sin internet', 'No hace falta instalar nada más.'],
  [HardDrive, 'Los datos quedan en tu computadora', 'Todo lo que cargues se guarda solo en esa computadora.'],
  [MailX, 'No envía correos ni recordatorios', 'Es solo para conocer el sistema.'],
]

function CopyField({ label, value }) {
  const [ok, setOk] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setOk(true)
      setTimeout(() => setOk(false), 1500)
    } catch {}
  }
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-neutral-400">{label}</p>
        <p className="truncate font-mono text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-primary dark:hover:bg-neutral-700"
        aria-label={`Copiar ${label.toLowerCase()}`}
      >
        {ok ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
      </button>
      <span className="sr-only" aria-live="polite">{ok ? 'Copiado' : ''}</span>
    </div>
  )
}

function DownloadCard({ d, recommended }) {
  const Icon = d.os === 'mac' ? Laptop : Monitor
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-5 dark:bg-neutral-900 ${
        recommended
          ? 'border-primary shadow-lg shadow-primary/10 ring-1 ring-primary'
          : 'border-slate-200 dark:border-neutral-800'
      }`}
    >
      {(recommended || d.badge) && (
        <span className="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-on-primary">
          {recommended ? 'Para tu computadora' : d.badge}
        </span>
      )}
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h4 className="font-semibold text-slate-900 dark:text-white">
          {d.title}
          {recommended && d.badge && <span className="ml-2 text-xs font-medium text-primary">({d.badge.toLowerCase()})</span>}
        </h4>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-neutral-400">{d.help}</p>
      <p className="mt-3 break-all font-mono text-xs text-slate-500 dark:text-neutral-500">{d.file}</p>
      <a
        href={d.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
          recommended
            ? 'bg-primary text-on-primary hover:opacity-90'
            : 'border border-primary/40 text-primary hover:bg-primary/10'
        }`}
      >
        <DownloadIcon className="h-4 w-4" aria-hidden="true" />
        Descargar
        <span className="sr-only">{d.file} (se abre en Google Drive, en una pestaña nueva)</span>
      </a>
    </div>
  )
}

export default function Download() {
  const [os, setOs] = useState(null)
  useEffect(() => setOs(detectOS()), [])

  const win = DOWNLOADS.filter((d) => d.os === 'windows')
  const mac = DOWNLOADS.filter((d) => d.os === 'mac')
  const groups = os === 'mac' ? [['Mac', mac], ['Windows', win]] : [['Windows', win], ['Mac', mac]]

  const help = [
    {
      icon: HelpCircle,
      q: '¿Qué Mac tengo?',
      a: (
        <p>
          Abrí el <MenuPath>Menú Apple › Acerca de esta Mac</MenuPath>. Si dice <strong>“Chip Apple”</strong> (M1, M2,
          M3 o M4), descargá la versión <strong>Mac con chip Apple</strong> (arm64). Si dice <strong>“Intel”</strong>,
          descargá la versión <strong>Mac con procesador Intel</strong> (x64).
        </p>
      ),
    },
    {
      icon: ShieldAlert,
      q: 'En Mac: “no se puede abrir la app”',
      a: (
        <div className="space-y-2">
          <p>
            La primera vez, macOS la bloquea porque la app no tiene una firma paga de Apple. Es normal en esta demo.
            Tenés dos formas de abrirla:
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Ir a <MenuPath>Configuración del Sistema › Privacidad y seguridad</MenuPath> y tocar{' '}
              <MenuPath>Abrir igualmente</MenuPath>.
            </li>
            <li>
              O hacer <strong>clic derecho</strong> sobre la app › <MenuPath>Abrir</MenuPath>.
            </li>
          </ol>
        </div>
      ),
    },
    {
      icon: ShieldAlert,
      q: 'En Windows: “Windows protegió su PC”',
      a: (
        <p>
          Si aparece ese aviso azul, tocá <MenuPath>Más información</MenuPath> y después{' '}
          <MenuPath>Ejecutar de todas formas</MenuPath>.
        </p>
      ),
    },
    {
      icon: PlayCircle,
      q: 'Para empezar a usarla',
      a: (
        <div className="space-y-3">
          <p>
            Dentro de la app, entrá al menú <MenuPath>Archivo › Cargar datos de demostración</MenuPath>. Después
            ingresá con este usuario:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <CopyField label="Correo" value="admin@consultorio.test" />
            <CopyField label="Contraseña" value="password" />
          </div>
        </div>
      ),
    },
    {
      icon: ExternalLink,
      q: 'Al descargar, se abre Google Drive',
      a: (
        <p>
          Los archivos están en Google Drive. Tocá el botón <MenuPath>Descargar</MenuPath> arriba a la derecha. Si Drive
          avisa que no puede analizar el archivo en busca de virus por su tamaño, tocá{' '}
          <MenuPath>Descargar de todos modos</MenuPath>.
        </p>
      ),
    },
  ]

  return (
    <Section
      id="descargar"
      tone="soft"
      eyebrow={`Demo gratis · versión ${VERSION}`}
      title="Descargá la demo y probala en tu computadora"
      intro="Conocé DentalWeb a tu ritmo, con pacientes de ejemplo ya cargados."
    >
      {/* aviso de demo */}
      <div
        role="note"
        aria-label="Importante: versión de demostración"
        className="rounded-3xl border-2 border-follow/40 bg-follow/5 p-6 sm:p-8 dark:border-follow/50 dark:bg-follow/10"
      >
        <div className="flex items-center gap-3">
          <Info className="h-6 w-6 shrink-0 text-follow" aria-hidden="true" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Es una versión de demostración</h3>
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {NOTICES.map(([Icon, t, d]) => (
            <li key={t} className="flex gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#B45309] dark:text-follow" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{t}</p>
                <p className="text-sm text-slate-700 dark:text-neutral-300">{d}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-4 border-t border-follow/30 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex gap-3 text-sm text-slate-800 dark:text-neutral-200">
            <Handshake className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <strong>¿Lo querés para tu consultorio?</strong> La versión completa se instala con acompañamiento de nuestro equipo.
            </span>
          </p>
          <a
            href="#contacto"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:opacity-90"
          >
            Contactar
          </a>
        </div>
      </div>

      {/* descargas */}
      {os === 'mobile' && (
        <p className="mt-10 rounded-xl bg-white p-4 text-center text-sm text-slate-700 dark:bg-neutral-900 dark:text-neutral-300">
          📱 Estás en un celular. La demo es para <strong>computadoras Mac o Windows</strong>: abrí esta página desde la
          computadora del consultorio.
        </p>
      )}

      <div className="mt-12 space-y-10">
        {groups.map(([name, items]) => (
          <div key={name}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
              {name}
              {os === name.toLowerCase() && (
                <span className="ml-2 normal-case tracking-normal text-primary">· detectamos que usás {name}</span>
              )}
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {items.map((d) => (
                <DownloadCard
                  key={d.id}
                  d={d}
                  recommended={os === "windows" ? d.id === "win-installer" : Boolean(d.badge) && os !== "mac"}
                />
              ))}
            </div>
            {name === 'Mac' && (
              <p className="mt-3 text-sm text-slate-600 dark:text-neutral-400">
                ¿No sabés cuál es tu Mac? Mirá <a href="#como-abrir" className="font-semibold text-primary underline-offset-2 hover:underline">“¿Qué Mac tengo?”</a> más abajo.
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ayuda */}
      <div id="como-abrir" className="mx-auto mt-14 max-w-3xl">
        <h3 className="mb-5 text-center text-2xl font-bold text-slate-900 dark:text-white">¿Cómo la abro?</h3>
        <Accordion items={help} defaultOpen={0} />
      </div>
    </Section>
  )
}
