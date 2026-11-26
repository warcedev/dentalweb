import { Section, Accordion } from './ui.jsx'

const FAQ = [
  {
    q: '¿La demo tiene costo?',
    a: 'No. La demo es gratis y podés usarla para conocer el sistema todo el tiempo que necesites.',
  },
  {
    q: '¿Puedo usar la demo con mis pacientes reales?',
    a: 'No. La demo trae pacientes ficticios y está hecha solo para conocer el sistema. Para trabajar con pacientes reales está la versión completa, que se instala con acompañamiento.',
  },
  {
    q: '¿Necesito internet para probarla?',
    a: 'No. La demo funciona sin internet y sin instalar nada más. Los datos quedan solo en esa computadora.',
  },
  {
    q: '¿En qué computadoras funciona?',
    a: 'En Mac (con chip Apple o con procesador Intel) y en Windows. Para Windows hay un instalador y también una versión que se usa sin instalar, para computadoras sin permisos de administrador.',
  },
  {
    q: '¿Está adaptado a Paraguay?',
    a: 'Sí. Todo está en español, los montos se manejan en guaraníes sin decimales, las fechas en formato dd/mm/aaaa y la hora es la de Asunción.',
  },
  {
    q: '¿Pueden usarlo varias personas del consultorio?',
    a: 'Sí. Cada persona tiene su usuario con un rol: administrador, odontólogo o recepción. Además, queda registro de todo lo que se hace.',
  },
  {
    q: '¿Qué pasa si me equivoco al cargar algo en la historia clínica?',
    a: 'La historia clínica nunca se sobrescribe: siempre queda el registro de cada cambio, con su fecha.',
  },
  {
    q: '¿Cómo consigo la versión completa y cuánto cuesta?',
    a: 'La versión completa se instala con acompañamiento. Escribinos desde la sección de contacto y te contamos cómo seguir según tu consultorio.',
  },
]

export default function Faq() {
  return (
    <Section id="preguntas" tone="soft" eyebrow="Preguntas frecuentes" title="¿Tenés dudas?">
      <div className="mx-auto max-w-3xl">
        <Accordion items={FAQ.map((f) => ({ q: f.q, a: <p>{f.a}</p> }))} />
      </div>
    </Section>
  )
}
