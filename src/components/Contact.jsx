import { useState } from 'react'
import { Mail, MessageCircle, Send } from 'lucide-react'
import { CONTACT, whatsappLink } from '../config.js'

const field =
  'mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500'

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', consultorio: '', ciudad: '', telefono: '', mensaje: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const buildText = () =>
    [
      'Hola, quiero información sobre DentalWeb para mi consultorio.',
      `Nombre: ${form.nombre}`,
      form.consultorio && `Consultorio: ${form.consultorio}`,
      form.ciudad && `Ciudad: ${form.ciudad}`,
      form.telefono && `Teléfono: ${form.telefono}`,
      form.mensaje && `\n${form.mensaje}`,
    ]
      .filter(Boolean)
      .join('\n')

  const sendWhatsapp = (e) => {
    e.preventDefault()
    window.open(whatsappLink(buildText()), '_blank', 'noopener')
  }
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Consulta sobre DentalWeb')}&body=${encodeURIComponent(buildText())}`

  return (
    <section id="contacto" className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-royal/25 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky">Contacto</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">¿Querés DentalWeb en tu consultorio?</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            La versión completa se instala con acompañamiento. Contanos un poco sobre tu consultorio y te respondemos
            para coordinar.
          </p>
          <div className="mt-8 space-y-3">
            <a
              href={whatsappLink('Hola, quiero información sobre DentalWeb para mi consultorio.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 hover:bg-white/10"
            >
              <MessageCircle className="h-6 w-6 text-teal-light" aria-hidden="true" />
              <span>
                <span className="block font-semibold">WhatsApp</span>
                <span className="text-sm text-slate-300">Escribinos directamente</span>
              </span>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 hover:bg-white/10">
              <Mail className="h-6 w-6 text-teal-light" aria-hidden="true" />
              <span>
                <span className="block font-semibold">Correo</span>
                <span className="text-sm text-slate-300">{CONTACT.email}</span>
              </span>
            </a>
          </div>
        </div>

        <form onSubmit={sendWhatsapp} className="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-8 dark:bg-ink-2 dark:text-white">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium sm:col-span-2">
              Nombre y apellido
              <input required value={form.nombre} onChange={set('nombre')} className={field} autoComplete="name" />
            </label>
            <label className="block text-sm font-medium">
              Consultorio
              <input value={form.consultorio} onChange={set('consultorio')} className={field} autoComplete="organization" />
            </label>
            <label className="block text-sm font-medium">
              Ciudad
              <input value={form.ciudad} onChange={set('ciudad')} className={field} autoComplete="address-level2" />
            </label>
            <label className="block text-sm font-medium sm:col-span-2">
              Teléfono
              <input type="tel" value={form.telefono} onChange={set('telefono')} className={field} autoComplete="tel" placeholder="09xx xxx xxx" />
            </label>
            <label className="block text-sm font-medium sm:col-span-2">
              Mensaje <span className="font-normal text-slate-500 dark:text-neutral-400">(opcional)</span>
              <textarea rows="3" value={form.mensaje} onChange={set('mensaje')} className={field} placeholder="Cuántos profesionales son, qué te gustaría resolver…" />
            </label>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-on-primary hover:opacity-90">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Enviar por WhatsApp
            </button>
            <a
              href={mailto}
              onClick={(e) => {
                if (!form.nombre) {
                  e.preventDefault()
                  e.currentTarget.closest('form').reportValidity()
                }
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/40 px-5 py-3 font-semibold text-primary hover:bg-primary/10"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
              Enviar por correo
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-neutral-400">
            Se abre WhatsApp o tu correo con el mensaje listo para enviar.
          </p>
        </form>
      </div>
    </section>
  )
}
