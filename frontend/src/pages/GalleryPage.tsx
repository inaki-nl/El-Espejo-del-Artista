import { useState } from "react";
import { Link } from "react-router";
import { Artwork, Badge, PageFrame, PageHeading, PageLink } from "./HomePage";
import type { ArtworkKind } from "./HomePage";

// 05-galeria: obras ilustrativas y filtros locales, sin consultar ni alterar datos reales.
export default function GalleryPage() {
  const [filter, setFilter] = useState("Todas las obras (6)");
  const works: { kind: ArtworkKind; title: string; date: string; order: number }[] = [
    { kind: "landscape", title: "Paisaje mexicano", date: "18 oct 2026", order: 6 },
    { kind: "stillLife", title: "Bodegón con naranjas", date: "15 oct 2026", order: 5 },
    { kind: "portrait", title: "Retrato a lápiz", date: "10 oct 2026", order: 4 },
    { kind: "garden", title: "Jardín al atardecer", date: "05 oct 2026", order: 3 },
    { kind: "eye", title: "Estudio de mirada", date: "29 sep 2026", order: 2 },
    { kind: "house", title: "Perspectiva de una casa", date: "25 sep 2026", order: 1 },
  ];
  // Las seis obras de la referencia tienen su análisis completado.
  const visibleWorks = filter === "Más recientes" ? [...works].sort((a, b) => b.order - a.order) : works;

  return (
    <PageFrame>
      <PageHeading eyebrow="TU HISTORIA EN IMÁGENES" title="Mi galería" description="Vuelve a observar tus creaciones y los análisis que las acompañan." action={<PageLink to="/analize-image">+ Subir nueva obra</PageLink>} />
      <div aria-label="Filtrar obras" className="mb-[18px] flex flex-wrap items-center gap-2">
        {["Todas las obras (6)", "Más recientes", "Análisis completados"].map((option) => <button key={option} type="button" aria-pressed={filter === option} onClick={() => setFilter(option)} className={`cursor-pointer rounded-full border px-[15px] py-[9px] text-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#104734] ${filter === option ? "border-[#ffb8cc] bg-[#fde5ec] font-bold text-[#dc2a61]" : "border-[#e9d1bc] bg-white text-[#805d48] hover:bg-[#fff1df]"}`}>{option}</button>)}
        <Badge tone="pink">Obras privadas del usuario</Badge>
      </div>
      <div className="grid gap-[17px] sm:grid-cols-2 xl:grid-cols-3">
        {visibleWorks.map((work) => <Link key={work.kind} to="/result-image" className="group overflow-hidden rounded-[18px] border border-[#efd4bc] bg-[#fffdf9] p-[10px] shadow-[0_4px_14px_#764d2410] transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f52e70]" aria-label={`Ver análisis de ejemplo de ${work.title}`}>
          <div className="h-[176px] overflow-hidden rounded-[10px]"><Artwork kind={work.kind} className="transition-transform group-hover:scale-[1.02]" /></div>
          <div className="px-[7px] pt-[14px] pb-[5px]">
            <h2 className="text-[13px] font-bold text-[#40553d]">{work.title}</h2>
            <p className="mt-[7px] text-[11px] text-[#a08670]">{work.date} · <span className="text-[#4a8150]">Análisis completado</span></p>
          </div>
        </Link>)}
      </div>
    </PageFrame>
  );
}
