import { VERSION } from '../config.js'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg" width="32" height="32" />
          <span className="font-bold text-white">
            Dental<span className="text-brand">Web</span>
          </span>
          <span className="text-slate-500">· Demo {VERSION}</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Pie de página">
          <a href="#funciones" className="hover:text-white">Funciones</a>
          <a href="#descargar" className="hover:text-white">Descargar demo</a>
          <a href="#preguntas" className="hover:text-white">Preguntas</a>
          <a href="#contacto" className="hover:text-white">Contacto</a>
        </nav>
        <p>© {new Date().getFullYear()} DentalWeb</p>
      </div>
    </footer>
  )
}
