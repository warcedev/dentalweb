import { ArrowRight, Download, Languages, CalendarClock, Banknote } from 'lucide-react'
import AppMock from './AppMock.jsx'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-28 pb-20 text-white sm:pt-36 sm:pb-28">
      {/* halo con los colores del logo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-royal/25 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-sky/15 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <img
            src="/logo.png"
            alt="Logo de DentalWeb"
            width="96"
            height="96"
            className="mb-8 h-20 w-20 rounded-2xl shadow-2xl shadow-royal/30 ring-1 ring-sky/30 sm:h-24 sm:w-24"
          />
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Tu consultorio odontológico,{' '}
            <span className="bg-gradient-to-r from-sky to-brand bg-clip-text text-transparent">
              ordenado en un solo lugar
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            DentalWeb reúne la agenda, la historia clínica, el odontograma, los tratamientos y los cobros.
            Pensado para trabajar en Paraguay: todo en español, montos en guaraníes y hora de Asunción.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#descargar"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-light px-6 py-3.5 text-base font-semibold text-navy shadow-lg shadow-teal-light/20 hover:bg-white"
            >
              <Download className="h-5 w-5" aria-hidden="true" />
              Descargar demo gratis
            </a>
            <a
              href="#funciones"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10"
            >
              Ver funciones
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-400">Para Mac y Windows · Funciona sin internet · Con datos de ejemplo</p>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-sky" aria-hidden="true" /> Todo en español
            </li>
            <li className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-sky" aria-hidden="true" /> Guaraníes sin decimales
            </li>
            <li className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-sky" aria-hidden="true" /> dd/mm/aaaa · hora de Asunción
            </li>
          </ul>
        </div>

        <AppMock />
      </div>
    </section>
  )
}
