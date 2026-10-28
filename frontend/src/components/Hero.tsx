import { useLocation } from "react-router";

// Colores del papel picado de las vistas; todas las clases son estáticas para Tailwind.
const pennantColors = [
  "bg-[#f52e70]",
  "bg-[#ff9c53]",
  "bg-[#ffd080]",
  "bg-[#104734]",
];

export default function Hero() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div>
      {/* Encabezado compartido de la plantilla: ruta, aviso del prototipo y perfil. */}
      <header className="flex min-h-[74px] flex-wrap items-center justify-between gap-3 bg-[#fff5e5] px-5 py-4 text-[13px] lg:px-[34px]">
        <nav aria-label="Ruta de navegación">
          <ol className="flex items-center gap-[11px]">
            <li className="text-[#997b68]">El Espejo del Artista</li>
            <li aria-hidden="true" className="text-[#997b68]">›</li>
            <li aria-current="page" className="font-bold text-[#104734]">
              {isHome ? "Inicio" : "Mi taller"}
            </li>
          </ol>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden rounded-full border border-[#edcba6] bg-[#fcebd4] px-3 py-[7px] text-[11px] leading-[14px] font-bold text-[#995b3b] xl:inline-flex">
            PROTOTIPO CONCEPTUAL · DATOS FICTICIOS
          </span>
          <button
            type="button"
            disabled
            title="Próximamente"
            aria-label="Perfil de Evelyn, próximamente"
            className="flex cursor-default items-center gap-[15px] font-bold text-[#653018]"
          >
            <span aria-hidden="true" className="flex size-[34px] items-center justify-center rounded-full border-2 border-white bg-[#e8d8c8] text-[23px]">
              👩🏽‍🎨
            </span>
            <span>Evelyn <span aria-hidden="true">▾</span></span>
          </button>
        </div>
      </header>

      {/* Cenefa repetida sin imágenes externas ni una hoja de estilos adicional. */}
      <div aria-hidden="true" className="flex h-[15px] overflow-hidden">
        {Array.from({ length: 120 }, (_, index) => (
          <span
            key={index}
            className={`h-[15px] min-w-[15px] flex-1 shrink-0 [clip-path:polygon(0_0,100%_0,100%_72%,50%_100%,0_72%)] ${pennantColors[index % pennantColors.length]}`}
          />
        ))}
      </div>

      {/* La bienvenida pertenece solo a Inicio; el encabezado sigue siendo compartido. */}
      {isHome && (
        <div className="px-5 pt-[29px] lg:px-[34px]">
          <section
            aria-labelledby="welcome-title"
            className="relative isolate grid overflow-hidden rounded-[20px] border border-[#f0c9a4] bg-[#fce7c9] xl:grid-cols-[1.105fr_1fr]"
          >
            <div className="relative flex flex-col items-start justify-center px-6 py-9 sm:px-[35px] sm:py-[42px]">
              <p className="mb-6 text-[14px] leading-5 font-bold tracking-[0.1em] text-[#e75b50]">
                BIENVENIDA A TU TALLER CREATIVO
              </p>
              <h1
                id="welcome-title"
                className="text-[32px] leading-[1.13] font-bold text-[#873b2c] [font-family:Georgia,serif] sm:text-[42px]"
              >
                ¡Hola, Evelyn!<br />
                Tu mirada sigue creciendo.
              </h1>
              <p className="mt-3 max-w-[480px] text-[14px] leading-[22px] text-[#80523f]">
                Aquí tu arte no solo se ve, se entiende. Descubre tus decisiones
                de color y composición con orientación clara y ejercicios
                pensados para ti.
              </p>
              {/* El botón conserva el diseño, sin simular una ruta aún no creada. */}
              <button
                type="button"
                disabled
                title="Próximamente"
                className="mt-[23px] inline-flex min-h-[39px] cursor-default items-center gap-1 rounded-full bg-[#f52e70] px-[22px] py-[10px] text-[13px] leading-[19px] font-bold text-white shadow-[0_5px_10px_#f52e7026]"
              >
                <span aria-hidden="true">✦</span>
                Analizar mi obra
                <span aria-hidden="true">→</span>
              </button>

              <div aria-hidden="true" className="pointer-events-none absolute -bottom-5 -left-5 -z-10 size-[65px]">
                <span className="absolute top-0 left-4 size-7 rounded-full bg-[#f7bbb0]" />
                <span className="absolute top-4 left-9 size-7 rounded-full bg-[#f7bbb0]" />
                <span className="absolute top-9 left-6 size-7 rounded-full bg-[#f7bbb0]" />
                <span className="absolute top-4 left-4 size-8 rounded-full bg-[#fce7c9]" />
              </div>
            </div>

            {/* Paisaje vectorial de la referencia, incluido aquí para no crear archivos. */}
            <svg
              viewBox="0 0 538 328"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              aria-label="Paisaje mexicano con montañas, árboles, una iglesia y un sol dorado"
              className="h-[240px] w-full sm:h-[280px] xl:h-full xl:min-h-[327px]"
            >
              <rect width="538" height="328" className="fill-[#b3d2d8]" />
              <rect y="167" width="538" height="161" className="fill-[#efc696]" />
              <circle cx="396" cy="58" r="49" className="fill-[#ffd080]" />
              <path d="M0 188 84 104 162 187 235 91 342 195 453 96 538 171V328H0Z" className="fill-[#90afa3]" />
              <path d="m334 200 119-104 85 75v157H334Z" className="fill-[#a3bbab]" />
              <path d="m0 244 139-83 167 80 103-70 129 78v79H0Z" className="fill-[#c98b76]" />
              <path d="m0 279 134-54 81 34 154-42 169 43v68H0Z" className="fill-[#edc08d]" />

              <rect x="222" y="142" width="121" height="138" rx="2" className="fill-[#edb474]" />
              <rect x="252" y="110" width="60" height="62" className="fill-[#f0ca93]" />
              <path d="M241 115q41-56 83 0Z" className="fill-[#c9846e]" />
              <rect x="266" y="79" width="30" height="41" className="fill-[#cf8a6f]" />
              <path d="M259 80q21-28 43 0Z" className="fill-[#ffd080]" />
              <rect x="266" y="207" width="31" height="73" className="fill-[#996f59]" />

              <circle cx="75" cy="227" r="44" className="fill-[#5f835a]" />
              <circle cx="101" cy="189" r="36" className="fill-[#5f835a]" />
              <path d="m74 290 6-70" className="stroke-[#986c50] stroke-[7]" />
              <circle cx="442" cy="221" r="53" className="fill-[#869b73]" />
              <circle cx="470" cy="188" r="44" className="fill-[#869b73]" />
              <path d="m461 299-7-101" className="stroke-[#ac8968] stroke-[7]" />
            </svg>
          </section>
        </div>
      )}
    </div>
  );
}
