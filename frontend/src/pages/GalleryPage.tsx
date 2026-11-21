import { useState } from "react";
import { Link } from "react-router-dom";
import { Artwork, Badge, DisplayDate, PageFrame, PageHeading, PageLink } from "./HomePage";
import type { AnalysisStatus, ArtworkData, ArtworkKind } from "./HomePage";

// 05-galeria: obras ilustrativas y filtros locales, sin consultar ni alterar datos reales.
export type GalleryWork = ArtworkData & { status: AnalysisStatus };
export type GalleryPageData = { userId: string; works: GalleryWork[] };
export type GalleryPageProps = { data?: GalleryPageData };

/** API -> prop data: usuario autorizado y works con id único, fecha ISO, imagen
 * y estado. [] es una galería vacía. Sin data se conserva la maqueta existente.
 */
export default function GalleryPage({ data }: GalleryPageProps = {}) {
  const [filter, setFilter] = useState("all");
  const demoWorks: {
    kind: ArtworkKind;
    title: string;
    date: string;
    order: number;
  }[] = [
    {
      kind: "landscape",
      title: "Paisaje mexicano",
      date: "18 oct 2026",
      order: 6,
    },
    {
      kind: "stillLife",
      title: "Bodegón con naranjas",
      date: "15 oct 2026",
      order: 5,
    },
    {
      kind: "portrait",
      title: "Retrato a lápiz",
      date: "10 oct 2026",
      order: 4,
    },
    {
      kind: "garden",
      title: "Jardín al atardecer",
      date: "05 oct 2026",
      order: 3,
    },
    { kind: "eye", title: "Estudio de mirada", date: "29 sep 2026", order: 2 },
    {
      kind: "house",
      title: "Perspectiva de una casa",
      date: "25 sep 2026",
      order: 1,
    },
  ];
  const works: GalleryWork[] = data ? data.works : demoWorks.map((work) => ({
    ...work, id: work.kind, status: "Completado" as const,
  }));
  const visibleWorks = filter === "completed"
    ? works.filter((work) => work.status === "Completado")
    : filter === "recent"
      ? [...works].sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
      : works;

  return (
    <PageFrame>
      <PageHeading
        eyebrow="TU HISTORIA EN IMÁGENES"
        title="Mi galería"
        description="Vuelve a observar tus creaciones y los análisis que las acompañan."
        action={<PageLink to="/analize-image">+ Subir nueva obra</PageLink>}
      />
      <div
        aria-label="Filtrar obras"
        className="mb-[18px] flex flex-wrap items-center gap-2"
      >
        {[
          { value: "all", label: `Todas las obras (${works.length})` },
          { value: "recent", label: "Más recientes" },
          { value: "completed", label: "Análisis completados" },
        ].map(({ value, label }) => (
          <button key={value} type="button" aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            className={`cursor-pointer rounded-full border px-[15px] py-[9px] text-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#104734] ${filter === value ? "border-[#ffb8cc] bg-[#fde5ec] font-bold text-[#dc2a61]" : "border-[#e9d1bc] bg-white text-[#805d48] hover:bg-[#fff1df]"}`}>
            {label}
          </button>
        ))}
        <Badge tone="pink">Obras privadas del usuario</Badge>
      </div>
      {visibleWorks.length === 0 && <p role="status" className="py-6 text-center text-[#8b7565]">No hay obras en esta categoría.</p>}
      <div className="grid gap-[17px] sm:grid-cols-2 xl:grid-cols-3">
        {visibleWorks.map((work) => (
          <Link
            key={work.id}
            to="/result-image"
            className="group overflow-hidden rounded-[18px] border border-[#efd4bc] bg-[#fffdf9] p-[10px] shadow-[0_4px_14px_#764d2410] transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f52e70]"
            aria-label={`Ver análisis de ejemplo de ${work.title}`}
          >
            <div className="h-[176px] overflow-hidden rounded-[10px]">
              <Artwork
                kind={work.kind}
                imageUrl={work.imageUrl}
                imageAlt={work.title}
                className="transition-transform group-hover:scale-[1.02]"
              />
            </div>
            <div className="px-[7px] pt-[14px] pb-[5px]">
              <h2 className="text-[13px] font-bold text-[#40553d]">
                {work.title}
              </h2>
              <p className="mt-[7px] text-[11px] text-[#a08670]">
                <DisplayDate value={work.date} /> ·{" "}
                <span className="text-[#4a8150]">{work.status === "Completado" ? "Análisis completado" : work.status}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </PageFrame>
  );
}
