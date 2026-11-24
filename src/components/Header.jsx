import { useEffect, useState } from 'react'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'

const NAV = [
  ['Funciones', '#funciones'],
  ['Odontograma', '#odontograma'],
  ['Portal', '#portal'],
  ['Seguridad', '#seguridad'],
  ['Preguntas', '#preguntas'],
  ['Contacto', '#contacto'],
]

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('dw-theme', next ? 'dark' : 'light')
    } catch {}
  }
  return [dark, toggle]
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, toggleTheme] = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? 'bg-navy/95 shadow-lg shadow-black/20 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5" aria-label="DentalWeb, ir al inicio">
          <img src="/logo.png" alt="" className="h-9 w-9 rounded-lg" width="36" height="36" />
          <span className="text-lg font-bold tracking-tight text-white">
            Dental<span className="text-brand">Web</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
            aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={dark ? 'Modo claro' : 'Modo oscuro'}
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <a
            href="#descargar"
            className="hidden items-center gap-2 rounded-xl bg-teal-light px-4 py-2 text-sm font-semibold text-navy hover:bg-white sm:inline-flex"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Descargar demo
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" className="border-t border-white/10 px-4 pb-4 lg:hidden" aria-label="Menú móvil">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 font-medium text-slate-200 hover:bg-white/10"
            >
              {label}
            </a>
          ))}
          <a
            href="#descargar"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-teal-light px-4 py-3 font-semibold text-navy"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Descargar demo gratis
          </a>
        </nav>
      )}
    </header>
  )
}
