import { Link } from "react-router";

// Opciones del menú de docs/img. Solo Inicio tiene una ruta implementada.
const workshopLinks = [
  { label: "Inicio", icon: "⌂", to: "/" },
  { label: "Analizar obra", icon: "▧" },
  { label: "Mi galería", icon: "▣" },
  { label: "Mi progreso", icon: "▥" },
  { label: "Mis ejercicios", icon: "✎" },
  { label: "Recursos", icon: "♧" },
  { label: "Mi perfil", icon: "◉" },
];

function WorkshopLinks() {
  return (
    <ul className="space-y-[6px]">
      {workshopLinks.map(({ label, icon, to }) => {
        const content = (
          <>
            <span aria-hidden="true" className="w-5 shrink-0 text-center text-[19px] font-normal">
              {icon}
            </span>
            <span>{label}</span>
          </>
        );

        return (
          <li key={label}>
            {to ? (
              <Link
                to={to}
                aria-current="page"
                className="flex min-h-[46px] items-center gap-[10px] rounded-xl bg-[#f52e70] px-4 py-3 text-white shadow-[0_6px_14px_#073a2926] transition-colors hover:bg-[#df245f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd080]"
              >
                {content}
              </Link>
            ) : (
              // Las vistas pendientes no enlazan a páginas inexistentes.
              <button
                type="button"
                disabled
                title="Próximamente"
                className="flex min-h-[46px] w-full cursor-default items-center gap-[10px] rounded-xl px-4 py-3 text-left text-[#e4eee5]"
              >
                {content}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Navbar() {
  return (
    // Los selectores del main contiguo adaptan la plantilla existente sin editar MainLayout.
    // En escritorio reservan los 238 px de la barra; en móvil el menú queda arriba.
    <aside className="z-20 flex flex-col bg-[#104734] px-4 py-5 text-[13px] font-semibold text-[#e4eee5] [font-family:Arial,Helvetica,sans-serif] [&+main]:min-h-screen [&+main]:min-w-0 [&+main]:bg-[#fff8ee] [&+main]:text-[#104734] [&+main]:[font-family:Arial,Helvetica,sans-serif] [&+main>*:not(:first-child)]:mx-5 [&+main>*:not(:first-child)]:mt-5 lg:fixed lg:inset-y-0 lg:left-0 lg:w-[238px] lg:overflow-y-auto lg:py-[25px] lg:[&+main]:ml-[238px] lg:[&+main>*:not(:first-child)]:mx-[34px]">
      {/* Identidad del taller: paleta, nombre y lema de las referencias. */}
      <Link
        to="/"
        aria-label="El Espejo del Artista, ir al inicio"
        className="flex items-center gap-3 rounded-lg px-[6px] text-[#ffe7b9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd080]"
      >
        <span aria-hidden="true" className="text-[34px] leading-none">🎨</span>
        <span>
          <span className="block text-[22px] leading-[23px] font-bold [font-family:Georgia,serif]">
            El Espejo<br />del Artista
          </span>
          <span className="mt-[5px] block text-[11px] leading-4 font-normal [font-family:Georgia,serif]">
            Tu arte, con mejor perspectiva
          </span>
        </span>
      </Link>

      {/* Menú de escritorio, con Inicio resaltado en rosa. */}
      <div className="mt-[19px] hidden border-t border-[#ffffff2e] pt-[21px] lg:block">
        <p className="mb-[17px] px-[14px] text-[11px] font-normal tracking-[0.16em] text-[#abcab7]">
          MI TALLER
        </p>
        <nav aria-label="Navegación principal">
          <WorkshopLinks />
        </nav>
      </div>

      {/* Menú móvil nativo: se despliega con teclado y no requiere otra librería. */}
      <details className="group mt-4 border-t border-[#ffffff2e] pt-3 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-[#ffe7b9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd080] [&::-webkit-details-marker]:hidden">
          <span className="text-[11px] tracking-[0.16em]">MI TALLER</span>
          <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-180">⌄</span>
        </summary>
        <nav aria-label="Navegación móvil" className="mt-2">
          <WorkshopLinks />
        </nav>
      </details>

      {/* Tarjeta inferior y flores decorativas construidas solo con Tailwind. */}
      <div className="mt-auto hidden pt-8 lg:block">
        <div className="relative isolate overflow-hidden rounded-[17px] border border-[#ffffff26] bg-[#175640] px-[15px] pt-8 pb-4 text-center font-normal">
          <div aria-hidden="true" className="absolute -top-2 -left-3 -z-10 size-14">
            <span className="absolute top-0 left-3 size-7 rounded-full bg-[#59724b]" />
            <span className="absolute top-4 left-0 size-7 rounded-full bg-[#59724b]" />
            <span className="absolute top-5 left-7 size-7 rounded-full bg-[#59724b]" />
            <span className="absolute top-2 left-3 size-7 rounded-full bg-[#10503b]" />
          </div>
          <blockquote className="text-[17px] leading-[23px] text-[#fff0ce] italic [font-family:Georgia,serif]">
            «El arte se crea, también<br />se aprende»
          </blockquote>
          <p className="mt-[19px] text-[13px] leading-[19px] text-[#c3dacf]">
            Un espacio para crecer a tu ritmo.
          </p>
          <div aria-hidden="true" className="absolute -right-3 -bottom-2 -z-10 size-14">
            <span className="absolute top-0 left-3 size-7 rounded-full bg-[#59724b]" />
            <span className="absolute top-4 left-0 size-7 rounded-full bg-[#59724b]" />
            <span className="absolute top-5 left-7 size-7 rounded-full bg-[#59724b]" />
            <span className="absolute top-4 left-4 size-7 rounded-full bg-[#10503b]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
