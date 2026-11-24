// ⚠️ COMPLETAR: datos de contacto reales del equipo de DentalWeb.
// Se usan en el botón de contacto, la sección "Contacto" y el pie de página.
export const CONTACT = {
  email: 'contacto@tu-dominio.com.py', // ← reemplazar
  whatsapp: '595000000000', // ← reemplazar (código de país + número, sin + ni espacios)
}

export const VERSION = '1.0.0'

export const DOWNLOADS = [
  {
    id: 'win-installer',
    os: 'windows',
    title: 'Windows',
    badge: 'Recomendado',
    help: 'Instalador clásico. Es la opción para la mayoría de las computadoras con Windows.',
    file: 'DentalWeb-1.0.0-windows-instalador.exe',
    url: 'https://drive.google.com/file/d/1x1Oyc-KqE3-mg3MqLjOUoUhWSCtt8kCj/view?usp=sharing',
  },
  {
    id: 'win-zip',
    os: 'windows',
    title: 'Windows sin instalar',
    help: 'Para computadoras sin permisos de administrador. Se descomprime y se abre, sin instalar.',
    file: 'DentalWeb-1.0.0-windows-x64.zip',
    url: 'https://drive.google.com/file/d/1L76PIzU2OqWtKqRcXVb2SLhEFzPIyy0Z/view?usp=sharing',
  },
  {
    id: 'mac-arm',
    os: 'mac',
    title: 'Mac con chip Apple',
    help: 'Para Mac con chip M1, M2, M3 o M4 (la mayoría de las Mac desde fines de 2020).',
    file: 'DentalWeb-1.0.0-mac-arm64.dmg',
    url: 'https://drive.google.com/file/d/18v24xF_2mfmDUigspfWaZtXhKNQx4KnV/view?usp=sharing',
  },
  {
    id: 'mac-intel',
    os: 'mac',
    title: 'Mac con procesador Intel',
    help: 'Para Mac más antiguas que dicen “Intel” en “Acerca de esta Mac”.',
    file: 'DentalWeb-1.0.0-mac-x64.dmg',
    url: 'https://drive.google.com/file/d/1v5KJQFvuK7pKM2KZynA99HEVuktigaIS/view?usp=sharing',
  },
]

export const whatsappLink = (text = '') =>
  `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

// Montos en guaraníes, sin decimales: 1250000 → "Gs. 1.250.000"
export const gs = (n) => 'Gs. ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
