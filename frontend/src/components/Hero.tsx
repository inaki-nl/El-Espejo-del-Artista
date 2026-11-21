import { useLocation } from "react-router-dom";

// Colores del papel picado de las vistas; todas las clases son estáticas para Tailwind.
const pennantColors = [
  "bg-[#f52e70]",
  "bg-[#ff9c53]",
  "bg-[#ffd080]",
  "bg-[#104734]",
];

export type HeroProps = { user?: { name: string } | null };

/** El contenedor puede pasar el nombre de su usuario autenticado.
 * Sin usuario se muestra una etiqueta neutral, sin inventar una sesión.
 */
export default function Hero({ user = null }: HeroProps = {}) {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const labels: Record<string, string> = {
    "/": "Inicio", "/analize-image": "Analizar obra",
    "/result-image": "Resultado del análisis", "/gallery": "Mi galería",
    "/progress": "Mi progreso", "/exercise": "Mis ejercicios",
    "/profile": "Mi perfil", "/resources": "Recursos", "/access": "Acceso",
  };
  const pageLabel = labels[path] ?? "Mi taller";
  const userName = user?.name.trim() || "Mi cuenta";

  return (
    <div>
      {/* Encabezado compartido de la plantilla: ruta, aviso del prototipo y perfil. */}
      <header className="flex min-h-[74px] flex-wrap items-center justify-between gap-3 bg-[#fff5e5] px-5 py-4 text-[13px] lg:px-[34px]">
        <nav aria-label="Ruta de navegación">
          <ol className="flex items-center gap-[11px]">
            <li className="text-[#997b68]">El Espejo del Artista</li>
            <li aria-hidden="true" className="text-[#997b68]">
              ›
            </li>
            <li aria-current="page" className="font-bold text-[#104734]">
              {pageLabel}
            </li>
          </ol>
        </nav>

        <div className="flex items-center gap-4">
          {/* TODO: Hacer que haga un desplegable en el cual muestre 'Perfil' y todo el manejo de Inicio de Sesion*/}
          <button
            type="button"
            title="Próximamente"
            aria-label={user ? `Perfil de ${userName}, próximamente` : "Opciones de cuenta, próximamente"}
            className="flex cursor-default items-center gap-[15px] font-bold text-[#653018]"
          >
            <span
              aria-hidden="true"
              className="flex size-[34px] items-center justify-center rounded-full border-2 border-white bg-[#e8d8c8] text-[23px]"
            >
              👩🏽‍🎨
            </span>
            <span>
              {userName} <span aria-hidden="true">▾</span>
            </span>
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
    </div>
  );
}
