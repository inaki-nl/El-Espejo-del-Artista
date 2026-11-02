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
  const isAnalizeImage = pathname === "/analize-image";
  const isResultImage = pathname === "/result-image";
  const isGalery = pathname === "/galery";
  const isProcess = pathname === "/process";
  const isExercise = pathname === "/exercise";
  const isProfile = pathname === "/profile";

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
              {/* TODO: Hacer funcion que detecte dependiendo de la ruta en la que esta muestre el nombre de la ventana como tipo BreadCrumbs */}
              {isHome ? "Inicio" : "Mi taller"}
            </li>
          </ol>
        </nav>

        <div className="flex items-center gap-4">
          {/* TODO: Hacer que haga un desplegable en el cual muestre 'Perfil' y todo el manejo de Inicio de Sesion*/}
          <button
            type="button"
            title="Próximamente"
            aria-label="Perfil de Evelyn, próximamente"
            className="flex cursor-default items-center gap-[15px] font-bold text-[#653018]"
          >
            <span
              aria-hidden="true"
              className="flex size-[34px] items-center justify-center rounded-full border-2 border-white bg-[#e8d8c8] text-[23px]"
            >
              👩🏽‍🎨
            </span>
            <span>
              {/*TODO: Hacer función que muestre el nombre del usuario como variable */}
              NOMBRE <span aria-hidden="true">▾</span>
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
