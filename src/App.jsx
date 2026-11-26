import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Problems from './components/Problems.jsx'
import Features from './components/Features.jsx'
import Clinical from './components/Clinical.jsx'
import Security from './components/Security.jsx'
import Download from './components/Download.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Problems />
        <Features />
        <Clinical />
        <Security />
        <Download />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
