import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Section({ id, eyebrow, title, intro, children, className = '', tone = 'plain' }) {
  const tones = {
    plain: 'bg-white dark:bg-ink',
    soft: 'bg-slate-50 dark:bg-ink-2',
  }
  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(eyebrow || title) && (
          <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {title}
              </h2>
            )}
            {intro && <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-neutral-400">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
    >
      {children}
    </div>
  )
}

export function IconBadge({ icon: Icon, className = '' }) {
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ${className}`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
  )
}

export function Accordion({ items, defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen)
  const base = useId()
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${base}-b${i}`
        const panelId = `${base}-p${i}`
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900 hover:bg-slate-50 sm:px-6 dark:text-white dark:hover:bg-neutral-800/60"
              >
                <span className="flex items-center gap-3">
                  {item.icon && <item.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-5 pb-5 leading-relaxed text-slate-600 sm:px-6 dark:text-neutral-400"
            >
              {item.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* Ícono de diente (lucide no trae uno) */
export function ToothIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 3c-2.5 0-4 2-4 4.5 0 2 .8 3.4 1.4 5 .7 1.9.8 4 1.4 6 .4 1.4 1 2.5 2 2.5 1.6 0 1.6-3.2 2.2-5 .3-.9.9-1.5 2-1.5s1.7.6 2 1.5c.6 1.8.6 5 2.2 5 1 0 1.6-1.1 2-2.5.6-2 .7-4.1 1.4-6 .6-1.6 1.4-3 1.4-5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z" />
    </svg>
  )
}

/* Kbd-style ruta de menú: "Archivo › Cargar datos" */
export function MenuPath({ children }) {
  return (
    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-100">
      {children}
    </span>
  )
}
